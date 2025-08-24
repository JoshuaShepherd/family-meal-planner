"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart, Github, Twitter, Linkedin, Instagram } from "lucide-react";

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" }, 
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

const footerSections = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Updates", "Beta"]
  },
  {
    title: "Company", 
    links: ["About", "Blog", "Careers", "Press"]
  },
  {
    title: "Support",
    links: ["Help Center", "Contact", "Status", "Community"]
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Cookie Policy", "Licenses"]
  }
];

export function GradientFooter() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white overflow-hidden">
      {/* Wave Transition */}
      <div className="absolute top-0 left-0 w-full">
        <svg className="w-full h-16 fill-current text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
        </svg>
      </div>

      <div className="relative z-10 pt-24 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <div className="flex items-center space-x-2 mb-4">
                  <div className="relative">
                    <Sparkles className="h-8 w-8 text-purple-400" />
                  </div>
                  <span className="font-quicksand font-bold text-2xl gradient-text bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Playful
                  </span>
                </div>
                <p className="text-gray-300 font-inter leading-relaxed mb-6">
                  Making the web more beautiful, one gradient at a time. 
                  Join us in creating something amazing together! ✨
                </p>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex space-x-4"
              >
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center hover:shadow-glow transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </motion.div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + index * 0.1 }}
              >
                <h3 className="font-quicksand font-semibold text-lg mb-4 text-white">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link}>
                      <motion.a
                        href="#"
                        whileHover={{ x: 5 }}
                        className="text-gray-300 hover:text-purple-400 transition-colors duration-200 font-inter"
                      >
                        {link}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          >
            <div className="flex items-center space-x-2 text-gray-400">
              <span>© 2024 Playful. Made with</span>
              <Heart className="h-4 w-4 text-red-400 fill-current animate-pulse" />
              <span>and lots of gradients</span>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <motion.a
                href="#"
                whileHover={{ color: "#a855f7" }}
                className="hover:text-purple-400 transition-colors duration-200"
              >
                Privacy Policy
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ color: "#a855f7" }}
                className="hover:text-purple-400 transition-colors duration-200"
              >
                Terms of Service
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ color: "#a855f7" }}
                className="hover:text-purple-400 transition-colors duration-200"
              >
                Cookie Policy
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute bottom-0 right-0 opacity-10">
        <div className="w-64 h-64 bg-gradient-to-tl from-purple-500 to-pink-500 rounded-full blur-3xl" />
      </div>
    </footer>
  );
}
