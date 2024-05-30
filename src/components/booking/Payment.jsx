import { IconCreditCard } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
const Payment = ({ email, setEmail, termsAccepted, setTermsAccepted }) => {
  const [state, setState] = useState({ number: "", expiry: "", cvc: "", name: "", focus: "" });
  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    let newValue = value;
    if (name === "number" || name === "cvc" || name === "expiry") {
      newValue = value.replace(/\D/g, "");
    }
    if (name === "name") {
      newValue = value.replace(/[^a-zA-Z ]/g, "");
    }
    setState((prev) => ({ ...prev, [name]: newValue }));
  };
  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };
  useEffect(() => {
    console.log(state);
  }, [state]);
  return (
    <div className=" h-full flex flex-col justify-between w-full">
      {" "}
      {}{" "}
      <div className="flex gap-2 items-center mt-4 md:mt-0 mb-4 md:mb-0">
        {" "}
        {} <IconCreditCard color="#FD1995" size="60" /> {}{" "}
        <h1 className="font-medium text-2xl" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 200 }}>
          Payment
        </h1>{" "}
        {}{" "}
      </div>{" "}
      <div className="flex flex-col justify-evenly flex-grow">
        {" "}
        {}{" "}
        <div className="flex flex-col items-center gap-8 ">
          {" "}
          {} <Cards number={state.number} expiry={state.expiry} cvc={state.cvc} name={state.name} focused={state.focus} /> {}{" "}
          <form className=" flex flex-col gap-3 justify-center max-w-sm w-full">
            {" "}
            {} <input type="text" name="name" placeholder="Name" className="input input-bordered input-sm border-2 border-indigo-900 bg-indigo-900 bg-opacity-50 rounded-lg mb-4 py-0.5 px-4 w-full hover:scale-105 focus:outline-none focus:border-lime-500 focus:ring-1 focus:ring-lime-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-rose-500 focus:invalid:ring-rose-500" value={state.name} onChange={handleInputChange} onFocus={handleInputFocus} required /> {}{" "}
            <input type="tel" pattern="\d{4} \d{4} \d{4} \d{4}" name="number" placeholder="Card Number" className="input input-bordered input-sm border-2 border-indigo-900 bg-indigo-900 bg-opacity-50 rounded-lg mb-4 py-0.5px-6 w-full hover:scale-105 focus:outline-none focus:border-lime-500 focus:ring-1 focus:ring-lime-500 " value={state.number} onChange={handleInputChange} onFocus={handleInputFocus} maxLength="16" required /> {}{" "}
            <div className="grid grid-cols-3 gap-3">
              {" "}
              {} <input type="tel" pattern="\d{2}\/\d{2}" name="expiry" placeholder="MM/YY" className="input input-bordered input-sm border-2 border-indigo-900 bg-indigo-900 bg-opacity-50 rounded-lg py-0.5px-6 hover:scale-105 focus:outline-none focus:border-lime-500 focus:ring-1 focus:ring-lime-500 w-full col-span-2 " value={state.expiry} onChange={handleInputChange} onFocus={handleInputFocus} maxLength="4" required /> {}{" "}
              <input type="tel" pattern="\d{3}" name="cvc" placeholder="CVC" className="input input-bordered input-sm border-2 border-indigo-900 bg-indigo-900 bg-opacity-50 rounded-lg py-0.5 px-6 w-full hover:scale-105 focus:outline-none focus:border-lime-500 focus:ring-1 focus:ring-lime-500" value={state.cvc} onChange={handleInputChange} onFocus={handleInputFocus} maxLength="3" required /> {}{" "}
            </div>{" "}
          </form>{" "}
          {}{" "}
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered input-sm border-2 border-indigo-900 bg-indigo-900 bg-opacity-50 rounded-lg py-0.5 px-6 w-full hover:scale-105 focus:outline-none focus:border-lime-500 focus:ring-1 focus:ring-lime-500 max-w-sm invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-rose-500 focus:invalid:ring-rose-500"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />{" "}
          {}{" "}
          <div className="flex items-center gap-2 text-gray-400 mb-6">
            {" "}
            <input
              id="checkbox"
              type="checkbox"
              className="checkbox checkbox-primary accent-lime-300 hover:scale-105 outline-none focus:outline-none focus:border-lime-500 focus:ring-1 focus:ring-lime-500 w-6 h-6"
              checked={termsAccepted}
              onChange={(e) => {
                setTermsAccepted(e.target.checked);
              }}
            />{" "}
            <label for="checkbox" className="text-sm select-none text-white ">
              {" "}
              {}I accept{" "}
              <a href="/" className="underline underline-offset-4 text-white decoration-primary ml-2 hover:text-lime-300 hover:scale-105 transition-colors">
                {" "}
                Terms & Conditions{" "}
              </a>{" "}
            </label>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
export default Payment;
