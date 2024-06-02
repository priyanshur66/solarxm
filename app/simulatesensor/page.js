"use client"
import { getNearbyWeatherXMDevices, getSolarIrradiance, findClosestDeviceIndex } from "@/utils";
import { useEffect, useState } from "react";

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
    const [showSendButton, setShowSendButton] = useState(false);
    const [showAnomalyButton, setShowAnomalyButton] = useState(false);
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

    useEffect(() => {
        if (hasStopped) {
            const energyDiff = totalExpectedOutput - totalEnergyUsed;
            const tolerance = totalExpectedOutput * 0.1;

            if (energyDiff >= -tolerance && energyDiff <= tolerance) {
                setShowSendButton(true);
                setShowAnomalyButton(false);
            } else if (totalEnergyUsed > totalExpectedOutput * 1.1) {
                setShowSendButton(false);
                setShowAnomalyButton(true);
            } else {
                setShowSendButton(false);
                setShowAnomalyButton(false);
            }
        }
    }, [totalEnergyUsed, totalExpectedOutput, hasStopped]);

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
        setShowSendButton(false);
        setShowAnomalyButton(false);
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

    return (
        <div>
            <form>
                <label>
                    Longitude:
                    <input 
                        type="number" 
                        value={longitude} 
                        onChange={handleLongitudeChange} 
                        step="0.000001" 
                    />
                </label>
                <br />
                <label>
                    Latitude:
                    <input 
                        type="number" 
                        value={latitude} 
                        onChange={handleLatitudeChange} 
                        step="0.000001" 
                    />
                </label>
            </form>
            <h2>Enter Voltage and Current</h2>
            <label>
                Voltage (V):
                <input 
                    type="number" 
                    value={voltage} 
                    onChange={handleVoltageChange} 
                    step="0.1" 
                />
            </label>
            <br />
            <label>
                Current (A):
                <input 
                    type="number" 
                    value={current} 
                    onChange={handleCurrentChange} 
                    step="0.1" 
                />
            </label>
            <br />
            {!capturing ? (
                <button type="button" onClick={startCapture}>Start Capture</button>
            ) : (
                <button type="button" onClick={stopCapture}>Stop Capture</button>
            )}
            {solarIrradiance !== null && (
                <div>
                    <h1>Solar Irradiance: {solarIrradiance} W/m²</h1>
                    <h2>Total Energy Used: {totalEnergyUsed.toFixed(2)} Wh</h2>
                    <h2>Total Expected Solar Panel Output: {totalExpectedOutput.toFixed(2)} Wh</h2>
                </div>
            )}
            {hasStopped && (
                <>
                    {showSendButton && (
                        <button type="button" onClick={sendToSmartContract}>Send to Smart Contract</button>
                    )}
                    {showAnomalyButton && (
                        <button type="button">Anomaly Detected: Can't Send Data to Smart Contract</button>
                    )}
                </>
            )}
        </div>
    );
}
