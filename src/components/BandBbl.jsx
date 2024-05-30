import Image from "next/image";
export default function BandBbl() {
  return (
    <main>
      {" "}
      <section className="twobbl">
        {" "}
        <Image src="../img/bandbbl1.svg" width={500} height={500} alt="bubble" className="bbl1" /> <Image src="../img/bandbbl2.svg" width={500} height={500} alt="bubble" className="bbl2" />{" "}
      </section>{" "}
      <section className="threebbl">
        {" "}
        <Image src="../img/bandbbl3.svg" width={300} height={300} alt="bubble" className="bbl3" /> <Image src="../img/bandbbl4.svg" width={300} height={300} alt="bubble" className="bbl4" /> <Image src="../img/bandbbl1.svg" width={300} height={300} alt="bubble" className="bbl5" />{" "}
      </section>{" "}
      <section className="bbl_last">
        {" "}
        <Image src="../img/bandbbl6.svg" width={250} height={250} alt="bubble" className="bbl6" /> <Image src="../img/bandbbl7.svg" width={250} height={250} alt="bubble" className="bbl17" />{" "}
      </section>{" "}
    </main>
  );
}
