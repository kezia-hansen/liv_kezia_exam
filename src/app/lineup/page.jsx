import BandBbl from "../../components/BandBbl";
import Title from "../../components/Title";
import Artist from "../../components/Artist";
export default function Lineup() {
  return (
    <main>
      {" "}
      <Title title="FEATURED ARTISTS" /> <BandBbl /> <Title title="LINEUP" /> <br /> <Artist />;{" "}
    </main>
  );
}
