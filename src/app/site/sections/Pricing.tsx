"use client"

import { useState } from 'react';
import { Check, Star, Zap, Crown } from 'lucide-react';
import { motion } from "framer-motion";

export const Pricing = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const packages = [
    {
      name: "Basic",
      price: "$29",
      period: "/month",
      icon: <Zap className="w-6 h-6" />,
      popular: false,
      features: [
        "Up to 100 members",
        "Basic reporting",
        "Email support",
        "Mobile app access",
      ],
      gradient: "from-blue-50 to-cyan-50",
      cardBg: "bg-white/80",
      buttonGradient: "from-blue-400 to-cyan-400",
    },
    {
      name: "Pro",
      price: "$79",
      period: "/month",
      icon: <Star className="w-6 h-6" />,
      popular: true,
      features: [
        "Up to 500 members",
        "Advanced reporting",
        "Priority support",
        "Event management",
        "Custom branding",
      ],
      gradient: "from-indigo-50 to-blue-50",
      cardBg: "bg-white/90",
      buttonGradient: "from-indigo-400 to-blue-400",
    },
    {
      name: "Enterprise",
      price: "$149",
      period: "/month",
      icon: <Crown className="w-6 h-6" />,
      popular: false,
      features: [
        "Unlimited members",
        "Full analytics suite",
        "24/7 dedicated support",
        "Event & donation management",
        "Custom integrations",
      ],
      gradient: "from-slate-50 to-blue-50",
      cardBg: "bg-white/80",
      buttonGradient: "from-slate-400 to-blue-400",
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-indigo-200/30 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      
      <div className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-slate-200/50 mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500 text-sm font-medium">
                ✨ Simple, Transparent Pricing
              </span>
            </div>
            
            <h2 className="text-5xl sm:text-7xl font-bold text-slate-800 mb-6 leading-tight">
              Choose Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500">
                Perfect Plan
              </span>
            </h2>
            
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Flexible and scalable solutions designed to grow with your church community. 
              No hidden fees, no surprises.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg, index) => (
              <div
                key={pkg.name}
                className={`relative group transition-all duration-500 ${
                  pkg.popular ? 'md:scale-110 md:-mt-8' : ''
                }`}
                //onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Popular Badge */}
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    {<motion.span animate={{ backgroundPositionX:"100%",} }
                    transition={{
                      duration: 1,
                      repeat:Infinity,
                      ease:"linear",
                      repeatType:"loop",
                    }}
                    className="bg-gradient-to-r from-indigo-400 to-blue-400 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </motion.span>}
                  </div>
                )}
                
                {/* Card */}
                <div className={`relative h-full ${pkg.cardBg} backdrop-blur-xl rounded-3xl p-8 border border-slate-200/50 transition-all duration-500 shadow-lg shadow-slate-200/50 ${
                  hoveredIndex === index ? 'transform scale-105 shadow-xl shadow-slate-300/30 border-slate-300/60' : 'hover:border-slate-300/60'
                } ${pkg.popular ? 'ring-2 ring-indigo-300/50' : ''}`}>
                  
                  {/* Card Header */}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-100 to-blue-100 backdrop-blur-sm mb-4 transition-transform duration-300 group-hover:scale-110 shadow-sm">
                      <div className="text-slate-600">{pkg.icon}</div>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">{pkg.name}</h3>
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold text-slate-800">{pkg.price}</span>
                      <span className="text-slate-500 ml-1">{pkg.period}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={feature} className="flex items-center text-slate-700">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-blue-300 to-cyan-300 flex items-center justify-center mr-3">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button className={`w-full py-4 px-6 rounded-2xl bg-gradient-to-r ${pkg.buttonGradient} text-white font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-300/25 hover:scale-[1.02] active:scale-[0.98]`}>
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <p className="text-slate-500 mb-6">
              Need a custom solution? We're here to help.
            </p>
            <button className="inline-flex items-center px-8 py-3 bg-white/70 backdrop-blur-sm rounded-full text-slate-700 hover:bg-white/90 transition-all duration-300 border border-slate-200/60 shadow-sm">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};