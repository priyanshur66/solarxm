"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { createSellOrder, addGenStation, getSLRTokenBalance } from "../../utils";
import { ToastContainer, toast , Slide , Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
export default function Main() {
  const [SLRBalance, setSLRBalance] = useState("Fetching ...");
  const [noOfTokens, setNoOfTokens] = useState(0);
  const [price, setPrice] = useState(0);
  const [isOption, setIsOption] = useState(false);
  const [optionPrice, setOptionPrice] = useState(0);
  const [optionDuration, setOptionDuration] = useState(0);
  const [toggle, setToggle] = useState(false);


  async function handleSLRBalanceUpdate() {
    console.log("Fetching SLR token balance...");
    try {
      const updatedBalance = await getSLRTokenBalance();
      console.log("Fetched balance:", updatedBalance);
      setSLRBalance(updatedBalance);
    } catch (error) {
      console.error("Failed to fetch SLR token balance:", error);
    }
  }

  async function handleSubmit() {
    createSellOrder(noOfTokens, price, optionPrice, optionDuration);
    setPrice(0);
    setNoOfTokens(0);
    setOptionPrice(0);
    setOptionDuration(0);
  }

  function handleNoOfTokenUpdate(noOfTokens) {
    console.log("incoming token", noOfTokens);
    setNoOfTokens(noOfTokens);
  }

  function handlepriceUpdate(price) {
    console.log("incoming token", price);
    setPrice(price);
  }

  function handleOptionPriceUpdate(price) {
    console.log("incoming token", price);
    setOptionPrice(price);
  }

  function handleOptionDurationUpdate(duration) {
    console.log("incoming token", duration);
    setOptionDuration(duration);
  }

  useEffect(() => {
    handleSLRBalanceUpdate();
  }, []);

  const handleToggle = () => {
    setToggle(!toggle);
  };
  

  return (
    <div className=" h-max-screen w-full  ">
      <Navbar />
      
      {/* <button
        onClick={() => {
          handleSLRBalanceUpdate();
        }}
      >
        click
      </button> */}

      <div className=" mt-16 items-center justify-center w-full">
        <div className=" text-4xl font-extrabold tracking-tight lg:text-5xl text-center border-1 rounded-md content-center font-roboto p-2 border-2 mx-80 py-3 border-black ">
          You have generated <mark className="px-5 rounded-lg bg-white"><span className="text-green-600">{SLRBalance}</span></mark>{" "}
          SLR tokens{" "}
        </div>

        <div className=" rounded-lg w-1/3 items-center justify-center mx-40 mt-8 ">
          <label
            for="default-input"
            className="block mb-2 font-roboto font-semibold tracking-tight text-gray-900 mt-2 ml-0 text-4xl"
          >
            List Sales
          </label>

          <div className="mt-0 border-2 p-8 w-full mb-8 bg rounded-lg bg-slate-500">
            <div className="flex flex-col ">
              <label htmlFor="" className="text-xl font-semibold mt-5">
                No of Tokens
              </label>
              <br />
              <input
                type="number"
                id="noOfTokensField"
                placeholder="No of tokens"
                value={noOfTokens}
                onChange={(e) => {
                  handleNoOfTokenUpdate(e.target.value);
                }}
                className="mx-2 bg-gray-50 border border-gray-300 text-gray-900 text-md font-semibold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/8 p-2.5   dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500    dark:focus:border-blue-500"
              />
              <label htmlFor="" className="text-xl mt-5 font-semibold">
                Total price (Lisk)
              </label>
              <br />
              <input
                type="number"
                id="priceField"
                placeholder="Total price"
                value={price}
                onChange={(e) => {
                  handlepriceUpdate(e.target.value);
                }}
                className="mx-2 bg-gray-50 border border-gray-300 text-gray-900 text-md font-semibold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/8 p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500    dark:focus:border-blue-500"
              />

              <br />
              <label
                htmlFor="toggle"
                className="inline-flex border-inline items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  id="toggle"
                  checked={toggle}
                  onChange={handleToggle}
                />
                <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ms-3 text-xl font-semibold text-gray-900">
                  Offer as Option
                </span>
              </label>
              <br />

              <div
                className=" w-full flex flex-col overflow-hidden transition-all duration-300 ease-in-out" style={{ maxHeight: toggle ? '1000px' : '0' }}
                // style={{ display: toggle ? "block" : "none" }}
              >
                <br />
                <label
                  htmlFor="toggle"
                  className="inline-flex border-inline items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    id="toggle"
                    checked={toggle}
                    onChange={handleToggle}
                  />
                </label>
                <br />

                <div
                  className="w-full flex flex-col -mt-10"
                  style={{ display: toggle ? "block" : "none" }}
                >
                  <label htmlFor="" className="text-xl font-semibold mt-5">
                    Price for option (Fil)
                  </label>
                  <br />
                  <input
                    type="number"
                    id="optionPriceField"
                    value={optionPrice}
                    onChange={(e) => {
                      handleOptionPriceUpdate(e.target.value);
                    }}
                    className="mx-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/5 p-2.5 dark:bg-gray-700    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500   dark:focus:border-blue-500 mb-3"
                  />
                  <label htmlFor="" className="text-xl font-semibold mt-5">
                    Duration for option {"(In seconds) "}
                  </label>
                  <br />
                  <input
                    type="number"
                    id="optionDurationField"
                    value={optionDuration}
                    onChange={(e) => {
                      handleOptionDurationUpdate(e.target.value);
                    }}
                    className="mx-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/5 p-2.5 dark:bg-gray-700    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500    dark:focus:border-blue-500"
                  />
                </div>
              </div>
              <button
                onClick={() => {
                  handleSubmit();
                  toast.success('sale successfully !', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                    });


                }}
                className="ml-24 border-2 w-1/2 mt-4 p-2 rounded-full hover:bg-white hover:border-black hover:text-black font-roboto font-semibold text-2xl"
              >
                Sale
              </button>
            </div>
          </div>
        </div>

        <div className=" m-5 p-10"></div>
      </div>
    </div>
  );
}
