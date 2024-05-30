import React from "react";
import PlayingTime from "@/components/PlayingTime";
import BackBtn from "@/components/BackBtn";
import Spotify from "@/components/Spotify";
import Title from "@/components/Title";
import { url } from "/config";
export async function generateStaticParams() {
  const bands = await fetch(`${url}/bands`).then((res) => res.json());
  return bands.map((band) => ({ slug: band.slug }));
}
export async function generateMetadata({ params }) {
  const bands = await fetch(`${url}/bands`).then((res) => res.json());
  const { slug } = params;
  const band = bands.find((band) => band.slug === slug);
  return { title: band ? band.name : "Band not found", description: band ? band.bio : "No description available" };
}
export default async function Page({ params }) {
  const bands = await fetch(`${url}/bands`).then((res) => res.json());
  const { slug } = params;
  const band = bands.find((band) => band.slug === slug);
  const getBandLogo = (band) => {
    if (band.logo?.startsWith("https")) {
      return band.logo;
    }
    return `${url}/logos/${band.logo}`;
  };
  band.logo = getBandLogo(band);
  return (
    <>
      {" "}
      <main>
        {" "}
        {}{" "}
        <div key={band.slug} className="container mx-auto px-4">
          {" "}
          {} <Title title={band.name} style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 200 }} /> {}{" "}
          <div className="flex justify-between mt-6">
            {" "}
            <BackBtn /> <PlayingTime band={band} />{" "}
          </div>{" "}
          {}{" "}
          <div className="relative flex mt-6 h-96">
            {" "}
            {} <div className="w-1/2 h-full relative z-20 rounded-3xl" style={{ backgroundImage: `url(${band.logo})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}></div> {}{" "}
            <div className="w-1/2 h-full bg-violet-400 border-lime-300 border-4 border-solid p-6 flex items-center relative z-10 -ml-12 rounded-3xl" style={{ paddingLeft: "5rem" }}>
              {" "}
              <div className="relative z-30 p-6 rounded-3xl">
                {" "}
                <h3 className="text-2xl" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 700 }}>
                  {" "}
                  OM:{" "}
                </h3>{" "}
                {}{" "}
                <p className="mt-4" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 200 }}>
                  {" "}
                  {band.bio}{" "}
                </p>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          {}{" "}
          <div className="mb-8">
            {" "}
            <Spotify band={band} />{" "}
          </div>{" "}
        </div>{" "}
      </main>{" "}
    </>
  );
}
