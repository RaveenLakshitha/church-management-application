import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { LogoTicker } from "./sections/LogoTicker";
import { Pricing } from "./sections/Pricing";
import { Features } from "./sections/Features";
import { FAQsFour } from "./sections/FAQsFour";
import { Footer } from "./sections/Footer";


export default function Home() {
  return(
   <>
    <Header/>
    <Hero />
    <LogoTicker />
    <Features/>
    <Pricing />
    <FAQsFour />
    <Footer/>
   </>
  );
}
