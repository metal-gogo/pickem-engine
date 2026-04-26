import { signOutSafely } from "../auth/workos.server";
import { type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";

export async function loader({ request }: LoaderFunctionArgs) {
  return signOutSafely(request);
}

export async function action({ request }: ActionFunctionArgs) {
  return signOutSafely(request);
}
