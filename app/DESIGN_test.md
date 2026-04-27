# Apex Kinetic

## Creative North Star

Warm paper, dark ink, stadium energy. This design system should match the current local `pickem-engine` frontend: a tactile sports-editorial interface for a private World Cup pick'em pool. It should feel like a constructed tournament dashboard printed on warm paper and bolted together with heavy ink, not generic SaaS chrome.

The interface is structured and kinetic: squared modules, heavy borders, compressed all-caps display type, and high-energy lime/rust accents used with restraint. The app should feel practical for repeated pick entry and expressive enough to carry World Cup energy.

## Core Tokens

Canvas `#fcffdc`; warm surface `#fcf9f2`; strong content surface `#ffffff`; soft surface `#f6f3ec`; tinted surface `#f0eee6`; panel surface `#ebe8e0`; ink `#383834`; muted text `#656460`; strong muted text `#515050`; outline `#82807c`; lime action `#daf900`; pressed lime `#cdea00`; lime ink `#5d6b00`; rust `#b83500`; rust soft `#ffc4b3`; success soft `#dcfce7`; warning soft `#ffe1d6`; locked fill `#383834`; locked soft `#ebe8e0`.

## Typography

Use Lexend for display, headings, buttons, badges, metric values, team labels, and editorial moments. Use Inter for body copy, dense data, descriptions, and supporting UI text. Display text should be all-caps, heavy, compressed, and confident. Large display moments may use tight tracking from `-0.04em` to `-0.08em`. Small labels and badges should use uppercase Lexend with positive tracking around `0.16em` to `0.18em`.

## Surface Logic

Treat the page as layered paper and ink. Base canvas uses warm paper with subtle lime and rust atmospheric washes. Primary modules use white or warm surfaces with `3px` dark ink borders. Nested blocks use warm tonal panels instead of thin divider lines. Sticky or floating elements use translucent warm canvas, backdrop blur, and a heavy ink frame.

Use heavy structural borders for primary containers and controls. Avoid default `1px` internal dividers. Inside a module, separate content with spacing, tonal surface changes, grouped sub-blocks, or a deliberately heavier structural edge.

## Shape And Depth

Cards, badges, buttons, inputs, sticky shell elements, and structural surfaces should read as squared and constructed. Reserve softer or circular shapes for flags, avatars, dots, or team emblems. Primary containers use `3px` dark ink borders. Secondary controls can use `2px` borders only when visually subordinate. Base shadow: `0 12px 32px -4px rgba(56,56,52,0.08)`. Raised shadow: `0 18px 30px -10px rgba(56,56,52,0.14), 8px 8px 0 rgba(56,56,52,0.1)`. Button shadows should feel like physical displacement and disappear on active press.

## Components

Buttons are mechanical and pressable: squared corners, `3px` ink borders, uppercase Lexend labels, and high tracking. Primary buttons use lime fill, ink text, heavy border, and blocky shadow; active states press down/right and remove the shadow. Secondary buttons use white or warm fill. Ghost buttons use warm soft surfaces, `2px` ink borders, and muted text that sharpens on hover.

Cards are structural blocks with squared geometry, `3px` ink borders, and warm or white surfaces. Avoid decorative card-inside-card composition. Badges are small official-looking stamps: squared, uppercase Lexend, `2px` to `3px` borders, compact padding.

Score entry should feel tactile and sports-specific: a team label block plus a large Lexend numeric input separated by a heavy vertical ink edge. Team accent strips should remain visible where they tie picks to real teams. The app shell header uses a translucent warm surface with backdrop blur, a `3px` ink border, and squared geometry.

## Responsive Behavior

On compact screens, preserve legibility before preserving density. Collapse lower-priority metadata before allowing team names, score inputs, group tables, or action labels to break awkwardly. Controls should maintain stable dimensions so hover, focus, and active states do not shift layout.

## Do

Use warm paper canvases, tonal surface shifts, `#383834` structural ink, restrained lime/rust accents, squared controls, Lexend display type, Inter body/data copy, and team accent strips where they help prediction surfaces feel specific.

## Don't

Don't revert to navy/gold as the primary identity. Don't use pill buttons or heavily rounded cards for structural UI. Don't use pure black as the default anchor. Don't use thin internal divider lines as the main layout tool. Don't make lime or rust constant fill colors across the whole UI. Don't let placeholder rules or scoring copy look like confirmed product policy.
