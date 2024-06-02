"use client"
import Navbar from "@/components/Navbar"
import { FlipWordsDemo } from "@/components/Flip"
import GradualSpacing from "@/components/magicui/gradual-spacing";
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";
import  { AnimatedListDemo } from "@/components/AnimatedCards";
export default function Landing(){
    return(
        <div className="items-center justify-between bg-black max-h-screen">
            <Navbar />
            
                <div className="mt-32">
                    <h1 className="text-white  text-center text-8xl font-extrabold bg-clip-text text-transparent text-gradient">SolarXM</h1>
                    <FlipWordsDemo />
                </div>

                <div className="flex mx-56 items-center justify-between mt-3">
                <figure class="max-w-lg  items-center justify-center">
                    <img class="h-auto max-w-full rounded-lg" src="https://nititantra.com/wp-content/uploads/2023/09/28-Oct-22-solar-energy-stocks-in-india_-.png" alt="image description" />
                    <figcaption class="mt-2 text-sm text-center text-gray-500 dark:text-gray-400"></figcaption>
                </figure>
                <figure class="max-w-lg  items-center justify-center">
                    <img class="h-auto max-w-full rounded-lg" src="https://www.tickertape.in/blog/wp-content/uploads/2023/03/30-Mar-2023-These-2-Mutual-Funds-Invest-only-in-Energy-Sector-47.png" alt="image description" />
                    <figcaption class="mt-2 text-sm text-center text-gray-500 dark:text-gray-400"></figcaption>
                </figure>
                </div>
                

               <GradualSpacing
                 className="font-display text-center text-4xl font-bold tracking-[-0.1em] text-white md:text-7xl mt-16 md:leading-[5rem]"
                text="Features of SolarXM"
                />
                <div className=" mx-96">
                <AnimatedListDemo />
                </div>
                
        </div>
    )
}