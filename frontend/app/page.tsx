"use client"
import InfoBar from "@/components/MainPageCom/Section1/InfoBar";
import SectionOne from "@/components/MainPageCom/Section1/SectionOne";
import SectionTwo from "@/components/MainPageCom/Section2/SectionTwo";
import SectionThree from "@/components/MainPageCom/Section3/SectionThree";
import Image from "next/image";
import Footer from "@/components/MainPageCom/Section3/Footer";



export default function Home() {
   
  
  return (
      <>

      <SectionOne />
      <SectionTwo />
      <SectionThree/>
      <Footer/>
      </>
  );
}
