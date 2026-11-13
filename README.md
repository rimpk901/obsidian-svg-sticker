[![GitHub release](https://img.shields.io/github/v/release/rimpk901/obsidian-svg-sticker?style=for-the-badge&logo=github&label=Latest%20Release)](https://github.com/rimpk901/obsidian-svg-sticker/releases/latest)
[![GitHub downloads](https://img.shields.io/github/downloads/rimpk901/obsidian-svg-sticker/total?style=for-the-badge&logo=github)](https://github.com/rimpk901/obsidian-svg-sticker/releases)
[![GitHub license](https://img.shields.io/github/license/rimpk901/obsidian-svg-sticker?style=for-the-badge)](LICENSE)
[![Obsidian](https://img.shields.io/badge/Obsidian-Plugin-7C3AED?style=for-the-badge&logo=obsidian)](https://obsidian.md/)

# 🎨 SVG Sticker

**Bring your Obsidian vault to life with custom SVG icons!**

SVG Sticker is a plugin for [Obsidian](https://obsidian.md/) that lets you assign custom SVG icons to notes, folders, and Make.md Spaces.

Choose icons from your own collection, customize the icon folder, and organize your vault visually.

---

## ✨ Features

- **Custom SVG icons** — use your own SVG icon collection.
- **Note stickers** — assign icons to individual notes.
- **Folder stickers** — personalize folders in the native Obsidian File Explorer.
- **Make.md integration** — assign SVG icons to Make.md Spaces without modifying Make.md source code.
- **Bulk assignment** — select multiple Make.md items and assign the same icon to all of them at once.
- **Icon picker** — browse icons in a visual grid with search and pagination.
- **Custom icon folder** — choose any folder in your vault as the icon source.
- **Multilingual interface** — English, Russian, Korean, and Chinese.
- **Automatic language detection** — use your Obsidian language or select one manually.

---

## 🎬 Demo

### 1. Assigning an icon to a note or folder (without Make.md)

Choose an SVG icon and assign it to a regular note or folder in Obsidian.

![Assigning an icon without Make.md](./assets/gifs/Screencast%202026-11-13%2010_33_28.gif)

### 2. Make.md integration

Assign custom SVG icons to Make.md Spaces using the context menu.

![Make.md icon assignment](./assets/gifs/Screencast%202026-11-13%2010_34_06.gif)

### 3. Bulk icon assignment

Select multiple Make.md items and assign the same SVG icon to all of them in one action.

![Bulk icon assignment](./assets/gifs/Screencast%202026-11-13%2010_34_30.gif)

---

## 📦 Installation

### Manual installation

1. Download the latest release from the [Releases](../../releases) page.
2. Open your Obsidian vault folder.
3. Navigate to:

   `.obsidian/plugins/`

4. Create a folder named:

   `svg-sticker`

5. Copy the plugin files into that folder:
   - `main.js`
   - `manifest.json`
   - `styles.css`

6. Restart Obsidian or reload plugins.
7. Enable **SVG Sticker** in Settings → Community plugins.

---

## ⚙️ Configuration

Open:

**Settings → Community plugins → SVG Sticker**

### Icon folder

Specify the folder containing your SVG files, relative to your vault root.

Default:

`embed/icons`

Example:

`Assets/Icons`

Leave the field empty to search for SVG files throughout the entire vault.

### Language

The plugin supports:

- Automatic — follows your Obsidian interface language.
- English
- Русский
- 한국어
- 中文

Your language preference is saved automatically.

---

## 🖼️ Preparing SVG icons

1. Create an icon folder inside your vault.
2. Add your `.svg` files.
3. Set the folder path in SVG Sticker settings.
4. Open the icon picker and choose an icon.

Example folder structure:

```text
MyVault/
├── Assets/
│   └── Icons/
│       ├── book.svg
│       ├── folder.svg
│       ├── work.svg
│       └── star.svg
└── Notes/
    ├── Projects.md
    └── Ideas.md
```

SVG Sticker uses the original SVG files from your vault.

---

## 🔌 Make.md integration

SVG Sticker supports Make.md through an external adapter.

- No Make.md source code modifications.
- No replacement of Make.md components.
- Uses Make.md's runtime API to assign and restore icons.
- Supports individual and bulk assignments.

**Note:** Make.md integration relies on internal APIs that may change in future Make.md updates. Compatibility may need to be adjusted after major updates.

---

## 🛠️ Development

Clone the repository:

```bash
git clone https://github.com/rimpk901/obsidian-svg-sticker.git
cd obsidian-svg-sticker
```

Install dependencies:

```bash
npm install
```

Build the plugin:

```bash
npm run build
```

For development:

```bash
npm run dev
```

---

## 📁 Project structure

```text
svg-sticker/
├── src/
│   ├── main.ts
│   ├── StickerModal.ts
│   ├── MakeMDAdapter.ts
│   ├── i18n.ts
│   └── types.ts
├── styles.css
├── manifest.json
├── package.json
├── tsconfig.json
└── esbuild.config.mjs
```

---

## 🤝 Contributing

Bug reports, suggestions, and pull requests are welcome!

If you find a bug or have an idea for a new feature, feel free to open an issue.

---

## 📄 License

[MIT](LICENSE)
