import { redirect } from "react-router";
import { getConfig, getWorkOS, signOut } from "@workos-inc/authkit-react-router";

export { authkitLoader, authLoader } from "@workos-inc/authkit-react-router";

function getRequestOrigin(request?: Request) {
  if (request) {
    return new URL(request.url).origin;
  }

  return new URL(getConfig("redirectUri")).origin;
}

function getRedirectUri(request?: Request) {
  return new URL("/callback", getRequestOrigin(request)).toString();
}

function getLogoutRedirectUri(request: Request) {
  return new URL("/", getRequestOrigin(request)).toString();
}

async function getAuthUrl(
  screenHint: "sign-in" | "sign-up",
  returnPathname?: string,
  request?: Request,
) {
  return getWorkOS().userManagement.getAuthorizationUrl({
    provider: "authkit",
    clientId: getConfig("clientId"),
    redirectUri: getRedirectUri(request),
    state: returnPathname ? btoa(JSON.stringify({ returnPathname })) : undefined,
    screenHint,
  });
}

export async function getSignInUrl(returnPathname?: string, request?: Request) {
  return getAuthUrl("sign-in", returnPathname, request);
}

export async function getSignUpUrl(returnPathname?: string, request?: Request) {
  return getAuthUrl("sign-up", returnPathname, request);
}

export async function signOutSafely(request: Request) {
  const returnTo = getLogoutRedirectUri(request);
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
