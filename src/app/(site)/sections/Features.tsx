"use client";

import { useState } from "react";
import {
  Users,
  Calendar,
  Heart,
  DollarSign,
  MessageCircle,
  BarChart3,
  Shield,
  Smartphone,
  Bell,
  BookOpen,
  Video,
  MapPin,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import productImage from "@/assets/product-image.png";

export const Features = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const features = [
    {
      name: "Member Management",
      description: "Comprehensive member database with family groupings, contact information, and attendance tracking.",
      icon: <Users className="w-6 h-6 text-blue-600" />,
      delay: 0,
    },
    {
      name: "Event Planning",
      description: "Schedule services, meetings, and special events with automated reminders and RSVP management.",
      icon: <Calendar className="w-6 h-6 text-blue-600" />,
      delay: 0.1,
    },
    {
      name: "Donation Tracking",
      description: "Secure online giving platform with automated receipts and detailed financial reporting.",
      icon: <DollarSign className="w-6 h-6 text-blue-600" />,
      delay: 0.2,
    },
    {
      name: "Communication Hub",
      description: "Send announcements, newsletters, and targeted messages to specific groups or the entire congregation.",
      icon: <MessageCircle className="w-6 h-6 text-blue-600" />,
      delay: 0.3,
    },
    {
      name: "Volunteer Management",
      description: "Organize volunteer schedules, track service hours, and manage ministry team assignments.",
      icon: <Heart className="w-6 h-6 text-blue-600" />,
      delay: 0.4,
    },
    {
      name: "Analytics & Reports",
      description: "Gain insights into attendance trends, giving patterns, and member engagement with detailed analytics.",
      icon: <BarChart3 className="w-6 h-6 text-blue-600" />,
      delay: 0.5,
    },
    {
      name: "Mobile Access",
      description: "Full-featured mobile app for members and staff to stay connected and engaged on the go.",
      icon: <Smartphone className="w-6 h-6 text-blue-600" />,
      delay: 0.6,
    },
    {
      name: "Security & Privacy",
      description: "Bank-level security with role-based access controls to protect sensitive member information.",
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      delay: 0.7,
    },
    {
      name: "Smart Notifications",
      description: "Automated reminders for events, birthdays, anniversaries, and important church milestones.",
      icon: <Bell className="w-6 h-6 text-blue-600" />,
      delay: 0.8,
    },
    {
      name: "Resource Library",
      description: "Digital library for sermons, study materials, and church documents with easy search and sharing.",
      icon: <BookOpen className="w-6 h-6 text-blue-600" />,
      delay: 0.9,
    },
    {
      name: "Live Streaming",
      description: "Integrated streaming platform for services and events with chat functionality and recording.",
      icon: <Video className="w-6 h-6 text-blue-600" />,
      delay: 1.0,
    },
    {
      name: "Location Services",
      description: "Campus maps, room booking system, and location-based check-ins for enhanced facility management.",
      icon: <MapPin className="w-6 h-6 text-blue-600" />,
      delay: 1.1,
    },
  ];

  return (
    <section id="features" className="py-12 md:py-20 lg:py-32 bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 relative overflow-hidden">
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
            opacity="0.8"
          />
        </svg>
      </div>
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16 lg:space-y-20 relative z-10">
        {/* Header */}
        <div className="relative z-10 mx-auto max-w-2xl space-y-6 text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-6xl text-gray-800">
            See ChurchConnect in Action
          </h2>
          <p className="text-lg text-gray-600">
            Experience our intuitive interface designed specifically for church leaders and administrators. Every feature is crafted to simplify your daily operations.
          </p>
        </div>

        {/* Image Section */}
        <div className="relative -mx-4 rounded-3xl p-3 md:-mx-12">
          <div className="relative rounded-2xl border border-gray-200 bg-white shadow-md">
            <Image
              src={productImage}
              alt="ChurchConnect Dashboard Screenshot"
              className="rounded-[15px] max-w-full h-auto mx-auto"
              sizes="(max-width: 768px) 100vw, (max-width: 1440px) 80vw, 1152px"
              width={1207}
              height={929}
            />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: feature.delay,
                ease: "easeOut",
              }}
              className="group relative"
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={`relative h-full bg-white rounded-3xl p-6 border border-gray-200 transition-all duration-500 shadow-md hover:shadow-lg hover:border-gray-300 hover:-translate-y-2 ${
                  hoveredIndex === index ? "scale-105" : ""
                }`}
              >
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 mb-4 transition-all duration-300 group-hover:scale-110 shadow-sm">
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-800 mb-3 group-hover:text-gray-900">
                  {feature.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}