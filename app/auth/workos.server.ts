import "dotenv/config";
import { redirect } from "react-router";
import { signOut } from "@workos-inc/authkit-react-router";

export {
  authkitLoader,
  authLoader,
  getSignInUrl,
  getSignUpUrl,
} from "@workos-inc/authkit-react-router";

export async function signOutSafely(request: Request) {
  const returnTo = process.env["WORKOS_LOGOUT_REDIRECT_URI"] || "/";
  const cookieName = process.env["WORKOS_COOKIE_NAME"] || "wos-session";
  const cookieHeader = request.headers.get("Cookie") || "";

  if (!cookieHeader.includes(cookieName)) {
    return redirect(returnTo);
  }

  try {
    return await signOut(request, { returnTo });
  } catch (error) {
    if (error instanceof TypeError) {
      return redirect(returnTo);
    }

    throw error;
  }
}
