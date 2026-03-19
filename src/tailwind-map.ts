// Maps Figma pixel values to Tailwind spacing/sizing classes

const spacingMap: Record<number, string> = {
  0: "0",
  1: "px",
  2: "0.5",
  4: "1",
  6: "1.5",
  8: "2",
  10: "2.5",
  12: "3",
  14: "3.5",
  16: "4",
  20: "5",
  24: "6",
  28: "7",
  32: "8",
  36: "9",
  40: "10",
  44: "11",
  48: "12",
  56: "14",
  64: "16",
  80: "20",
  96: "24",
  112: "28",
  128: "32",
  144: "36",
  160: "40",
  176: "44",
  192: "48",
  208: "52",
  224: "56",
  240: "60",
  256: "64",
  288: "72",
  320: "80",
  384: "96",
};

const fontSizeMap: Record<number, string> = {
  12: "xs",
  14: "sm",
  16: "base",
  18: "lg",
  20: "xl",
  24: "2xl",
  30: "3xl",
  36: "4xl",
  48: "5xl",
  60: "6xl",
  72: "7xl",
  96: "8xl",
  128: "9xl",
};

const fontWeightMap: Record<number, string> = {
  100: "thin",
  200: "extralight",
  300: "light",
  400: "normal",
  500: "medium",
  600: "semibold",
  700: "bold",
  800: "extrabold",
  900: "black",
};

const borderRadiusMap: Record<number, string> = {
  0: "rounded-none",
  2: "rounded-sm",
  4: "rounded",
  6: "rounded-md",
  8: "rounded-lg",
  12: "rounded-xl",
  16: "rounded-2xl",
  24: "rounded-3xl",
  9999: "rounded-full",
};

const opacityMap: Record<number, string> = {
  0: "opacity-0",
  0.05: "opacity-5",
  0.1: "opacity-10",
  0.2: "opacity-20",
  0.25: "opacity-25",
  0.3: "opacity-30",
  0.4: "opacity-40",
  0.5: "opacity-50",
  0.6: "opacity-60",
  0.7: "opacity-70",
  0.75: "opacity-75",
  0.8: "opacity-80",
  0.9: "opacity-90",
  0.95: "opacity-95",
  1: "opacity-100",
};

// Tailwind default color palette (approximate hex matching)
const colorMap: Record<string, string> = {
  "000000": "black",
  ffffff: "white",
  f8fafc: "slate-50",
  f1f5f9: "slate-100",
  e2e8f0: "slate-200",
  cbd5e1: "slate-300",
  "94a3b8": "slate-400",
  "64748b": "slate-500",
  "475569": "slate-600",
  "334155": "slate-700",
  "1e293b": "slate-800",
  "0f172a": "slate-900",
  f9fafb: "gray-50",
  f3f4f6: "gray-100",
  e5e7eb: "gray-200",
  d1d5db: "gray-300",
  "9ca3af": "gray-400",
  "6b7280": "gray-500",
  "4b5563": "gray-600",
  "374151": "gray-700",
  "1f2937": "gray-800",
  "111827": "gray-900",
  fef2f2: "red-50",
  fee2e2: "red-100",
  fecaca: "red-200",
  fca5a5: "red-300",
  f87171: "red-400",
  ef4444: "red-500",
  dc2626: "red-600",
  b91c1c: "red-700",
  "991b1b": "red-800",
  "7f1d1d": "red-900",
  fff7ed: "orange-50",
  ffedd5: "orange-100",
  fed7aa: "orange-200",
  fdba74: "orange-300",
  fb923c: "orange-400",
  f97316: "orange-500",
  ea580c: "orange-600",
  c2410c: "orange-700",
  "9a3412": "orange-800",
  "7c2d12": "orange-900",
  fefce8: "yellow-50",
  fef9c3: "yellow-100",
  fef08a: "yellow-200",
  fde047: "yellow-300",
  facc15: "yellow-400",
  eab308: "yellow-500",
  ca8a04: "yellow-600",
  a16207: "yellow-700",
  "854d0e": "yellow-800",
  "713f12": "yellow-900",
  f0fdf4: "green-50",
  dcfce7: "green-100",
  bbf7d0: "green-200",
  "86efac": "green-300",
  "4ade80": "green-400",
  "22c55e": "green-500",
  "16a34a": "green-600",
  "15803d": "green-700",
  "166534": "green-800",
  "14532d": "green-900",
  eff6ff: "blue-50",
  dbeafe: "blue-100",
  bfdbfe: "blue-200",
  "93c5fd": "blue-300",
  "60a5fa": "blue-400",
  "3b82f6": "blue-500",
  "2563eb": "blue-600",
  "1d4ed8": "blue-700",
  "1e40af": "blue-800",
  "1e3a8a": "blue-900",
  eef2ff: "indigo-50",
  e0e7ff: "indigo-100",
  c7d2fe: "indigo-200",
  a5b4fc: "indigo-300",
  "818cf8": "indigo-400",
  "6366f1": "indigo-500",
  "4f46e5": "indigo-600",
  "4338ca": "indigo-700",
  "3730a3": "indigo-800",
  "312e81": "indigo-900",
  f5f3ff: "violet-50",
  ede9fe: "violet-100",
  ddd6fe: "violet-200",
  c4b5fd: "violet-300",
  a78bfa: "violet-400",
  "8b5cf6": "violet-500",
  "7c3aed": "violet-600",
  "6d28d9": "violet-700",
  "5b21b6": "violet-800",
  "4c1d95": "violet-900",
  fdf4ff: "purple-50",
  fae8ff: "purple-100",
  f0abfc: "purple-300",
  e879f9: "purple-300",
  c084fc: "purple-400",
  a855f7: "purple-500",
  "9333ea": "purple-600",
  "7e22ce": "purple-700",
  "6b21a8": "purple-800",
  "581c87": "purple-900",
  fdf2f8: "pink-50",
  fce7f3: "pink-100",
  fbcfe8: "pink-200",
  f9a8d4: "pink-300",
  f472b6: "pink-400",
  ec4899: "pink-500",
  db2777: "pink-600",
  be185d: "pink-700",
  "9d174d": "pink-800",
  "831843": "pink-900",
};

export function nearestSpacing(px: number): string {
  const rounded = Math.round(px);
  if (spacingMap[rounded] !== undefined) return spacingMap[rounded];

  // Find closest match
  let closest = 0;
  let minDiff = Infinity;
  for (const key of Object.keys(spacingMap)) {
    const diff = Math.abs(Number(key) - rounded);
    if (diff < minDiff) {
      minDiff = diff;
      closest = Number(key);
    }
  }
  // If within 1px tolerance, use the Tailwind value
  if (minDiff <= 1) return spacingMap[closest];
  // Otherwise return arbitrary value
  return `[${rounded}px]`;
}

export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (c: number) =>
    Math.round(c * 255)
      .toString(16)
      .padStart(2, "0");
  return `${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function nearestColor(hex: string): string {
  if (colorMap[hex]) return colorMap[hex];

  // Try to find closest color by simple distance
  const r1 = parseInt(hex.slice(0, 2), 16);
  const g1 = parseInt(hex.slice(2, 4), 16);
  const b1 = parseInt(hex.slice(4, 6), 16);

  let closest = "";
  let minDist = Infinity;

  for (const [mapHex, name] of Object.entries(colorMap)) {
    const r2 = parseInt(mapHex.slice(0, 2), 16);
    const g2 = parseInt(mapHex.slice(2, 4), 16);
    const b2 = parseInt(mapHex.slice(4, 6), 16);
    const dist = Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
    if (dist < minDist) {
      minDist = dist;
      closest = name;
    }
  }

  // If close enough (within ~10 units), use the named color
  if (minDist < 15) return closest;
  // Otherwise return arbitrary hex
  return `[#${hex}]`;
}

export function getFontSize(size: number): string {
  const rounded = Math.round(size);
  if (fontSizeMap[rounded]) return `text-${fontSizeMap[rounded]}`;
  return `text-[${rounded}px]`;
}

export function getFontWeight(weight: number): string {
  if (fontWeightMap[weight]) return `font-${fontWeightMap[weight]}`;
  return `font-[${weight}]`;
}

export function getBorderRadius(radius: number): string {
  const rounded = Math.round(radius);
  if (borderRadiusMap[rounded]) return borderRadiusMap[rounded];

  // Find closest
  let closest = 0;
  let minDiff = Infinity;
  for (const key of Object.keys(borderRadiusMap)) {
    const diff = Math.abs(Number(key) - rounded);
    if (diff < minDiff) {
      minDiff = diff;
      closest = Number(key);
    }
  }
  if (minDiff <= 1) return borderRadiusMap[closest];
  return `rounded-[${rounded}px]`;
}

export function getOpacity(value: number): string {
  if (value >= 1) return "";
  if (opacityMap[value]) return opacityMap[value];
  return `opacity-[${Math.round(value * 100)}%]`;
}
