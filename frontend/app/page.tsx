import Image from "next/image";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import StartButton from "@/components/StartButton"
import CercleButton from "@/components/CercleButton";
import { FiArrowRight } from "react-icons/fi";
import MainButton from "@/components/mainButton";

export default function Home() {
  return (
    //slate-300: second blue 
    //Blue-500: primary blue
      <main>
        <Navbar/>
        
        <div className="grid place-items-center mt-10">
          <div className="flex flex-col justify-end">
            <h2 className="text-7xl bg-blue-500 text-slate-300 text-center w-fit  px-1">Decouvrir La Tunisie</h2>
            <div className="flex ">
            <div className="bg-blue-500 w-10 h-15"></div>
            <h2 className="text-[52px] text-neutral-700 text-center">Votre Petit Coin De Paradis</h2>
            </div>
          </div>
        </div>
        <div className="grid place-items-center mt-2">
          
          <CercleButton href="/auth/signin">
              <FiArrowRight color='#cbd5e1' size={25} />
          </CercleButton>
        </div>


       <div className="relative w-full h-96">
        <Image
          src="/images/designgris.png"
          alt="logo"
          fill
          className="object-contain"
        />
       </div>

      <div className="flex flex-col">
       <div className="flex flex-col items-end justify-end w-1/2  bg-blue-500">
            <h2 className="text-5xl text-slate-300 text-center p-1 px-2">Nos Services:</h2>
       </div>
       <div className="w-1/2 h-px bg-neutral-700 mt-1 mb-20"></div>
      </div>


      <div className="flex justify-around mt-2 mb-40">
      
      <div className="flex flex-col items-center">
      <CercleButton>
        <h3 className="text-slate-300 text-2xl font-bold">1</h3>
      </CercleButton>
        <h1 className="text-[22px]">Hébergement</h1>
      </div>
     
      <div className="flex flex-col items-center">
      <CercleButton>
        <h3 className="text-slate-300 text-2xl font-bold">2</h3>
      </CercleButton>
        <h1 className="text-[22px]"> Transport</h1>
      </div>


      <div className="flex flex-col items-center">
        <CercleButton>
          <h3 className="text-slate-300 text-2xl font-bold">3</h3>
        </CercleButton>
          <h1 className="text-[22px]">Restauration</h1>
      </div>


      <div className="flex flex-col items-center">
      <CercleButton>
        <h3 className="text-slate-300 text-2xl font-bold">4</h3>
      </CercleButton>
        <h1 className="text-[22px]">Tours Guidés</h1>
      </div>
      </div>
      
      <div className="flex flex-col items-center mb-50"> 
        <h1 className="text-6xl font-semibold text-blue-500">
          Profitez
        </h1>
        <h3 className="text-5xl font-light text-blue-500">
          de nos services avec des 
        </h3>
        <h1 className="text-6xl font-semibold text-blue-500">
          promotions
        </h1>
        <h3 className="text-5xl font-light text-blue-500">
          exclusives jusqu’à -50% !
        </h3>


        <Image
          src="/images/mini.png"
          alt="logo"
          width={400}
          height={400}
          className="object-contain mb-5"
        />

        <MainButton>
          <h3 className="text-slate-300">Savoir Plus</h3> 
          <FiArrowRight color="#cbd5e1"/>
        </MainButton>
      </div>





      </main>
      
    
  );
}
