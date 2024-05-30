"use client";
import { url } from "/config";
import Link from "next/link";
import { useEffect, useState } from "react";
function PlayingTime({ band }) {
  const [schedule, setSchedule] = useState("");
  const [stage, setStage] = useState("");
  useEffect(() => {
    fetch(`${url}/schedule`)
      .then((res) => res.json())
      .then((data) => {
        for (let stage in data) {
          for (let day in data[stage]) {
            const timeSlot = data[stage][day].find((slot) => slot.act === band.name);
            const days = { mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday", sat: "Saturday", sun: "Sunday" };
            const fullDay = days[day];
            if (timeSlot) {
              setSchedule(`Playing on ${stage}, ${fullDay} at ${timeSlot.start}`);
              setStage(stage);
            }
          }
        }
      });
  }, [band]);
  return (
    <Link href={`/schedule`}>
      {" "}
      {}{" "}
      <div className={`badge ${stage === "Midgard" ? "bg-pink-400 border-rose-700 text-indigo-950" : stage === "Vanaheim" ? "bg-purple-500 border-purple-500 text-indigo-950" : stage === "Jotunheim" ? "bg-yellow-400 border-yellow-400 text-indigo-950" : "bg-gray-600 border-gray-500 text-gray-100"} rounded-lg h-fit py-1 md:whitespace-nowrap`} style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 700 }}>
        {" "}
        {} {schedule ? <p>{schedule}</p> : <p>Loading...</p>}{" "}
      </div>{" "}
    </Link>
  );
}
export default PlayingTime;
