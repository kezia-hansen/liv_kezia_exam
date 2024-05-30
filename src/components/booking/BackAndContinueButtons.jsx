import Link from "next/link";
import React from "react";
function BackButton({ currentSlide, changeSlide }) {
  if (currentSlide === 0) {
    return (
      <Link href="/">
        {" "}
        <button className="text-m bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 backdrop-blur-md transition-all hover:scale-105 border-4 border-lime-400 rounded-2xl text-lime-400 cursor-pointer h-14 px-12 max-w-s" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 700 }}>
          {" "}
          BACK{" "}
        </button>{" "}
      </Link>
    );
  }
  if (currentSlide > 0 && currentSlide < 5) {
    return (
      <button className="text-m bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 backdrop-blur-md transition-all hover:scale-105 border-4 border-lime-400 rounded-2xl text-lime-400 cursor-pointer h-14 px-12 max-w-s" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 700 }} onClick={() => changeSlide("prev")}>
        {" "}
        BACK{" "}
      </button>
    );
  }
  return null;
}
function ContinueButton({ currentSlide, totalTickets, ticketHolders, selectedSpot, fulfillReservation, sendMailToCustomer, dataToSupabase, email, termsAccepted, handleContinue }) {
  const isContinueButtonEnabled = () => {
    const isTicketHolderValid = ticketHolders.regular.filter(Boolean).length + ticketHolders.vip.filter(Boolean).length === totalTickets;
    const isEmailValid = email && email.includes("@");
    const isTermsAccepted = termsAccepted;
    return totalTickets > 0 > selectedSpot && !(currentSlide === 3 && !isTicketHolderValid) && !(currentSlide === 6 && (!isEmailValid || !isTermsAccepted));
  };
  const handleButtonClick = () => {
    if (isContinueButtonEnabled()) {
      if (currentSlide === 5) {
        fulfillReservation();
        sendMailToCustomer();
        dataToSupabase();
      }
      handleContinue();
    }
  };
  if (currentSlide === 5) {
    return null;
  }
  return (
    <button className={` ${isContinueButtonEnabled() ? "bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 text-lime-400" : "btn-disabled"} backdrop-blur-md transition-all hover:scale-105 border-4 border-lime-400 rounded-2xl text-lime-400 cursor-pointer h-14 px-12 max-w-s" `} style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 700 }} onClick={handleButtonClick}>
      {" "}
      {currentSlide === 5 ? "FINISH PAYMENT" : "CONTINUE"}{" "}
    </button>
  );
}
function BackAndContinueButtons(props) {
  return (
    <div className="place-self-end space-x-6 z-50">
      {" "}
      <BackButton {...props} /> <ContinueButton {...props} />{" "}
    </div>
  );
}
export default BackAndContinueButtons;
