import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
export default function Nabvar() {
    return(
        <div className="">
            <nav class=" fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 bg-gray-300 backdrop-blur-md rounded-full mt-1 ">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <Link legacyBehavior href="#">
            <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="https://static.vecteezy.com/system/resources/previews/001/194/541/original/lightning-png.png" class="h-8" alt="Flowbite Logo" />
                <span class="self-center text-3xl font-semibold whitespace-nowrap ">SolarXM</span>
            </a>
            </Link>
            <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <ConnectButton chainStatus="none"/>
            
            </div>
            
            <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
             <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 text-black  ">
            <Link legacyBehavior href="/sensor">
            <li>
             <a href="#" class="block py-2 px-3 bg-blue-700 rounded md:bg-transparent text-black md:p-0 text-xl " aria-current="page">Add Sensor</a>
            </li>
            </Link>

            <Link legacyBehavior href="/sale">
            <li>
             <a href="#" class="block py-2 px-3 bg-blue-700 rounded md:bg-transparent text-black md:p-0 text-xl " aria-current="page">Sale</a>
            </li>
            </Link>

            <Link legacyBehavior href="/buy">
            <li>
             <a href="#" class="block py-2 px-3 bg-blue-700 rounded md:bg-transparent text-black md:p-0 text-xl" aria-current="page">Buy</a>
            </li>
            </Link>

            <Link legacyBehavior href="/buy">
            <li>
            <a href="#" class="block py-2 px-3  rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 text-black text-xl">My Rewards</a>
            </li>
            </Link>

            <Link legacyBehavior href="/brand">
            <li>
            <a href="#" class="block text-black text-xl no-underline hover:underline bg-yellow-300 px-1 py-1 rounded-lg">Brands</a>
            </li>
            </Link>

            <Link legacyBehavior href="/simulatesensor">
            <li>
            <a href="#" class="block text-black text-xl no-underline hover:underline bg-yellow-300 px-1 py-1 rounded-lg">Simulate sensor</a>
            </li>
            </Link>
            </ul>
            </div>
            </div>
             </nav>
        </div>
    )
}