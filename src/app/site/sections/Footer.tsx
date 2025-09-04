"use client"

import { useState } from 'react';
import { Users, Calendar, Heart, DollarSign, MessageCircle, BarChart3, Shield, Smartphone, Bell, BookOpen, Video, MapPin } from 'lucide-react';
import { motion } from "framer-motion";

export const Features = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const features = [
    {
      name: "Member Management",
      description: "Comprehensive member database with family groupings, contact information, and attendance tracking.",
      icon: <Users className="w-8 h-8" />,
      gradient: "from-blue-400 to-cyan-400",
      bgGradient: "from-blue-50 to-cyan-50",
      delay: 0
    },
    {
      name: "Event Planning",
      description: "Schedule services, meetings, and special events with automated reminders and RSVP management.",
      icon: <Calendar className="w-8 h-8" />,
      gradient: "from-indigo-400 to-purple-400",
      bgGradient: "from-indigo-50 to-purple-50",
      delay: 0.1
    },
    {
      name: "Donation Tracking",
      description: "Secure online giving platform with automated receipts and detailed financial reporting.",
      icon: <DollarSign className="w-8 h-8" />,
      gradient: "from-green-400 to-emerald-400",
      bgGradient: "from-green-50 to-emerald-50",
      delay: 0.2
    },
    {
      name: "Communication Hub",
      description: "Send announcements, newsletters, and targeted messages to specific groups or the entire congregation.",
      icon: <MessageCircle className="w-8 h-8" />,
      gradient: "from-orange-400 to-red-400",
      bgGradient: "from-orange-50 to-red-50",
      delay: 0.3
    },
    {
      name: "Volunteer Management",
      description: "Organize volunteer schedules, track service hours, and manage ministry team assignments.",
      icon: <Heart className="w-8 h-8" />,
      gradient: "from-pink-400 to-rose-400",
      bgGradient: "from-pink-50 to-rose-50",
      delay: 0.4
    },
    {
      name: "Analytics & Reports",
      description: "Gain insights into attendance trends, giving patterns, and member engagement with detailed analytics.",
      icon: <BarChart3 className="w-8 h-8" />,
      gradient: "from-violet-400 to-purple-400",
      bgGradient: "from-violet-50 to-purple-50",
      delay: 0.5
    },
    {
      name: "Mobile Access",
      description: "Full-featured mobile app for members and staff to stay connected and engaged on the go.",
      icon: <Smartphone className="w-8 h-8" />,
      gradient: "from-blue-400 to-indigo-400",
      bgGradient: "from-blue-50 to-indigo-50",
      delay: 0.6
    },
    {
      name: "Security & Privacy",
      description: "Bank-level security with role-based access controls to protect sensitive member information.",
      icon: <Shield className="w-8 h-8" />,
      gradient: "from-slate-400 to-gray-400",
      bgGradient: "from-slate-50 to-gray-50",
      delay: 0.7
    },
    {
      name: "Smart Notifications",
      description: "Automated reminders for events, birthdays, anniversaries, and important church milestones.",
      icon: <Bell className="w-8 h-8" />,
      gradient: "from-yellow-400 to-orange-400",
      bgGradient: "from-yellow-50 to-orange-50",
      delay: 0.8
    },
    {
      name: "Resource Library",
      description: "Digital library for sermons, study materials, and church documents with easy search and sharing.",
      icon: <BookOpen className="w-8 h-8" />,
      gradient: "from-teal-400 to-cyan-400",
      bgGradient: "from-teal-50 to-cyan-50",
      delay: 0.9
    },
    {
      name: "Live Streaming",
      description: "Integrated streaming platform for services and events with chat functionality and recording.",
      icon: <Video className="w-8 h-8" />,
      gradient: "from-red-400 to-pink-400",
      bgGradient: "from-red-50 to-pink-50",
      delay: 1.0
    },
    {
      name: "Location Services",
      description: "Campus maps, room booking system, and location-based check-ins for enhanced facility management.",
      icon: <MapPin className="w-8 h-8" />,
      gradient: "from-emerald-400 to-teal-400",
      bgGradient: "from-emerald-50 to-teal-50",
      delay: 1.1
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-indigo-200/30 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-3000"></div>
      </div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      
      <div className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-slate-200/50 mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500 text-sm font-medium">
                ⭐ Powerful Features
              </span>
            </div>
            
            <h2 className="text-5xl sm:text-7xl font-bold text-slate-800 mb-6 leading-tight">
              Everything Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500">
                Church Needs
              </span>
            </h2>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Streamline your church operations with our comprehensive suite of tools designed 
              specifically for modern faith communities. From member management to online giving, 
              we've got you covered.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: feature.delay,
                  ease: "easeOut"
                }}
                className="group relative"
               // onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className={`relative h-full bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-slate-200/50 transition-all duration-500 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/30 hover:border-slate-300/60 hover:-translate-y-2 ${
                  hoveredIndex === index ? 'scale-105' : ''
                }`}>
                  
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-30 rounded-3xl transition-opacity duration-500`}></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-4 transition-all duration-300 group-hover:scale-110 shadow-lg`}>
                      <div className="text-white">{feature.icon}</div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-slate-900">
                      {feature.name}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-slate-600 text-sm leading-relaxed group-hover:text-slate-700">
                      {feature.description}
                    </p>
                  </div>
                  
                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA Section */}
          <div className="text-center mt-20">
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-12 border border-slate-200/50 shadow-xl shadow-slate-200/30 max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-slate-800 mb-4">
                Ready to Transform Your Church Management?
              </h3>
              <p className="text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Join thousands of churches already using our platform to build stronger communities, 
                increase engagement, and streamline their operations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-400 to-cyan-400 text-white font-semibold text-lg rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-300/25 hover:scale-[1.02] active:scale-[0.98]">
                  Start Free Trial
                </button>
                <button className="inline-flex items-center px-8 py-4 bg-white/70 backdrop-blur-sm rounded-2xl text-slate-700 hover:bg-white/90 transition-all duration-300 border border-slate-200/60 shadow-sm font-semibold">
                  Schedule Demo
                </button>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex items-center justify-center space-x-8 mt-8 text-sm text-slate-500">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  <span>99.9% Uptime</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                  <span>GDPR Compliant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};