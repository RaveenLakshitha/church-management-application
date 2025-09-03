import ArrowRight from "@/assets/arrow-right.svg";
import cogImage from "@/assets/cog.png";
import cylinderImage from "@/assets/cylinder.png";
import Image from "next/image";

export const Hero = () => {
  return (
    <section className="pt-8 pb-20 md:pt-5 md:pb-10 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEEFE_100%)] overflow-x-clip">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center py-5">
          <div className="w-full md:w-1/2 lg:w-[478px] px-4">
            <div className="text-sm inline-flex border border-[#222]/10 px-3 py-1 rounded-lg tracking-tight mb-6">
              Version 2.0 is here
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text leading-[1.2] mb-8">
              Transform Your Church Management
            </h1>
            <p className="text-lg sm:text-xl text-[#010D3E] tracking-tight mt-6">
              Streamline member engagement, simplify administration, and strengthen your community with 
              ChurchConnect - the all-in-one platform designed specifically for modern churches.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mt-8">
              <button className="btn btn-primary">Get for Free</button>
              <button className="btn btn-text flex items-center gap-2">
                <span>Learn More</span>
                <img
                  src={ArrowRight.src}
                  alt="Arrow Right"
                  className="h-5 w-5"
                />
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2 mt-12 md:mt-0 relative min-h-[300px] sm:min-h-[400px] md:min-h-[648px]">
           
          </div>
        </div>
      </div>
    </section>
  );
};