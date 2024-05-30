"use client";
import { useState, useEffect } from "react";
import { Optional } from "../../components/booking/Optional";
import Tickets from "../../components/booking/Tickets";
import TicketHolders from "../../components/booking/TicketHolders";
import Payment from "../../components/booking/Payment";
import PaymentStatus from "../../components/booking/PaymentStatus";
import OrderSummary from "../../components/booking/OrderSummary";
import MobileOrderSummary from "../../components/booking/MobileOrderSummery";
import BackAndContinueButtons from "../../components/booking/BackAndContinueButtons";
import Camping from "@/components/booking/camping/Camping";
import { url } from "/config";
function Page() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [allChoices, setAllChoices] = useState({});
  const [regularTickets, setRegularTickets] = useState(0);
  const [vipTickets, setVipTickets] = useState(0);
  const [ticketHolders, setTicketHolders] = useState({ regular: new Array(regularTickets).fill(""), vip: new Array(vipTickets).fill("") });
  const [totalTickets, setTotalTickets] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [spots, setSpots] = useState([]);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [twoPersonTents, settwoPersonTents] = useState(0);
  const [threePersonTents, setThreePersonTents] = useState(0);
  const [greenCamping, setGreenCamping] = useState(false);
  const [totalSelectedCapacity, setTotalSelectedCapacity] = useState(0);
  const [email, setEmail] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [reservationId, setReservationId] = useState(null);
  const [countdown, setCountdown] = useState(300);
  const [countdownInterval, setCountdownInterval] = useState(null);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [isPulsing, setIsPulsing] = useState(false);
  const [ticketsReserved, setTicketsReserved] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [warningCamp, setWarningCamp] = useState(false);
  function sendMailToCustomer() {
    const mailContent = { to: email, subject: "Order confirmation", html: { numRegular: allChoices.regularTickets, numVip: allChoices.vipTickets, campArea: allChoices.area, numtwoTent: allChoices.twoPersonTents, numThreeTent: allChoices.threePersonTents, greenCamping: allChoices.greenCamping ? "Yes" : "No", totalPrice: allChoices.totalPrice }, company: "FooFest - Festival", sendername: "FooFest Customer Support", template: "foofest-template" };
    sendMail(mailContent);
  }
  const updateTickets = (type, operation) => {
    if (ticketsReserved) {
      setIsModalOpen(true);
      return;
    }
    const isVip = type === "vip";
    const currentTickets = isVip ? vipTickets : regularTickets;
    if (operation === "increase" || (operation === "decrease" && currentTickets > 0)) {
      const newTickets = operation === "increase" ? currentTickets + 1 : currentTickets - 1;
      const setTickets = isVip ? setVipTickets : setRegularTickets;
      setTickets(newTickets);
    }
  };
  const updateTents = (tentType, operation) => {
    const tentCapacity = tentType === "two" ? 2 : 3;
    const currentTents = tentType === "two" ? twoPersonTents : threePersonTents;
    if (operation === "increase" && totalSelectedCapacity + tentCapacity <= totalTickets) {
      const newTents = currentTents + 1;
      const setTents = tentType === "two" ? settwoPersonTents : setThreePersonTents;
      setTents(newTents);
      setTotalSelectedCapacity((prevCapacity) => prevCapacity + tentCapacity);
    } else if (operation === "decrease" && currentTents > 0) {
      const newTents = currentTents - 1;
      const setTents = tentType === "two" ? settwoPersonTents : setThreePersonTents;
      setTents(newTents);
      setTotalSelectedCapacity((prevCapacity) => prevCapacity - tentCapacity);
    }
  };
  function changeSlide(direction) {
    if (direction === "next") {
      setCurrentSlide(currentSlide + 1);
    } else if (direction === "prev" && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  }
  function handleContinue() {
    if (currentSlide === 1) {
      if (selectedCamp) {
        changeSlide("next");
        reserveSpot();
      } else {
        alert("Please select a camp before proceeding.");
      }
    } else {
      changeSlide("next");
    }
  }
  function handleModalConfirm() {
    resetCountdown();
    setIsModalOpen(false);
    setSelectedCamp(null);
    setReservationId(null);
  }
  function mapHandleModal() {
    if (ticketsReserved === true) {
      setIsModalOpen(true);
    } else {
      return;
    }
  }
  function selectSpot(spot) {
    if (ticketsReserved === true) {
      setIsModalOpen(true);
    } else {
      setSelectedSpot(spot.area);
      setSelectedCamp(spot.area);
    }
  }
  function reserveSpot() {
    if (ticketsReserved) {
      return;
    }
    fetch(`${url}/reserve-spot`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ area: selectedSpot, amount: totalTickets }) })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setTicketsReserved(true);
        setReservationId(data.id);
        setIsPulsing(true);
        setTimeout(() => setIsPulsing(false), 3800);
        setCountdownInterval(
          setInterval(() => {
            setCountdown((prevCountdown) => {
              if (prevCountdown > 0) {
                let minutes = Math.floor(prevCountdown / 60);
                let seconds = prevCountdown % 60;
                setMinutes(minutes);
                setSeconds(seconds);
                return prevCountdown - 1;
              } else {
                setTicketsReserved(false);
                setSelectedSpot(null);
                setTicketHolders({ regular: [], vip: [] });
                clearInterval(countdownInterval);
                setMinutes(5);
                setSeconds(0);
                window.location.reload();
                return 0;
              }
            });
          }, 1000)
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  async function dataToSupabase() {
    const { data, error } = await supabase.from("orders").insert([{ email: email, regular_tickets: regularTickets, vip_tickets: vipTickets, area: selectedSpot, green_camping: greenCamping, two_person_tents: twoPersonTents, three_person_tents: threePersonTents, total_price: totalPrice, ticket_holders: ticketHolders, reservation_id: reservationId }]);
    if (error) {
      console.error("Error inserting:", error);
    } else {
      console.log("Success:", data);
    }
  }
  function fulfillReservation() {
    fetch(`${url}/fullfill-reservation`, { method: "POST", body: { id: reservationId } })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setPaymentSuccess(true);
        resetCountdown();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  function resetCountdown() {
    setCountdown(300);
    setMinutes(5);
    setSeconds(0);
    clearInterval(countdownInterval);
    setCountdownInterval(null);
    setTicketsReserved(false);
    setSelectedSpot(null);
    setTicketHolders({ regular: [], vip: [] });
  }
  useEffect(() => {
    const selectedSpotDetails = spots.find((spot) => spot.area === selectedSpot);
    if (selectedSpotDetails && totalTickets > selectedSpotDetails.available) {
      setWarningCamp(true);
      setSelectedSpot(null);
      setSelectedCamp(null);
    } else if ((selectedSpotDetails && totalTickets > selectedSpotDetails.available) || totalTickets === 0) {
      if (!reservationId) {
        setSelectedSpot(null);
        setSelectedCamp(null);
      }
    } else if (selectedSpotDetails && totalTickets <= selectedSpotDetails.available) {
      setWarningCamp(false);
    }
  }, [totalTickets, selectedSpot, spots, reservationId]);
  useEffect(() => {
    const bookingFee = 99;
    const ticketPrice = regularTickets * 799 + vipTickets * 1299;
    const tentPrice = twoPersonTents * 299 + threePersonTents * 399;
    const greenCampingPrice = greenCamping ? 249 : 0;
    const totalPrice = ticketPrice + tentPrice + bookingFee + greenCampingPrice;
    setTotalTickets(regularTickets + vipTickets);
    setTotalPrice(totalPrice);
    setAllChoices({ regularTickets, vipTickets, totalTickets, selectedSpot, greenCamping, totalPrice, twoPersonTents, threePersonTents, ticketHolders, reservationId, email });
  }, [regularTickets, vipTickets, selectedSpot, greenCamping, totalTickets, twoPersonTents, threePersonTents, ticketHolders, reservationId, email]);
  useEffect(() => {
    const fetchSpots = () => {
      fetch(`${url}/available-spots`)
        .then((res) => res.json())
        .then((data) => {
          setSpots(data);
        });
    };
    fetchSpots();
    const interval = setInterval(fetchSpots, 30000);
    return () => clearInterval(interval);
  }, []);
  return (
    <main className="md:container mx-auto flex flex-col justify-center items-center h-screen w-screen">
      {" "}
      {}{" "}
      <dialog id="my_modal_1" className={isModalOpen ? "modal modal-open " : "modal"}>
        {" "}
        <div className="modal-box bg-gray-800 border border-gray-700 rounded-lg">
          {" "}
          {} <h3 className="font-bold text-lg">Advarsel!</h3>{" "}
          <p className="py-4">
            {" "}
            Ændring af din ordre vil nulstille din reservation. <br></br>Er du sikker på, at du vil fortsætte?{" "}
          </p>{" "}
          <div className="modal-action font-medium">
            {" "}
            {}{" "}
            <button className="btn btn-neutral font-medium text-base rounded py-1 px-4 w-fit" onClick={() => setIsModalOpen(false)}>
              {" "}
              Annuller{" "}
            </button>{" "}
            {}{" "}
            <button className="btn btn-primary font-medium text-emerald-100 text-base rounded py-1 px-4 w-fit border border-emerald-500 hover:bg-emerald-500 hover:border-emerald-400" onClick={handleModalConfirm}>
              {" "}
              Bekræft{" "}
            </button>{" "}
          </div>{" "}
        </div>{" "}
      </dialog>{" "}
      {}{" "}
      <section className="w-full h-full md:h-5/6 bg-violet-800 bg-opacity-50 max-w-7xl flex flex-col md:flex-row md:rounded-xl border-rose-500 border-4 relative overflow-hidden">
        {" "}
        {}{" "}
        <div className={` ${ticketsReserved ? "mt-28" : "mt-12"} md:mt-0 bg-violet-800 bg-opacity-50 w-full h-full order-2 md:order-1 p-6 md:p-12 flex flex-col justify-between`}>
          {" "}
          {(currentSlide === 0 && <Tickets regularTickets={regularTickets} vipTickets={vipTickets} totalTickets={totalTickets} spots={spots} selectedSpot={selectedSpot} updateTickets={updateTickets} selectSpot={selectSpot} setSelectedSpot={setSelectedSpot} ticketsReserved={ticketsReserved} selectedCamp={selectedCamp} setSelectedCamp={setSelectedCamp} mapHandleModal={mapHandleModal} reservationId={reservationId} warningCamp={warningCamp} />) ||
            (currentSlide === 1 && <Camping selectSpot={selectSpot} setSelectedSpot={setSelectedSpot} ticketsReserved={ticketsReserved} setSelectedCamp={setSelectedCamp} selectedCamp={selectedCamp} mapHandleModal={mapHandleModal} reservationId={reservationId} warningCamp={warningCamp} />) ||
            (currentSlide === 2 && <Optional updateTents={updateTents} twoPersonTents={twoPersonTents} threePersonTents={threePersonTents} totalTickets={totalTickets} greenCamping={greenCamping} setGreenCamping={setGreenCamping} totalSelectedCapacity={totalSelectedCapacity} setTotalSelectedCapacity={setTotalSelectedCapacity} />) ||
            (currentSlide === 3 && <TicketHolders regularTickets={regularTickets} vipTickets={vipTickets} ticketHolders={ticketHolders} setTicketHolders={setTicketHolders} />) ||
            (currentSlide === 4 && <Payment email={email} setEmail={setEmail} termsAccepted={termsAccepted} setTermsAccepted={setTermsAccepted} />) ||
            (currentSlide === 5 && <PaymentStatus paymentSuccess={paymentSuccess} />)}{" "}
          {} <BackAndContinueButtons currentSlide={currentSlide} changeSlide={changeSlide} handleContinue={handleContinue} totalTickets={totalTickets} selectedSpot={selectedSpot} ticketHolders={ticketHolders} fulfillReservation={fulfillReservation} dataToSupabase={dataToSupabase} sendMailToCustomer={sendMailToCustomer} email={email} termsAccepted={termsAccepted} selectedCamp={selectedCamp} /> <br /> <br />{" "}
        </div>{" "}
        {currentSlide !== 5 && (
          <div className="hidden h-full w-7/12 order-2 md:block">
            {" "}
            <OrderSummary allChoices={allChoices} currentSlide={currentSlide} countdown={countdown} minutes={minutes} seconds={seconds} isPulsing={isPulsing} ticketsReserved={ticketsReserved} totalPrice={totalPrice} regularTickets={regularTickets} vipTickets={vipTickets} selectedSpot={selectedSpot} selectedCamp={selectedCamp} greenCamping={greenCamping} twoPersonTents={twoPersonTents} threePersonTents={threePersonTents} totalTickets={totalTickets} />{" "}
          </div>
        )}{" "}
        <div className="order-1 md:hidden">{currentSlide !== 5 && <MobileOrderSummary allChoices={allChoices} currentSlide={currentSlide} countdown={countdown} minutes={minutes} seconds={seconds} isPulsing={isPulsing} ticketsReserved={ticketsReserved} totalPrice={totalPrice} regularTickets={regularTickets} vipTickets={vipTickets} selectedSpot={selectedSpot} greenCamping={greenCamping} twoPersonTents={twoPersonTents} threePersonTents={threePersonTents} totalTickets={totalTickets} />}</div>{" "}
      </section>{" "}
    </main>
  );
}
export default Page;
