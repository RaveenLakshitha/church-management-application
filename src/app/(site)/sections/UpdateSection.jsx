"use client";

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';

export const UpdateSection = () => {
  // Header section
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: false, amount: 0.3 });

  // Image side
  const imageRef = useRef(null);
  const imageInView = useInView(imageRef, { once: false, amount: 0.3 });

  // Content side
  const contentRef = useRef(null);
  const contentInView = useInView(contentRef, { once: false, amount: 0.3 });

  return (
    <section id="updates" className="py-16 md:py-32 bg-gradient-to-b from-white to-amber-50 relative overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none">
        <svg
          className="absolute right-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 24"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0 24L100 0L100 24H0Z"
            fill="white"
            opacity="0.9"
          />
        </svg>
      </div>
      <div className="mx-auto max-w-6xl px-6 relative z-10">
        {/* Header */}
        <motion.div 
          ref={headerRef}
          className="mx-auto max-w-2xl space-y-6 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-gray-200">
            <span className="text-sm font-medium text-gray-700">
              ✨ Latest Update: Enhanced Expense Management
            </span>
          </div>
          <motion.h2 
            className="text-4xl font-semibold lg:text-5xl text-gray-800"
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Streamline Church Finances with Our Expense Management System
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600"
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Our church management system now includes powerful expense management tools designed to simplify financial oversight for your ministry.
          </motion.p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto items-center">
          {/* Image Side */}
          <motion.div
            ref={imageRef}
            className="relative mb-6 md:mb-0"
            initial={{ opacity: 0, x: -20 }}
            animate={imageInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-b from-zinc-300 to-transparent aspect-[76/59] relative rounded-2xl p-px dark:from-zinc-700">
              <Image
                src="/expenses-dark.png"
                className="hidden rounded-[15px] dark:block w-full h-auto"
                alt="Expense management illustration dark"
                width={1207}
                height={929}
              />
              <Image
                src="/expenses-light.png"
                className="rounded-[15px] shadow dark:hidden w-full h-auto"
                alt="Expense management illustration light"
                width={1207}
                height={929}
              />
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            ref={contentRef}
            className="relative space-y-4"
            initial={{ opacity: 0, x: 20 }}
            animate={contentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gray-600">
              Effortlessly track transactions, categorize expenses, and generate detailed financial reports to ensure transparency and accountability in your church’s finances.
            </p>

            <div className="pt-6">
              <blockquote className="border-l-4 border-gray-300 pl-4">
                <p className="text-gray-700">
                  The new expense management features have transformed how we handle our church’s finances. Tracking transactions and generating reports is now seamless, saving us time and ensuring accuracy.
                </p>
                <div className="mt-6 space-y-3">
                  <cite className="block font-medium text-gray-800">Pastor Jane Smith, Financial Overseer</cite>
                  <img
                    className="h-5 w-fit dark:invert"
                    src="/church-logo.svg"
                    alt="Church Logo"
                    height="20"
                    width="auto"
                  />
                </div>
              </blockquote>
            </div>

            {/* CTA Button inspired by pricing */}
            <div className="pt-6">
              <Button
                asChild
                className="w-full md:w-auto px-6 py-2 rounded-full text-gray-700 border-gray-300 hover:bg-gray-100 bg-white"
              >
                <Link href="#pricing">Explore Pricing</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};