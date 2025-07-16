# 🛠️ fsd-slicer

**A CLI tool for generating [Feature-Sliced Design](https://feature-sliced.design/) project structure.**

---

## 🚀 Features

- Initialize a full FSD folder structure
- Custom config support via `.fsdslicerrc`
- Layer aliasing (e.g. `pagesSlice` instead of `pages`)
- Set any custom root (not just `src/`)
- Generate entities, features, widgets, pages, and app slices with inner structure
- Generate shared components with grouped structure (`shared/ui/Button`, etc.)
- Auto-create `index.ts` files in generated folders

---

## 📦 Installation

_Coming soon after publish to npm..._

```bash
npm install -g fsd-slicer
```

---

## 🧪 Usage

### Initialize FSD structure

```bash
fsd-slicer init
```

Will prompt whether to use **default** or **custom** config.

### Generate slice

```bash
fsd-slicer generate
```

Will prompt to choose slice, name and subfolder if required.

But if you for some reason hate prompts...

```bash
fsd-slicer generate entity user
```

Creates:

```
entities/
└── user/
    ├── api/
    ├── config/
    ├── lib/
    ├── model/
    ├── ui/
    └── index.ts
```

### Generate shared component (e.g. `Button` in `ui`)

```bash
fsd-slicer generate shared Button ui
```

Creates:

```
shared/
└── ui/
    ├── Button/
    │   └── Button.tsx
    └── index.ts  (auto-appended)
```

---

## 📁 Default structure

```bash
src/
├── app/
├── pages/
├── widgets/
├── features/
├── entities/
└── shared/
```

---

## ⚙️ Customization via `.fsdslicerrc`

You can fully customize root path and layer aliases.

### Example config:

```json
{
  "root": "packages/frontend",
  "layers": {
    "app": "app",
    "pages": "pagesSlice",
    "widgets": "widgets",
    "features": "features",
    "entities": "entities",
    "shared": "shared"
  }
}
```

here we create an alias for "pages" slice called "pagesSlice". Useful for Next.js

---

## 🔍 Config file lookup order:

1. `.fsdslicerrc`
2. `.fsdslicerrc.json`
3. `fsdslicer.config.js`
4. `package.json > fsdslicer`

---

## ❤️ Contributing

Feel free to open issues or pull requests!

---

## 🧠 License

MIT
