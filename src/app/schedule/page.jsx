"use client";
import ScheduleCard from "../../components/ScheduleCard";
import { url } from "/config";
import Title from "../../components/Title";
import { useEffect, useState } from "react";
export default function Schedule() {
  const [dataSchedule, setDataSchedule] = useState(null);
  const [dataBands, setDataBands] = useState(null);
  const [selectedScene, showSelectedScene] = useState("All stages");
  const [selectedButton, setSelectedButton] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const resSchedule = await fetch(`${url}/schedule`);
      const dataSchedule = await resSchedule.json();
      setDataSchedule(dataSchedule);
      const resBands = await fetch(`${url}/bands`);
      const dataBandsInfo = await resBands.json();
      setDataBands(dataBandsInfo);
    };
    fetchData();
  }, []);
  const filteredBands = dataBands?.filter((band) => band.name.toLowerCase().includes(searchTerm.toLowerCase()));
  if (!dataSchedule || !dataBands) {
    return (
      <>
        {" "}
        <h2 className="text-rose-500" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 700 }}>
          {" "}
          Loading...{" "}
        </h2>{" "}
        <div className="flex flex-wrap justify-center"></div>{" "}
      </>
    );
  }
  const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const date = new Date();
  const dayName = days[date.getDay()];
  const currentHour = date.getHours();
  const getCurrentAct = (schedule) => {
    return schedule.find((act) => {
      const startHour = parseInt(act.start.split(":")[0]);
      const endHour = parseInt(act.end.split(":")[0]);
      return currentHour >= startHour && currentHour < endHour;
    });
  };
  const getBandInfo = (bandName) => {
    if (bandName === "break") {
      return { name: "break", logo: "break.jpg" };
    }
    return dataBands.find((band) => band.name === bandName);
  };
  const getBandLogo = (bandInfo) => {
    if (bandInfo.logo && bandInfo.logo.startsWith("https")) {
      return bandInfo.logo;
    } else if (bandInfo.name === "break") {
      return `/img/${bandInfo.logo}`;
    } else {
      return `${url}/logos/${bandInfo.logo}`;
    }
  };
  const getnextActlink = (nextAct, schedule) => {
    if (nextAct) {
      if (nextAct.act === "break") {
        return "/schedule";
      } else {
        return `/artist/${getBandInfo(nextAct.act).slug}`;
      }
    } else {
      return "/schedule";
    }
  };
  const dayNames = { mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday", sat: "Saturday", sun: "Sunday" };
  return (
    <>
      {" "}
      <div className="container mx-auto max-w-6xl px-4 mt-10 flex flex-col gap-4">
        {" "}
        <Title title="SCHEDULE" /> <h3 className="font-sans font-black text-2xl lg:text-4xl text-stroke-1 text-transparent">Stage</h3>{" "}
        <div className="grid grid-cols content-evenly gap-6 lg:flex lg:justify-between">
          {" "}
          <div className="grid grid-cols-2 lg:flex flex-col lg:flex-row gap-2">
            {" "}
            {}{" "}
            <button
              style={{ backgroundColor: selectedButton === "Midgard" ? "#ff78b5" : "rgb(17 24 39)" }}
              className={`btn btn-block px-8 py-2 bg-pink-500 text-indigo-900 text-xs lg:text-base w-fit rounded border ${selectedButton === "Midgard" ? "border-pink-500 " : "border-gray-500"} hover:bg-pink-500 hover:border-pink-500 hover:scale-105`}
              onClick={() => {
                showSelectedScene(`Midgard`);
                setSelectedButton(`Midgard`);
              }}>
              {" "}
              Midgard{" "}
            </button>{" "}
            <button
              style={{ backgroundColor: selectedButton === "Vanaheim" ? "#882dc8" : "rgb(17 24 39)" }}
              className={`btn btn-block px-8 py-2 bg-purple-500 text-indigo-900 text-xs lg:text-base w-fit rounded border ${selectedButton === "Midgard" ? "border-purple-500 " : "border-gray-500"} hover:bg-purple-500 hover:border-purple-500 hover:scale-105`}
              onClick={() => {
                showSelectedScene(`Vanaheim`);
                setSelectedButton(`Vanaheim`);
              }}>
              {" "}
              Vanaheim{" "}
            </button>{" "}
            <button
              style={{ backgroundColor: selectedButton === "Jotunheim" ? "#f6dc19" : "rgb(17 24 39)" }}
              className={`btn px-8 py-2 bg-yellow-400 text-indigo-900 text-xs lg:text-base w-fit rounded border ${selectedButton === "Jotunheim" ? "border-yellow-400" : "border-gray-500"} hover:bg-yellow-400 hover:border-yellow-400 hover:scale-105`}
              onClick={() => {
                showSelectedScene(`Jotunheim`);
                setSelectedButton(`Jotunheim`);
              }}>
              {" "}
              Jotunheim{" "}
            </button>{" "}
            <button
              style={{ backgroundColor: selectedButton === "All stages" ? "rgb(17 24 39)" : "rgb(17 24 39)" }}
              className="btn px-8 py-2 bg-gray-900 text-gray-100 text-xs lg:text-base w-fit rounded border border-gray-500 hover:bg-gray-900 hover:border-gray-300 hover:scale-105"
              onClick={() => {
                showSelectedScene(`All stages`);
                setSelectedButton(`All stages`);
              }}>
              {" "}
              All stages{" "}
            </button>{" "}
          </div>{" "}
          <div className="flex items-center">
            {" "}
            <input className="input input-bordered input-sm lg:input-md w-full max-w-xs text-xs px-8 py-2 bg-indigo-900 text-gray-100 lg:text-base rounded border border-lime-500 hover:scale-105" type="text" placeholder="Search artist..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /> {} {}{" "}
          </div>{" "}
        </div>{" "}
        {}{" "}
        <div className="flex flex-row lg:grid lg:grid-cols-7 lg:gap-4 overflow-x-scroll overflow-y-hidden snap-mandatory scrollbar-hide gap-x-6 scrollbar-hide mb-20 ring-4 ring-purple-950 ring-offset-4 ring-offset-slate-50 dark:ring-offset-cyan-300 rounded-3xl p-10 bg-fuchsia-950 opacity-90" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 400 }}>
          {" "}
          {}{" "}
          {["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((dayName) => (
            <div key={dayName} className="flex flex-col items-start">
              {" "}
              <h2 className="text-xl font-bold mb-3 text-center">{dayNames[dayName].toUpperCase()}</h2> {}{" "}
              {Object.keys(dataSchedule).map((scene) => {
                const schedule = dataSchedule[scene][dayName];
                const filteredSchedule = schedule.filter((slot) => slot.act.toLowerCase().includes(searchTerm.toLowerCase()));
                return filteredSchedule.map((slot, index) => {
                  if (selectedScene !== "All stages" && scene !== selectedScene) {
                    return null;
                  }
                  const bandName = slot.act;
                  if (bandName === "break") return null;
                  const bandInfo = getBandInfo(bandName);
                  const bandLogo = getBandLogo(bandInfo);
                  const nextAct = schedule[index + 1];
                  4;
                  const nextActLink = getnextActlink(nextAct, schedule);
                  if (bandName) {
                    return <ScheduleCard key={index} slug={bandName === "break" ? "/schedule" : `/artist/${bandInfo.slug}`} scene={scene} artist={slot.act} time={slot.start} src={bandLogo} logoCredits={bandInfo.logoCredits} nextTime={nextAct ? nextAct.start : "tomorrow"} nextBand={nextAct ? nextAct.act : "check schedule"} nextSlug={nextActLink} />;
                  }
                  return null;
                });
              })}{" "}
            </div>
          ))}{" "}
        </div>{" "}
      </div>{" "}
    </>
  );
}
