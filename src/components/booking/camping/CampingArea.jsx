import { useEffect, useRef, useState } from "react";
import styles from "./camping.css";
import React from "react";
export default function CampingArea(props) {
  const { camp, selectedCamp } = props;
  const isActive = selectedCamp && camp.area === selectedCamp.area;
  const [isClicked, setIsClicked] = useState(false);
  const divRef = useRef(null);
  const handleClick = () => {
    setIsClicked(true);
    props.onClick();
  };
  useEffect(() => {
    if (isClicked && divRef.current) {
      divRef.current.addEventListener("animationend", () => {
        setIsClicked(false);
      });
    }
  }, [isClicked]);
  return (
    <div ref={divRef} className={`font-normal flex justify-between w-full border-2 border-lime-500 bg-indigo-900 rounded-lg mb-4 py-4 px-6 bg-opacity-20 hover:bg-opacity-60 hover:text-white hover:scale-105 hover:cursor-pointer transition-all ${isActive ? "active:bg-opacity-100 active:bg-indigo-900 text-white" : "text-white bg-opacity-100 bg-indigo-900"} ${isClicked ? "ani_scale" : ""} ${props.available === 0 ? "text-gray-600 bg-gray-800 border-gray-900" : "bg-gray-700 border-gray-800"}`} onClick={handleClick}>
      {" "}
      <p style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 700 }}>{props.campName}</p> {}{" "}
      <p style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 200 }}>
        {" "}
        {props.available} / {props.spots} {}{" "}
      </p>{" "}
    </div>
  );
}
