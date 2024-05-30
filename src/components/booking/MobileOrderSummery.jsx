"use client";
import { IconBuildingCircus, IconCash, IconFlag, IconTicket, IconTrees, IconTent, IconVip, IconShoppingCart, IconCaretDown, IconCaretUp } from "@tabler/icons-react";
import { useState } from "react";
export default function MobileOrderSummary({ minutes, seconds, isPulsing, ticketsReserved, totalPrice, regularTickets, vipTickets, selectedCamp, greenCamping, twoPersonTents, threePersonTents, totalTickets }) {
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  return (
    <div className="absolute w-full z-50">
      {" "}
      {ticketsReserved && (
        <div className={`font-medium flex justify-between items-center mx-8 mt-4 mb-3 text-lg ${isPulsing ? " animate-pulse" : ""}`}>
          {" "}
          <p className="text-gray-400">{totalTickets > 1 ? "Tickets Reserved" : "Ticket Reserved"}</p>{" "}
          <div>
            {" "}
            <span className="countdown text-indigo-900 border-lime-500 border-4 bg-lime-300 rounded-lg p-2 mr-1 ml-2" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 700 }}>
              {" "}
              <span style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 700 }}>{minutes < 10 ? `0${minutes}` : minutes} :</span>{" "}
            </span>{" "}
            <span className="text-indigo-900" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 700 }}>
              {" "}
              min{" "}
            </span>{" "}
            <span className="countdown text-indigo-900 border-lime-500 border-4 bg-lime-300 rounded-lg p-2 mr-1 ml-2" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 700 }}>
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
      <div className="flex items-center justify-between px-8 py-4 bg-primary bg-opacity-90">
        {" "}
        <div onClick={() => setShowOrderSummary(!showOrderSummary)} className="flex gap-2">
          {" "}
          <IconShoppingCart size={35} /> {!showOrderSummary && <IconCaretDown size={35} />} {showOrderSummary && <IconCaretUp size={35} />}{" "}
        </div>{" "}
        <p>{totalPrice} DKK</p>{" "}
      </div>{" "}
      {showOrderSummary && (
        <div className="bg-rose-500 px-8 py-6 flex flex-col gap-4 ">
          {" "}
          <div className="flex items-center gap-4">
            {" "}
            <div className="rounded-lg bg-rose-500 border border-rose-700 p-2">
              {" "}
              <IconCash />{" "}
            </div>{" "}
            <div className="flex flex-col">
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
          </div>{" "}
          {regularTickets > 0 && (
            <div className="flex items-center gap-4">
              {" "}
              <div className="indicator rounded-lg bg-rose-500 border border-rose-700 p-2 ">
                {" "}
                <span class="indicator-item bg-indigo-900 badge badge-secondary h-5 w-5 rounded-full text-xs">{regularTickets}</span> <IconTicket />{" "}
              </div>{" "}
              <div className="flex flex-col">
                {" "}
                <p className="text-indigo-900" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 700 }}>
                  {" "}
                  REGULAR TICKETS{" "}
                </p>{" "}
                <p className="text-white" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 200 }}>
                  {" "}
                  <span>799 DKK </span>{" "}
                </p>{" "}
              </div>{" "}
            </div>
          )}{" "}
          {vipTickets > 0 && (
            <div className="flex items-center gap-4">
              {" "}
              <div className="indicator rounded-lg bg-rose-500 border border-rose-700 p-2 ">
                {" "}
                <span class="indicator-item bg-indigo-900 badge badge-secondary h-5 w-5 rounded-full text-xs">{vipTickets}</span> <IconVip />{" "}
              </div>{" "}
              <div className="flex flex-col">
                {" "}
                <p className="text-indigo-900" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 700 }}>
                  {" "}
                  VIP TICKETS{" "}
                </p>{" "}
                <p className="text-white" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 200 }}>
                  {" "}
                  <span>1299 DKK </span>{" "}
                </p>{" "}
              </div>{" "}
            </div>
          )}{" "}
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
          {twoPersonTents > 0 && (
            <div className="flex items-center gap-4">
              {" "}
              <div className="indicator rounded-lg bg-rose-500 border border-rose-700 p-2">
                {" "}
                <span class="indicator-item bg-indigo-900 badge badge-secondary h-5 w-5 rounded-full text-xs">{twoPersonTents}</span> <IconTent />{" "}
              </div>{" "}
              <div className="flex flex-col">
                {" "}
                <p className="text-indigo-900" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 700 }}>
                  {" "}
                  2 Person Tents{" "}
                </p>{" "}
                <p className="text-white" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 200 }}>
                  {" "}
                  <span>299 DKK </span>{" "}
                </p>{" "}
              </div>{" "}
            </div>
          )}{" "}
          {threePersonTents > 0 && (
            <div className="flex items-center gap-4">
              {" "}
              <div className="indicator rounded-lg bg-rose-500 border border-rose-700 p-2">
                {" "}
                <span class="indicator-item bg-indigo-900 badge badge-secondary h-5 w-5 rounded-full text-xs">{threePersonTents}</span> <IconBuildingCircus />{" "}
              </div>{" "}
              <div className="flex flex-col">
                {" "}
                <p className="text-indigo-900" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 700 }}>
                  {" "}
                  3 Person Tents{" "}
                </p>{" "}
                <p className="text-white" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 200 }}>
                  {" "}
                  <span>399 DKK </span>{" "}
                </p>{" "}
              </div>{" "}
            </div>
          )}{" "}
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
                  Green Camping{" "}
                </p>{" "}
                <p className="text-white" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 200 }}>
                  {" "}
                  <span>249 DKK</span>{" "}
                </p>{" "}
              </div>{" "}
            </div>
          )}{" "}
          <hr className="border-indigo-900" />{" "}
          <div className="flex justify-between">
            {" "}
            <div>
              {" "}
              <p className="text-indigo-900" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 700 }}>
                {" "}
                Total{" "}
              </p>{" "}
              <p className="text-white text-sm whitespace-nowrap" style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 400 }}>
                {" "}
                Including {Number((totalPrice * 0.2).toFixed(2))} kr in taxes{" "}
              </p>{" "}
            </div>{" "}
            <p style={{ fontFamily: "Syncopate, sans-serif", fontWeight: 200 }}>{totalPrice} DKK</p>{" "}
          </div>{" "}
        </div>
      )}{" "}
      {ticketsReserved && (
        <div className="text-center bg-rose-500">
          {" "}
          <p className="text-indigo-900 text-sm mb-2">Time remaining to complete your order:</p>{" "}
          <div className="flex justify-center items-center ">
            {" "}
            <span className="text-indigo-900 border-lime-500 border-4 bg-lime-300 rounded-lg p-2 text-2xl mr-1">{minutes < 10 ? `0${minutes}` : minutes}</span> <span className="text-indigo-900 border-lime-500 border-4 bg-lime-300 rounded-lg p-2 text-2xl">:</span> <span className="text-indigo-900 border-lime-500 border-4 bg-lime-300 rounded-lg p-2 text-2xl ml-1">{seconds < 10 ? `0${seconds}` : seconds}</span>{" "}
          </div>{" "}
        </div>
      )}{" "}
    </div>
  );
}
