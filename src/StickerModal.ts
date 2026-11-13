
import {
  App,
  Modal,
  TFile
} from "obsidian";

import { createTranslator } from "./i18n";
import { StickerLanguage } from "./types";

export class StickerModal extends Modal {
  private selectedPath: string | null = null;
  private searchValue = "";
  private page = 0;
  private readonly pageSize = 96;
  private t: ReturnType<typeof createTranslator>;

  constructor(
    app: App,
    private onChoose: (path: string) => void,
    private onRemove?: () => void,
    private iconFolder = "embed/icons",
    language: StickerLanguage = "auto"
  ) {
    super(app);
    this.t = createTranslator(language);
  }

  onOpen() {
    this.modalEl.addClass("svg-sticker-modal");
    this.render();
  }

  onClose() {
    this.contentEl.empty();
  }

  private getSvgFiles(): TFile[] {
    const folder = this.iconFolder
      .trim()
      .replace(/\\/g, "/")
      .replace(/^\/+|\/+$/g, "");

    return this.app.vault.getFiles()
      .filter(file => {
        const isSvg = file.extension.toLowerCase() === "svg";
        const isInFolder = !folder || file.path.startsWith(folder + "/");

        return isSvg && isInFolder;
      })
      .sort((a, b) => a.basename.localeCompare(b.basename));
  }

  private render() {
    const root = this.contentEl;
    root.empty();
    root.addClass("svg-sticker-content");

    root.createEl("h2", {
      text: this.t("choose")
    });

    const search = root.createEl("input", {
      type: "search",
      placeholder: this.t("search")
    });

    search.addClass("svg-sticker-search");
    search.value = this.searchValue;

    const files = this.getSvgFiles();

    const filtered = files.filter(file =>
      file.basename.toLowerCase().includes(
        this.searchValue.toLowerCase()
      )
    );

    const totalPages = Math.max(
      1,
      Math.ceil(filtered.length / this.pageSize)
    );

    this.page = Math.min(this.page, totalPages - 1);

    const grid = root.createDiv({
      cls: "svg-sticker-grid"
    });

    const visible = filtered.slice(
      this.page * this.pageSize,
      (this.page + 1) * this.pageSize
    );

    if (visible.length === 0) {
      grid.createEl("p", {
        text: files.length
          ? this.t("notFound")
          : this.t("empty")
      });
    }

    for (const file of visible) {
      const item = grid.createDiv({
        cls: "svg-sticker-item"
      });

      item.createEl("img", {
        attr: {
          src: this.app.vault.getResourcePath(file),
          alt: file.basename,
          loading: "lazy"
        }
      });

      item.createDiv({
        cls: "svg-sticker-name",
        text: file.basename
      });

      item.addEventListener("click", () => {
        this.selectedPath = file.path;
        this.onChoose(file.path);
        this.close();
      });
    }

    const footer = root.createDiv({
      cls: "svg-sticker-footer"
    });

    footer.createSpan({
      text: `${this.page + 1} / ${totalPages} · ${filtered.length} ${this.t("files")}`
    });

    const pagination = footer.createDiv({
      cls: "svg-sticker-pagination"
    });

    const previous = pagination.createEl("button", {
      text: this.t("previous")
    });

    previous.disabled = this.page <= 0;

    previous.addEventListener("click", () => {
      this.page--;
      this.render();
    });

    const next = pagination.createEl("button", {
      text: this.t("next")
    });

    next.disabled = this.page >= totalPages - 1;

    next.addEventListener("click", () => {
      this.page++;
      this.render();
    });

    if (this.onRemove) {
      const remove = footer.createEl("button", {
        text: this.t("remove")
      });

      remove.addClass("mod-warning");

      remove.addEventListener("click", () => {
        this.onRemove?.();
        this.close();
      });
    }

    search.addEventListener("input", () => {
      this.searchValue = search.value;
      this.page = 0;

      this.render();

      const newSearch = this.contentEl.querySelector(
        ".svg-sticker-search"
      ) as HTMLInputElement | null;

      newSearch?.focus();

      if (newSearch) {
        newSearch.setSelectionRange(
          newSearch.value.length,
          newSearch.value.length
        );
      }
    });

    search.focus();
  }
}
