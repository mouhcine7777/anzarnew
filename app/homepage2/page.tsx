
import HeroSection from "./components/HeroSection";
import StickyMenu from "./components/StickyMenu";
import AboutSection from "./components/AboutSection";
import ArtistesSection from "./components/ArtistesSection";
import CuisineSection from "./components/CuisineSection";
import BarSection from "./components/BarSection";
import ClosingSection from "./components/ClosingSection";

/**
 * ANZAR — Home (teal / petrol variant)
 * Same editorial layout as the main homepage, retuned to Anzar's
 * deep-teal charte colourway (petrol + gold) instead of wine/burgundy.
 */
export default function Home2() {
  return (
    <main>
      <HeroSection />
      <StickyMenu />
      <AboutSection />
      <ArtistesSection />
      <CuisineSection />
      <BarSection />
      <ClosingSection />
    </main>
  );
}
