import BieresAlcools from "./components/BieresAlcools";
import BieresAlcoolsHero from "./components/BieresAlcoolsHero";
import StickyMenu from "../../components/StickyMenu";

export default function BieresAlcoolsPage() {
  return (
    <main>
      <StickyMenu selectedCategory="Bières & Alcools" />
      <BieresAlcoolsHero />
      <BieresAlcools />
    </main>
  );
}
