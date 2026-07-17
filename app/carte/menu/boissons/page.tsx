import Boissons from "./components/Boissons";
import BoissonsHero from "./components/BoissonsHero";
import StickyMenu from "../../components/StickyMenu";

export default function BoissonsPage() {
  return (
    <main>
      <StickyMenu selectedCategory="Boissons & Softs" />
      <BoissonsHero />
      <Boissons />
    </main>
  );
}
