import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "react-router";

import stylesheet from "../src/styles/index.css?url";
import { THEME_MODE_STORAGE_KEY, ThemeProvider } from "../src/app/theme";

import type { LinksFunction } from "react-router";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: stylesheet }];

const themeInitScript = `
(() => {
  try {
    const storedMode = window.localStorage.getItem("${THEME_MODE_STORAGE_KEY}");
    const mode = storedMode === "light" || storedMode === "dark" || storedMode === "system"
      ? storedMode
      : "system";
    const systemDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
    const resolvedTheme = mode === "system" ? (systemDark ? "dark" : "light") : mode;
    const root = document.documentElement;
    root.dataset.themeMode = mode;
    root.dataset.theme = resolvedTheme;
    root.style.colorScheme = resolvedTheme;
  } catch {
    document.documentElement.dataset.theme = "light";
    document.documentElement.dataset.themeMode = "system";
    document.documentElement.style.colorScheme = "light";
  }
})();
`;

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="pickem-engine discovery build for World Cup 2026 exact-score picks."
        />
        <title>pickem-engine</title>
        <Meta />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <Links />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <main className="min-h-screen bg-app-canvas p-6 text-app-ink">
        <h1 className="font-display text-3xl font-black uppercase">Something went sideways</h1>
        <p className="mt-3 font-semibold">
          {error.status} {error.statusText}
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-app-canvas p-6 text-app-ink">
      <h1 className="font-display text-3xl font-black uppercase">Something went sideways</h1>
      <p className="mt-3 font-semibold">The local app hit an unexpected error.</p>
    </main>
  );
}
