import Plats from "./components/Plats";
import PlatsHero from "./components/PlatsHero";
import StickyMenu from "../../components/StickyMenu";

export default function PlatsPage() {
  return (
    <main>
      <StickyMenu selectedCategory="Les Plats" />
      <PlatsHero />
      <Plats />
    </main>
  );
}
