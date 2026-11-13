
import { App } from "obsidian";

import { createTranslator } from "./i18n";
import { StickerLanguage } from "./types";

export class MakeMDAdapter {
  private originalOpenMenu: any = null;
  private patchedUI: any = null;
  private onChooseSticker: ((paths: string[]) => void) | null = null;
  private t: ReturnType<typeof createTranslator>;

  constructor(
    private app: App,
    language: StickerLanguage = "auto"
  ) {
    this.t = createTranslator(language);
  }

  setLanguage(language: StickerLanguage): void {
    this.t = createTranslator(language);
  }

  private getPlugin(): any | null {
    const plugins = (this.app as any).plugins?.plugins;
    if (!plugins) return null;

    const direct = plugins["make-md"];
    if (direct?.superstate) return direct;

    for (const plugin of Object.values(plugins) as any[]) {
      const id = plugin?.manifest?.id?.toLowerCase();
      const name = plugin?.manifest?.name?.toLowerCase();

      if (
        (id === "make-md" || name === "make.md") &&
        plugin?.superstate
      ) {
        return plugin;
      }
    }

    return null;
  }

  private getSuperstate(): any | null {
    return this.getPlugin()?.superstate ?? null;
  }

  isReady(): boolean {
    const ss = this.getSuperstate();

    return !!(
      ss &&
      ss.imagesCache instanceof Map &&
      typeof ss.spaceManager?.saveLabel === "function" &&
      typeof ss.settings?.fmKeySticker === "string"
    );
  }

  async assign(targetPath: string, svgPath: string): Promise<boolean> {
    const ss = this.getSuperstate();

    if (!ss || !(ss.imagesCache instanceof Map)) return false;
    if (typeof ss.spaceManager?.saveLabel !== "function") return false;

    const key = `external-svg-sticker:${svgPath}`;
    ss.imagesCache.set(key, svgPath);

    await ss.spaceManager.saveLabel(
      targetPath,
      ss.settings.fmKeySticker,
      `image//${key}`
    );

    return true;
  }

  async remove(targetPath: string): Promise<boolean> {
    const ss = this.getSuperstate();

    if (!ss || typeof ss.spaceManager?.saveLabel !== "function") {
      return false;
    }

    await ss.spaceManager.saveLabel(
      targetPath,
      ss.settings.fmKeySticker,
      ""
    );

    return true;
  }

  restore(assignments: Record<string, string>): void {
    const ss = this.getSuperstate();
    if (!ss || !(ss.imagesCache instanceof Map)) return;

    for (const svgPath of Object.values(assignments)) {
      const key = `external-svg-sticker:${svgPath}`;
      ss.imagesCache.set(key, svgPath);
    }
  }

  async assignMany(
    targetPaths: string[],
    svgPath: string
  ): Promise<boolean> {
    const uniquePaths = [...new Set(targetPaths)].filter(Boolean);

    const results = await Promise.all(
      uniquePaths.map(path => this.assign(path, svgPath))
    );

    return results.every(Boolean);
  }

  getActiveSpacePath(): string | null {
    const leaf = this.app.workspace.activeLeaf;
    if (!leaf) return null;

    try {
      const state = leaf.view.getState() as any;
      return typeof state?.path === "string" ? state.path : null;
    } catch {
      return null;
    }
  }

  installMenuHook(
    callback: (paths: string[]) => void,
    silent = false
  ): boolean {
    const ss = this.getSuperstate();
    const ui = ss?.ui;

    if (!ui || typeof ui.openMenu !== "function") {
      if (!silent) {
        console.warn("[SVG Sticker] Make.md UI not found");
      }
      return false;
    }

    this.uninstallMenuHook();

    this.patchedUI = ui;
    this.originalOpenMenu = ui.openMenu;
    this.onChooseSticker = callback;

    const adapter = this;

    ui.openMenu = function (
      rect: any,
      menuProps: any,
      win: Window,
      ...rest: any[]
    ) {
      if (
        menuProps &&
        Array.isArray(menuProps.options) &&
        rect
      ) {
        const x = rect.x + (rect.width || 0) / 2;
        const y = rect.y + (rect.height || 0) / 2;

        const target = win.document.elementFromPoint(x, y);
        const treeItem = target?.closest(
          ".mk-tree-item[data-path]"
        );

        const path = treeItem?.getAttribute("data-path");

        const selectedItems = win.document.querySelectorAll(
          ".mk-tree-item.is-selected[data-path]"
        );

        const selectedPaths = Array.from(selectedItems)
          .map(item => item.getAttribute("data-path"))
          .filter((value): value is string => !!value);

        const targetPaths = selectedPaths.length > 1
          ? selectedPaths
          : path
            ? [path]
            : [];

        if (
          targetPaths.length > 0 &&
          !menuProps.options.some(
            (option: any) => option?.id === "external-svg-sticker"
          )
        ) {
          const options = [...menuProps.options];

          const stickerIndex = options.findIndex(
            (option: any) =>
              typeof option?.name === "string" &&
              option.name.toLowerCase() === "sticker"
          );

          const newOption = {
            id: "external-svg-sticker",
            name: adapter.t("choose"),
            icon: "ui//sticker",
            onClick: () => {
              adapter.onChooseSticker?.(targetPaths);
            }
          };

          if (stickerIndex >= 0) {
            options.splice(stickerIndex + 1, 0, newOption);
          } else {
            options.push(newOption);
          }

          menuProps = {
            ...menuProps,
            options
          };
        }
      }

      return adapter.originalOpenMenu!.call(
        this,
        rect,
        menuProps,
        win,
        ...rest
      );
    };

    console.log("[SVG Sticker] Navigator menu hook installed");
    return true;
  }

  uninstallMenuHook(): void {
    if (this.patchedUI && this.originalOpenMenu) {
      this.patchedUI.openMenu = this.originalOpenMenu;
    }

    this.patchedUI = null;
    this.originalOpenMenu = null;
    this.onChooseSticker = null;
  }
}
