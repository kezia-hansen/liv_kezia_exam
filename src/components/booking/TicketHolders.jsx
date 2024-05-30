import { IconUsersGroup } from "@tabler/icons-react";
import React from "react";
const TicketHolders = ({ regularTickets, vipTickets, ticketHolders, setTicketHolders }) => {
  const handleInputChange = (type, index, value) => {
    let newTicketHolders = [...ticketHolders[type]];
    newTicketHolders[index] = value;
    setTicketHolders({ ...ticketHolders, [type]: newTicketHolders });
  };
  return (
    <div className="h-full flex flex-col justify-between">
      {" "}
      {}{" "}
      <div className="flex gap-2 items-center mt-4 md:mt-0">
        {" "}
        <IconUsersGroup color="#FD1995" size="60" />{" "}
        <h1 className="font-medium text-2xl" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 200 }}>
          {" "}
          TICKET HOLDERS{" "}
        </h1>{" "}
      </div>{" "}
      {}{" "}
      <div className="flex flex-col justify-evenly flex-grow">
        {" "}
        <div className="place-self-center flex flex-col gap-4">
          {" "}
          {}{" "}
          <form className="w-full space-y-5">
            {" "}
            {}{" "}
            {regularTickets > 0 && (
              <div>
                {" "}
                <h2 className="mb-3 font-medium text-lg text-rose-500" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 700 }}>
                  {" "}
                  REGULAR TICKET HOLDERS{" "}
                </h2>{" "}
                <div className="flex flex-col gap-3">
                  {" "}
                  {[...Array(regularTickets)].map((_, i) => (
                    <input style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 200 }} key={i} type="text" placeholder={`REGULAR TICKET ${i + 1}`} className="input input-bordered input-sm border-2 border-indigo-900 bg-indigo-900 bg-opacity-50 rounded-lg mb-4 py-4 px-6 w-full hover:scale-105 focus:outline-none focus:border-lime-500 focus:ring-1 focus:ring-lime-500" onChange={(e) => handleInputChange("regular", i, e.target.value)} value={ticketHolders.regular[i] || ""} />
                  ))}{" "}
                </div>{" "}
              </div>
            )}{" "}
            {}{" "}
            {vipTickets > 0 && (
              <div>
                {" "}
                <h2 className="mb-3 font-medium text-lg text-rose-500" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 700 }}>
                  {" "}
                  VIP TICKET HOLDERS{" "}
                </h2>{" "}
                <div className="flex flex-col gap-3">
                  {" "}
                  {[...Array(vipTickets)].map((_, i) => (
                    <input style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 200 }} key={i} type="text" placeholder={`VIP TICKET ${i + 1}`} className="input input-bordered input-sm border-2 border-indigo-900 bg-indigo-900 bg-opacity-50 rounded-lg mb-4 py-4 px-6 w-full hover:scale-105 focus:outline-none focus:border-lime-500 focus:ring-1 focus:ring-lime-500" onChange={(e) => handleInputChange("vip", i, e.target.value)} value={ticketHolders.vip[i] || ""} />
                  ))}{" "}
                </div>{" "}
              </div>
            )}{" "}
          </form>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
export default TicketHolders;
