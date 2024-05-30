import Image from "next/image";
import Link from "next/link";
export default function Vip() {
  return (
    <Link href="/booking">
      {" "}
      {}{" "}
      <div className="vip hover:scale-105">
        {" "}
        {}{" "}
        <div className="imgv">
          {" "}
          {} <Image src="./img/starbbl.svg" width={100} height={100} alt="starbbl" className="star" />{" "}
        </div>{" "}
        {} <div className="hrvip"></div> {}{" "}
        <h2 className="fullweek" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 700 }}>
          {" "}
          ADGANG ALLE <br /> FESTIVALENS DAGE{" "}
        </h2>{" "}
        {}{" "}
        <p style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 200 }}>
          {" "}
          1.-2.-3.- AUGUST <br /> WHATS NOT TO LOVE?{" "}
        </p>{" "}
        {}{" "}
        <h3 className="price" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 200 }}>
          {" "}
          1299 DKK{" "}
        </h3>{" "}
      </div>{" "}
    </Link>
  );
}
