import Cocktails from "./components/Cocktails";
import CocktailsHero from "./components/CocktailsHero";
import StickyMenu from "../../components/StickyMenu";

export default function CocktailsPage() {
  return (
    <main>
      <StickyMenu selectedCategory="Cocktails & Shots" />
      <CocktailsHero />
      <Cocktails />
    </main>
  );
}
