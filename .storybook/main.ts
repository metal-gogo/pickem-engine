import type { StorybookConfig } from "@storybook/react-vite";
import type { PluginOption } from "vite";

function isReactRouterPlugin(plugin: PluginOption): boolean {
  return (
    Boolean(plugin) &&
    typeof plugin === "object" &&
    "name" in plugin &&
    typeof plugin.name === "string" &&
    plugin.name.startsWith("react-router")
  );
}

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-vitest",
    "@storybook/addon-mcp",
  ],
  core: {
    builder: {
      name: "@storybook/builder-vite",
      options: {
        viteConfigPath: "storybook.vite.config.ts",
      },
    },
  },
  framework: "@storybook/react-vite",
  viteFinal(config) {
    return {
      ...config,
      plugins: config.plugins?.filter((plugin) => !isReactRouterPlugin(plugin)),
    };
  },
};

export default config;
