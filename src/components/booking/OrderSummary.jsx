import React from "react";
import { IconBuildingCircus, IconCash, IconFlag, IconTicket, IconTrees, IconTent, IconVip, IconShoppingCart } from "@tabler/icons-react";
function OrderSummary({ minutes, seconds, isPulsing, ticketsReserved, totalPrice, regularTickets, vipTickets, selectedCamp, greenCamping, twoPersonTents, threePersonTents, totalTickets }) {
  return (
    <div className="bg-rose-600 bg-opacity-40 h-24 md:h-full w-full flex flex-row md:flex-col justify-between items-baseline md:items-start gap-5 order-1 md:order-2 md:border-l border-l-rose-500 p-6 md:p-12">
      {" "}
      {}{" "}
      <div className="space-y-5 hidden md:block">
        {" "}
        <div className="flex gap-2 items-center">
          {" "}
          <IconShoppingCart />{" "}
          <h1 className="font-medium text-lg whitespace-nowrap" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 700 }}>
            {" "}
            Order Summary{" "}
          </h1>{" "}
        </div>{" "}
        {}{" "}
        <div className="space-y-5 font-medium hidden md:block">
          {" "}
          {}{" "}
          <div className="flex items-center gap-4 tooltip" data-tip="This fee is non-refundable and is used to cover the costs of the festival.">
            {" "}
            <div className="rounded-lg bg-rose-500 border border-rose-700 p-2">
              {" "}
              <IconCash />{" "}
            </div>{" "}
            <div className="flex flex-col text-start">
              {" "}
              <p className="text-indigo-900" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 700 }}>
                {" "}
                BOOKING FEE{" "}
              </p>{" "}
              <p className="text-white" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 200 }}>
                {" "}
                <span>99</span> DKK{" "}
              </p>{" "}
            </div>{" "}
          </div>
          {}{" "}
          {regularTickets > 0 && (
            <div className="flex items-center gap-4">
              {" "}
              <div className="indicator rounded-lg bg-rose-500 border border-rose-700 p-2">
                {" "}
                <span className="indicator-item bg-indigo-900 badge badge-secondary h-5 w-5 rounded-full text-xs">{regularTickets}</span> <IconTicket />{" "}
              </div>{" "}
              <div className="flex flex-col">
                {" "}
                <p className="text-indigo-900" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 700 }}>
                  {" "}
                  REGULAR TICKETS{" "}
                </p>{" "}
                <p className="text-white" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 200 }}>
                  {" "}
                  <span>799 DKK</span>{" "}
                </p>{" "}
              </div>{" "}
            </div>
          )}{" "}
          {}{" "}
          {vipTickets > 0 && (
            <div className="flex items-center gap-4">
              {" "}
              <div className="indicator rounded-lg bg-rose-500 border border-rose-700 p-2">
                {" "}
                <span className="indicator-item bg-indigo-900 badge badge-secondary h-5 w-5 rounded-full text-xs">{vipTickets}</span> <IconVip />{" "}
              </div>{" "}
              <div className="flex flex-col">
                {" "}
                <p className="text-indigo-900" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 700 }}>
                  {" "}
                  VIP TICKETS{" "}
                </p>{" "}
                <p className="text-white" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 200 }}>
                  {" "}
                  <span>1299 DKK</span>{" "}
                </p>{" "}
              </div>{" "}
            </div>
          )}{" "}
          {}{" "}
          <div className="flex items-center gap-4">
            {" "}
            <div className="rounded-lg bg-rose-500 border border-rose-700 p-2">
              {" "}
              <IconFlag />{" "}
            </div>{" "}
            <div className="flex flex-col">
              {" "}
              <p className="text-indigo-900" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 700 }}>
                {" "}
                SELECTED CAMP{" "}
              </p>{" "}
              <p className="text-white" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 200 }}>
                {" "}
                <span style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 200 }}>{selectedCamp ? selectedCamp.area : "No camp selected"}</span>{" "}
              </p>{" "}
            </div>{" "}
          </div>{" "}
          {}{" "}
          {twoPersonTents > 0 && (
            <div className="flex items-center gap-4">
              {" "}
              <div className="indicator rounded-lg bg-rose-500 border border-rose-700 p-2">
                {" "}
                <span className="indicator-item bg-indigo-900 badge badge-secondary h-5 w-5 rounded-full text-xs">{twoPersonTents}</span> <IconTent />{" "}
              </div>{" "}
              <div className="flex flex-col">
                {" "}
                <p className="text-indigo-900" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 700 }}>
                  {" "}
                  2 PERSON TENTS{" "}
                </p>{" "}
                <p className="text-white" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 200 }}>
                  {" "}
                  <span>299 DKK</span>{" "}
                </p>{" "}
              </div>{" "}
            </div>
          )}{" "}
          {}{" "}
          {threePersonTents > 0 && (
            <div className="flex items-center gap-4">
              {" "}
              <div className="indicator rounded-lg bg-rose-500 border border-rose-700 p-2">
                {" "}
                <span className="indicator-item bg-indigo-900 badge badge-secondary h-5 w-5 rounded-full text-xs">{threePersonTents}</span> <IconBuildingCircus />{" "}
              </div>{" "}
              <div className="flex flex-col">
                {" "}
                <p className="text-indigo-900" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 700 }}>
                  {" "}
                  3 PERSON TENTS{" "}
                </p>{" "}
                <p className="text-white" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 200 }}>
                  {" "}
                  <span>399 DKK</span>{" "}
                </p>{" "}
              </div>{" "}
            </div>
          )}{" "}
          {}{" "}
          {greenCamping && (
            <div className="flex items-center gap-4">
              {" "}
              <div className="rounded-lg bg-rose-500 border border-rose-700 p-2">
                {" "}
                <IconTrees />{" "}
              </div>{" "}
              <div className="flex flex-col">
                {" "}
                <p className="text-indigo-900" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 700 }}>
                  {" "}
                  GREEN CAMPING{" "}
                </p>{" "}
                <p className="text-white" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 200 }}>
                  {" "}
                  <span>249 DKK</span>{" "}
                </p>{" "}
              </div>{" "}
            </div>
          )}{" "}
        </div>{" "}
      </div>{" "}
      {}{" "}
      <div className="w-full h-fit md:space-y-5">
        {" "}
        <div className="divider mt-0 hidden md:flex"></div>{" "}
        {ticketsReserved && (
          <div className={`hidden md:block font-medium ${isPulsing ? "animate-pulse" : ""}`}>
            {" "}
            <p className="text-white" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 700 }}>
              {" "}
              {totalTickets > 1 ? "Tickets Reserved" : "Ticket Reserved"}{" "}
            </p>{" "}
            <div className="flex items-center gap-2">
              {" "}
              <span className="countdown text-indigo-900 border-lime-500 border-4 bg-lime-300 rounded-lg p-2" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 700 }}>
                {" "}
                {minutes < 10 ? `0${minutes}` : minutes} :{" "}
              </span>{" "}
              <span className="text-indigo-900" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 700 }}>
                {" "}
                min{" "}
              </span>{" "}
              <span className="countdown text-indigo-900 border-lime-500 border-4 bg-lime-300 rounded-lg p-2" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 700 }}>
                {" "}
                {seconds < 10 ? `0${seconds}` : seconds}{" "}
              </span>{" "}
              <span className="text-indigo-900" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 700 }}>
                {" "}
                sec{" "}
              </span>{" "}
            </div>{" "}
          </div>
        )}{" "}
        {}{" "}
        <div className="font-medium flex flex-row md:flex-col gap-2 md:gap-0">
          {" "}
          <p className="text-indigo-900" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 700 }}>
            {" "}
            TOTAL{" "}
          </p>{" "}
          <p style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 200 }}>{totalPrice} DKK</p>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
export default OrderSummary;
