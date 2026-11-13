
import { App, View } from "obsidian";

import { createTranslator } from "./i18n";
import { StickerLanguage } from "./types";

interface MakeMDSettings {
  fmKeySticker?: unknown;
}

interface MakeMDSpaceManager {
  saveLabel?: (...args: string[]) => Promise<unknown> | unknown;
}

interface MakeMDUI {
  openMenu?: OpenMenu;
}

interface MakeMDSuperstate {
  imagesCache?: unknown;
  spaceManager?: MakeMDSpaceManager;
  settings?: MakeMDSettings;
  ui?: MakeMDUI;
}

interface MakeMDPlugin {
  manifest?: {
    id?: unknown;
    name?: unknown;
  };
  superstate?: MakeMDSuperstate;
}

interface MakeMDPluginManager {
  plugins?: Record<string, unknown>;
}

interface MakeMDPluginHost {
  plugins?: MakeMDPluginManager;
}

interface MenuRect {
  x: number;
  y: number;
  width?: number;
  height?: number;
}

interface MenuOption {
  id?: unknown;
  name?: unknown;
  icon?: unknown;
  onClick?: () => void;
}

interface MenuProps {
  options?: unknown;
  [key: string]: unknown;
}

type OpenMenu = (
  this: unknown,
  rect: unknown,
  menuProps: unknown,
  win: unknown,
  ...rest: unknown[]
) => unknown;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isMenuRect(value: unknown): value is MenuRect {
  return (
    isRecord(value) &&
    typeof value.x === "number" &&
    typeof value.y === "number"
  );
}

function isMenuProps(value: unknown): value is MenuProps {
  return isRecord(value) && Array.isArray(value.options);
}

function isWindow(value: unknown): value is Window {
  return (
    isRecord(value) &&
    typeof value.document === "object" &&
    value.document !== null
  );
}

function isMenuOption(value: unknown): value is MenuOption {
  return isRecord(value);
}

function getString(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

export class MakeMDAdapter {
  private originalOpenMenu: OpenMenu | null = null;
  private patchedUI: MakeMDUI | null = null;
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

  private getPlugin(): MakeMDPlugin | null {
    const host = this.app as unknown as MakeMDPluginHost;
    const plugins = host.plugins?.plugins;

    if (!plugins) return null;

    const direct = plugins["make-md"];

    if (this.hasSuperstate(direct)) {
      return direct;
    }

    for (const plugin of Object.values(plugins)) {
      if (!isRecord(plugin)) continue;

      const manifest = plugin.manifest;
      const superstate = plugin.superstate;

      if (!isRecord(manifest) || !isRecord(superstate)) continue;

      const id = getString(manifest.id)?.toLowerCase();
      const name = getString(manifest.name)?.toLowerCase();

      if (
        (id === "make-md" || name === "make.md") &&
        this.hasSuperstate(plugin)
      ) {
        return plugin;
      }
    }

    return null;
  }

  private hasSuperstate(value: unknown): value is MakeMDPlugin {
    return isRecord(value) && isRecord(value.superstate);
  }

  private getSuperstate(): MakeMDSuperstate | null {
    return this.getPlugin()?.superstate ?? null;
  }

  private getStickerKey(ss: MakeMDSuperstate): string | null {
    return getString(ss.settings?.fmKeySticker);
  }

  private getImageCache(ss: MakeMDSuperstate): Map<unknown, unknown> | null {
    return ss.imagesCache instanceof Map ? ss.imagesCache : null;
  }

  private getSaveLabel(
    ss: MakeMDSuperstate
  ): ((...args: string[]) => Promise<unknown> | unknown) | null {
    const saveLabel = ss.spaceManager?.saveLabel;

    return typeof saveLabel === "function" ? saveLabel : null;
  }

  isReady(): boolean {
    const ss = this.getSuperstate();

    return !!(
      ss &&
      this.getImageCache(ss) &&
      this.getSaveLabel(ss) &&
      this.getStickerKey(ss)
    );
  }

  async assign(targetPath: string, svgPath: string): Promise<boolean> {
    const ss = this.getSuperstate();

    if (!ss) return false;

    const imagesCache = this.getImageCache(ss);
    const saveLabel = this.getSaveLabel(ss);
    const stickerKey = this.getStickerKey(ss);

    if (!imagesCache || !saveLabel || !stickerKey) return false;

    const key = `external-svg-sticker:${svgPath}`;
    imagesCache.set(key, svgPath);

    await saveLabel.call(
      ss.spaceManager,
      targetPath,
      stickerKey,
      `image//${key}`
    );

    return true;
  }

  async remove(targetPath: string): Promise<boolean> {
    const ss = this.getSuperstate();

    if (!ss) return false;

    const saveLabel = this.getSaveLabel(ss);
    const stickerKey = this.getStickerKey(ss);

    if (!saveLabel || !stickerKey) return false;

    await saveLabel.call(
      ss.spaceManager,
      targetPath,
      stickerKey,
      ""
    );

    return true;
  }

  restore(assignments: Record<string, string>): void {
    const ss = this.getSuperstate();
    if (!ss) return;

    const imagesCache = this.getImageCache(ss);
    if (!imagesCache) return;

    for (const svgPath of Object.values(assignments)) {
      const key = `external-svg-sticker:${svgPath}`;
      imagesCache.set(key, svgPath);
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
    const view = this.app.workspace.getActiveViewOfType(View);
    if (!view) return null;

    try {
      const state: unknown = view.getState();

      if (
        isRecord(state) &&
        typeof state.path === "string"
      ) {
        return state.path;
      }

      return null;
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
    const originalOpenMenu = ui?.openMenu;

    if (!ui || typeof originalOpenMenu !== "function") {
      if (!silent) {
        console.warn("[SVG Sticker] Make.md UI not found");
      }

      return false;
    }

    this.uninstallMenuHook();

    this.patchedUI = ui;
    this.originalOpenMenu = originalOpenMenu;
    this.onChooseSticker = callback;

    const translate = this.t;
    const onChooseSticker = callback;

    const patchedOpenMenu: OpenMenu = function (
      rect,
      menuProps,
      win,
      ...rest
    ) {
      let updatedMenuProps = menuProps;

      if (
        isMenuRect(rect) &&
        isMenuProps(menuProps) &&
        isWindow(win)
      ) {
        const x = rect.x + (rect.width ?? 0) / 2;
        const y = rect.y + (rect.height ?? 0) / 2;

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
          .filter((value): value is string => value !== null);

        const targetPaths = selectedPaths.length > 1
          ? selectedPaths
          : path
            ? [path]
            : [];

        const options = menuProps.options as unknown[];

        const hasStickerOption = options.some(option => {
          return (
            isMenuOption(option) &&
            option.id === "external-svg-sticker"
          );
        });

        if (targetPaths.length > 0 && !hasStickerOption) {
          const updatedOptions = [...options];

          const stickerIndex = updatedOptions.findIndex(option => {
            if (!isMenuOption(option)) return false;

            return (
              typeof option.name === "string" &&
              option.name.toLowerCase() === "sticker"
            );
          });

          const newOption: MenuOption = {
            id: "external-svg-sticker",
            name: translate("choose"),
            icon: "ui//sticker",
            onClick: () => {
              onChooseSticker(targetPaths);
            }
          };

          if (stickerIndex >= 0) {
            updatedOptions.splice(stickerIndex + 1, 0, newOption);
          } else {
            updatedOptions.push(newOption);
          }

          updatedMenuProps = {
            ...menuProps,
            options: updatedOptions
          };
        }
      }

      return Reflect.apply(originalOpenMenu, this, [
        rect,
        updatedMenuProps,
        win,
        ...rest
      ]);
    };

    ui.openMenu = patchedOpenMenu;

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
