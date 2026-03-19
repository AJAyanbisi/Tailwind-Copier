# Tailwind Copier

Select any element in Figma and instantly get its Tailwind CSS classes. No more manual translation — just click, copy, and paste into your code.

![Figma Plugin](https://img.shields.io/badge/Figma-Plugin-blue?logo=figma&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3-38bdf8?logo=tailwindcss&logoColor=white)

---

## The Problem

Designers create beautiful layouts in Figma. Developers then spend time manually translating pixel values, colors, and spacing into Tailwind classes:

- `padding: 12px` → what's the Tailwind class again... `p-3`?
- `color: #3B82F6` → is that `blue-500` or `blue-600`?
- `border-radius: 8px` → `rounded-lg`? `rounded-md`?

**Tailwind Copier eliminates this friction entirely.**

## How It Works

1. Select any element (or multiple elements) in Figma
2. Open the plugin
3. See the exact Tailwind classes
4. Click to copy — paste directly into your code
5. Verify with the built-in live preview

## Features

### Class Generation

Converts Figma properties to Tailwind classes:

| Figma Property | Tailwind Output |
|---|---|
| Auto Layout (horizontal) | `flex flex-row gap-4 items-center` |
| Auto Layout (vertical) | `flex flex-col gap-6` |
| Padding | `p-4`, `px-6 py-3`, `pt-2 pb-4` |
| Width / Height | `w-16 h-8`, `w-full`, `h-full` |
| Fill Color | `bg-blue-500`, `bg-white` |
| Text Color | `text-gray-700`, `text-black` |
| Stroke / Border | `border border-gray-200 border-2` |
| Border Radius | `rounded-lg`, `rounded-xl`, `rounded-full` |
| Font Size | `text-sm`, `text-lg`, `text-2xl` |
| Font Weight | `font-semibold`, `font-bold` |
| Text Alignment | `text-center`, `text-right` |
| Line Height | `leading-tight`, `leading-relaxed` |
| Letter Spacing | `tracking-wide`, `tracking-tight` |
| Drop Shadow | `shadow-md`, `shadow-lg`, `shadow-xl` |
| Blur | `blur-sm`, `blur-md` |
| Opacity | `opacity-50`, `opacity-75` |

### Smart Color Matching

Automatically maps Figma colors to the nearest Tailwind color from the default palette. Supports all standard Tailwind colors: slate, gray, red, orange, yellow, green, blue, indigo, violet, purple, and pink (50–900 shades).

When a color doesn't match any Tailwind default, it outputs an arbitrary value like `bg-[#ff6b2e]`.

### Click to Copy

Click any class box or the "Copy Classes" button to instantly copy to your clipboard. Works reliably in Figma's sandboxed plugin environment.

### Live Preview

A built-in preview panel renders your Tailwind classes as inline CSS so you can visually confirm the output is accurate — right inside the plugin, no browser needed.

### Multi-Select Support

Select multiple elements at once. Each element gets its own class card, and you can copy them individually or all at once.

## Installation

### From Source (Development)

**Prerequisites:**
- [Node.js](https://nodejs.org/) (v18+)
- [Figma Desktop](https://www.figma.com/downloads/)

**Steps:**

```bash
# Clone the repo
git clone https://github.com/AJAyanbisi/Tailwind-Copier.git
cd Tailwind-Copier

# Install dependencies
npm install

# Build the plugin
npm run build
```

Then in Figma Desktop:

1. Go to **Plugins** → **Development** → **Import plugin from manifest...**
2. Select the `manifest.json` file from the project root
3. The plugin is now available under **Plugins** → **Development** → **Tailwind Class Copier**

### Development Mode

To automatically rebuild on file changes:

```bash
npm run watch
```

## Usage

1. Open any Figma file
2. Select one or more elements on the canvas
3. Run the plugin: **Plugins** → **Development** → **Tailwind Class Copier**
4. View the generated Tailwind classes for each selected element
5. Click a class box or the **Copy Classes** button to copy
6. Check the **Live Preview** panel to verify the classes visually
7. Paste the classes directly into your HTML/JSX

## Project Structure

```
Tailwind-Copier/
├── manifest.json           # Figma plugin configuration
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript config
├── build.js                # esbuild bundler script
├── src/
│   ├── code.ts             # Plugin entry point (Figma sandbox)
│   ├── converter.ts        # Core: Figma node → Tailwind classes
│   ├── tailwind-map.ts     # Value mappings (spacing, colors, fonts)
│   └── ui.html             # Plugin UI with preview panel
└── dist/                   # Built output (generated)
    ├── code.js
    └── ui.html
```

### Key Files

- **`src/converter.ts`** — The core conversion engine. Reads Figma node properties (layout, fills, strokes, text, effects) and maps them to Tailwind utility classes.
- **`src/tailwind-map.ts`** — Lookup tables for spacing, colors, font sizes, weights, border radii, and opacity values. Includes nearest-match logic for approximate values.
- **`src/ui.html`** — The plugin UI with the class display, copy functionality, and live preview renderer.
- **`src/code.ts`** — Listens for selection changes in Figma and sends node data to the UI.

## How the Conversion Works

1. **Selection** — When you select an element, Figma's Plugin API provides the node's properties
2. **Extraction** — The converter reads layout mode, padding, fills, strokes, corner radius, text properties, effects, and opacity
3. **Mapping** — Each property is matched against Tailwind's default scale. For spacing, it finds the nearest Tailwind value (within 1px tolerance). For colors, it calculates the closest match by RGB distance
4. **Arbitrary values** — When no close Tailwind match exists, it outputs arbitrary values like `p-[13px]` or `bg-[#abc123]`
5. **Output** — Classes are displayed in the UI, ready to copy

## Contributing

Contributions are welcome! Some ideas:

- [ ] Tailwind v4 support
- [ ] Custom theme/config support (`tailwind.config.js`)
- [ ] Export as JSX/HTML snippets with classes applied
- [ ] Responsive variant suggestions
- [ ] Figma component → React component mapping
- [ ] Dark mode class variants
- [ ] Support for gradients and complex fills

### To contribute:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Make your changes
4. Build and test in Figma (`npm run build`)
5. Commit and push
6. Open a Pull Request

## Tech Stack

- **TypeScript** — Type-safe plugin code
- **esbuild** — Fast bundling
- **Figma Plugin API** — Access to design data
- **Tailwind CSS v3** — Default utility class mappings

## License

MIT

---

Built by [Akorede J. Ayanbisi](https://github.com/AJAyanbisi), with ❤️ for the Figma community.
