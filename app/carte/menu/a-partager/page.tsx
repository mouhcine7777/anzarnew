import APartager from "./components/APartager";
import APartagerHero from "./components/APartagerHero";
import StickyMenu from "../../components/StickyMenu";

export default function APartagerPage() {
  return (
    <main>
      <StickyMenu selectedCategory="À partager" />
      <APartagerHero />
      <APartager />
    </main>
  );
}
