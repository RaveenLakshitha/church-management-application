"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star, Zap, Crown } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export const Pricing = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const packages = [
    {
      name: "Basic",
      price: "$29",
      period: "/month",
      icon: <Zap className="w-5 h-5 text-gray-600" />,
      popular: false,
      features: [
        "Up to 100 members",
        "Basic reporting",
        "Email support",
        "Mobile app access",
      ],
      cardBg: "bg-white",
      buttonVariant: "outline",
    },
    {
      name: "Pro",
      price: "$79",
      period: "/month",
      icon: <Star className="w-5 h-5 text-blue-600" />,
      popular: true,
      features: [
        "Up to 500 members",
        "Advanced reporting",
        "Priority support",
        "Event management",
        "Custom branding",
      ],
      cardBg: "bg-white",
      buttonVariant: "default",
    },
    {
      name: "Enterprise",
      price: "$149",
      period: "/month",
      icon: <Crown className="w-5 h-5 text-gray-600" />,
      popular: false,
      features: [
        "Unlimited members",
        "Full analytics suite",
        "24/7 dedicated support",
        "Event & donation management",
        "Custom integrations",
      ],
      cardBg: "bg-white",
      buttonVariant: "outline",
    },
  ];

  return (
    <section className="py-16 md:py-32 bg-gray-50">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl space-y-6 text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-gray-200">
            <span className="text-sm font-medium text-gray-700">
              ✨ Simple, Transparent Pricing
            </span>
          </div>
          <h1 className="text-4xl font-semibold lg:text-5xl text-gray-800">
            Choose Your Perfect Plan
          </h1>
          <p className="text-lg text-gray-600">
            Flexible and scalable solutions designed to grow with your church community. No hidden fees, no surprises.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              className={`relative flex flex-col ${pkg.popular ? "md:scale-105 md:-mt-4" : ""}`}
              //onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <motion.span
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-semibold shadow-sm"
                >
                  Most Popular
                </motion.span>
              )}

              {/* Card */}
              <Card
                className={`flex flex-col h-full ${pkg.cardBg} border border-gray-200 transition-all duration-300 ${
                  hoveredIndex === index ? "shadow-lg border-gray-300" : "hover:border-gray-300"
                } ${pkg.popular ? "ring-1 ring-blue-200" : ""}`}
              >
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 shadow-sm">
                      {pkg.icon}
                    </div>
                  </div>
                  <CardTitle className="font-medium text-center text-gray-800">{pkg.name}</CardTitle>
                  <div className="flex items-baseline justify-center my-3">
                    <span className="text-3xl font-semibold text-gray-800">{pkg.price}</span>
                    <span className="text-sm text-gray-500 ml-1">{pkg.period}</span>
                  </div>
                  <CardDescription className="text-sm text-center text-gray-600">Per month</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 flex-grow">
                  <hr className="border-dashed border-gray-300" />
                  <ul className="list-outside space-y-3 text-sm text-gray-700">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <Check className="size-4 text-blue-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="mt-auto">
                  <Button
                    asChild
                    //variant={pkg.buttonVariant}
                    className={`w-full ${pkg.buttonVariant === "default" ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}`}
                  >
                    <Link href="">Get Started</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Need a custom solution? We're here to help.</p>
          <Button
            variant="outline"
            className="px-6 py-2 rounded-full text-gray-700 border-gray-300 hover:bg-gray-100"
          >
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  );
};