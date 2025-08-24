"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

export function NewsletterGradient() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate subscription
    setIsSubscribed(true);
    setTimeout(() => {
      setIsSubscribed(false);
      setEmail("");
    }, 3000);
  };

  return (
    <section className="py-24 px-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 relative overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-quicksand font-bold text-white mb-6">
            Join Our Amazing Community!
            <motion.span
              className="inline-block ml-3"
              animate={{ rotate: [0, 10, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🌟
            </motion.span>
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get exclusive updates, tips, and behind-the-scenes magic delivered to your inbox!
          </p>
          <p className="text-white/80 mb-12">
            Join 50,000+ happy subscribers who never want to miss out! 💌
          </p>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-md mx-auto"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Input
                  type="email"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 px-6 rounded-2xl bg-white/90 backdrop-blur-sm border-0 text-gray-800 placeholder:text-gray-500 focus:bg-white focus:ring-2 focus:ring-white/50"
                  required
                />
                <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubscribed}
                className="h-14 px-8 bg-white text-purple-600 font-quicksand font-semibold text-lg rounded-2xl hover:shadow-glow transition-all duration-300 disabled:opacity-50"
              >
                {isSubscribed ? (
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                    <span>Subscribed! 🎉</span>
                  </div>
                ) : (
                  "Subscribe ✨"
                )}
              </motion.button>
            </div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <p className="text-white/70 text-sm">
              No spam, ever. Unsubscribe with one click. Your inbox will thank you! 🙏
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
