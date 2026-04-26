import { prototypePools } from "../../src/data/pools";
import { Home } from "../../src/views/Home";

export default function HomeRoute() {
  return <Home pools={prototypePools} />;
}
