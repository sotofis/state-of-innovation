import { Vibrant } from "node-vibrant/node";

export interface ColorPalette {
  /** Deep dark background — hero gradient start */
  heroBg: string;
  /** Mid dark — hero gradient end / surface */
  heroMid: string;
  /** Vibrant accent — buttons, badges, links */
  accent: string;
  /** Light vibrant — tag backgrounds */
  accentLight: string;
  /** Whether text on `accent` should be white or dark */
  onAccent: "white" | "dark";
  /** Whether hero text should be white or dark */
  heroText: "white" | "dark";
}

function relativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function darken(hex: string, factor: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${Math.round(r * factor)},${Math.round(g * factor)},${Math.round(b * factor)})`;
}

function lighten(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

const fallback: ColorPalette = {
  heroBg:      "#0C1222",
  heroMid:     "#111827",
  accent:      "#2563EB",
  accentLight: "#EFF6FF",
  onAccent:    "white",
  heroText:    "white",
};

export async function extractPalette(imageUrl: string): Promise<ColorPalette> {
  try {
    const palette = await Vibrant.from(imageUrl)
      .maxColorCount(64)
      .getPalette();

    const vibrant     = palette.Vibrant;
    const darkVibrant = palette.DarkVibrant;
    const muted       = palette.Muted;
    const darkMuted   = palette.DarkMuted;

    // Pick accent: prefer Vibrant, fall back to Muted
    const accentSwatch = vibrant ?? muted;
    const bgSwatch     = darkMuted ?? darkVibrant;

    if (!accentSwatch || !bgSwatch) return fallback;

    const accentHex = accentSwatch.hex;
    const bgHex     = bgSwatch.hex;

    // Darken bgHex further for a deep hero bg
    const heroBg  = darken(bgHex, 0.45);
    const heroMid = darken(bgHex, 0.65);

    // accentLight = very transparent version
    const accentLight = lighten(accentHex, 0.15);

    // Compute contrast for text colour decisions
    const bgLum     = relativeLuminance(...bgSwatch.rgb as [number, number, number]);
    const accentLum = relativeLuminance(...accentSwatch.rgb as [number, number, number]);
    const whiteLum  = relativeLuminance(255, 255, 255);

    const heroTextContrast    = contrastRatio(whiteLum, bgLum);
    const onAccentContrast    = contrastRatio(whiteLum, accentLum);

    return {
      heroBg,
      heroMid,
      accent:      accentHex,
      accentLight,
      onAccent:    onAccentContrast >= 3 ? "white" : "dark",
      heroText:    heroTextContrast >= 3 ? "white" : "dark",
    };
  } catch {
    return fallback;
  }
}
