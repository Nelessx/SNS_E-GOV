import Contact from "@/components/contact";
import CtaSection from "@/components/ctaSection";
import Documents from "@/components/documents";
import EligibilitySection from "@/components/eligibilitySection";
import Faq from "@/components/faq";
import HeroSection from "@/components/heroSection";
import Process from "@/components/process";
import Image from "next/image";

export default function Home() {
  return (
    <div>
        <HeroSection/>
        <EligibilitySection/>
        <Documents/>
        <Process/>
        <Faq/>
        <Contact/>
        <CtaSection/>
        
    </div>
  );
}
