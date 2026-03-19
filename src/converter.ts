import {
  nearestSpacing,
  nearestColor,
  rgbToHex,
  getFontSize,
  getFontWeight,
  getBorderRadius,
  getOpacity,
} from "./tailwind-map";

export function convertNode(node: SceneNode): string[] {
  const classes: string[] = [];

  // Layout (auto-layout / frames)
  if ("layoutMode" in node && node.layoutMode !== "NONE") {
    classes.push(...getLayoutClasses(node as FrameNode));
  }

  // Sizing
  if ("width" in node && "height" in node) {
    classes.push(...getSizeClasses(node as SceneNode & { width: number; height: number }));
  }

  // Padding
  if ("paddingTop" in node) {
    classes.push(...getPaddingClasses(node as FrameNode));
  }

  // Background fills
  if ("fills" in node) {
    classes.push(...getFillClasses(node as GeometryMixin));
  }

  // Border / stroke
  if ("strokes" in node) {
    classes.push(...getStrokeClasses(node as GeometryMixin));
  }

  // Border radius
  if ("cornerRadius" in node) {
    classes.push(...getRadiusClasses(node as RectangleNode));
  }

  // Typography
  if (node.type === "TEXT") {
    classes.push(...getTextClasses(node as TextNode));
  }

  // Opacity
  if ("opacity" in node && typeof node.opacity === "number") {
    const op = getOpacity(node.opacity);
    if (op) classes.push(op);
  }

  // Effects (shadows)
  if ("effects" in node) {
    classes.push(...getEffectClasses(node as BlendMixin));
  }

  return classes;
}

function getLayoutClasses(node: FrameNode): string[] {
  const classes: string[] = [];

  if (node.layoutMode === "HORIZONTAL") {
    classes.push("flex", "flex-row");
  } else if (node.layoutMode === "VERTICAL") {
    classes.push("flex", "flex-col");
  }

  // Gap
  if (node.itemSpacing !== undefined && node.itemSpacing > 0) {
    classes.push(`gap-${nearestSpacing(node.itemSpacing)}`);
  }

  // Alignment
  const alignMap: Record<string, string> = {
    MIN: "items-start",
    CENTER: "items-center",
    MAX: "items-end",
    BASELINE: "items-baseline",
  };
  if (node.counterAxisAlignItems && alignMap[node.counterAxisAlignItems]) {
    classes.push(alignMap[node.counterAxisAlignItems]);
  }

  const justifyMap: Record<string, string> = {
    MIN: "justify-start",
    CENTER: "justify-center",
    MAX: "justify-end",
    SPACE_BETWEEN: "justify-between",
  };
  if (node.primaryAxisAlignItems && justifyMap[node.primaryAxisAlignItems]) {
    classes.push(justifyMap[node.primaryAxisAlignItems]);
  }

  // Wrap
  if (node.layoutWrap === "WRAP") {
    classes.push("flex-wrap");
  }

  return classes;
}

function getSizeClasses(node: SceneNode & { width: number; height: number }): string[] {
  const classes: string[] = [];
  const parent = node.parent;

  // Check if size is set to fill/hug in auto-layout
  if ("layoutSizingHorizontal" in node) {
    const sizing = (node as FrameNode).layoutSizingHorizontal;
    if (sizing === "FILL") classes.push("w-full");
    else if (sizing === "FIXED") classes.push(`w-${nearestSpacing(node.width)}`);
    // HUG = auto, no class needed
  } else {
    classes.push(`w-${nearestSpacing(node.width)}`);
  }

  if ("layoutSizingVertical" in node) {
    const sizing = (node as FrameNode).layoutSizingVertical;
    if (sizing === "FILL") classes.push("h-full");
    else if (sizing === "FIXED") classes.push(`h-${nearestSpacing(node.height)}`);
  } else {
    classes.push(`h-${nearestSpacing(node.height)}`);
  }

  return classes;
}

function getPaddingClasses(node: FrameNode): string[] {
  const classes: string[] = [];
  const top = node.paddingTop || 0;
  const right = node.paddingRight || 0;
  const bottom = node.paddingBottom || 0;
  const left = node.paddingLeft || 0;

  if (top === bottom && left === right && top === left && top > 0) {
    classes.push(`p-${nearestSpacing(top)}`);
  } else {
    if (top === bottom && top > 0) {
      classes.push(`py-${nearestSpacing(top)}`);
    } else {
      if (top > 0) classes.push(`pt-${nearestSpacing(top)}`);
      if (bottom > 0) classes.push(`pb-${nearestSpacing(bottom)}`);
    }
    if (left === right && left > 0) {
      classes.push(`px-${nearestSpacing(left)}`);
    } else {
      if (left > 0) classes.push(`pl-${nearestSpacing(left)}`);
      if (right > 0) classes.push(`pr-${nearestSpacing(right)}`);
    }
  }

  return classes;
}

function getFillClasses(node: GeometryMixin): string[] {
  const classes: string[] = [];
  const fills = node.fills;

  if (!fills || fills === figma.mixed || !Array.isArray(fills)) return classes;

  for (const fill of fills) {
    if (!fill.visible) continue;
    if (fill.type === "SOLID") {
      const hex = rgbToHex(fill.color.r, fill.color.g, fill.color.b);
      const colorName = nearestColor(hex);
      classes.push(`bg-${colorName}`);
      if (fill.opacity !== undefined && fill.opacity < 1) {
        classes.push(`bg-opacity-${Math.round(fill.opacity * 100)}`);
      }
    }
  }

  return classes;
}

function getStrokeClasses(node: GeometryMixin): string[] {
  const classes: string[] = [];
  const strokes = node.strokes;

  if (!strokes || !Array.isArray(strokes) || strokes.length === 0) return classes;

  for (const stroke of strokes) {
    if (!stroke.visible) continue;
    if (stroke.type === "SOLID") {
      const hex = rgbToHex(stroke.color.r, stroke.color.g, stroke.color.b);
      const colorName = nearestColor(hex);
      classes.push(`border`);
      classes.push(`border-${colorName}`);
    }
  }

  if ("strokeWeight" in node && typeof (node as any).strokeWeight === "number") {
    const weight = (node as any).strokeWeight as number;
    if (weight === 0) classes.push("border-0");
    else if (weight === 2) classes.push("border-2");
    else if (weight === 4) classes.push("border-4");
    else if (weight === 8) classes.push("border-8");
    // 1px is default, no class needed
  }

  return classes;
}

function getRadiusClasses(node: RectangleNode): string[] {
  const classes: string[] = [];
  const radius = node.cornerRadius;

  if (radius === figma.mixed) {
    // Individual corners
    const tl = node.topLeftRadius || 0;
    const tr = node.topRightRadius || 0;
    const bl = node.bottomLeftRadius || 0;
    const br = node.bottomRightRadius || 0;
    if (tl > 0) classes.push(`rounded-tl-[${tl}px]`);
    if (tr > 0) classes.push(`rounded-tr-[${tr}px]`);
    if (bl > 0) classes.push(`rounded-bl-[${bl}px]`);
    if (br > 0) classes.push(`rounded-br-[${br}px]`);
  } else if (typeof radius === "number" && radius > 0) {
    classes.push(getBorderRadius(radius));
  }

  return classes;
}

function getTextClasses(node: TextNode): string[] {
  const classes: string[] = [];

  // Font size
  const fontSize = node.fontSize;
  if (typeof fontSize === "number") {
    classes.push(getFontSize(fontSize));
  }

  // Font weight
  const fontWeight = node.fontWeight;
  if (typeof fontWeight === "number") {
    classes.push(getFontWeight(fontWeight));
  }

  // Text color
  const fills = node.fills;
  if (fills && fills !== figma.mixed && Array.isArray(fills)) {
    for (const fill of fills) {
      if (fill.visible && fill.type === "SOLID") {
        const hex = rgbToHex(fill.color.r, fill.color.g, fill.color.b);
        const colorName = nearestColor(hex);
        classes.push(`text-${colorName}`);
      }
    }
  }

  // Text alignment
  if (node.textAlignHorizontal === "CENTER") classes.push("text-center");
  else if (node.textAlignHorizontal === "RIGHT") classes.push("text-right");
  else if (node.textAlignHorizontal === "JUSTIFIED") classes.push("text-justify");

  // Line height
  const lineHeight = node.lineHeight;
  if (lineHeight && lineHeight !== figma.mixed && lineHeight.unit !== "AUTO") {
    if (lineHeight.unit === "PERCENT") {
      const pct = Math.round(lineHeight.value);
      const leadingMap: Record<number, string> = {
        100: "leading-none",
        125: "leading-tight",
        137: "leading-snug",
        150: "leading-normal",
        162: "leading-relaxed",
        200: "leading-loose",
      };
      // Find closest
      let closest = "";
      let minDiff = Infinity;
      for (const [key, val] of Object.entries(leadingMap)) {
        const diff = Math.abs(Number(key) - pct);
        if (diff < minDiff) {
          minDiff = diff;
          closest = val;
        }
      }
      if (minDiff <= 5) classes.push(closest);
      else classes.push(`leading-[${pct}%]`);
    }
  }

  // Letter spacing
  const letterSpacing = node.letterSpacing;
  if (letterSpacing && letterSpacing !== figma.mixed && letterSpacing.value !== 0) {
    if (letterSpacing.unit === "PERCENT") {
      const val = letterSpacing.value;
      if (val < -0.03) classes.push("tracking-tighter");
      else if (val < 0) classes.push("tracking-tight");
      else if (val > 0.1) classes.push("tracking-widest");
      else if (val > 0.05) classes.push("tracking-wider");
      else if (val > 0.02) classes.push("tracking-wide");
    } else {
      classes.push(`tracking-[${letterSpacing.value}px]`);
    }
  }

  return classes;
}

function getEffectClasses(node: BlendMixin): string[] {
  const classes: string[] = [];
  const effects = node.effects;

  if (!effects || !Array.isArray(effects)) return classes;

  for (const effect of effects) {
    if (!effect.visible) continue;

    if (effect.type === "DROP_SHADOW") {
      const shadow = effect as DropShadowEffect;
      const x = shadow.offset.x;
      const y = shadow.offset.y;
      const blur = shadow.radius;
      const spread = shadow.spread || 0;

      // Map to Tailwind shadow classes (approximate)
      if (blur <= 2 && spread === 0) classes.push("shadow-sm");
      else if (blur <= 6) classes.push("shadow");
      else if (blur <= 15) classes.push("shadow-md");
      else if (blur <= 25) classes.push("shadow-lg");
      else if (blur <= 50) classes.push("shadow-xl");
      else classes.push("shadow-2xl");
    }

    if (effect.type === "LAYER_BLUR") {
      const blur = (effect as BlurEffect).radius;
      if (blur <= 4) classes.push("blur-sm");
      else if (blur <= 8) classes.push("blur");
      else if (blur <= 12) classes.push("blur-md");
      else if (blur <= 16) classes.push("blur-lg");
      else if (blur <= 24) classes.push("blur-xl");
      else classes.push("blur-2xl");
    }
  }

  return classes;
}
