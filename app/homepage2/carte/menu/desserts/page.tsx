import Desserts from "./components/Desserts";
import DessertsHero from "./components/DessertsHero";
import StickyMenu from "../../components/StickyMenu";


export default function Home() {
  return (
    <main>
      <StickyMenu />
      <DessertsHero />
      <Desserts />
    </main>
  );
}