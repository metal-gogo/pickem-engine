import { authLoader } from "../auth/workos.server";
import { redirect, type LoaderFunctionArgs } from "react-router";

const handleAuthCallback = authLoader({ returnPathname: "/" });

export function loader(args: LoaderFunctionArgs) {
  const url = new URL(args.request.url);

  if (!url.searchParams.has("code")) {
    return redirect("/");
  }

  return handleAuthCallback(args);
}
