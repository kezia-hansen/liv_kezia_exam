"use client"; // Bruger klientindstillingen for dette modul
import { useState, useEffect } from "react"; // Importér useState og useEffect hooks fra React
/* import { sendMail } from "@/utils/sendMail";
 */ import { Optional } from "../../components/booking/Optional"; // Importér Optional-komponenten
import Tickets from "../../components/booking/Tickets"; // Importér Tickets-komponenten
import TicketHolders from "../../components/booking/TicketHolders"; // Importér TicketHolders-komponenten
import Payment from "../../components/booking/Payment"; // Importér Payment-komponenten
import PaymentStatus from "../../components/booking/PaymentStatus"; // Importér PaymentStatus-komponenten
import OrderSummary from "../../components/booking/OrderSummary"; // Importér OrderSummary-komponenten
import MobileOrderSummary from "../../components/booking/MobileOrderSummery"; // Importér MobileOrderSummary-komponenten
import BackAndContinueButtons from "../../components/booking/BackAndContinueButtons"; // Importér BackAndContinueButtons-komponenten
import Camping from "@/components/booking/camping/Camping"; // Importér Camping-komponenten
/*
import { supabase } from "@/utils/supabaseClient"; */ // Importér supabase-klienten
import { url } from "/config"; // Importér URL'en fra konfigurationsfilen

// Funktionen Page repræsenterer bookingsiden
function Page() {
  // States
  const [currentSlide, setCurrentSlide] = useState(0); // State for den aktuelle slide
  const [allChoices, setAllChoices] = useState({}); // State for alle valg
  const [regularTickets, setRegularTickets] = useState(0); // State for antallet af almindelige billetter
  const [vipTickets, setVipTickets] = useState(0); // State for antallet af VIP-billetter
  const [ticketHolders, setTicketHolders] = useState({
    // State for billetindehavere
    regular: new Array(regularTickets).fill(""),
    vip: new Array(vipTickets).fill(""),
  });
  const [totalTickets, setTotalTickets] = useState(0); // State for det samlede antal billetter
  const [totalPrice, setTotalPrice] = useState(0); // State for den samlede pris
  const [spots, setSpots] = useState([]); // State for tilgængelige pladser
  const [selectedSpot, setSelectedSpot] = useState(null); // State for den valgte plads
  const [selectedCamp, setSelectedCamp] = useState(null); // State for det valgte lejrområde
  const [twoPersonTents, settwoPersonTents] = useState(0); // State for antallet af telte til to personer
  const [threePersonTents, setThreePersonTents] = useState(0); // State for antallet af telte til tre personer
  const [greenCamping, setGreenCamping] = useState(false); // State for valget af grøn camping
  const [totalSelectedCapacity, setTotalSelectedCapacity] = useState(0); // State for den samlede valgte kapacitet
  const [email, setEmail] = useState(""); // State for e-mail
  const [termsAccepted, setTermsAccepted] = useState(false); // State for accept af vilkår
  const [reservationId, setReservationId] = useState(null); // State for reservations-ID
  const [countdown, setCountdown] = useState(300); // State for nedtællingen
  const [countdownInterval, setCountdownInterval] = useState(null); // State for intervallet for nedtællingen
  const [minutes, setMinutes] = useState(5); // State for minutter
  const [seconds, setSeconds] = useState(0); // State for sekunder
  const [isPulsing, setIsPulsing] = useState(false); // State for puls-effekten
  const [ticketsReserved, setTicketsReserved] = useState(false); // State for reserverede billetter
  const [isModalOpen, setIsModalOpen] = useState(false); // State for åbning af modal
  const [paymentSuccess, setPaymentSuccess] = useState(false); // State for betalingsstatus
  const [warningCamp, setWarningCamp] = useState(false); // State for advarslen om lejrplads

  // Funktion til afsendelse af e-mail med ordrebekræftelse til kunden
  function sendMailToCustomer() {
    // Mailindhold
    const mailContent = {
      to: email,
      subject: "Order confirmation",
      html: {
        numRegular: allChoices.regularTickets,
        numVip: allChoices.vipTickets,
        campArea: allChoices.area,
        numtwoTent: allChoices.twoPersonTents,
        numThreeTent: allChoices.threePersonTents,
        greenCamping: allChoices.greenCamping ? "Yes" : "No",
        totalPrice: allChoices.totalPrice,
      },
      company: "FooFest - Festival",
      sendername: "FooFest Customer Support",
      template: "foofest-template",
    };
    sendMail(mailContent); // Send mail med indholdet
  }

  // Funktion til opdatering af antallet af billetter
  const updateTickets = (type, operation) => {
    // Tjek om billetter allerede er reserveret
    if (ticketsReserved) {
      setIsModalOpen(true); // Åbn modal
      return;
    }
    // Bestem om billettypen er VIP
    const isVip = type === "vip";
    const currentTickets = isVip ? vipTickets : regularTickets;
    // Tjek om operationen er gyldig
    if (operation === "increase" || (operation === "decrease" && currentTickets > 0)) {
      const newTickets = operation === "increase" ? currentTickets + 1 : currentTickets - 1;
      const setTickets = isVip ? setVipTickets : setRegularTickets;
      setTickets(newTickets);
    }
  };

  // Funktion til opdatering af antallet af telte
  const updateTents = (tentType, operation) => {
    const tentCapacity = tentType === "two" ? 2 : 3;
    const currentTents = tentType === "two" ? twoPersonTents : threePersonTents;

    // Tjek om operationen er gyldig
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

  // Funktion til at skifte slide
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
        // Fortsæt kun hvis der er valgt en lejrplads
        changeSlide("next");
        reserveSpot();
      } else {
        // Vis en fejlmeddelelse eller forhindr brugeren i at fortsætte, hvis ingen lejrplads er valgt
        alert("Please select a camp before proceeding.");
      }
    } else {
      changeSlide("next");
    }
  }

  // Funktion til at håndtere bekræftelsesknappen i modalen
  function handleModalConfirm() {
    resetCountdown();
    setIsModalOpen(false);
    setSelectedCamp(null);
    setReservationId(null);
  }

  // Funktion til at åbne modalen hvis der er reserverede billetter og brugeren forsøger at ændre ordren
  function mapHandleModal() {
    if (ticketsReserved === true) {
      setIsModalOpen(true);
    } else {
      return;
    }
  }

  // Funktion til valg af en plads
  function selectSpot(spot) {
    if (ticketsReserved === true) {
      setIsModalOpen(true);
    } else {
      setSelectedSpot(spot.area); // Opdater valgteSpot med området for pladsen
      setSelectedCamp(spot.area); // Opdater valgteCamp med området for pladsen
    }
  }

  // Funktion til reservation af en plads
  function reserveSpot() {
    if (ticketsReserved) {
      return;
    }
    fetch(`${url}/reserve-spot`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        area: selectedSpot,
        amount: totalTickets,
      }),
    })
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

  // Funktion til afsendelse af data til Supabase ved succesfuld betaling
  async function dataToSupabase() {
    const { data, error } = await supabase.from("orders").insert([
      {
        email: email,
        regular_tickets: regularTickets,
        vip_tickets: vipTickets,
        area: selectedSpot,
        green_camping: greenCamping,
        two_person_tents: twoPersonTents,
        three_person_tents: threePersonTents,
        total_price: totalPrice,
        ticket_holders: ticketHolders,
        reservation_id: reservationId,
      },
    ]);
    if (error) {
      console.error("Error inserting:", error);
    } else {
      console.log("Success:", data);
    }
  }

  // Funktion til opfyldelse af reservationen ved hjælp af API'en og reservations-ID'et
  function fulfillReservation() {
    fetch(`${url}/fullfill-reservation`, {
      method: "POST",
      body: {
        id: reservationId,
      },
    })
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

  // Nulstil nedtællingen og andre states
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

  // Effekt til at kontrollere om den valgte plads kan rumme det samlede antal billetter.
  // Hvis ikke, indstil en advarsel og nulstil den valgte plads og lejren.
  // Hvis det samlede antal billetter er nul eller større end de tilgængelige pladser, nulstil den valgte plads og lejren.
  // Hvis den valgte plads kan rumme det samlede antal billetter, fjern advarslen.
  useEffect(() => {
    const selectedSpotDetails = spots.find((spot) => spot.area === selectedSpot);

    // Kontroller om den valgte plads kan rumme det samlede antal billetter
    if (selectedSpotDetails && totalTickets > selectedSpotDetails.available) {
      setWarningCamp(true);
      setSelectedSpot(null);
      setSelectedCamp(null);
    } else if (
      // Kontroller om det samlede antal billetter er nul eller større end de tilgængelige pladser
      (selectedSpotDetails && totalTickets > selectedSpotDetails.available) ||
      totalTickets === 0
    ) {
      // Hvis ingen reservations-ID, nulstil den valgte plads og lejren
      if (!reservationId) {
        setSelectedSpot(null);
        setSelectedCamp(null);
      }
    } else if (
      // Hvis den valgte plads kan rumme det samlede antal billetter, fjern advarslen
      selectedSpotDetails &&
      totalTickets <= selectedSpotDetails.available
    ) {
      setWarningCamp(false);
    }
  }, [totalTickets, selectedSpot, spots, reservationId]);

  // Beregn den samlede pris og antallet af billetter, og opdater allChoices-objektet
  useEffect(() => {
    const bookingFee = 99;
    const ticketPrice = regularTickets * 799 + vipTickets * 1299;
    const tentPrice = twoPersonTents * 299 + threePersonTents * 399;
    const greenCampingPrice = greenCamping ? 249 : 0;
    const totalPrice = ticketPrice + tentPrice + bookingFee + greenCampingPrice;

    setTotalTickets(regularTickets + vipTickets);
    setTotalPrice(totalPrice);

    setAllChoices({
      regularTickets,
      vipTickets,
      totalTickets,
      selectedSpot,
      greenCamping,
      totalPrice,
      twoPersonTents,
      threePersonTents,
      ticketHolders,
      reservationId,
      email,
    });
  }, [regularTickets, vipTickets, selectedSpot, greenCamping, totalTickets, twoPersonTents, threePersonTents, ticketHolders, reservationId, email]);

  // Hent de tilgængelige pladser fra API'en ved siden indlæses
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
      {/* Modalen vises kun hvis isModalOpen er sand */}
      <dialog id="my_modal_1" className={isModalOpen ? "modal modal-open " : "modal"}>
        <div className="modal-box bg-gray-800 border border-gray-700 rounded-lg">
          {/* Titlen og advarselsteksten i modalen */}
          <h3 className="font-bold text-lg">Advarsel!</h3>
          <p className="py-4">
            Ændring af din ordre vil nulstille din reservation. <br></br>Er du sikker på, at du vil fortsætte?
          </p>
          <div className="modal-action font-medium">
            {/* Annuller-knappen, der lukker modalen uden at fortsætte */}
            <button className="btn btn-neutral font-medium text-base rounded py-1 px-4 w-fit" onClick={() => setIsModalOpen(false)}>
              Annuller
            </button>
            {/* Bekræft-knappen, der lukker modalen og fortsætter bookingprocessen */}
            <button className="btn btn-primary font-medium text-emerald-100 text-base rounded py-1 px-4 w-fit border border-emerald-500 hover:bg-emerald-500 hover:border-emerald-400" onClick={handleModalConfirm}>
              Bekræft
            </button>
          </div>
        </div>
      </dialog>

      {/* Sektionen indeholder de forskellige trin i bookingprocessen */}
      <section className="w-full h-full  md:h-5/6 bg-violet-800 bg-opacity-50 max-w-7xl flex flex-col md:flex-row md:rounded-xl  border-rose-500 border-4  relative overflow-hidden">
        {/* Indholdet afhænger af det aktuelle trin i bookingprocessen */}
        <div className={` ${ticketsReserved ? "mt-28" : "mt-12"} md:mt-0 bg-violet-800 bg-opacity-50 w-full  h-full order-2 md:order-1 p-6 md:p-12 flex flex-col justify-between`}>
          {(currentSlide === 0 && <Tickets regularTickets={regularTickets} vipTickets={vipTickets} totalTickets={totalTickets} spots={spots} selectedSpot={selectedSpot} updateTickets={updateTickets} selectSpot={selectSpot} setSelectedSpot={setSelectedSpot} ticketsReserved={ticketsReserved} selectedCamp={selectedCamp} setSelectedCamp={setSelectedCamp} mapHandleModal={mapHandleModal} reservationId={reservationId} warningCamp={warningCamp} />) ||
            (currentSlide === 1 && <Camping selectSpot={selectSpot} setSelectedSpot={setSelectedSpot} ticketsReserved={ticketsReserved} setSelectedCamp={setSelectedCamp} selectedCamp={selectedCamp} mapHandleModal={mapHandleModal} reservationId={reservationId} warningCamp={warningCamp} />) ||
            (currentSlide === 2 && <Optional updateTents={updateTents} twoPersonTents={twoPersonTents} threePersonTents={threePersonTents} totalTickets={totalTickets} greenCamping={greenCamping} setGreenCamping={setGreenCamping} totalSelectedCapacity={totalSelectedCapacity} setTotalSelectedCapacity={setTotalSelectedCapacity} />) ||
            (currentSlide === 3 && <TicketHolders regularTickets={regularTickets} vipTickets={vipTickets} ticketHolders={ticketHolders} setTicketHolders={setTicketHolders} />) ||
            (currentSlide === 4 && <Payment email={email} setEmail={setEmail} termsAccepted={termsAccepted} setTermsAccepted={setTermsAccepted} />) ||
            (currentSlide === 5 && <PaymentStatus paymentSuccess={paymentSuccess} />)}
          {/* Knapper til at gå tilbage og fortsætte i bookingprocessen */}
          <BackAndContinueButtons currentSlide={currentSlide} changeSlide={changeSlide} handleContinue={handleContinue} totalTickets={totalTickets} selectedSpot={selectedSpot} ticketHolders={ticketHolders} fulfillReservation={fulfillReservation} dataToSupabase={dataToSupabase} sendMailToCustomer={sendMailToCustomer} email={email} termsAccepted={termsAccepted} selectedCamp={selectedCamp} />
          <br />
          <br />
        </div>
        {currentSlide !== 5 && (
          <div className="hidden h-full w-7/12 order-2 md:block">
            <OrderSummary allChoices={allChoices} currentSlide={currentSlide} countdown={countdown} minutes={minutes} seconds={seconds} isPulsing={isPulsing} ticketsReserved={ticketsReserved} totalPrice={totalPrice} regularTickets={regularTickets} vipTickets={vipTickets} selectedSpot={selectedSpot} selectedCamp={selectedCamp} greenCamping={greenCamping} twoPersonTents={twoPersonTents} threePersonTents={threePersonTents} totalTickets={totalTickets} />
          </div>
        )}
        <div className="order-1 md:hidden">{currentSlide !== 5 && <MobileOrderSummary allChoices={allChoices} currentSlide={currentSlide} countdown={countdown} minutes={minutes} seconds={seconds} isPulsing={isPulsing} ticketsReserved={ticketsReserved} totalPrice={totalPrice} regularTickets={regularTickets} vipTickets={vipTickets} selectedSpot={selectedSpot} greenCamping={greenCamping} twoPersonTents={twoPersonTents} threePersonTents={threePersonTents} totalTickets={totalTickets} />}</div>
      </section>
    </main>
  );
}

export default Page;
