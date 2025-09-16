"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChartBarIncreasingIcon, Database, Fingerprint, IdCard } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import productImage from "@/assets/product-image.png";

export const ProductShowcase = () => {
  type ImageKey = "item-1" | "item-2" | "item-3" | "item-4";
  const [activeItem, setActiveItem] = useState<ImageKey>("item-1");

  const images = {
    "item-1": {
      image: productImage,
      alt: "ChurchConnect Dashboard Screenshot",
    },
    "item-2": {
      image: productImage,
      alt: "ChurchConnect Dashboard Screenshot",
    },
    "item-3": {
      image: productImage,
      alt: "ChurchConnect Dashboard Screenshot",
    },
    "item-4": {
      image: productImage,
      alt: "ChurchConnect Dashboard Screenshot",
    },
  };

  return (
    <section className="py-12 md:py-20 lg:py-32 bg-gray-50">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16 lg:space-y-20">
        <div className="relative z-10 mx-auto max-w-2xl space-y-6 text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-6xl text-gray-800">
            See ChurchConnect in Action
          </h2>
          <p className="text-lg text-gray-600">
            Experience our intuitive interface designed specifically for church leaders and administrators. Every feature is crafted to simplify your daily operations.
          </p>
        </div>

        <div className="grid gap-12 sm:px-12 md:grid-cols-2 lg:gap-20 lg:px-0">
          <Accordion
            type="single"
            value={activeItem}
            onValueChange={(value) => setActiveItem(value as ImageKey)}
            className="w-full"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex items-center gap-2 text-base">
                  <Database className="size-4 text-blue-600" />
                  Database Visualization
                </div>
              </AccordionTrigger>
              <AccordionContent>
                Easily manage and visualize member data to streamline church operations and engagement.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                <div className="flex items-center gap-2 text-base">
                  <Fingerprint className="size-4 text-blue-600" />
                  Advanced Authentication
                </div>
              </AccordionTrigger>
              <AccordionContent>
                Secure access controls to protect sensitive church information and ensure privacy.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                <div className="flex items-center gap-2 text-base">
                  <IdCard className="size-4 text-blue-600" />
                  Identity Management
                </div>
              </AccordionTrigger>
              <AccordionContent>
                Simplify member identity management with intuitive tools for administrators.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                <div className="flex items-center gap-2 text-base">
                  <ChartBarIncreasingIcon className="size-4 text-blue-600" />
                  Analytics Dashboard
                </div>
              </AccordionTrigger>
              <AccordionContent>
                Gain insights into church activities with a powerful analytics dashboard tailored for growth.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="bg-background relative flex overflow-hidden rounded-3xl border border-gray-200 p-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeItem}-id`}
                initial={{ opacity: 0, y: 6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="size-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md"
              >
                <Image
                  src={images[activeItem].image}
                  className="size-full object-cover object-left-top"
                  alt={images[activeItem].alt}
                  width={1207}
                  height={929}
                  sizes="(max-width: 768px) 100vw, (max-width: 1440px) 80vw, 1152px"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}