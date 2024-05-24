import { useEffect, useRef, useState } from "react";
import styles from "./camping.css";
import React from "react";

export default function Camp(props) {
  const { camp, selectedSpot } = props;
  const isActive = selectedSpot && camp.area === selectedSpot.area;
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
    <div ref={divRef} className={`font-normal flex justify-between w-full hover:text-gray-100 border rounded-lg mb-4 py-7 px-6 bg-opacity-20 hover:bg-opacity-60 hover:cursor-pointer transition-all ${isActive ? "bg-opacity-60 text-gray-50" : "text-gray-400"} ${isClicked ? "ani_scale" : ""} ${props.available === 0 ? "text-gray-600 bg-gray-800 border-gray-900" : /* campColors[props.campName] */ /*  ||  */ "bg-gray-700 border-gray-800"}`} onClick={handleClick}>
      <p>{props.campName}</p>
      <p>
        {props.available} / {props.spots}
      </p>
    </div>
  );
}
/*   return (
    <div
      className={`${styles.CampingArea} ${isActive ? "" : styles.disabled}`} */
/*    style={{
              backgroundColor: props.selectedCamp.campName === props.camp ? "#DFFE00" : "",
        cursor: isActive ? "pointer" : "not-allowed",
        pointerEvents: isActive ? "auto" : "none",
      }} */
/*      onClick={() => {
        props.setSelectedCamping({
          name: props.campName,
          type: "Camping",
          id: props.id,
        });

        handleClick();
      }}
    >
      <h2>{props.camp}</h2>
      <p>
        {props.available}/{props.spots} Available
      </p>
    </div>
  ); */
