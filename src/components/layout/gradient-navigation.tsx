"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, Sparkles, Zap } from "lucide-react";
import { GradientButton } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Features", href: "#features", emoji: "⚡" },
  { name: "Pricing", href: "#pricing", emoji: "💰" },
  { name: "About", href: "#about", emoji: "🎯" },
  { name: "Contact", href: "#contact", emoji: "💬" },
];

export function GradientNavigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/80 backdrop-blur-md shadow-gradient-lg border border-white/20"
            : "bg-white/60 backdrop-blur-sm shadow-gradient"
        )}
        style={{
          borderRadius: "2rem",
          padding: "0.75rem 1.5rem",
          minWidth: "320px",
        }}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <div className="relative">
              <Sparkles className="h-8 w-8 text-purple-500 animate-pulse" />
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Zap className="h-8 w-8 text-pink-500 opacity-50" />
              </motion.div>
            </div>
            <span className="font-quicksand font-bold text-xl gradient-text">
              Playful
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="font-quicksand font-medium text-gray-700 hover:text-purple-600 transition-colors duration-200 flex items-center space-x-1 group"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                <span className="group-hover:animate-bounce-gentle">
                  {item.emoji}
                </span>
                <span>{item.name}</span>
              </motion.a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-600 hover:shadow-glow-sm transition-all duration-200"
            >
              <Search className="h-4 w-4" />
            </motion.button>

            {/* CTA Button */}
            <GradientButton
              gradient="primary"
              size="sm"
              className="font-quicksand"
              withMotion
            >
              Get Started ✨
            </GradientButton>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-600"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-br from-purple-600/90 to-pink-600/90 backdrop-blur-md z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center justify-center h-full space-y-8"
              onClick={(e) => e.stopPropagation()}
            >
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="font-quicksand font-semibold text-2xl text-white hover:text-yellow-200 transition-colors duration-200 flex items-center space-x-3 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  whileHover={{ scale: 1.1 }}
                >
                  <span className="text-3xl group-hover:animate-bounce-gentle">
                    {item.emoji}
                  </span>
                  <span>{item.name}</span>
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="pt-8"
              >
                <GradientButton
                  gradient="aurora"
                  size="lg"
                  className="font-quicksand text-lg px-12"
                  withMotion
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Started ✨
                </GradientButton>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl p-6 w-full max-w-md shadow-gradient-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center space-x-4">
                <Search className="h-5 w-5 text-purple-500" />
                <Input
                  placeholder="Search for features, help, or magic... ✨"
                  className="border-0 bg-transparent text-lg placeholder:text-gray-400 focus:ring-2 focus:ring-purple-200 rounded-2xl"
                  autoFocus
                />
              </div>
              
              <div className="mt-6 space-y-2">
                <p className="text-sm text-gray-500 font-quicksand">
                  Popular searches:
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Features ⚡", "Pricing 💰", "Support 💬", "Getting Started 🚀"].map((tag) => (
                    <motion.button
                      key={tag}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-600 rounded-full text-sm font-quicksand hover:shadow-glow-sm transition-all duration-200"
                    >
                      {tag}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
