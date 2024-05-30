import Image from "next/image";
import Link from "next/link";
export default function Ticket() {
  return (
    <Link href="/booking">
      {" "}
      {}{" "}
      <div className="ticket hover:scale-105">
        {" "}
        {}{" "}
        <div className="imgendag">
          {" "}
          {} <Image src="./img/moonbbl.svg" width={100} height={100} alt="starbbl" className="moon" />{" "}
        </div>{" "}
        {} <div className="hrendags"></div> {}{" "}
        <h2 className="endags" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 700 }}>
          {" "}
          ENDAGSBILLET{" "}
        </h2>{" "}
        {}{" "}
        <p style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 200 }}>
          {" "}
          BILLETTEN GIVER <br /> ADGANG TORSDAG <br /> D 1.AUGUST{" "}
        </p>{" "}
        {}{" "}
        <h3 className="pris" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 200 }}>
          {" "}
          799 DKK{" "}
        </h3>{" "}
      </div>{" "}
    </Link>
  );
}
