import type { Preview } from "@storybook/react-vite";
import { MemoryRouter } from "react-router-dom";
import { MINIMAL_VIEWPORTS } from "storybook/viewport";

import "../src/styles/index.css";

const viewportOptions = {
  ...MINIMAL_VIEWPORTS,
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
        { name: "Pure White", value: "#ffffff" },
      ],
    },
    viewport: {
      options: viewportOptions,
    },
    options: {
      storySort: {
        order: ["Foundations", "Primitives", "Inputs", "Modules", "Views", "Frames"],
      },
    },
  },
  decorators: [
    (Story, context) => {
      const storyLayout = context.parameters.layout ?? "fullscreen";

      return (
        <MemoryRouter initialEntries={["/"]}>
          <div style={{ minHeight: storyLayout === "fullscreen" ? "100vh" : undefined, padding: "24px" }}>
            <Story />
          </div>
        </MemoryRouter>
      );
    },
  ],
};

export default preview;
