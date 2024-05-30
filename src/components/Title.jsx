import React from "react";
export default function Title(props) {
  return (
    <div className="titlecontainer md:mt-[50px]">
      {" "}
      {}{" "}
      <div style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 700 }} className="titletxt">
        {" "}
        {props.title} {}{" "}
      </div>{" "}
      {} <div className="titleline"></div>{" "}
    </div>
  );
}
