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

export default {
  async fetch(request, env, ctx): Promise<Response> {
    configureWorkOS(env);

    return requestHandler(request, {
      cloudflare: {
        env,
        ctx,
      },
    });
  },
} satisfies ExportedHandler<Env>;
