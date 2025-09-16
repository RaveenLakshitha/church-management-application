import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { LogoTicker } from "./sections/LogoTicker";
import { Pricing } from "./sections/Pricing";
import { UpdateSection } from "./sections/UpdateSection";
import { Features } from "./sections/Features";
import { Footer } from "./sections/Footer";
import Testimonials from "./sections/Testimonials";
import { FAQsAndContact } from "./sections/FAQsFour";

export default function Home() {
  return(
   <div className="bg-blue-50 min-h-screen">
    <Header/>
    <Hero />
    <LogoTicker />
    <Features/>
    <UpdateSection/>
    <Testimonials/>
    <Pricing />
    <FAQsAndContact />
    <Footer/>
   </div>
  );
}