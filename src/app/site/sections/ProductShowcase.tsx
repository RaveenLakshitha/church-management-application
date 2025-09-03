import productImage from "@/assets/product-image.png";
import Image from "next/image";

export const ProductShowcase = () => {
  return (
    <div>
      <div className="bg-black text-white bg-gradient-to-b from-[#9fbff7] to-[#8eace3] py-[72px]">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
          <h2 className="text-center text-5xl sm:text-6xl font-bold tracking-tighter">
            See ChurchConnect in Action
          </h2>
          <div className="max-w-xl mx-auto">
            <p className="text-xl text-center text-white/70 mt-5">
              Experience our intuitive interface designed specifically for church leaders and administrators. Every feature is crafted to simplify your daily operations.
            </p>
          </div>
          <Image
            src={productImage}
            alt="The Product Screenshot"
            className="mt-14 max-w-full h-auto mx-auto"
            sizes="(max-width: 768px) 100vw, (max-width: 1440px) 80vw, 1152px"
          />
        </div>
      </div>
    </div>
  );
};