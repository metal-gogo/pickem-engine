import type { CSSProperties } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

type PaletteMode = "light" | "dark";

interface PaletteColor {
  hex: string;
  label: string;
  role: string;
}

interface PaletteSample {
  accent: string;
  accentText: string;
  action: string;
  actionText: string;
  border: string;
  canvas: string;
  info: string;
  infoText: string;
  ink: string;
  muted: string;
  panel: string;
  surface: string;
  warning: string;
  warningText: string;
}

interface PaletteDefinition {
  colors: PaletteColor[];
  description: string;
  id: string;
  mode: PaletteMode;
  sample: PaletteSample;
  source: string;
  title: string;
}

interface ContrastPair {
  background: string;
  foreground: string;
  label: string;
  threshold: number;
}

const canonicalLight: PaletteDefinition = {
  id: "design-md-light",
  title: "DESIGN.md Canonical Light",
  source: "DESIGN.md",
  mode: "light",
  description:
    "The canonical light palette from the design source of truth: warmer cream, near-black ink, restrained lime, rust, and blue accents.",
  colors: [
    { label: "Primary lime", hex: "#C8FF3D", role: "action, selected state" },
    { label: "Secondary rust", hex: "#B64A2F", role: "metadata, bonus accent" },
    { label: "Tertiary blue", hex: "#3A7CA5", role: "information, navigation context" },
    { label: "Surface cream", hex: "#F5EFE2", role: "canvas" },
    { label: "Surface strong", hex: "#FFF8EA", role: "raised content" },
    { label: "Ink", hex: "#171511", role: "text, borders" },
    { label: "Muted", hex: "#6E665C", role: "secondary copy" },
  ],
  sample: {
    canvas: "#F5EFE2",
    surface: "#FFF8EA",
    panel: "#F5EFE2",
    ink: "#171511",
    muted: "#6E665C",
    border: "#171511",
    action: "#C8FF3D",
    actionText: "#171511",
    accent: "#B64A2F",
    accentText: "#FFF8EA",
    info: "#3A7CA5",
    infoText: "#FFF8EA",
    warning: "#D6A21E",
    warningText: "#171511",
  },
};

const canonicalDark: PaletteDefinition = {
  id: "design-md-dark",
  title: "DESIGN.md Canonical Dark",
  source: "DESIGN.md",
  mode: "dark",
  description:
    "The canonical dark foundation from DESIGN.md. It is intentionally sparse, so this preview uses the documented dark surfaces plus the canonical accents.",
  colors: [
    { label: "Dark surface", hex: "#171511", role: "canvas" },
    { label: "Dark strong", hex: "#242018", role: "raised content" },
    { label: "Dark ink", hex: "#F6EFE2", role: "text" },
    { label: "Primary lime", hex: "#C8FF3D", role: "action" },
    { label: "Secondary rust", hex: "#B64A2F", role: "accent" },
    { label: "Tertiary blue", hex: "#3A7CA5", role: "information" },
  ],
  sample: {
    canvas: "#171511",
    surface: "#242018",
    panel: "#302A20",
    ink: "#F6EFE2",
    muted: "#C7BCA9",
    border: "#F6EFE2",
    action: "#C8FF3D",
    actionText: "#171511",
    accent: "#B64A2F",
    accentText: "#FFF8EA",
    info: "#3A7CA5",
    infoText: "#FFF8EA",
    warning: "#53351E",
    warningText: "#F6EFE2",
  },
};

const implementedLight: PaletteDefinition = {
  id: "implemented-light",
  title: "Current App Light",
  source: "src/styles/index.css",
  mode: "light",
  description:
    "The currently implemented light tokens: cooler canvas, dark graphite ink, louder lime, and a deeper rust from the local app CSS.",
  colors: [
    { label: "Canvas", hex: "#F7FAFC", role: "canvas" },
    { label: "Warm", hex: "#F6F8FA", role: "page gradient" },
    { label: "Surface strong", hex: "#FFFFFF", role: "raised content" },
    { label: "Panel", hex: "#EBE8E0", role: "nested block" },
    { label: "Ink", hex: "#383834", role: "text, borders" },
    { label: "Lime", hex: "#DAF900", role: "action" },
    { label: "Rust", hex: "#B83500", role: "accent" },
    { label: "Deadline", hex: "#DAF900", role: "deadline surface" },
    { label: "Qualified row", hex: "#DAF900", role: "projected advancing team" },
  ],
  sample: {
    canvas: "#F7FAFC",
    surface: "#FFFFFF",
    panel: "#EBE8E0",
    ink: "#383834",
    muted: "#656460",
    border: "#383834",
    action: "#DAF900",
    actionText: "#383834",
    accent: "#B83500",
    accentText: "#FFFFFF",
    info: "#DAF900",
    infoText: "#383834",
    warning: "#FFE1D6",
    warningText: "#B83500",
  },
};

const implementedDark: PaletteDefinition = {
  id: "implemented-dark",
  title: "Current App Dark",
  source: "src/styles/index.css",
  mode: "dark",
  description:
    "The currently implemented dark tokens. This is the one to keep honest with Storybook contrast checks.",
  colors: [
    { label: "Canvas", hex: "#171511", role: "canvas" },
    { label: "Surface strong", hex: "#242018", role: "raised content" },
    { label: "Panel", hex: "#383025", role: "nested block" },
    { label: "Ink", hex: "#F6EFE2", role: "text" },
    { label: "Muted", hex: "#C7BCA9", role: "secondary copy" },
    { label: "Lime", hex: "#C8FF3D", role: "action" },
    { label: "Rust", hex: "#FF8A68", role: "accent" },
    { label: "Deadline", hex: "#242018", role: "deadline surface" },
    { label: "Qualified row", hex: "#26331D", role: "projected advancing team" },
  ],
  sample: {
    canvas: "#171511",
    surface: "#242018",
    panel: "#383025",
    ink: "#F6EFE2",
    muted: "#C7BCA9",
    border: "#F6EFE2",
    action: "#C8FF3D",
    actionText: "#243000",
    accent: "#FF8A68",
    accentText: "#171511",
    info: "#8FD3FF",
    infoText: "#171511",
    warning: "#53351E",
    warningText: "#FF8A68",
  },
};

const stitchLight: PaletteDefinition = {
  id: "stitch-light",
  title: "Stitch Test Light",
  source: "app/DESIGN_test.md",
  mode: "light",
  description:
    "The downloaded light Stitch option: paper yellow canvas, graphite ink, very bright lime, and saturated rust.",
  colors: [
    { label: "Canvas", hex: "#FCFFDC", role: "canvas" },
    { label: "Warm surface", hex: "#FCF9F2", role: "page surface" },
    { label: "Strong surface", hex: "#FFFFFF", role: "raised content" },
    { label: "Panel", hex: "#EBE8E0", role: "nested block" },
    { label: "Ink", hex: "#383834", role: "text, borders" },
    { label: "Lime action", hex: "#DAF900", role: "action" },
    { label: "Rust", hex: "#B83500", role: "accent" },
  ],
  sample: {
    canvas: "#FCFFDC",
    surface: "#FFFFFF",
    panel: "#EBE8E0",
    ink: "#383834",
    muted: "#656460",
    border: "#383834",
    action: "#DAF900",
    actionText: "#383834",
    accent: "#B83500",
    accentText: "#FCF9F2",
    info: "#82807C",
    infoText: "#FFFFFF",
    warning: "#FFE1D6",
    warningText: "#B83500",
  },
};

const stitchDark: PaletteDefinition = {
  id: "stitch-dark",
  title: "Stitch Test Dark",
  source: "app/DESIGN_test_DARK.md",
  mode: "dark",
  description:
    "The downloaded dark Stitch option: deeper night-game surfaces, warm off-white text, olive outlines, lime containers, and soft rust.",
  colors: [
    { label: "Background", hex: "#131410", role: "canvas" },
    { label: "Container", hex: "#20201C", role: "raised content" },
    { label: "High container", hex: "#2A2A26", role: "nested block" },
    { label: "On surface", hex: "#E5E2DB", role: "text" },
    { label: "Variant text", hex: "#C6C9AC", role: "secondary copy" },
    { label: "Primary container", hex: "#D2F000", role: "action" },
    { label: "Secondary", hex: "#FFB59E", role: "accent" },
  ],
  sample: {
    canvas: "#131410",
    surface: "#20201C",
    panel: "#2A2A26",
    ink: "#E5E2DB",
    muted: "#C6C9AC",
    border: "#909378",
    action: "#D2F000",
    actionText: "#191E00",
    accent: "#FFB59E",
    accentText: "#3A0A00",
    info: "#E5E2DC",
    infoText: "#1B1C18",
    warning: "#3E2A1E",
    warningText: "#FFB59E",
  },
};

const palettes = [
  canonicalLight,
  canonicalDark,
  implementedLight,
  implementedDark,
  stitchLight,
  stitchDark,
];

function parseHexColor(hex: string) {
  const value = hex.replace("#", "");
  const normalized =
    value.length === 3
      ? value
          .split("")
          .map((character) => character + character)
          .join("")
      : value;

  return {
    blue: Number.parseInt(normalized.slice(4, 6), 16),
    green: Number.parseInt(normalized.slice(2, 4), 16),
    red: Number.parseInt(normalized.slice(0, 2), 16),
  };
}

function toLinearRgb(channel: number) {
  const scaled = channel / 255;

  return scaled <= 0.03928 ? scaled / 12.92 : Math.pow((scaled + 0.055) / 1.055, 2.4);
}

function getRelativeLuminance(hex: string) {
  const { red, green, blue } = parseHexColor(hex);

  return 0.2126 * toLinearRgb(red) + 0.7152 * toLinearRgb(green) + 0.0722 * toLinearRgb(blue);
}

function getContrastRatio(foreground: string, background: string) {
  const foregroundLuminance = getRelativeLuminance(foreground);
  const backgroundLuminance = getRelativeLuminance(background);
  const lightest = Math.max(foregroundLuminance, backgroundLuminance);
  const darkest = Math.min(foregroundLuminance, backgroundLuminance);

  return (lightest + 0.05) / (darkest + 0.05);
}

function getContrastPairs(palette: PaletteDefinition): ContrastPair[] {
  const { sample } = palette;

  return [
    {
      label: "Body on surface",
      foreground: sample.ink,
      background: sample.surface,
      threshold: 4.5,
    },
    {
      label: "Muted on surface",
      foreground: sample.muted,
      background: sample.surface,
      threshold: 4.5,
    },
    {
      label: "Body on panel",
      foreground: sample.ink,
      background: sample.panel,
      threshold: 4.5,
    },
    {
      label: "Primary action",
      foreground: sample.actionText,
      background: sample.action,
      threshold: 4.5,
    },
    {
      label: "Accent badge",
      foreground: sample.accentText,
      background: sample.accent,
      threshold: 4.5,
    },
    {
      label: "Structural edge",
      foreground: sample.border,
      background: sample.canvas,
      threshold: 3,
    },
  ];
}

function getPaletteStyle(palette: PaletteDefinition): CSSProperties {
  return {
    "--palette-accent": palette.sample.accent,
    "--palette-accent-text": palette.sample.accentText,
    "--palette-action": palette.sample.action,
    "--palette-action-text": palette.sample.actionText,
    "--palette-border": palette.sample.border,
    "--palette-canvas": palette.sample.canvas,
    "--palette-info": palette.sample.info,
    "--palette-info-text": palette.sample.infoText,
    "--palette-ink": palette.sample.ink,
    "--palette-muted": palette.sample.muted,
    "--palette-panel": palette.sample.panel,
    "--palette-surface": palette.sample.surface,
    "--palette-warning": palette.sample.warning,
    "--palette-warning-text": palette.sample.warningText,
  } as CSSProperties;
}

function PaletteSwatch({ color }: { color: PaletteColor }) {
  return (
    <div style={{ display: "grid", gap: "6px" }}>
      <div
        aria-label={`${color.label} ${color.hex}`}
        style={{
          background: color.hex,
          border: "2px solid rgba(23, 21, 17, 0.38)",
          minHeight: "54px",
        }}
      />
      <div>
        <div style={{ color: "var(--palette-ink)", fontWeight: 800 }}>{color.label}</div>
        <div style={{ color: "var(--palette-muted)", fontSize: "0.82rem" }}>{color.hex}</div>
        <div style={{ color: "var(--palette-muted)", fontSize: "0.76rem" }}>{color.role}</div>
      </div>
    </div>
  );
}

function ContrastRows({ palette }: { palette: PaletteDefinition }) {
  return (
    <div style={{ display: "grid", gap: "8px" }}>
      {getContrastPairs(palette).map((pair) => {
        const ratio = getContrastRatio(pair.foreground, pair.background);
        const passes = ratio >= pair.threshold;

        return (
          <div
            key={pair.label}
            style={{
              alignItems: "center",
              background: pair.background,
              border: "2px solid var(--palette-border)",
              color: pair.foreground,
              display: "grid",
              gap: "8px",
              gridTemplateColumns: "1fr auto",
              padding: "10px",
            }}
          >
            <span style={{ fontWeight: 800 }}>{pair.label}</span>
            <span
              style={{
                background: passes ? "#17351f" : "#7a1300",
                color: "#ffffff",
                fontSize: "0.74rem",
                fontWeight: 900,
                padding: "4px 6px",
              }}
            >
              {ratio.toFixed(2)}:1 {passes ? "AA" : "Fail"}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function PalettePreview({ palette }: { palette: PaletteDefinition }) {
  return (
    <article
      style={{
        ...getPaletteStyle(palette),
        background: "var(--palette-canvas)",
        border: "3px solid var(--palette-border)",
        color: "var(--palette-ink)",
        display: "grid",
        gap: "18px",
        padding: "18px",
      }}
    >
      <header style={{ display: "grid", gap: "8px" }}>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              background: "var(--palette-accent)",
              color: "var(--palette-accent-text)",
              fontFamily: "var(--font-display)",
              fontSize: "0.68rem",
              fontWeight: 900,
              padding: "6px 8px",
              textTransform: "uppercase",
            }}
          >
            {palette.source}
          </span>
          <span style={{ color: "var(--palette-muted)", fontWeight: 800 }}>{palette.mode}</span>
        </div>
        <div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.45rem, 3vw, 2.25rem)",
              lineHeight: 1.05,
              margin: 0,
            }}
          >
            {palette.title}
          </h2>
          <p style={{ color: "var(--palette-muted)", lineHeight: 1.5, marginBottom: 0 }}>
            {palette.description}
          </p>
        </div>
      </header>

      <section
        aria-label={`${palette.title} UI preview`}
        style={{
          background: "var(--palette-surface)",
          border: "3px solid var(--palette-border)",
          boxShadow: "8px 8px 0 rgba(0, 0, 0, 0.12)",
          display: "grid",
          gap: "14px",
          padding: "16px",
        }}
      >
        <div
          style={{
            alignItems: "start",
            display: "grid",
            gap: "12px",
            gridTemplateColumns: "minmax(0, 1fr) auto",
          }}
        >
          <div>
            <div
              style={{
                color: "var(--palette-muted)",
                fontFamily: "var(--font-display)",
                fontSize: "0.72rem",
                fontWeight: 900,
                textTransform: "uppercase",
              }}
            >
              Family pool
            </div>
            <strong style={{ display: "block", fontFamily: "var(--font-display)" }}>
              Group A picks
            </strong>
          </div>
          <span
            style={{
              background: "var(--palette-warning)",
              border: "2px solid var(--palette-border)",
              color: "var(--palette-warning-text)",
              fontSize: "0.78rem",
              fontWeight: 900,
              padding: "6px 8px",
            }}
          >
            2 days
          </span>
        </div>

        <div
          style={{
            background: "var(--palette-panel)",
            border: "2px solid var(--palette-border)",
            display: "grid",
            gap: "10px",
            padding: "12px",
          }}
        >
          <div
            style={{
              alignItems: "center",
              display: "grid",
              gap: "8px",
              gridTemplateColumns: "1fr auto 1fr",
            }}
          >
            <span style={{ borderLeft: "8px solid #0b8f47", paddingLeft: "8px" }}>Mexico</span>
            <strong style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem" }}>2-1</strong>
            <span
              style={{ borderRight: "8px solid #d0453b", paddingRight: "8px", textAlign: "right" }}
            >
              Canada
            </span>
          </div>
          <p style={{ color: "var(--palette-muted)", margin: 0 }}>
            Exact-score controls need to stay readable when the page is dense.
          </p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          <button
            style={{
              background: "var(--palette-action)",
              border: "3px solid var(--palette-border)",
              color: "var(--palette-action-text)",
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              minHeight: "44px",
              padding: "10px 14px",
              textTransform: "uppercase",
            }}
            type="button"
          >
            Save picks
          </button>
          <button
            style={{
              background: "var(--palette-surface)",
              border: "3px solid var(--palette-border)",
              color: "var(--palette-ink)",
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              minHeight: "44px",
              padding: "10px 14px",
              textTransform: "uppercase",
            }}
            type="button"
          >
            View rules
          </button>
        </div>
      </section>

      <section aria-label={`${palette.title} color tokens`}>
        <h3 style={{ fontFamily: "var(--font-display)", marginTop: 0 }}>Palette</h3>
        <div
          style={{
            display: "grid",
            gap: "12px",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
          }}
        >
          {palette.colors.map((color) => (
            <PaletteSwatch key={`${palette.id}-${color.label}`} color={color} />
          ))}
        </div>
      </section>

      <section aria-label={`${palette.title} contrast ratios`}>
        <h3 style={{ fontFamily: "var(--font-display)", marginTop: 0 }}>Contrast Checks</h3>
        <ContrastRows palette={palette} />
      </section>
    </article>
  );
}

const meta = {
  title: "Foundations/Palettes",
  parameters: {
    layout: "fullscreen",
    a11y: {
      test: "todo",
    },
    docs: {
      description: {
        component:
          "Palette comparison workbench for canonical DESIGN.md tokens, current implementation tokens, and downloaded Stitch options. The story shows visual samples plus computed WCAG contrast ratios; it is marked as a11y todo because some candidate palettes may intentionally fail while being evaluated.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Comparison: Story = {
  render: () => (
    <main
      style={{
        background: "var(--color-app-canvas)",
        color: "var(--color-app-ink)",
        display: "grid",
        gap: "22px",
        minHeight: "100vh",
        padding: "24px",
      }}
    >
      <header style={{ margin: "0 auto", maxWidth: "1180px", width: "100%" }}>
        <p
          style={{
            color: "var(--color-app-muted)",
            fontFamily: "var(--font-display)",
            fontSize: "0.78rem",
            fontWeight: 900,
            margin: 0,
            textTransform: "uppercase",
          }}
        >
          Foundations
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 3.25rem)",
            lineHeight: 1.05,
            margin: "6px 0 0",
          }}
        >
          Palette Comparison
        </h1>
        <p style={{ color: "var(--color-app-muted)", lineHeight: 1.55, maxWidth: "760px" }}>
          Compare the current source-of-truth palette, the tokens currently implemented in CSS, and
          the downloaded Stitch light and dark options before promoting any palette into DESIGN.md.
        </p>
      </header>

      <div
        style={{
          display: "grid",
          gap: "22px",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 430px), 1fr))",
          margin: "0 auto",
          maxWidth: "1180px",
          width: "100%",
        }}
      >
        {palettes.map((palette) => (
          <PalettePreview key={palette.id} palette={palette} />
        ))}
      </div>
    </main>
  ),
};
