import styles from "./camping.css";
import React, { useState, useEffect } from "react";
import CampingArea from "./CampingArea";
import { IconFlag } from "@tabler/icons-react";
import { v4 as uuidv4 } from "uuid";
import { url } from "../../../../config";
export default function Camping({ totalTickets, spots, setSelectedSpot, setSelectedCamp, selectedCamp, mapHandleModal, reservationId, setReservationId }) {
  function chooseSpot(camp) {
    if (!spots) {
      console.error("Spots data is not available");
      return;
    }
    const selectedSpotDetails = spots.find((spot) => spot.area === camp.area);
    if (reservationId) {
      return;
    } else if (!selectedSpotDetails || selectedSpotDetails.available === 0 || totalTickets > selectedSpotDetails.available) {
      setSelectedSpot(null);
      setSelectedCamp(null);
    } else {
      setSelectedSpot(camp.area);
      const newReservationId = uuidv4();
      setReservationId(newReservationId);
    }
  }
  const [dataCamps, setDataCamps] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resCamps = await fetch(`${url}/available-spots`);
        const dataCamps = await resCamps.json();
        setDataCamps(dataCamps);
      } catch (error) {
        console.error("Error fetching camps:", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    console.log("Spots data: ", spots);
  }, [spots]);
  return (
    <div className="h-full flex flex-col ">
      {" "}
      <div className="flex gap-2 items-center mt-4 md:mt-0 mb-10">
        {" "}
        <IconFlag color="#FD1995" size="60" /> {}{" "}
        <h1 className="font-medium text-2xl " style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 200 }}>
          {" "}
          CAMPS {}{" "}
        </h1>{" "}
      </div>{" "}
      <div className={styles.Camping}>
        {" "}
        {}{" "}
        {dataCamps &&
          dataCamps.map((camp) => (
            <CampingArea
              key={camp.area}
              campName={camp.area}
              available={camp.available}
              spots={camp.spots}
              camp={camp}
              selectedCamp={selectedCamp}
              onClick={() => {
                if (reservationId) {
                  mapHandleModal();
                } else {
                  setSelectedCamp(camp);
                  chooseSpot(camp);
                }
              }}
              totalTickets={totalTickets}
              className="aspect-[3/2] w-full md:col-start-2 md:col-end-4 md:aspect-[2.25/1] rounded-2xl overflow-hidden border border-gray-800"
              mapHandleModal={mapHandleModal}
              reservationId={reservationId}
            />
          ))}{" "}
      </div>{" "}
    </div>
  );
}
