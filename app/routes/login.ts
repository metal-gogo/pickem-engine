import { getSignInUrl } from "@workos-inc/authkit-react-router";
import { redirect, type LoaderFunctionArgs } from "react-router";

export async function loader({ request }: LoaderFunctionArgs) {
  const returnPathname = new URL(request.url).searchParams.get("returnTo") ?? "/";

  return redirect(await getSignInUrl(returnPathname));
}
