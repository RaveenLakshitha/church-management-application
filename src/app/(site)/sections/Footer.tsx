"use client";

import { motion } from "framer-motion";
import { Shield, Smartphone, Bell, BookOpen } from "lucide-react";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  CreditCard,
  Payment,
} from "@mui/icons-material";

export const Footer = () => {
  return (
    <footer className="relative bg-black text-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      {/* Subtle Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Brand & CTA */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">ChurchSync</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empower your church with tools for seamless member management, giving, and engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg shadow-md hover:shadow-blue-500/30 transition-all duration-300"
              >
                Start Free Trial
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gray-800 text-gray-200 font-semibold rounded-lg border border-gray-700 hover:bg-gray-700 transition-all duration-300"
              >
                Schedule Demo
              </motion.button>
            </div>
          </div>

          {/* Useful Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="/features" className="hover:text-blue-400 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="/pricing" className="hover:text-blue-400 transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/support" className="hover:text-blue-400 transition-colors">
                  Support
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-blue-400 transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Contact, Trust Indicators & Social Media */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Get in Touch</h4>
            <p className="text-sm text-gray-400">support@churchsync.com</p>
            <div className="flex justify-center md:justify-start space-x-4 text-gray-400">
              <Shield className="w-5 h-5" />
              <Smartphone className="w-5 h-5" />
              <Bell className="w-5 h-5" />
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="text-sm text-gray-500 flex flex-wrap justify-center md:justify-start gap-4">
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>99.9% Uptime
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>24/7 Support
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>GDPR Compliant
              </span>
            </div>
            {/* Social Media Icons */}
            <div className="flex justify-center md:justify-start space-x-4 mt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Facebook style={{ fontSize: "24px" }} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Twitter style={{ fontSize: "24px" }} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Instagram style={{ fontSize: "24px" }} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <LinkedIn style={{ fontSize: "24px" }} />
              </a>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-8 text-center">
          <h4 className="text-lg font-semibold text-white mb-4">We Accept</h4>
          <div className="flex justify-center space-x-6 text-gray-400">
            <CreditCard style={{ fontSize: "32px" }} /> {/* Visa */}
            <Payment style={{ fontSize: "32px" }} /> {/* Mastercard */}
            <CreditCard style={{ fontSize: "32px" }} /> {/* PayPal */}
            <Payment style={{ fontSize: "32px" }} /> {/* Amex */}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} ChurchSync. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="/privacy" className="hover:text-blue-400 transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-blue-400 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};