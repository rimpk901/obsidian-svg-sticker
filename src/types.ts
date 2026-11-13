export type StickerLanguage = "auto" | "ru" | "en" | "ko" | "zh";

export interface StickerSettings {
  iconFolder: string;
  language: StickerLanguage;
}

export interface StickerData {
  folderStickers: Record<string, string>;
  makeMdAssignments: Record<string, string>;
  settings: StickerSettings;
}

export const DEFAULT_SETTINGS: StickerSettings = {
  iconFolder: "embed/icons",
  language: "auto"
};

export const DEFAULT_DATA: StickerData = {
  folderStickers: {},
  makeMdAssignments: {},
  settings: { ...DEFAULT_SETTINGS }
};