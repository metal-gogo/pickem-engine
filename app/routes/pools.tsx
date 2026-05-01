import { prototypePools } from "../../src/data/pools";
import { Home } from "../../src/views/Home";

export default function PoolsRoute() {
  return <Home pools={prototypePools} />;
}
