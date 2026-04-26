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

import type { LinksFunction } from "react-router";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: stylesheet }];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="pickem-engine discovery build for World Cup 2026 exact-score picks."
        />
        <title>pickem-engine</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
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
