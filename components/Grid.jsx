"use client";
import React from "react";
import { useEffect, useState } from "react";
import {
  getOrdersArray,
  addGenStation,
  getMarketPrice,
  getHmTokenBalance,
} from "../utils";
import Card from "./Card";
import Link from "next/link";
export const GridBackground = () => {
  const [hmBalance, setHmBalance] = useState("Fetching ...");
  const [marketPrice, setMarketPrice] = useState("Fetching");
  const [ordersArray, setOrdersArray] = useState([]);

  async function handleHmBalanceUpdate() {
    //console.log("Fetching GW token balance...");
    try {
      const updatedBalance = await getHmTokenBalance();
      console.log("Fetched balance:", updatedBalance);
      setHmBalance(updatedBalance);
    } catch (error) {
      console.error("Failed to fetch HM token balance:", error);
    }
  }

  async function updateArray() {
    const arr = await getOrdersArray();
    //console.log(arr);
    setOrdersArray(arr);
  }

  async function updateMarketPrice() {
    try {
      const updatedPrice = await getMarketPrice();
      console.log("Fetched Market Price:", updatedPrice);
      setMarketPrice(updatedPrice);
    } catch (error) {
      console.error("Failed to fetch HM token balance:", error);
    }
  }

  useEffect(() => {
    handleHmBalanceUpdate();
    updateArray();
    updateMarketPrice();
  }, [ordersArray]);
  return (
    <div className=" w-full dark:bg-grid-white/[0.2] max-h-screen  items-center justify-center">
      <h1 className="scroll-m-20 text-5xl font-extrabold text-center tracking-tight lg:text-5xl mt-10">
        Buy Some
        <mark className="bg-yellow-500 ml-3 rounded-lg px-3">
          Energy Tokens
        </mark>{" "}
        from harmony .
      </h1>

      <div className="border-2  border-zinc-900 p-2 mt-10 mx-60 rounded ">
        <div className="text-center text-3xl  font-extrabold tracking-tight">
          You have generated{" "}
          <mark className="px-5 rounded-2xl bg-sky-400">
            <span className="text-black">{hmBalance}</span>
          </mark>{" "}
          HM tokens{" "}
        </div>

        <div className="text-center text-3xl pt-2 gap-y-2 font-extrabold tracking-tight">
          Current Market Price{" "}
          <mark className="px-5 rounded-3xl bg-white">
            <span className="text-green-600">{marketPrice}</span>
          </mark>{" "}
          per Token{" "}
        </div>

        
      </div>
      <div>
      {ordersArray.map((data) => {
        if (!data[9]) {
          return <Card key={data[0]} array={data}></Card>;
        }
      })}
      </div>
      
    </div>
  );
};
