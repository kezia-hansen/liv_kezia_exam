import styles from "./camping.css";
import React from "react";
import CampingArea from "./CampingArea";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { url } from "../../../../config";

export default function Camping({ regularTickets, vipTickets, totalTickets, spots, setSelectedSpot, selectedSpot, updateTickets, setSelectedCamp, selectedCamp, mapHandleModal, reservationId, warningCamp }) {
  {
    function chooseSpot(selectedSpot) {
      const selectedSpotDetails = spots.find((spot) => spot.area === selectedSpot);

      if (reservationId) {
        return;
      } else if (selectedSpotDetails.available === 0 || totalTickets > selectedSpotDetails.available) {
        console.log(selectedSpot);
        setSelectedSpot(null);
        setSelectedCamp(null);
      } else {
        setSelectedSpot(selectedSpot);
      }
    }

    const [dataCamps, setDataCamps] = useState(null);
    const [selectedSpot, setSelectedCamp] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        const resCamps = await fetch(`${url}/available-spots`);
        const dataCamps = await resCamps.json();
        setDataCamps(dataCamps);
      };

      fetchData();
    }, []);

    return (
      <div className={styles.Camping}>
        {dataCamps &&
          dataCamps.map((camp) => (
            <CampingArea
              key={camp.area}
              campName={camp.area}
              available={camp.available}
              spots={camp.spots}
              camp={camp}
              selectedCamp={selectedCamp}
              onClick={(e) => {
                setSelectedCamp(camp);
              }}
              chooseSpot={chooseSpot}
              totalTickets={totalTickets}
              className="aspect-[3/2] w-full md:col-start-2 md:col-end-4 md:aspect-[2.25/1] rounded-2xl overflow-hidden border border-gray-800"
              mapHandleModal={mapHandleModal}
              reservationId={reservationId}
            />
          ))}
      </div>
    );
  }
}
