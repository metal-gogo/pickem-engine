import { signOut } from "@workos-inc/authkit-react-router";
import { type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";

export async function loader({ request }: LoaderFunctionArgs) {
  return signOut(request);
}

export async function action({ request }: ActionFunctionArgs) {
  return signOut(request);
}
