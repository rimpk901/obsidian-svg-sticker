var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => SvgStickerPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian4 = require("obsidian");

// src/StickerModal.ts
var import_obsidian2 = require("obsidian");

// src/i18n.ts
var import_obsidian = require("obsidian");
var translations = {
  ru: {
    choose: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C SVG-\u0441\u0442\u0438\u043A\u0435\u0440",
    search: "\u041F\u043E\u0438\u0441\u043A \u043F\u043E \u0438\u043C\u0435\u043D\u0438 \u0444\u0430\u0439\u043B\u0430\u2026",
    notFound: "\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E.",
    empty: "SVG-\u0444\u0430\u0439\u043B\u044B \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B \u0432 \u043F\u0430\u043F\u043A\u0435",
    previous: "\u041D\u0430\u0437\u0430\u0434",
    next: "\u0414\u0430\u043B\u0435\u0435",
    remove: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0441\u0442\u0438\u043A\u0435\u0440",
    files: "\u0444\u0430\u0439\u043B\u043E\u0432",
    chooseNote: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C SVG-\u0441\u0442\u0438\u043A\u0435\u0440 \u0434\u043B\u044F \u0430\u043A\u0442\u0438\u0432\u043D\u043E\u0439 \u0437\u0430\u043C\u0435\u0442\u043A\u0438",
    chooseSpace: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C SVG-\u0441\u0442\u0438\u043A\u0435\u0440 \u0434\u043B\u044F \u0430\u043A\u0442\u0438\u0432\u043D\u043E\u0433\u043E Make.md Space",
    saved: "\u0421\u0442\u0438\u043A\u0435\u0440 \u0441\u043E\u0445\u0440\u0430\u043D\u0451\u043D.",
    removed: "\u0421\u0442\u0438\u043A\u0435\u0440 \u0443\u0434\u0430\u043B\u0451\u043D.",
    invalidFolder: "\u0423\u043A\u0430\u0437\u0430\u043D\u043D\u0430\u044F \u043F\u0430\u043F\u043A\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430.",
    settingsTitle: "SVG Sticker",
    folderSetting: "\u041F\u0430\u043F\u043A\u0430 \u0441 \u0438\u043A\u043E\u043D\u043A\u0430\u043C\u0438",
    folderDesc: "\u041F\u0443\u0442\u044C \u043A \u043F\u0430\u043F\u043A\u0435 SVG \u043E\u0442\u043D\u043E\u0441\u0438\u0442\u0435\u043B\u044C\u043D\u043E Vault.",
    languageSetting: "\u042F\u0437\u044B\u043A \u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441\u0430",
    languageDesc: "\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u044F\u0437\u044B\u043A Obsidian \u0438\u043B\u0438 \u0432\u044B\u0431\u0440\u0430\u0442\u044C \u0432\u0440\u0443\u0447\u043D\u0443\u044E.",
    auto: "\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438",
    russian: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439",
    english: "English",
    korean: "\uD55C\uAD6D\uC5B4",
    chinese: "\u4E2D\u6587",
    noActiveSpace: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0438\u0442\u044C \u043F\u0443\u0442\u044C \u0430\u043A\u0442\u0438\u0432\u043D\u043E\u0433\u043E Space.",
    noSelectedItems: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0438\u0442\u044C \u0432\u044B\u0434\u0435\u043B\u0435\u043D\u043D\u044B\u0435 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B.",
    makeUnavailable: "Make.md \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D \u0438\u043B\u0438 \u0435\u0433\u043E API \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D.",
    massAssignmentFailed: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043D\u0430\u0437\u043D\u0430\u0447\u0438\u0442\u044C \u0441\u0442\u0438\u043A\u0435\u0440\u044B \u0432\u0441\u0435\u043C \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430\u043C.",
    massAssigned: "\u0421\u0442\u0438\u043A\u0435\u0440 \u043D\u0430\u0437\u043D\u0430\u0447\u0435\u043D: {count} \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432.",
    operationError: "\u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430. \u041F\u043E\u0434\u0440\u043E\u0431\u043D\u043E\u0441\u0442\u0438 \u0432 \u043A\u043E\u043D\u0441\u043E\u043B\u0438.",
    folderSaved: "\u0421\u0442\u0438\u043A\u0435\u0440 \u043F\u0430\u043F\u043A\u0438 \u0441\u043E\u0445\u0440\u0430\u043D\u0451\u043D.",
    noteSaved: "\u0421\u0442\u0438\u043A\u0435\u0440 \u0437\u0430\u043C\u0435\u0442\u043A\u0438 \u0441\u043E\u0445\u0440\u0430\u043D\u0451\u043D.",
    makeSaved: "\u0421\u0442\u0438\u043A\u0435\u0440 Make.md \u043D\u0430\u0437\u043D\u0430\u0447\u0435\u043D.",
    assignmentFailed: "Make.md \u043D\u0435 \u043F\u0440\u0438\u043D\u044F\u043B \u0441\u0442\u0438\u043A\u0435\u0440.",
    folderRemoved: "\u0421\u0442\u0438\u043A\u0435\u0440 \u043F\u0430\u043F\u043A\u0438 \u0443\u0434\u0430\u043B\u0451\u043D.",
    noteRemoved: "\u0421\u0442\u0438\u043A\u0435\u0440 \u0437\u0430\u043C\u0435\u0442\u043A\u0438 \u0443\u0434\u0430\u043B\u0451\u043D.",
    makeRemoved: "\u0421\u0442\u0438\u043A\u0435\u0440 Make.md \u0443\u0434\u0430\u043B\u0451\u043D.",
    makeRemoveFailed: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0441\u0442\u0438\u043A\u0435\u0440 \u0447\u0435\u0440\u0435\u0437 Make.md."
  },
  en: {
    choose: "Choose SVG sticker",
    search: "Search by filename\u2026",
    notFound: "Nothing found.",
    empty: "No SVG files found in",
    previous: "Previous",
    next: "Next",
    remove: "Remove sticker",
    files: "files",
    chooseNote: "Choose SVG sticker for active note",
    chooseSpace: "Choose SVG sticker for active Make.md Space",
    saved: "Sticker saved.",
    removed: "Sticker removed.",
    invalidFolder: "The specified folder was not found.",
    settingsTitle: "SVG Sticker",
    folderSetting: "Icon folder",
    folderDesc: "Path to the SVG folder relative to the vault.",
    languageSetting: "Interface language",
    languageDesc: "Use Obsidian language automatically or choose manually.",
    auto: "Automatic",
    russian: "Russian",
    english: "English",
    korean: "Korean",
    chinese: "Chinese",
    noActiveSpace: "Could not determine the active Space path.",
    noSelectedItems: "Could not determine the selected items.",
    makeUnavailable: "Make.md was not found or its API is unavailable.",
    massAssignmentFailed: "Could not assign stickers to all items.",
    massAssigned: "Sticker assigned to {count} items.",
    operationError: "An error occurred. See the console for details.",
    folderSaved: "Folder sticker saved.",
    noteSaved: "Note sticker saved.",
    makeSaved: "Make.md sticker assigned.",
    assignmentFailed: "Make.md did not accept the sticker.",
    folderRemoved: "Folder sticker removed.",
    noteRemoved: "Note sticker removed.",
    makeRemoved: "Make.md sticker removed.",
    makeRemoveFailed: "Could not remove the sticker through Make.md."
  },
  ko: {
    choose: "SVG \uC2A4\uD2F0\uCEE4 \uC120\uD0DD",
    search: "\uD30C\uC77C \uC774\uB984\uC73C\uB85C \uAC80\uC0C9\u2026",
    notFound: "\uAC80\uC0C9 \uACB0\uACFC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",
    empty: "SVG \uD30C\uC77C\uC774 \uC5C6\uC2B5\uB2C8\uB2E4:",
    previous: "\uC774\uC804",
    next: "\uB2E4\uC74C",
    remove: "\uC2A4\uD2F0\uCEE4 \uC81C\uAC70",
    files: "\uAC1C \uD30C\uC77C",
    chooseNote: "\uD604\uC7AC \uB178\uD2B8\uC758 SVG \uC2A4\uD2F0\uCEE4 \uC120\uD0DD",
    chooseSpace: "\uD604\uC7AC Make.md Space\uC758 SVG \uC2A4\uD2F0\uCEE4 \uC120\uD0DD",
    saved: "\uC2A4\uD2F0\uCEE4\uAC00 \uC800\uC7A5\uB418\uC5C8\uC2B5\uB2C8\uB2E4.",
    removed: "\uC2A4\uD2F0\uCEE4\uAC00 \uC81C\uAC70\uB418\uC5C8\uC2B5\uB2C8\uB2E4.",
    invalidFolder: "\uC9C0\uC815\uD55C \uD3F4\uB354\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",
    settingsTitle: "SVG Sticker",
    folderSetting: "\uC544\uC774\uCF58 \uD3F4\uB354",
    folderDesc: "Vault \uAE30\uC900 SVG \uD3F4\uB354 \uACBD\uB85C.",
    languageSetting: "\uC778\uD130\uD398\uC774\uC2A4 \uC5B8\uC5B4",
    languageDesc: "Obsidian \uC5B8\uC5B4\uB97C \uC790\uB3D9\uC73C\uB85C \uC0AC\uC6A9\uD558\uAC70\uB098 \uC9C1\uC811 \uC120\uD0DD\uD569\uB2C8\uB2E4.",
    auto: "\uC790\uB3D9",
    russian: "\uB7EC\uC2DC\uC544\uC5B4",
    english: "\uC601\uC5B4",
    korean: "\uD55C\uAD6D\uC5B4",
    chinese: "\uC911\uAD6D\uC5B4",
    noActiveSpace: "\uD65C\uC131 Space \uACBD\uB85C\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",
    noSelectedItems: "\uC120\uD0DD\uD55C \uD56D\uBAA9\uC744 \uD655\uC778\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",
    makeUnavailable: "Make.md\uB97C \uCC3E\uC744 \uC218 \uC5C6\uAC70\uB098 API\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",
    massAssignmentFailed: "\uBAA8\uB4E0 \uD56D\uBAA9\uC5D0 \uC2A4\uD2F0\uCEE4\uB97C \uC9C0\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",
    massAssigned: "{count}\uAC1C \uD56D\uBAA9\uC5D0 \uC2A4\uD2F0\uCEE4\uB97C \uC9C0\uC815\uD588\uC2B5\uB2C8\uB2E4.",
    operationError: "\uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4. \uCF58\uC194\uC744 \uD655\uC778\uD558\uC138\uC694.",
    folderSaved: "\uD3F4\uB354 \uC2A4\uD2F0\uCEE4\uB97C \uC800\uC7A5\uD588\uC2B5\uB2C8\uB2E4.",
    noteSaved: "\uB178\uD2B8 \uC2A4\uD2F0\uCEE4\uB97C \uC800\uC7A5\uD588\uC2B5\uB2C8\uB2E4.",
    makeSaved: "Make.md \uC2A4\uD2F0\uCEE4\uB97C \uC9C0\uC815\uD588\uC2B5\uB2C8\uB2E4.",
    assignmentFailed: "Make.md\uC5D0\uC11C \uC2A4\uD2F0\uCEE4 \uC9C0\uC815\uC744 \uAC70\uBD80\uD588\uC2B5\uB2C8\uB2E4.",
    folderRemoved: "\uD3F4\uB354 \uC2A4\uD2F0\uCEE4\uB97C \uC0AD\uC81C\uD588\uC2B5\uB2C8\uB2E4.",
    noteRemoved: "\uB178\uD2B8 \uC2A4\uD2F0\uCEE4\uB97C \uC0AD\uC81C\uD588\uC2B5\uB2C8\uB2E4.",
    makeRemoved: "Make.md \uC2A4\uD2F0\uCEE4\uB97C \uC0AD\uC81C\uD588\uC2B5\uB2C8\uB2E4.",
    makeRemoveFailed: "Make.md\uB97C \uD1B5\uD574 \uC2A4\uD2F0\uCEE4\uB97C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."
  },
  zh: {
    choose: "\u9009\u62E9 SVG \u8D34\u7EB8",
    search: "\u6309\u6587\u4EF6\u540D\u641C\u7D22\u2026",
    notFound: "\u672A\u627E\u5230\u7ED3\u679C\u3002",
    empty: "\u6587\u4EF6\u5939\u4E2D\u6CA1\u6709 SVG \u6587\u4EF6\uFF1A",
    previous: "\u4E0A\u4E00\u9875",
    next: "\u4E0B\u4E00\u9875",
    remove: "\u5220\u9664\u8D34\u7EB8",
    files: "\u4E2A\u6587\u4EF6",
    chooseNote: "\u4E3A\u5F53\u524D\u7B14\u8BB0\u9009\u62E9 SVG \u8D34\u7EB8",
    chooseSpace: "\u4E3A\u5F53\u524D Make.md Space \u9009\u62E9 SVG \u8D34\u7EB8",
    saved: "\u8D34\u7EB8\u5DF2\u4FDD\u5B58\u3002",
    removed: "\u8D34\u7EB8\u5DF2\u5220\u9664\u3002",
    invalidFolder: "\u627E\u4E0D\u5230\u6307\u5B9A\u7684\u6587\u4EF6\u5939\u3002",
    settingsTitle: "SVG Sticker",
    folderSetting: "\u56FE\u6807\u6587\u4EF6\u5939",
    folderDesc: "\u76F8\u5BF9\u4E8E Vault \u7684 SVG \u6587\u4EF6\u5939\u8DEF\u5F84\u3002",
    languageSetting: "\u754C\u9762\u8BED\u8A00",
    languageDesc: "\u81EA\u52A8\u4F7F\u7528 Obsidian \u8BED\u8A00\u6216\u624B\u52A8\u9009\u62E9\u3002",
    auto: "\u81EA\u52A8",
    russian: "\u4FC4\u8BED",
    english: "\u82F1\u8BED",
    korean: "\u97E9\u8BED",
    chinese: "\u4E2D\u6587",
    noActiveSpace: "\u65E0\u6CD5\u786E\u5B9A\u5F53\u524D Space \u7684\u8DEF\u5F84\u3002",
    noSelectedItems: "\u65E0\u6CD5\u786E\u5B9A\u6240\u9009\u9879\u76EE\u3002",
    makeUnavailable: "\u672A\u627E\u5230 Make.md \u6216\u5176 API \u4E0D\u53EF\u7528\u3002",
    massAssignmentFailed: "\u65E0\u6CD5\u4E3A\u6240\u6709\u9879\u76EE\u5206\u914D\u8D34\u7EB8\u3002",
    massAssigned: "\u5DF2\u4E3A {count} \u4E2A\u9879\u76EE\u5206\u914D\u8D34\u7EB8\u3002",
    operationError: "\u53D1\u751F\u9519\u8BEF\u3002\u8BE6\u60C5\u8BF7\u67E5\u770B\u63A7\u5236\u53F0\u3002",
    folderSaved: "\u6587\u4EF6\u5939\u8D34\u7EB8\u5DF2\u4FDD\u5B58\u3002",
    noteSaved: "\u7B14\u8BB0\u8D34\u7EB8\u5DF2\u4FDD\u5B58\u3002",
    makeSaved: "Make.md \u8D34\u7EB8\u5DF2\u5206\u914D\u3002",
    assignmentFailed: "Make.md \u672A\u63A5\u53D7\u8BE5\u8D34\u7EB8\u3002",
    folderRemoved: "\u6587\u4EF6\u5939\u8D34\u7EB8\u5DF2\u5220\u9664\u3002",
    noteRemoved: "\u7B14\u8BB0\u8D34\u7EB8\u5DF2\u5220\u9664\u3002",
    makeRemoved: "Make.md \u8D34\u7EB8\u5DF2\u5220\u9664\u3002",
    makeRemoveFailed: "\u65E0\u6CD5\u901A\u8FC7 Make.md \u5220\u9664\u8D34\u7EB8\u3002"
  }
};
function resolveLanguage(language) {
  if (language !== "auto")
    return language;
  const obsidianLanguage = (0, import_obsidian.getLanguage)().toLowerCase();
  if (obsidianLanguage.startsWith("ru"))
    return "ru";
  if (obsidianLanguage.startsWith("ko"))
    return "ko";
  if (obsidianLanguage.startsWith("zh"))
    return "zh";
  return "en";
}
function createTranslator(language) {
  const current = translations[resolveLanguage(language)];
  return (key) => current[key];
}

// src/StickerModal.ts
var StickerModal = class extends import_obsidian2.Modal {
  constructor(app, onChoose, onRemove, iconFolder = "embed/icons", language = "auto") {
    super(app);
    this.onChoose = onChoose;
    this.onRemove = onRemove;
    this.iconFolder = iconFolder;
    this.searchValue = "";
    this.page = 0;
    this.pageSize = 96;
    this.t = createTranslator(language);
  }
  onOpen() {
    this.modalEl.addClass("svg-sticker-modal");
    this.render();
  }
  onClose() {
    this.contentEl.empty();
  }
  getSvgFiles() {
    const folder = this.iconFolder.trim().replace(/\\/g, "/").replace(/^\/+|\/+$/g, "");
    return this.app.vault.getFiles().filter((file) => {
      const isSvg = file.extension.toLowerCase() === "svg";
      const isInFolder = !folder || file.path.startsWith(folder + "/");
      return isSvg && isInFolder;
    }).sort((a, b) => a.basename.localeCompare(b.basename));
  }
  render() {
    const root = this.contentEl;
    root.empty();
    root.addClass("svg-sticker-content");
    root.createEl("h2", {
      text: this.t("choose"),
      cls: "svg-sticker-title"
    });
    const search = root.createEl("input", {
      type: "search",
      placeholder: this.t("search")
    });
    search.addClass("svg-sticker-search");
    search.value = this.searchValue;
    const files = this.getSvgFiles();
    const filtered = files.filter(
      (file) => file.basename.toLowerCase().includes(
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
        text: files.length ? this.t("notFound") : this.t("empty")
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
        this.onChoose(file.path);
        this.close();
      });
    }
    const footer = root.createDiv({
      cls: "svg-sticker-footer"
    });
    footer.createSpan({
      text: `${this.page + 1} / ${totalPages} \xB7 ${filtered.length} ${this.t("files")}`
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
        void Promise.resolve(this.onRemove?.()).catch((error) => {
          console.error("[SVG Sticker] Failed to remove sticker", error);
        });
        this.close();
      });
    }
    search.addEventListener("input", () => {
      this.searchValue = search.value;
      this.page = 0;
      this.render();
      const newSearch = this.contentEl.querySelector(
        ".svg-sticker-search"
      );
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
};

// src/MakeMDAdapter.ts
var import_obsidian3 = require("obsidian");
var RANDOM_CACHE_BUSTER = /\?\d{1,3}$/;
function isRecord(value) {
  return typeof value === "object" && value !== null;
}
function isMenuRect(value) {
  return isRecord(value) && typeof value.x === "number" && typeof value.y === "number";
}
function isMenuProps(value) {
  return isRecord(value) && Array.isArray(value.options);
}
function isWindow(value) {
  return isRecord(value) && typeof value.document === "object" && value.document !== null;
}
function isMenuOption(value) {
  return isRecord(value);
}
function getString(value) {
  return typeof value === "string" ? value : null;
}
var MakeMDAdapter = class {
  constructor(app, language = "auto") {
    this.app = app;
    this.originalOpenMenu = null;
    this.originalGetUIPath = null;
    this.patchedUI = null;
    this.onChooseSticker = null;
    this.t = createTranslator(language);
  }
  setLanguage(language) {
    this.t = createTranslator(language);
  }
  getPlugin() {
    const host = this.app;
    const plugins = host.plugins?.plugins;
    if (!plugins)
      return null;
    const direct = plugins["make-md"];
    if (this.hasSuperstate(direct)) {
      return direct;
    }
    for (const plugin of Object.values(plugins)) {
      if (!isRecord(plugin))
        continue;
      const manifest = plugin.manifest;
      const superstate = plugin.superstate;
      if (!isRecord(manifest) || !isRecord(superstate))
        continue;
      const id = getString(manifest.id)?.toLowerCase();
      const name = getString(manifest.name)?.toLowerCase();
      if ((id === "make-md" || name === "make.md") && this.hasSuperstate(plugin)) {
        return plugin;
      }
    }
    return null;
  }
  hasSuperstate(value) {
    return isRecord(value) && isRecord(value.superstate);
  }
  getSuperstate() {
    return this.getPlugin()?.superstate ?? null;
  }
  getStickerKey(ss) {
    return getString(ss.settings?.fmKeySticker);
  }
  getImageCache(ss) {
    return ss.imagesCache instanceof Map ? ss.imagesCache : null;
  }
  getSaveLabel(ss) {
    const saveLabel = ss.spaceManager?.saveLabel;
    return typeof saveLabel === "function" ? saveLabel : null;
  }
  isReady() {
    const ss = this.getSuperstate();
    return !!(ss && this.getImageCache(ss) && this.getSaveLabel(ss) && this.getStickerKey(ss));
  }
  async assign(targetPath, svgPath) {
    const ss = this.getSuperstate();
    if (!ss)
      return false;
    const imagesCache = this.getImageCache(ss);
    const saveLabel = this.getSaveLabel(ss);
    const stickerKey = this.getStickerKey(ss);
    if (!imagesCache || !saveLabel || !stickerKey)
      return false;
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
  async remove(targetPath) {
    const ss = this.getSuperstate();
    if (!ss)
      return false;
    const saveLabel = this.getSaveLabel(ss);
    const stickerKey = this.getStickerKey(ss);
    if (!saveLabel || !stickerKey)
      return false;
    await saveLabel.call(
      ss.spaceManager,
      targetPath,
      stickerKey,
      ""
    );
    return true;
  }
  restore(assignments) {
    const ss = this.getSuperstate();
    if (!ss)
      return;
    const imagesCache = this.getImageCache(ss);
    if (!imagesCache)
      return;
    for (const svgPath of Object.values(assignments)) {
      const key = `external-svg-sticker:${svgPath}`;
      imagesCache.set(key, svgPath);
    }
  }
  async assignMany(targetPaths, svgPath) {
    const uniquePaths = [...new Set(targetPaths)].filter(Boolean);
    const results = await Promise.all(
      uniquePaths.map((path) => this.assign(path, svgPath))
    );
    return results.every(Boolean);
  }
  getActiveSpacePath() {
    const view = this.app.workspace.getActiveViewOfType(import_obsidian3.View);
    if (!view)
      return null;
    try {
      const state = view.getState();
      if (isRecord(state) && typeof state.path === "string") {
        return state.path;
      }
      return null;
    } catch {
      return null;
    }
  }
  installMenuHook(callback, silent = false) {
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
    const patchedOpenMenu = function(rect, menuProps, win, ...rest) {
      let updatedMenuProps = menuProps;
      if (isMenuRect(rect) && isMenuProps(menuProps) && isWindow(win)) {
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
        const selectedPaths = Array.from(selectedItems).map((item) => item.getAttribute("data-path")).filter((value) => value !== null);
        const targetPaths = selectedPaths.length > 1 ? selectedPaths : path ? [path] : [];
        const options = menuProps.options;
        const hasStickerOption = options.some((option) => {
          return isMenuOption(option) && option.id === "external-svg-sticker";
        });
        if (targetPaths.length > 0 && !hasStickerOption) {
          const updatedOptions = [...options];
          const stickerIndex = updatedOptions.findIndex((option) => {
            if (!isMenuOption(option))
              return false;
            return typeof option.name === "string" && option.name.toLowerCase() === "sticker";
          });
          const newOption = {
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
    this.installStableUIPath(ui);
    return true;
  }
  /**
   * Temporary workaround: makes Make.md image URLs stable between renders
   * so the virtualized tree stops re-requesting every icon on scroll.
   */
  installStableUIPath(ui) {
    const originalGetUIPath = ui.getUIPath;
    if (typeof originalGetUIPath !== "function")
      return;
    this.originalGetUIPath = originalGetUIPath;
    const patchedGetUIPath = function(...args) {
      const result = Reflect.apply(
        originalGetUIPath,
        this,
        args
      );
      if (typeof result !== "string" || result === args[0]) {
        return result;
      }
      return result.replace(RANDOM_CACHE_BUSTER, "");
    };
    ui.getUIPath = patchedGetUIPath;
  }
  uninstallMenuHook() {
    if (this.patchedUI && this.originalOpenMenu) {
      this.patchedUI.openMenu = this.originalOpenMenu;
    }
    if (this.patchedUI && this.originalGetUIPath) {
      this.patchedUI.getUIPath = this.originalGetUIPath;
    }
    this.patchedUI = null;
    this.originalOpenMenu = null;
    this.originalGetUIPath = null;
    this.onChooseSticker = null;
  }
};

// src/types.ts
var DEFAULT_SETTINGS = {
  iconFolder: "embed/icons",
  language: "auto"
};
var DEFAULT_DATA = {
  folderStickers: {},
  makeMdAssignments: {},
  settings: { ...DEFAULT_SETTINGS }
};

// src/main.ts
var ICON_CLASS = "svg-sticker-explorer-icon";
var EXPLORER_TITLE_SELECTOR = ".nav-file-title, .nav-folder-title";
var SvgStickerPlugin = class extends import_obsidian4.Plugin {
  constructor() {
    super(...arguments);
    this.data = {
      folderStickers: {},
      makeMdAssignments: {},
      settings: { ...DEFAULT_SETTINGS }
    };
    this.observer = null;
    this.refreshQueued = false;
    this.fullRefreshRequested = false;
    this.pendingScopes = /* @__PURE__ */ new Set();
    this.srcCache = /* @__PURE__ */ new Map();
  }
  runSafely(operation, context) {
    void operation().catch((error) => {
      console.error(`[SVG Sticker] ${context}`, error);
      new import_obsidian4.Notice(this.t("operationError"));
    });
  }
  get iconFolder() {
    return this.data.settings.iconFolder.trim().replace(/\\/g, "/").replace(/^\/+|\/+$/g, "");
  }
  t(key) {
    return createTranslator(this.data.settings.language)(key);
  }
  async onload() {
    const saved = await this.loadData();
    this.data = {
      folderStickers: saved?.folderStickers ?? {},
      makeMdAssignments: saved?.makeMdAssignments ?? {},
      settings: {
        ...DEFAULT_SETTINGS,
        ...saved?.settings ?? {}
      }
    };
    this.makeAdapter = new MakeMDAdapter(
      this.app,
      this.data.settings.language
    );
    this.app.workspace.onLayoutReady(() => {
      let attempts = 0;
      let interval = null;
      const installHook = () => {
        const installed = this.makeAdapter.installMenuHook(
          (paths) => {
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
        interval = window.setInterval(installHook, 1e3);
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
      checkCallback: (checking) => {
        const file = this.app.workspace.getActiveFile();
        if (!file)
          return false;
        if (!checking) {
          this.runSafely(
            () => this.openPicker(file),
            "Opening sticker picker failed"
          );
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
          new import_obsidian4.Notice(this.t("noActiveSpace"));
          return;
        }
        this.openPickerForMakePath(path);
      }
    });
    this.registerEvent(
      this.app.workspace.on("file-menu", (menu, file) => {
        if (!(file instanceof import_obsidian4.TFile || file instanceof import_obsidian4.TFolder)) {
          return;
        }
        menu.addItem((item) => {
          item.setTitle(this.t("choose")).setIcon("image").onClick(() => {
            this.runSafely(
              () => this.openPicker(file),
              "Opening sticker picker failed"
            );
          });
        });
        menu.addItem((item) => {
          item.setTitle(this.t("remove")).setIcon("image-off").onClick(() => {
            this.runSafely(
              () => this.removeSticker(file),
              "Removing sticker failed"
            );
          });
        });
      })
    );
    this.registerEvent(
      this.app.workspace.on("editor-menu", (menu, _editor, view) => {
        const file = view.file;
        if (!file)
          return;
        menu.addItem((item) => {
          item.setTitle(this.t("choose")).setIcon("image").onClick(() => {
            this.runSafely(
              () => this.openPicker(file),
              "Opening sticker picker failed"
            );
          });
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
    const onSvgFileChanged = (file) => {
      if (file instanceof import_obsidian4.TFile && file.extension.toLowerCase() === "svg") {
        this.srcCache.clear();
        this.refreshExplorer();
      }
    };
    this.registerEvent(this.app.vault.on("modify", onSvgFileChanged));
    this.registerEvent(this.app.vault.on("delete", onSvgFileChanged));
    this.registerEvent(this.app.vault.on("rename", onSvgFileChanged));
    this.registerEvent(
      this.app.metadataCache.on("changed", (file) => {
        this.refreshFile(file);
      })
    );
    const resolvedRef = this.app.metadataCache.on("resolved", () => {
      this.app.metadataCache.offref(resolvedRef);
      this.refreshExplorer();
    });
    this.registerEvent(resolvedRef);
    this.startExplorerObserver();
    this.addSettingTab(new SvgStickerSettingTab(this.app, this));
  }
  onunload() {
    this.observer?.disconnect();
    this.observer = null;
    this.pendingScopes.clear();
    this.srcCache.clear();
    this.makeAdapter?.uninstallMenuHook();
  }
  getSettings() {
    return this.data.settings;
  }
  async updateSettings(settings) {
    this.data.settings = {
      ...this.data.settings,
      ...settings
    };
    await this.savePluginData();
    this.makeAdapter?.setLanguage(this.data.settings.language);
  }
  async savePluginData() {
    await this.saveData(this.data);
  }
  async openPicker(target) {
    const existing = await this.getCurrentSticker(target);
    new StickerModal(
      this.app,
      async (svgPath) => {
        await this.assignSticker(target, svgPath);
      },
      existing ? async () => this.removeSticker(target) : void 0,
      this.iconFolder,
      this.data.settings.language
    ).open();
  }
  openPickerForMakePaths(paths) {
    const uniquePaths = [...new Set(paths)].filter(Boolean);
    if (uniquePaths.length === 0) {
      new import_obsidian4.Notice(this.t("noSelectedItems"));
      return;
    }
    new StickerModal(
      this.app,
      async (svgPath) => {
        await this.assignMakeStickers(uniquePaths, svgPath);
      },
      uniquePaths.some((path) => !!this.data.makeMdAssignments[path]) ? async () => {
        for (const path of uniquePaths) {
          if (this.data.makeMdAssignments[path]) {
            await this.removeMakeSticker(path);
          }
        }
      } : void 0,
      this.iconFolder,
      this.data.settings.language
    ).open();
  }
  openPickerForMakePath(path) {
    new StickerModal(
      this.app,
      async (svgPath) => {
        await this.assignMakeSticker(path, svgPath);
      },
      this.data.makeMdAssignments[path] ? async () => this.removeMakeSticker(path) : void 0,
      this.iconFolder,
      this.data.settings.language
    ).open();
  }
  async assignMakeStickers(paths, svgPath) {
    if (!this.isSvgInIconFolder(svgPath)) {
      new import_obsidian4.Notice(this.t("invalidFolder"));
      return;
    }
    if (!this.makeAdapter.isReady()) {
      new import_obsidian4.Notice(this.t("makeUnavailable"));
      return;
    }
    try {
      const uniquePaths = [...new Set(paths)].filter(Boolean);
      const success = await this.makeAdapter.assignMany(
        uniquePaths,
        svgPath
      );
      if (!success) {
        new import_obsidian4.Notice(this.t("massAssignmentFailed"));
        return;
      }
      for (const path of uniquePaths) {
        this.data.makeMdAssignments[path] = svgPath;
      }
      await this.savePluginData();
      new import_obsidian4.Notice(
        this.t("massAssigned").replace(
          "{count}",
          String(uniquePaths.length)
        )
      );
    } catch (error) {
      console.error("[SVG Sticker] Mass assignment failed", error);
      new import_obsidian4.Notice(this.t("operationError"));
    }
  }
  async getCurrentSticker(target) {
    if (target instanceof import_obsidian4.TFolder) {
      return this.data.folderStickers[target.path] ?? null;
    }
    const value = this.app.metadataCache.getFileCache(target)?.frontmatter?.sticker;
    if (typeof value === "string" && value.startsWith("vault//")) {
      return value.slice("vault//".length);
    }
    if (this.data.makeMdAssignments[target.path]) {
      return this.data.makeMdAssignments[target.path];
    }
    return null;
  }
  async assignSticker(target, svgPath) {
    if (!this.isSvgInIconFolder(svgPath)) {
      new import_obsidian4.Notice(this.t("invalidFolder"));
      return;
    }
    if (target instanceof import_obsidian4.TFolder) {
      this.data.folderStickers[target.path] = svgPath;
      await this.savePluginData();
      this.refreshExplorer();
      new import_obsidian4.Notice(this.t("folderSaved"));
      return;
    }
    if (!(target instanceof import_obsidian4.TFile))
      return;
    await this.app.fileManager.processFrontMatter(
      target,
      (frontmatter) => {
        frontmatter.sticker = `vault//${svgPath}`;
      }
    );
    new import_obsidian4.Notice(this.t("noteSaved"));
    this.refreshExplorer();
  }
  async assignMakeSticker(targetPath, svgPath) {
    if (!this.isSvgInIconFolder(svgPath)) {
      new import_obsidian4.Notice(this.t("invalidFolder"));
      return;
    }
    if (!this.makeAdapter.isReady()) {
      new import_obsidian4.Notice(this.t("makeUnavailable"));
      return;
    }
    try {
      const success = await this.makeAdapter.assign(
        targetPath,
        svgPath
      );
      if (!success) {
        new import_obsidian4.Notice(this.t("assignmentFailed"));
        return;
      }
      this.data.makeMdAssignments[targetPath] = svgPath;
      await this.savePluginData();
      new import_obsidian4.Notice(this.t("makeSaved"));
    } catch (error) {
      console.error(
        "[SVG Sticker] Make.md assignment failed",
        error
      );
      new import_obsidian4.Notice(this.t("operationError"));
    }
  }
  async removeSticker(target) {
    if (this.data.makeMdAssignments[target.path]) {
      await this.removeMakeSticker(target.path);
      return;
    }
    if (target instanceof import_obsidian4.TFolder) {
      delete this.data.folderStickers[target.path];
      await this.savePluginData();
      this.refreshExplorer();
      new import_obsidian4.Notice(this.t("folderRemoved"));
      return;
    }
    if (!(target instanceof import_obsidian4.TFile))
      return;
    await this.app.fileManager.processFrontMatter(
      target,
      (frontmatter) => {
        delete frontmatter.sticker;
      }
    );
    new import_obsidian4.Notice(this.t("noteRemoved"));
    this.refreshExplorer();
  }
  async removeMakeSticker(targetPath) {
    try {
      const success = await this.makeAdapter.remove(targetPath);
      if (!success) {
        new import_obsidian4.Notice(this.t("makeRemoveFailed"));
        return;
      }
      delete this.data.makeMdAssignments[targetPath];
      await this.savePluginData();
      new import_obsidian4.Notice(this.t("makeRemoved"));
    } catch (error) {
      console.error(
        "[SVG Sticker] Make.md removal failed",
        error
      );
      new import_obsidian4.Notice(this.t("operationError"));
    }
  }
  isSvgInIconFolder(path) {
    const folder = this.iconFolder;
    const isInFolder = !folder || path.startsWith(folder + "/");
    return isInFolder && this.isValidSvg(path);
  }
  isValidSvg(path) {
    const file = this.app.vault.getAbstractFileByPath(path);
    return file instanceof import_obsidian4.TFile && file.extension.toLowerCase() === "svg";
  }
  startExplorerObserver() {
    this.observer = new MutationObserver((records) => {
      let hasWork = false;
      for (const record of records) {
        if (record.type === "attributes") {
          const target = record.target;
          if (target.matches(EXPLORER_TITLE_SELECTOR)) {
            this.pendingScopes.add(target);
            hasWork = true;
          }
          continue;
        }
        for (const node of Array.from(record.addedNodes)) {
          if (node.nodeType !== Node.ELEMENT_NODE)
            continue;
          const element = node;
          if (element.classList.contains(ICON_CLASS))
            continue;
          if (element.matches(EXPLORER_TITLE_SELECTOR) || element.querySelector(EXPLORER_TITLE_SELECTOR)) {
            this.pendingScopes.add(element);
            hasWork = true;
          }
        }
      }
      if (hasWork)
        this.scheduleRefresh();
    });
    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-path"]
    });
    this.register(() => this.observer?.disconnect());
  }
  /** Full rescan of the explorer (rare: startup, icon files changed, assign/remove). */
  refreshExplorer() {
    this.fullRefreshRequested = true;
    this.scheduleRefresh();
  }
  /** Refresh only the explorer rows of a single file. */
  refreshFile(file) {
    const rows = document.querySelectorAll(
      `.nav-file-title[data-path="${CSS.escape(file.path)}"]`
    );
    if (rows.length === 0)
      return;
    rows.forEach((row) => this.pendingScopes.add(row));
    this.scheduleRefresh();
  }
  scheduleRefresh() {
    if (this.refreshQueued)
      return;
    this.refreshQueued = true;
    window.requestAnimationFrame(() => {
      this.refreshQueued = false;
      if (this.fullRefreshRequested) {
        this.fullRefreshRequested = false;
        this.pendingScopes.clear();
        this.applyStickers(document);
        return;
      }
      const scopes = [...this.pendingScopes];
      this.pendingScopes.clear();
      for (const scope of scopes) {
        if (scope.isConnected) {
          this.applyStickers(scope);
        }
      }
    });
  }
  /** Applies stickers only to explorer rows inside `scope`. */
  applyStickers(scope) {
    const titles = [];
    if (scope instanceof Element && scope.matches(EXPLORER_TITLE_SELECTOR)) {
      titles.push(scope);
    }
    scope.querySelectorAll(EXPLORER_TITLE_SELECTOR).forEach((title) => titles.push(title));
    for (const title of titles) {
      const path = title.getAttribute("data-path") ?? title.parentElement?.getAttribute("data-path");
      if (!path)
        continue;
      let svgPath = null;
      if (title.classList.contains("nav-folder-title")) {
        svgPath = this.data.folderStickers[path] ?? null;
      } else {
        const file = this.app.vault.getAbstractFileByPath(path);
        if (!(file instanceof import_obsidian4.TFile))
          continue;
        const sticker = this.app.metadataCache.getFileCache(file)?.frontmatter?.sticker;
        if (typeof sticker === "string" && sticker.startsWith("vault//")) {
          svgPath = sticker.slice("vault//".length);
        }
      }
      this.updateExplorerSticker(title, svgPath);
    }
  }
  getStickerSrc(svgPath) {
    const cached = this.srcCache.get(svgPath);
    if (cached)
      return cached;
    const file = this.app.vault.getAbstractFileByPath(svgPath);
    if (!(file instanceof import_obsidian4.TFile) || file.extension.toLowerCase() !== "svg") {
      return null;
    }
    const src = this.app.vault.getResourcePath(file);
    this.srcCache.set(svgPath, src);
    return src;
  }
  updateExplorerSticker(title, svgPath) {
    let sticker = title.querySelector(
      `:scope > .${ICON_CLASS}`
    );
    const src = svgPath ? this.getStickerSrc(svgPath) : null;
    if (!src) {
      sticker?.remove();
      if (title.hasClass("has-svg-sticker")) {
        title.removeClass("has-svg-sticker");
      }
      return;
    }
    if (!sticker) {
      sticker = title.createEl("img", {
        cls: ICON_CLASS,
        prepend: true,
        attr: {
          alt: "",
          decoding: "sync",
          draggable: "false"
        }
      });
    }
    if (sticker.getAttribute("src") !== src) {
      sticker.setAttribute("src", src);
    }
    if (!title.hasClass("has-svg-sticker")) {
      title.addClass("has-svg-sticker");
    }
  }
};
var SvgStickerSettingTab = class extends import_obsidian4.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  getControlValue(key) {
    const settings = this.plugin.getSettings();
    switch (key) {
      case "iconFolder":
        return settings.iconFolder;
      case "language":
        return settings.language;
      default:
        return void 0;
    }
  }
  async setControlValue(key, value) {
    if (key === "iconFolder" && typeof value === "string") {
      await this.plugin.updateSettings({
        iconFolder: value.trim()
      });
      return;
    }
    const languages = [
      "auto",
      "ru",
      "en",
      "ko",
      "zh"
    ];
    if (key === "language" && typeof value === "string" && languages.includes(value)) {
      await this.plugin.updateSettings({
        language: value
      });
    }
  }
  getSettingDefinitions() {
    const t = createTranslator(
      this.plugin.getSettings().language
    );
    return [
      {
        type: "group",
        heading: t("settingsTitle"),
        items: [
          {
            name: t("folderSetting"),
            desc: t("folderDesc"),
            control: {
              type: "text",
              key: "iconFolder",
              placeholder: "embed/icons"
            }
          },
          {
            name: t("languageSetting"),
            desc: t("languageDesc"),
            control: {
              type: "dropdown",
              key: "language",
              options: {
                auto: t("auto"),
                ru: t("russian"),
                en: t("english"),
                ko: t("korean"),
                zh: t("chinese")
              }
            }
          }
        ]
      }
    ];
  }
};
