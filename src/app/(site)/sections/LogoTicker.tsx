"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export const LogoTicker = () => {
  return (
    <div className="py-8 bg-white">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)]">
          <motion.div
            className="flex gap-21 flex-none pr-21"
            initial={{ translateX: 0 }}
            animate={{ translateX: "-50%" }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
          >
            <Image
              className="logo-ticker-image h-7 w-auto "
              src="https://html.tailus.io/blocks/customers/nvidia.svg"
              alt="Nvidia Logo"
              height={28}
              width={0}
            />
            <Image
              className="logo-ticker-image h-6 w-auto "
              src="https://html.tailus.io/blocks/customers/column.svg"
              alt="Column Logo"
              height={24}
              width={0}
            />
            <Image
              className="logo-ticker-image h-6 w-auto "
              src="https://html.tailus.io/blocks/customers/github.svg"
              alt="GitHub Logo"
              height={24}
              width={0}
            />
            <Image
              className="logo-ticker-image h-7 w-auto "
              src="https://html.tailus.io/blocks/customers/nike.svg"
              alt="Nike Logo"
              height={28}
              width={0}
            />
            <Image
              className="logo-ticker-image h-7 w-auto "
              src="https://html.tailus.io/blocks/customers/lemonsqueezy.svg"
              alt="Lemon Squeezy Logo"
              height={28}
              width={0}
            />
            <Image
              className="logo-ticker-image h-6 w-auto "
              src="https://html.tailus.io/blocks/customers/laravel.svg"
              alt="Laravel Logo"
              height={24}
              width={0}
            />
            <Image
              className="logo-ticker-image h-10 w-auto "
              src="https://html.tailus.io/blocks/customers/lilly.svg"
              alt="Lilly Logo"
              height={40}
              width={0}
            />
            <Image
              className="logo-ticker-image h-9 w-auto "
              src="https://html.tailus.io/blocks/customers/openai.svg"
              alt="OpenAI Logo"
              height={36}
              width={0}
            />
            {/* Second set of Images for seamless looping */}
            <Image
              className="logo-ticker-image h-7 w-auto "
              src="https://html.tailus.io/blocks/customers/nvidia.svg"
              alt="Nvidia Logo"
              height={28}
              width={0}
            />
            <Image
              className="logo-ticker-image h-6 w-auto "
              src="https://html.tailus.io/blocks/customers/column.svg"
              alt="Column Logo"
              height={24}
              width={0}
            />
            <Image
              className="logo-ticker-image h-6 w-auto "
              src="https://html.tailus.io/blocks/customers/github.svg"
              alt="GitHub Logo"
              height={24}
              width={0}
            />
            <Image
              className="logo-ticker-image h-7 w-auto "
              src="https://html.tailus.io/blocks/customers/nike.svg"
              alt="Nike Logo"
              height={28}
              width={0}
            />
            <Image
              className="logo-ticker-image h-7 w-auto "
              src="https://html.tailus.io/blocks/customers/lemonsqueezy.svg"
              alt="Lemon Squeezy Logo"
              height={28}
              width={0}
            />
            <Image
              className="logo-ticker-image h-6 w-auto "
              src="https://html.tailus.io/blocks/customers/laravel.svg"
              alt="Laravel Logo"
              height={24}
              width={0}
            />
            <Image
              className="logo-ticker-image h-10 w-auto "
              src="https://html.tailus.io/blocks/customers/lilly.svg"
              alt="Lilly Logo"
              height={40}
              width={0}
            />
            <Image
              className="logo-ticker-image h-9 w-auto "
              src="https://html.tailus.io/blocks/customers/openai.svg"
              alt="OpenAI Logo"
              height={36}
              width={0}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};