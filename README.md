# 🛠️ fsd-slicer

**CLI-инструмент для генерации архитектуры [Feature-Sliced Design](https://feature-sliced.design/)**

---

## 🚀 Возможности

- Инициализация структуры FSD-проектов
- Кастомизация структуры через конфиг `.fsdslicerrc`
- Поддержка пользовательских названий слоёв (например, `pagesSlice`)
- Работа с любыми путями, а не только `src/`

---

## 📦 Установка

## ...будет добавлено

## 📁 Структура по умолчанию

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

## ⚙️ Кастомизация через `.fsdslicerrc.json`

Пример конфига:

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

---

## 🧩 Конфиг ищется в:

- `.fsdslicerrc`
- `.fsdslicerrc.json`
- `fsdslicer.config.js`
- `package.json > fsdslicer`

---
