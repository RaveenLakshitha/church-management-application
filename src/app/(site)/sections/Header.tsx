import Link from "next/link";
import ArrowRight from "@/assets/arrow-right.svg";
import Logo from "@/assets/logo3.png";
import Image from "next/image";
import MenuIcon from "@/assets/menu.svg";

export const Header = () => {
  return (
    <header className="sticky top-0 backdrop-blur-md z-20 border-b border-white/20 bg-white/10">
      <div className="flex justify-center items-center py-3 bg-gradient-to-r from-cyan-50/50 via-slate-50/50 to-blue-50/50 text-slate-700 text-sm gap-3 backdrop-blur-sm border-b border-white/20">
        <p className="text-slate-600 hidden md:block">Streamline your workflow and boost your productivity</p>
        <Link href="/sign-up" className="inline-flex gap-1 items-center hover:text-cyan-600 transition-colors cursor-pointer">
          <p className="font-medium">Get Started for free</p>
          <img
            src={ArrowRight.src}
            alt="Arrow Right"
            className="h-4 w-4 inline-flex justify-center items-center transition-transform hover:translate-x-0.5 filter hover:brightness-110"
          />
        </Link>
      </div>
      <div className="py-6 px-5 bg-white/5 backdrop-blur-sm border-b border-white/20">
        <div className="w-full max-w-[1440px] mx-auto px-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image 
                src={Logo} 
                alt="saas logo" 
                height={40} 
                width={40} 
                className="rounded-lg shadow-md ring-2 ring-white/30"
              />
              <h1 className="font-semibold text-slate-800 text-lg tracking-tight">Church Sync</h1>
            </div>
            <img
              src={MenuIcon.src}
              alt="Menu Icon"
              className="h-6 w-6 md:hidden text-slate-600 hover:text-slate-800 transition-colors cursor-pointer"
            />
            <nav className="hidden md:flex gap-8 text-slate-600 items-center">
              <Link 
                href="#about" 
                className="hover:text-slate-800 transition-colors font-medium relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-cyan-500 after:to-blue-500 after:transition-all hover:after:w-full"
              >
                About
              </Link>
              <Link 
                href="#features" 
                className="hover:text-slate-800 transition-colors font-medium relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-cyan-500 after:to-blue-500 after:transition-all hover:after:w-full"
              >
                Features
              </Link>
              <Link 
                href="#updates" 
                className="hover:text-slate-800 transition-colors font-medium relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-cyan-500 after:to-blue-500 after:transition-all hover:after:w-full"
              >
                Updates
              </Link>
              <Link 
                href="#testimonials" 
                className="hover:text-slate-800 transition-colors font-medium relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-cyan-500 after:to-blue-500 after:transition-all hover:after:w-full"
              >
                Customers
              </Link>
              <Link 
                href="#pricing" 
                className="hover:text-slate-800 transition-colors font-medium relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-cyan-500 after:to-blue-500 after:transition-all hover:after:w-full"
              >
                Pricing
              </Link>
              <Link 
                href="#FAQsAndContact" 
                className="hover:text-slate-800 transition-colors font-medium relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-cyan-500 after:to-blue-500 after:transition-all hover:after:w-full"
              >
                Contact
              </Link>
              <Link href="/sign-in">
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-slate-800 px-6 py-2.5 rounded-xl font-medium inline-flex items-center justify-center tracking-tight transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 border border-white/20">
                  Login
                </button>
              </Link>
              <Link href="/sign-up">
                <button className="bg-gradient-to-r from-cyan-500/90 to-blue-600/90 hover:from-cyan-600/90 hover:to-blue-700/90 text-white px-6 py-2.5 rounded-xl font-medium inline-flex items-center justify-center tracking-tight transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 border border-white/20 backdrop-blur-sm">
                  Start For Free
                </button>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};