import EntreesFroides from "./components/EntreesFroides";
import EntreesFroidesHero from "./components/EntreesFroidesHero";
import StickyMenu from "../../components/StickyMenu";

export default function EntreesFroidesPage() {
  return (
    <main>
      <StickyMenu selectedCategory="Les Entrées Froides" />
      <EntreesFroidesHero />
      <EntreesFroides />
    </main>
  );
}
