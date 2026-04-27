---
name: Apex Kinetic
colors:
  surface: "#131410"
  surface-dim: "#131410"
  surface-bright: "#3a3935"
  surface-container-lowest: "#0e0e0b"
  surface-container-low: "#1c1c18"
  surface-container: "#20201c"
  surface-container-high: "#2a2a26"
  surface-container-highest: "#353530"
  on-surface: "#e5e2db"
  on-surface-variant: "#c6c9ac"
  inverse-surface: "#e5e2db"
  inverse-on-surface: "#31312c"
  outline: "#909378"
  outline-variant: "#454932"
  surface-tint: "#b8d300"
  primary: "#ffffff"
  on-primary: "#2c3400"
  primary-container: "#d2f000"
  on-primary-container: "#5d6b00"
  inverse-primary: "#576500"
  secondary: "#ffb59e"
  on-secondary: "#5e1700"
  secondary-container: "#b63400"
  on-secondary-container: "#ffd8cd"
  tertiary: "#ffffff"
  on-tertiary: "#30312d"
  tertiary-container: "#e5e2dc"
  on-tertiary-container: "#656460"
  error: "#ffb4ab"
  on-error: "#690005"
  error-container: "#93000a"
  on-error-container: "#ffdad6"
  primary-fixed: "#d2f000"
  primary-fixed-dim: "#b8d300"
  on-primary-fixed: "#191e00"
  on-primary-fixed-variant: "#414c00"
  secondary-fixed: "#ffdbd0"
  secondary-fixed-dim: "#ffb59e"
  on-secondary-fixed: "#3a0a00"
  on-secondary-fixed-variant: "#852400"
  tertiary-fixed: "#e5e2dc"
  tertiary-fixed-dim: "#c8c6c1"
  on-tertiary-fixed: "#1b1c18"
  on-tertiary-fixed-variant: "#474743"
  background: "#131410"
  on-background: "#e5e2db"
  surface-variant: "#353530"
typography:
  display-lg:
    fontFamily: Lexend
    fontSize: 48px
    fontWeight: "800"
    lineHeight: "1.1"
    letterSpacing: -0.04em
  heading-md:
    fontFamily: Lexend
    fontSize: 24px
    fontWeight: "700"
    lineHeight: "1.2"
  body-base:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: "400"
    lineHeight: "1.5"
  label-sm:
    fontFamily: Lexend
    fontSize: 12px
    fontWeight: "600"
    lineHeight: "1"
    letterSpacing: 0.16em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 2px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
---

# Apex Kinetic

## Creative North Star

Dark room, glowing glass, stadium energy. This design system is a tactical sports-editorial interface for high-stakes competition. It feels like a high-tech tournament dashboard viewed under stadium lights—constructed, kinetic, and authoritative. It utilizes a "night-game" aesthetic: heavy dark surfaces, slightly softened corners, and high-energy lime/rust accents.

The interface is structured and physical: modules are defined by heavy borders and tonal shifts, featuring compressed all-caps display type that conveys urgency and confidence.

## Core Tokens

Canvas `#383834`; strong content surface `#454540`; soft surface `#2d2d2a`; tinted surface `#3d4026`; ink `#fcf9f2`; muted text `#a8a7a4`; outline `#82807c`; lime action `#daf900`; pressed lime `#cdea00`; lime ink `#5d6b00`; rust `#b83500`; rust soft `#4d261a`; success soft `#1e3a29`; warning soft `#3e2a1e`; locked fill `#2d2d2a`; locked soft `#383834`.

## Typography

Use Lexend for display, headings, buttons, badges, metric values, team labels, and editorial moments. Use Inter for body copy, dense data, descriptions, and supporting UI text. Display text should be all-caps, heavy, compressed, and confident. Large display moments may use tight tracking from `-0.04em` to `-0.08em`. Small labels and badges should use uppercase Lexend with positive tracking around `0.16em` to `0.18em`.

## Surface Logic

Treat the page as a technical dashboard. The base canvas uses Dark Ink (#383834) with subtle atmospheric washes of lime or rust to indicate active zones. Primary modules use slightly lifted dark surfaces with `3px` high-contrast borders. Nested blocks use tonal panels instead of thin divider lines. Sticky or floating elements use translucent dark surfaces, backdrop blur, and a heavy border.

Use heavy structural borders for primary containers and controls. Avoid default `1px` internal dividers. Inside a module, separate content with spacing, tonal surface changes, or a deliberately heavier structural edge.

## Shape And Depth

Cards, badges, buttons, inputs, and shell elements are constructed with eased geometry. All structural elements use a **0.25rem (4px)** corner radius (Softened Roundedness). Reserve circular shapes only for flags, avatars, or status indicators. Primary containers use `3px` borders. Secondary controls use `2px` borders. Depth is represented through tonal lifting and hard, offset block shadows: `8px 8px 0 rgba(0,0,0,0.2)`. Button shadows should feel like physical displacement and disappear on active press.

## Components

Buttons are mechanical and pressable: subtly rounded corners (4px), `3px` borders, uppercase Lexend labels, and high tracking. Primary buttons use lime fill, dark ink text, heavy border, and a blocky shadow; active states press down/right and remove the shadow. Secondary buttons use dark surfaces with lime or cream borders. Ghost buttons use soft dark surfaces with `2px` borders and muted text that sharpens on hover.

Cards are structural blocks with eased corners, `3px` borders, and dark tonal surfaces. Avoid decorative card-inside-card composition. Badges are small official-looking stamps: 4px rounded corners, uppercase Lexend, `2px` borders, and compact padding.

Score entry should feel tactile and sports-specific: a team label block plus a large Lexend numeric input separated by a heavy vertical edge. Team accent strips should remain visible where they tie picks to real teams. The app shell header uses a translucent dark surface with backdrop blur, a `3px` border, and eased corners.

## Responsive Behavior

On compact screens, preserve legibility before preserving density. Collapse lower-priority metadata before allowing team names, score inputs, group tables, or action labels to break awkwardly. Controls should maintain stable dimensions so hover, focus, and active states do not shift layout.

## Do

Use dark ink canvases, tonal surface shifts, `#fcf9f2` high-contrast text, restrained lime/rust accents, 4px rounded corners, Lexend display type, Inter body/data copy, and team accent strips for specificity.

## Don't

Don't use pure white as a background canvas. Don't use sharp 0px corners (always use the 4px easing). Don't use pill-shaped buttons for structural UI. Don't use thin internal divider lines as the main layout tool. Don't let lime or rust become the background color for large areas; keep them as high-energy accents.
