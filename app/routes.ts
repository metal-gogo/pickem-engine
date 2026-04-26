import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("./routes/_index.tsx"),
  route("callback", "./routes/callback.ts"),
  route("login", "./routes/login.ts"),
  route("logout", "./routes/logout.ts"),
  route("pools/:poolId/*", "./routes/pools.$poolId.$.tsx"),
] satisfies RouteConfig;
