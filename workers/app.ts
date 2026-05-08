import { createRequestHandler } from "react-router";
import { configure } from "@workos-inc/authkit-react-router";

declare module "react-router" {
  export interface AppLoadContext {
    cloudflare: {
      env: Env;
      ctx: ExecutionContext;
    };
  }
}

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE,
);

function configureWorkOS(env: Env) {
  const values = env as unknown as Record<string, string | undefined>;
  const processEnv = (globalThis as unknown as { process?: { env?: Record<string, string> } })
    .process?.env;

  configure((key) => values[key] ?? processEnv?.[key]);
}

function handleKnownMissingAsset(request: Request) {
  const url = new URL(request.url);

  if (request.method !== "GET" && request.method !== "HEAD") {
    return undefined;
  }

  if (url.pathname === "/favicon.ico") {
    return new Response(null, { status: 204 });
  }

  if (url.pathname === "/entry.worker.js") {
    return new Response(null, { status: 404 });
  }

  return undefined;
}

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const knownMissingAssetResponse = handleKnownMissingAsset(request);

    if (knownMissingAssetResponse) {
      return knownMissingAssetResponse;
    }

    configureWorkOS(env);

    return requestHandler(request, {
      cloudflare: {
        env,
        ctx,
      },
    });
  },
} satisfies ExportedHandler<Env>;
