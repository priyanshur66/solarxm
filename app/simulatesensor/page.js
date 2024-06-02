"use client";
import {
    getNearbyWeatherXMDevices,
    getSolarIrradiance,
    findClosestDeviceIndex
} from "@/utils";
import { useEffect, useState } from "react";
import Nabvar from "@/components/Navbar";

export default function SimulateSensor() {
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const [solarIrradiance, setSolarIrradiance] = useState(null);
    const [voltage, setVoltage] = useState(0);
    const [current, setCurrent] = useState(0);
    const [time, setTime] = useState(0.5);
    const [capturing, setCapturing] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [totalEnergyUsed, setTotalEnergyUsed] = useState(0);
    const [totalExpectedOutput, setTotalExpectedOutput] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const [hasStopped, setHasStopped] = useState(false);

    const fetchSolarIrradiance = async () => {
        try {
            const closestDeviceIndex = await findClosestDeviceIndex(latitude, longitude);
            console.log("Closest device index:", closestDeviceIndex);
            
            const res2 = await getSolarIrradiance(closestDeviceIndex);
            if (res2) {
                const irradiance = res2[0].current_weather.solar_irradiance;
                console.log("Solar irradiance for current location is", irradiance);
                setSolarIrradiance(irradiance);
            }
        } catch (error) {
            console.error('Error finding closest device index or getting solar irradiance:', error);
        }
    };

    useEffect(() => {
        if (capturing) {
            fetchSolarIrradiance();
        }
    }, [latitude, longitude, capturing]);

    useEffect(() => {
        const calculateAndAccumulate = () => {
            const energyUsed = 0.5 * voltage * current; // Time is always 0.5 hours per interval
            setTotalEnergyUsed(prevTotal => prevTotal + energyUsed);

            if (solarIrradiance !== null) {
                const panelArea = 18 * 0.092903; // 18 square feet to square meters
                const efficiency = 0.2;
                const expectedOutput = solarIrradiance * panelArea * efficiency * 0.5; // Time is always 0.5 hours per interval
                setTotalExpectedOutput(prevTotal => prevTotal + expectedOutput);
            }
        };

        if (capturing && solarIrradiance !== null) {
            calculateAndAccumulate();
        }
    }, [time, solarIrradiance, voltage, current, capturing]);

    const handleLongitudeChange = (e) => {
        setLongitude(parseFloat(e.target.value));
    };

    const handleLatitudeChange = (e) => {
        setLatitude(parseFloat(e.target.value));
    };

    const handleVoltageChange = (e) => {
        setVoltage(parseFloat(e.target.value));
    };

    const handleCurrentChange = (e) => {
        setCurrent(parseFloat(e.target.value));
    };

    const updateCaptureData = () => {
        setTime(prevTime => prevTime + 0.5);
    };

    const startCapture = () => {
        setCapturing(true);
        setHasStarted(true);
        setHasStopped(false);
        const id = setInterval(async () => {
            await fetchSolarIrradiance();
            updateCaptureData();
        }, 10000); // Capture every 10 seconds
        setIntervalId(id);
    };

    const stopCapture = () => {
        setCapturing(false);
        setHasStopped(true);
        clearInterval(intervalId);
        setIntervalId(null);
    };

    const sendToSmartContract = () => {
        // Placeholder function to interact with the smart contract
        console.log("Data sent to the smart contract");
    };

    const getButtonToShow = () => {
        if (!hasStopped) return null;

        const energyDiff = totalExpectedOutput - totalEnergyUsed;
        const tolerance = totalExpectedOutput * 0.1;

        if (energyDiff >= -tolerance && energyDiff <= tolerance) {
            return (
                <button type="button" onClick={sendToSmartContract}>
                    Send to Smart Contract
                </button>
            );
        } else if (totalEnergyUsed > totalExpectedOutput * 1.1) {
            return (
                <button type="button">
                    Anomaly Detected: Can't Send Data to Smart Contract
                </button>
            );
        }
        return null;
    };

    const slrTokens = totalEnergyUsed / 200;

    return (
        <div className="bg-black">
            <Nabvar/>
            <div className="flex flex-col">
            
            <div className="text-white mt-24">
                <form class="w-1/2 text-white ml-8 pr-20 border-white border-r-2">
                    <div class="mb-3 w-1/2">
                        <label for="email" class="block mb-2 text-lg font-medium text-white">Longitude</label>
                        <input type="number" 
                        value={longitude} 
                        onChange={handleLongitudeChange} 
                        step="0.000001"  class="bg-gray-50 border border-gray-300 text-gray-900 font-medium text-sm             rounded-lg block w-full p-1.5" placeholder="Longitude" />
                    </div>

                    <div class="mb-5 w-1/2">
                    <label for="email" class="block mb-2 text-lg font-medium text-white">Latitude</label>
                    <input type="number" 
                        value={latitude} 
                        onChange={handleLatitudeChange} 
                        step="0.000001"  class="bg-gray-50 border border-gray-300 text-gray-900 font-medium text-sm             rounded-lg block w-full p-1.5" placeholder="Longitude" />
                    </div>

                    <h2 className="ml-12 mt-8 text-2xl mb-2">Enter Voltage and Current</h2>

                    <div class="mb-3 w-1/2">
                    <label for="email" class="block mb-2 text-lg font-medium text-white">Voltage (V)</label>
                        <input type="number" 
                        value={voltage} 
                        onChange={handleVoltageChange} 
                        step="0.1"  class="bg-gray-50 border border-gray-300 text-gray-900 font-medium text-sm rounded-lg block w-full p-1.5" placeholder="voltage" />
                    </div>

                    <div class="mb-5 w-1/2">
                    <label for="email" class="block mb-2 text-lg font-medium text-white">Current (A)</label>
                        <input type="number" 
                        value={current} 
                        onChange={handleCurrentChange} 
                        step="0.1"   class="bg-gray-50 border border-gray-300 text-gray-900 font-medium text-sm rounded-lg block w-full p-1.5" placeholder="current" />
                    </div>
            </form>        
            <br />
            {!capturing ? (
                <button class="ml-8 text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-1.5 text-center " type="button" onClick={startCapture}>Start Capture</button>
            ) : (
                <button class="ml-8 text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-1.5 text-center " type="button" onClick={stopCapture}>Stop Capture</button>
            )}
            
            </div>
            <div className="text-white">
            {solarIrradiance !== null && (
                <div>
                    <h1>Solar Irradiance: {solarIrradiance} W/m²</h1>
                    <h2>Total Energy Used: {totalEnergyUsed.toFixed(2)} Wh</h2>
                    <h2>Total Expected Solar Panel Output: {totalExpectedOutput.toFixed(2)} Wh</h2>
                </div>
            )}
            {getButtonToShow()}
            <h2>SLR Tokens</h2>
            <p>You will recieve  {slrTokens.toFixed(2)} SLR tokens</p>
            </div>


            </div>

        </div>
    );
}
