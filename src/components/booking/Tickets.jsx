import { IconMinus, IconPlus, IconTicket } from "@tabler/icons-react";
const TicketOption = ({ ticketType, ticketPrice, ticketCount, updateTickets, totalTickets, info }) => (
  <div className="flex items-center gap-6 w-fit justify-between ">
    {" "}
    {}{" "}
    <div className="font-medium text-end w-24 tooltip tooltip-top" data-tip={info}>
      {" "}
      <h2 className="text-rose-500" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 700 }}>
        {" "}
        {ticketType}{" "}
      </h2>{" "}
      <p className="text-white" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 200 }}>
        {" "}
        {ticketPrice}{" "}
      </p>{" "}
    </div>{" "}
    {}{" "}
    <div className="flex items-center w-32 justify-between font-medium ">
      {" "}
      {}{" "}
      <button aria-label="Decrease ticket count" className="bg-neutral text-gray-100 font-medium text-base p-2 rounded-full w-fit border-lime-500 border-2 hover:scale-105 hover:bg-indigo-900 hover:border-lime-500 transition-colors" onClick={() => updateTickets(ticketType.toLowerCase(), "decrease")}>
        {" "}
        <IconMinus color="#BBEE68" />{" "}
      </button>{" "}
      {} <p style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 200 }}>{ticketCount}</p> {}{" "}
      <button aria-label="Increase ticket count" className={`font-medium text-base p-2 rounded-full w-fit border transition-colors ${totalTickets >= 8 ? "btn-disabled bg-indigo-900 border-gray-800 stroke-indigo-800" : " text-lime-500 border-lime-500 border-2 hover:scale-105 hover:bg-cyan-400 hover:border-lime-500 "}`} onClick={() => totalTickets < 8 && updateTickets(ticketType.toLowerCase(), "increase")}>
        {" "}
        <IconPlus color="#BBEE68" />{" "}
      </button>{" "}
    </div>{" "}
  </div>
);
function Tickets({ regularTickets, vipTickets, totalTickets, updateTickets }) {
  return (
    <div className="h-full flex flex-col ">
      {" "}
      {}{" "}
      <div className="flex gap-2 items-center mt-4 md:mt-0">
        {" "}
        <IconTicket color="#FD1995" size="60" />{" "}
        <h1 className="font-medium text-2xl " style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 200 }}>
          {" "}
          TICKETS{" "}
        </h1>{" "}
      </div>{" "}
      {}{" "}
      <div className="flex flex-col justify-evenly flex-grow">
        {" "}
        <div className="place-self-center flex flex-col gap-4">
          {" "}
          {}{" "}
          <div className="space-y-12 font-medium text-1xl text-white" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 200 }}>
            {" "}
            <TicketOption ticketType="REGULAR" ticketPrice="799 DKK" ticketCount={regularTickets} updateTickets={updateTickets} totalTickets={totalTickets} /> <TicketOption ticketType="VIP" ticketPrice="1299 DKK" ticketCount={vipTickets} updateTickets={updateTickets} totalTickets={totalTickets} />{" "}
          </div>{" "}
          {}{" "}
          <div className="font-medium text-sm text-white place-self-end flex flex-col items-end" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 700 }}>
            {" "}
            <p>TOTAL TICKETS</p> <p style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 200 }}>{totalTickets}</p>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
export default Tickets;
