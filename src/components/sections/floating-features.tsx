"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Shield, Heart, Palette, Bot, Globe } from "lucide-react";
import { features } from "@/data/content";

const iconMap = {
  Zap,
  Shield,
  Heart,
  Palette,
  Bot,
  Globe,
};

export function FloatingFeatures() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const gradientMap = {
    primary: "bg-gradient-to-br from-purple-500 to-pink-500",
    secondary: "bg-gradient-to-br from-emerald-500 to-cyan-500",
    warm: "bg-gradient-to-br from-amber-500 to-red-500",
    cool: "bg-gradient-to-br from-blue-500 to-purple-500",
    ocean: "bg-gradient-to-br from-cyan-500 to-blue-500",
    sunset: "bg-gradient-to-br from-amber-500 to-orange-500",
    forest: "bg-gradient-to-br from-emerald-500 to-green-600",
    aurora: "bg-gradient-to-br from-purple-500 to-amber-500",
  };

  return (
    <section id="features" className="py-24 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-50" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-quicksand font-bold mb-6">
            <span className="gradient-text bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Why You&apos;ll Love Us
            </span>
            <motion.span
              className="inline-block ml-3"
              animate={{ rotate: [0, 15, -15, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              💖
            </motion.span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-inter">
            We&apos;ve crafted every detail to make your experience absolutely delightful. 
            Here&apos;s what makes us special!
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap];
            
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 } 
                }}
                className="group relative"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-gradient hover:shadow-gradient-lg transition-all duration-300 border border-white/20 relative overflow-hidden">
                  {/* Gradient Background Overlay */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${gradientMap[feature.gradient]}`} />
                  
                  {/* Icon */}
                  <div className="relative z-10 mb-6">
                    <div className={`w-16 h-16 rounded-2xl ${gradientMap[feature.gradient]} flex items-center justify-center mb-4 shadow-glow-sm`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-quicksand font-semibold mb-4 text-gray-800">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 font-inter leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Hover Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl border-2 border-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(135deg, var(--gradient-${feature.gradient}))`,
                      maskImage: "linear-gradient(white, white) padding-box, linear-gradient(white, white)",
                      maskComposite: "xor",
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-quicksand font-semibold text-lg rounded-2xl shadow-gradient hover:shadow-gradient-lg transition-all duration-300"
          >
            Explore All Features 🚀
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
