"use client";
import { useState, useEffect } from "react";
import { url } from "/config";
import Link from "next/link";
import React from "react";
export default function Hero() {
  const [pages1, setPages1] = useState([]);
  const [pages2, setPages2] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${url}/bands`);
      const data = await res.json();
      const bands1 = data.slice(0, 10);
      const bands2 = data.slice(11, 100);
      setPages1(bands1);
      setPages2(bands2);
    };
    fetchData();
  }, []);
  if (pages1.length === 0 || pages2.length === 0)
    return (
      <div className="flex mx-auto flex-col gap-6 items-center justify-center w-full lg:h-[460px]">
        {" "}
        <div className="loading loading-ring text-slate-100 w-16"></div>{" "}
      </div>
    );
  return (
    <div className="hero flex flex-col lg:h-[460px] bg-violet-950 py-10 px-5">
      {" "}
      <div className="hero-content text-center">
        {" "}
        {}{" "}
        <ul className="flex flex-wrap font-sans justify-center gap-2 md:gap-4 text-3xl md:text-6xl w-fit font-extrabold tracking-tight lg:tracking-normal">
          {" "}
          {pages1.map((band, index, array) => {
            return (
              <React.Fragment key={band.slug}>
                {" "}
                <li>
                  {" "}
                  <Link prefetch={false} href={`/artist/${band.slug}`} className=" text-pink-500 hover:text-pink-800 transition text-stroke-1 hover:text-stroke-0" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 700 }}>
                    {" "}
                    {band.name}{" "}
                  </Link>{" "}
                </li>{" "}
                {index !== array.length - 1 && <li className=" text-fuchsia-300 font-extralight"> / </li>}{" "}
              </React.Fragment>
            );
          })}{" "}
        </ul>{" "}
      </div>{" "}
      <div className="hero-content px-2 mt-2">
        {" "}
        {}{" "}
        <nav className="">
          {" "}
          <ul className="flex grow flex-wrap font-sans justify-center gap-2 text-xs lg:text-xl font-regular">
            {" "}
            {pages2.map((band, index, array) => {
              return (
                <React.Fragment key={band.slug}>
                  {" "}
                  <li className="text-lime-400 hover:text-emerald-900 transition-colors" key={band.slug} style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 500 }}>
                    {" "}
                    <Link prefetch={false} href={`/artist/${band.slug}`} key={band.slug}>
                      {" "}
                      {band.name}{" "}
                    </Link>{" "}
                  </li>{" "}
                  {index !== array.length - 1 && <li className="text-sky-600"> / </li>}{" "}
                </React.Fragment>
              );
            })}{" "}
          </ul>{" "}
        </nav>{" "}
      </div>{" "}
    </div>
  );
}
