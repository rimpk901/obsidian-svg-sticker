
import {
  App,
  Plugin,
  TFile,
  TFolder,
  Notice,
  PluginSettingTab,
  Setting
} from "obsidian";

import { StickerModal } from "./StickerModal";
import { MakeMDAdapter } from "./MakeMDAdapter";

import {
  StickerData,
  StickerSettings,
  StickerLanguage,
  DEFAULT_SETTINGS
} from "./types";

import { createTranslator } from "./i18n";

export default class SvgStickerPlugin extends Plugin {
  private data: StickerData = {
    folderStickers: {},
    makeMdAssignments: {},
    settings: { ...DEFAULT_SETTINGS }
  };

  private makeAdapter!: MakeMDAdapter;
  private observer: MutationObserver | null = null;
  private refreshQueued = false;

  private get iconFolder(): string {
    return this.data.settings.iconFolder
      .trim()
      .replace(/\\/g, "/")
      .replace(/^\/+|\/+$/g, "");
  }

  private t(
    key: Parameters<ReturnType<typeof createTranslator>>[0]
  ): string {
    return createTranslator(this.data.settings.language)(key);
  }

  async onload() {
    const saved = await this.loadData();

    this.data = {
      folderStickers: saved?.folderStickers ?? {},
      makeMdAssignments: saved?.makeMdAssignments ?? {},
      settings: {
        ...DEFAULT_SETTINGS,
        ...(saved?.settings ?? {})
      }
    };

    this.makeAdapter = new MakeMDAdapter(
      this.app,
      this.data.settings.language
    );

    this.app.workspace.onLayoutReady(() => {
      let attempts = 0;
      let interval: number | null = null;

      const installHook = () => {
        const installed = this.makeAdapter.installMenuHook(
          paths => {
            this.openPickerForMakePaths(paths);
          },
          true
        );

        if (installed) {
          if (interval !== null) {
            window.clearInterval(interval);
            interval = null;
          }

          console.log("[SVG Sticker] Make.md integration ready");
          return;
        }

        attempts++;

        if (attempts >= 30) {
          if (interval !== null) {
            window.clearInterval(interval);
            interval = null;
          }

          console.info(
            "[SVG Sticker] Make.md UI was not detected. Integration skipped."
          );
        }
      };

      installHook();

      if (attempts < 30) {
        interval = window.setInterval(installHook, 1000);

        this.register(() => {
          if (interval !== null) {
            window.clearInterval(interval);
          }
        });
      }
    });

    this.addCommand({
      id: "choose-sticker-for-active-note",
      name: this.t("chooseNote"),
      checkCallback: checking => {
        const file = this.app.workspace.getActiveFile();

        if (!file) return false;

        if (!checking) {
          this.openPicker(file);
        }

        return true;
      }
    });

    this.addCommand({
      id: "choose-sticker-for-active-make-space",
      name: this.t("chooseSpace"),
      callback: () => {
        const path = this.makeAdapter.getActiveSpacePath();

        if (!path) {
          new Notice(this.t("noActiveSpace"));
          return;
        }

        this.openPickerForMakePath(path);
      }
    });

    this.registerEvent(
      this.app.workspace.on("file-menu", (menu, file) => {
        if (!(file instanceof TFile || file instanceof TFolder)) {
          return;
        }

        menu.addItem(item => {
          item
            .setTitle(this.t("choose"))
            .setIcon("image")
            .onClick(() => this.openPicker(file));
        });

        menu.addItem(item => {
          item
            .setTitle(this.t("remove"))
            .setIcon("image-off")
            .onClick(() => this.removeSticker(file));
        });
      })
    );

    this.registerEvent(
      this.app.workspace.on("editor-menu", (menu, editor, view) => {
        const file = view.file;

        if (!file) return;

        menu.addItem(item => {
          item
            .setTitle(this.t("choose"))
            .setIcon("image")
            .onClick(() => this.openPicker(file));
        });
      })
    );

    this.app.workspace.onLayoutReady(() => {
      this.makeAdapter.restore(this.data.makeMdAssignments);
      this.refreshExplorer();
    });

    this.registerEvent(
      this.app.workspace.on("active-leaf-change", () => {
        this.makeAdapter.restore(this.data.makeMdAssignments);
      })
    );

    this.startExplorerObserver();

    this.addSettingTab(new SvgStickerSettingTab(this.app, this));
  }

  onunload() {
    this.observer?.disconnect();
    this.observer = null;
    this.makeAdapter?.uninstallMenuHook();
  }

  getSettings(): StickerSettings {
    return this.data.settings;
  }

  async updateSettings(
    settings: Partial<StickerSettings>
  ): Promise<void> {
    this.data.settings = {
      ...this.data.settings,
      ...settings
    };

    await this.savePluginData();
    this.makeAdapter?.setLanguage(this.data.settings.language);
  }

  async savePluginData(): Promise<void> {
    await this.saveData(this.data);
  }

  private async openPicker(target: TFile | TFolder) {
    const existing = await this.getCurrentSticker(target);

    new StickerModal(
      this.app,
      async svgPath => {
        await this.assignSticker(target, svgPath);
      },
      existing
        ? async () => this.removeSticker(target)
        : undefined,
      this.iconFolder,
      this.data.settings.language
    ).open();
  }

  private openPickerForMakePaths(paths: string[]) {
    const uniquePaths = [...new Set(paths)].filter(Boolean);

    if (uniquePaths.length === 0) {
      new Notice(this.t("noSelectedItems"));
      return;
    }

    new StickerModal(
      this.app,
      async svgPath => {
        await this.assignMakeStickers(uniquePaths, svgPath);
      },
      uniquePaths.some(path => !!this.data.makeMdAssignments[path])
        ? async () => {
            for (const path of uniquePaths) {
              if (this.data.makeMdAssignments[path]) {
                await this.removeMakeSticker(path);
              }
            }
          }
        : undefined,
      this.iconFolder,
      this.data.settings.language
    ).open();
  }

  private openPickerForMakePath(path: string) {
    new StickerModal(
      this.app,
      async svgPath => {
        await this.assignMakeSticker(path, svgPath);
      },
      this.data.makeMdAssignments[path]
        ? async () => this.removeMakeSticker(path)
        : undefined,
      this.iconFolder,
      this.data.settings.language
    ).open();
  }

  private async assignMakeStickers(
    paths: string[],
    svgPath: string
  ) {
    if (!this.isSvgInIconFolder(svgPath)) {
      new Notice(this.t("invalidFolder"));
      return;
    }

    if (!this.makeAdapter.isReady()) {
      new Notice(this.t("makeUnavailable"));
      return;
    }

    try {
      const uniquePaths = [...new Set(paths)].filter(Boolean);

      const success = await this.makeAdapter.assignMany(
        uniquePaths,
        svgPath
      );

      if (!success) {
        new Notice(this.t("massAssignmentFailed"));
        return;
      }

      for (const path of uniquePaths) {
        this.data.makeMdAssignments[path] = svgPath;
      }

      await this.savePluginData();

      new Notice(
        this.t("massAssigned").replace(
          "{count}",
          String(uniquePaths.length)
        )
      );
    } catch (error) {
      console.error("[SVG Sticker] Mass assignment failed", error);
      new Notice(this.t("operationError"));
    }
  }

  private async getCurrentSticker(
    target: TFile | TFolder
  ): Promise<string | null> {
    if (target instanceof TFolder) {
      return this.data.folderStickers[target.path] ?? null;
    }

    const value = this.app.metadataCache
      .getFileCache(target)
      ?.frontmatter?.sticker;

    if (typeof value === "string" && value.startsWith("vault//")) {
      return value.slice("vault//".length);
    }

    if (this.data.makeMdAssignments[target.path]) {
      return this.data.makeMdAssignments[target.path];
    }

    return null;
  }

  private async assignSticker(
    target: TFile | TFolder,
    svgPath: string
  ) {
    if (!this.isSvgInIconFolder(svgPath)) {
      new Notice(this.t("invalidFolder"));
      return;
    }

    if (this.makeAdapter.isReady()) {
      await this.assignMakeSticker(target.path, svgPath);
      return;
    }

    if (target instanceof TFolder) {
      this.data.folderStickers[target.path] = svgPath;

      await this.savePluginData();
      this.refreshExplorer();

      new Notice(this.t("folderSaved"));
      return;
    }

    if (!(target instanceof TFile)) return;

    await this.app.fileManager.processFrontMatter(
      target,
      frontmatter => {
        frontmatter.sticker = `vault//${svgPath}`;
      }
    );

    new Notice(this.t("noteSaved"));
    this.refreshExplorer();
  }

  private async assignMakeSticker(
    targetPath: string,
    svgPath: string
  ) {
    if (!this.isSvgInIconFolder(svgPath)) {
      new Notice(this.t("invalidFolder"));
      return;
    }

    if (!this.makeAdapter.isReady()) {
      new Notice(this.t("makeUnavailable"));
      return;
    }

    try {
      const success = await this.makeAdapter.assign(
        targetPath,
        svgPath
      );

      if (!success) {
        new Notice(this.t("assignmentFailed"));
        return;
      }

      this.data.makeMdAssignments[targetPath] = svgPath;

      await this.savePluginData();

      new Notice(this.t("makeSaved"));
    } catch (error) {
      console.error(
        "[SVG Sticker] Make.md assignment failed",
        error
      );

      new Notice(this.t("operationError"));
    }
  }

  private async removeSticker(target: TFile | TFolder) {
    if (this.data.makeMdAssignments[target.path]) {
      await this.removeMakeSticker(target.path);
      return;
    }

    if (target instanceof TFolder) {
      delete this.data.folderStickers[target.path];

      await this.savePluginData();
      this.refreshExplorer();

      new Notice(this.t("folderRemoved"));
      return;
    }

    if (!(target instanceof TFile)) return;

    await this.app.fileManager.processFrontMatter(
      target,
      frontmatter => {
        delete frontmatter.sticker;
      }
    );

    new Notice(this.t("noteRemoved"));
    this.refreshExplorer();
  }

  private async removeMakeSticker(targetPath: string) {
    try {
      const success = await this.makeAdapter.remove(targetPath);

      if (!success) {
        new Notice(this.t("makeRemoveFailed"));
        return;
      }

      delete this.data.makeMdAssignments[targetPath];

      await this.savePluginData();

      new Notice(this.t("makeRemoved"));
    } catch (error) {
      console.error(
        "[SVG Sticker] Make.md removal failed",
        error
      );

      new Notice(this.t("operationError"));
    }
  }

  private isSvgInIconFolder(path: string): boolean {
    const folder = this.iconFolder;

    const isInFolder =
      !folder || path.startsWith(folder + "/");

    return (
      isInFolder &&
      this.isValidSvg(path)
    );
  }

  private isValidSvg(path: string): boolean {
    const file = this.app.vault.getAbstractFileByPath(path);

    return (
      file instanceof TFile &&
      file.extension.toLowerCase() === "svg"
    );
  }

  private startExplorerObserver() {
    const root = document.body;

    this.observer = new MutationObserver(() => {
      if (this.refreshQueued) return;

      this.refreshQueued = true;

      window.requestAnimationFrame(() => {
        this.refreshQueued = false;
        this.refreshExplorer();
      });
    });

    this.observer.observe(root, {
      childList: true,
      subtree: true
    });

    this.register(() => this.observer?.disconnect());
  }

  private refreshExplorer() {
    const fileItems = document.querySelectorAll<HTMLElement>(
      ".nav-file"
    );

    fileItems.forEach(item => {
      const title = item.querySelector<HTMLElement>(
        ".nav-file-title"
      );

      if (!title) return;

      const path =
        title.getAttribute("data-path") ??
        item.getAttribute("data-path");

      if (!path) return;

      const file = this.app.vault.getAbstractFileByPath(path);

      if (!(file instanceof TFile)) return;

      const sticker = this.app.metadataCache
        .getFileCache(file)
        ?.frontmatter?.sticker;

      const svgPath =
        typeof sticker === "string" &&
        sticker.startsWith("vault//")
          ? sticker.slice("vault//".length)
          : null;

      this.updateExplorerSticker(
        title,
        svgPath && this.isValidSvg(svgPath)
          ? svgPath
          : null
      );
    });

    const folderItems = document.querySelectorAll<HTMLElement>(
      ".nav-folder"
    );

    folderItems.forEach(item => {
      const title = item.querySelector<HTMLElement>(
        ".nav-folder-title"
      );

      if (!title) return;

      const path =
        title.getAttribute("data-path") ??
        item.getAttribute("data-path");

      if (!path) return;

      const svgPath = this.data.folderStickers[path];

      this.updateExplorerSticker(
        title,
        svgPath && this.isValidSvg(svgPath)
          ? svgPath
          : null
      );
    });
  }

  private updateExplorerSticker(
    title: HTMLElement,
    svgPath: string | null
  ) {
    let sticker = title.querySelector<HTMLImageElement>(
      ":scope > .svg-sticker-explorer-icon"
    );

    if (!svgPath) {
      sticker?.remove();
      title.removeClass("has-svg-sticker");
      return;
    }

    const file = this.app.vault.getAbstractFileByPath(svgPath);

    if (!(file instanceof TFile)) {
      sticker?.remove();
      title.removeClass("has-svg-sticker");
      return;
    }

    const src = this.app.vault.getResourcePath(file);

    if (!sticker) {
      sticker = document.createElement("img");
      sticker.className = "svg-sticker-explorer-icon";
      sticker.alt = "";
      sticker.loading = "lazy";

      title.prepend(sticker);
    }

    if (sticker.getAttribute("src") !== src) {
      sticker.setAttribute("src", src);
    }

    title.addClass("has-svg-sticker");
  }
}

class SvgStickerSettingTab extends PluginSettingTab {
  constructor(
    app: App,
    private plugin: SvgStickerPlugin
  ) {
    super(app, plugin);
  }

  display() {
    const { containerEl } = this;

    containerEl.empty();

    const settings = this.plugin.getSettings();
    const t = createTranslator(settings.language);

    containerEl.createEl("h2", {
      text: t("settingsTitle")
    });

    new Setting(containerEl)
      .setName(t("folderSetting"))
      .setDesc(t("folderDesc"))
      .addText(text => {
        text
          .setPlaceholder("embed/icons")
          .setValue(settings.iconFolder)
          .onChange(async value => {
            await this.plugin.updateSettings({
              iconFolder: value.trim()
            });
          });
      });

    new Setting(containerEl)
      .setName(t("languageSetting"))
      .setDesc(t("languageDesc"))
      .addDropdown(dropdown => {
        dropdown
          .addOption("auto", t("auto"))
          .addOption("ru", t("russian"))
          .addOption("en", t("english"))
          .addOption("ko", t("korean"))
          .addOption("zh", t("chinese"))
          .setValue(settings.language)
          .onChange(async value => {
            await this.plugin.updateSettings({
              language: value as StickerLanguage
            });

            this.display();
          });
      });
  }
}
