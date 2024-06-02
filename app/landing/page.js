import Navbar from "@/components/Navbar"
import { FlipWordsDemo } from "@/components/Flip"
export default function Landing(){
    return(
        <div className="items-center justify-between">
            <Navbar />
            <div className="mt-40">
            <FlipWordsDemo />
             </div>

             <div className="mt-10 border-2 border-black flex mx-5 rounded-lg ">
             
                <div className="ml-2">
                    <span className="text-5xl font-Roboto tracking-tight font-semibold">
                        our passion for service
                    </span>
                </div>
                <div className="mx-40">
                    <span className="text-3xl font-medium tracking-tight">approach based on the different understanding the market , we are committed to deliver innovative energy solution</span>
                </div>
             </div>

             <div className="mt-10 border-2 border-black flex mx-5 rounded-lg">
            
                <div className="ml-2">
                    <span className="text-5xl font-Roboto tracking-tight font-semibold">
                        we priotize the quality
                    </span>
                </div>
                <div className="mx-40">
                    <span className="text-3xl font-medium tracking-tight">approach based on the different understanding the market , we are committed to deliver innovative energy solution</span>
                </div>
             </div>

             <div className="mt-10 border-2 border-black flex mx-5 rounded-lg">
             
                <div className="ml-2">
                    <span className="text-5xl font-Roboto tracking-tight font-semibold">
                        Light it up innovation
                    </span>
                </div>
                <div className="mx-40">
                    <span className="text-3xl font-medium tracking-tight">approach based on the different understanding the market , we are committed to deliver innovative energy solution</span>
                </div>
             </div>
         

        </div>
    )
}