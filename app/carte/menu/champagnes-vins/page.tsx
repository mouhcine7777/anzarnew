import ChampagnesVins from "./components/ChampagnesVins";
import ChampagnesVinsHero from "./components/ChampagnesVinsHero";
import StickyMenu from "../../components/StickyMenu";

export default function ChampagnesVinsPage() {
  return (
    <main>
      <StickyMenu selectedCategory="Champagnes & Vins" />
      <ChampagnesVinsHero />
      <ChampagnesVins />
    </main>
  );
}
