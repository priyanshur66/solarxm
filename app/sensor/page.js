"use client";
import { useEffect, useState } from "react";
import { addGenStation } from "../../utils";
import Navbar from "@/components/Navbar";
import { ToastContainer, toast , Slide} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddGenSensor() {
  

  const [code, setCode] = useState("");
  

  function handleAddSensor() {
    addGenStation(code);
  }; 
  const handleClick = () => {
    
      handleAddSensor();

      toast.success('GenSensor Added Successfully !', {
      position: "bottom-right",
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Slide,
      });
    // ...
  };
  
  const combinedFunction = () => {
    handleClick();
    // Call other functions or perform additional actions
  };

  return (
    <>
      <Navbar />
      <div className="">
      <div className="mt-32 bg-slate-500 text-center border-2 border-zinc-950 w-1/2 ml-96 rounded-lg p-8">
        <label className="font-extrabold tracking-tight lg:text-5xl font-mono" htmlFor="">
          Enter Secret Code
        </label>
        <br />
        <input
          className="text-black text-2xl font-semibold h-8 w-64 mt-10 rounded-md border-2 border-slate-900"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            //console.log(code);
          }}
          type="text"
        />

        <button
          className="border ml-8 px-5 py-1  font-bold rounded-xl border-slate-900 bg-slate-700 text-white hover:bg-white hover:text-black"
          onClick={combinedFunction}
        >
          ADD
        </button>
        <ToastContainer />
        


        <p className="text-xl mt-24 font-medium">
        &quot; Add sensors to make sure their reportings are added to your account
        &quot;
        </p>
      </div>
      <div className="mt-10 text-center scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-5xl animate-move-text">Enter your Secret code and get your sensor integration ready .</div>
      </div>
    </>
  );
}
export default AddGenSensor;
