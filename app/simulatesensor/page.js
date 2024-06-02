"use client"
import {getNearbyWeatherXMDevices,getSolarIrradiance,findClosestDeviceIndex} from "@/utils"
import { useEffect, useState } from "react"
export default function simulateSensor() {
    const [nearbyWeatherXMDevices,setNearbyWeatherXMdevices]=useState([])
    useEffect(()=>{
        const test = async ()=>{
            const res = await getNearbyWeatherXMDevices('del')
            setNearbyWeatherXMdevices(res)
            console.log(res.devices[0].cell_index)
           
  
            const targetLat = 25.606220
            const targetLon = 85.160629
            async function findAndLogSolarIrradiance(targetLat, targetLon) {
                try {
                    const closestDeviceIndex = await findClosestDeviceIndex(targetLat, targetLon);
                    console.log("Closest device index:", closestDeviceIndex);
                    
                    const res2 = await getSolarIrradiance(closestDeviceIndex);
                    if (res2) {
                        console.log("Solar irradiance for current location is", res2[0].current_weather.solar_irradiance);
                    }
                } catch (error) {
                    console.error('Error finding closest device index or getting solar irradiance:', error);
                }
            }
            
            // Example usage
            const res4 = await findAndLogSolarIrradiance(targetLat, targetLon);
            console.log("res 4",res4)
            
           
        }
        test()
    },[])
    return(
        <div>
            hi
        </div>
    )
}