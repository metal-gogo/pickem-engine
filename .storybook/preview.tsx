import type { Preview } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";
import { useGlobals } from "storybook/preview-api";
import { MINIMAL_VIEWPORTS } from "storybook/viewport";

import { isThemeMode, ThemeProvider } from "../src/app/theme";
import "../src/styles/index.css";

const { mobile1: _smallMobile, ...minimalViewportsWithoutSmallMobile } = MINIMAL_VIEWPORTS;

const viewportOptions = {
  ...minimalViewportsWithoutSmallMobile,
  desktopWide: {
    name: "Wide desktop",
    styles: {
      width: "1440px",
      height: "1024px",
    },
    type: "desktop" as const,
  },
};

const preview: Preview = {
  initialGlobals: {
    viewport: { value: "desktop" },
    themeMode: "system",
  },
  globalTypes: {
    themeMode: {
      name: "Mode",
      description: "Color mode",
      toolbar: {
        icon: "mirror",
        title: "Mode",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
          { value: "system", title: "System" },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    layout: "fullscreen",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "App Canvas",
      values: [
        { name: "App Canvas", value: "#eef3fb" },
        { name: "Warm Canvas", value: "#fff8ef" },
        { name: "Dark Canvas", value: "#171511" },
        { name: "Pure White", value: "#ffffff" },
      ],
    },
    viewport: {
      options: viewportOptions,
    },
    a11y: {
      test: "error",
      options: {
        runOnly: {
          type: "tag",
          values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"],
        },
      },
    },
    options: {
      storySort: {
        order: ["Foundations", "Primitives", "Inputs", "Modules", "Views", "Frames"],
      },
    },
  },
  decorators: [
    (Story, context) => {
      const [globals, updateGlobals] = useGlobals();
      const storyLayout = context.parameters.layout ?? "fullscreen";
      const themeMode = isThemeMode(globals.themeMode) ? globals.themeMode : "system";

      return (
        <ThemeProvider
          mode={themeMode}
          persist={false}
          onModeChange={(nextMode) => updateGlobals({ themeMode: nextMode })}
        >
          <MemoryRouter initialEntries={["/"]}>
            <div
              style={{
                minHeight: storyLayout === "fullscreen" ? "100vh" : undefined,
                padding: "24px",
              }}
            >
              <Story />
            </div>
          </MemoryRouter>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
