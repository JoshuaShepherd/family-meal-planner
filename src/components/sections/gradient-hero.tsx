"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Star, Heart } from "lucide-react";

export function GradientHero() {
  const floatingElements = [
    { icon: Sparkles, color: "text-yellow-400", delay: 0 },
    { icon: Star, color: "text-purple-400", delay: 0.5 },
    { icon: Heart, color: "text-pink-400", delay: 1 },
    { icon: Zap, color: "text-blue-400", delay: 1.5 },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-16">
      {/* Animated Background */}
      <div className="absolute inset-0 gradient-bg-animated opacity-10" />
      
      {/* Floating Elements */}
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          className={`absolute ${element.color} opacity-20`}
          style={{
            left: `${20 + index * 20}%`,
            top: `${30 + index * 10}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            rotate: [0, 180, 360],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 6 + index * 2,
            repeat: Infinity,
            delay: element.delay,
          }}
        >
          <element.icon className="h-12 w-12" />
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-quicksand font-bold leading-tight mb-8">
            <span className="gradient-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-gradient-shift">
              Make Something
            </span>
            <br />
            <span className="gradient-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient-shift">
              Amazing Together!
            </span>
            <motion.span
              className="inline-block ml-4"
              animate={{ rotate: [0, 10, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              ✨
            </motion.span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto font-inter leading-relaxed"
        >
          Experience the joy of creating something extraordinary with our vibrant, 
          user-friendly platform that makes complex tasks feel like child&apos;s play! 🎨
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-quicksand font-semibold text-lg rounded-2xl shadow-gradient hover:shadow-gradient-lg transition-all duration-300 flex items-center space-x-2"
          >
            <span>Start Creating Now</span>
            <ArrowRight className="h-5 w-5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-border text-purple-700 font-quicksand font-semibold text-lg rounded-2xl hover:shadow-gradient transition-all duration-300"
          >
            Watch the Magic ✨
          </motion.button>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8"
        >
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 border-2 border-white shadow-sm"
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 font-inter">
              Join 50,000+ happy users
            </span>
          </div>

          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className="h-5 w-5 text-yellow-400 fill-current"
              />
            ))}
            <span className="text-sm text-gray-600 font-inter ml-2">
              4.9/5 rating
            </span>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
