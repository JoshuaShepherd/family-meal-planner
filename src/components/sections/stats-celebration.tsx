"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Smile, Heart, Globe } from "lucide-react";
import { statistics } from "@/data/content";

const iconMap = { Users, Smile, Heart, Globe };

export function StatsCelebration() {
  return (
    <section className="py-24 px-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-quicksand font-bold text-white mb-6">
            Amazing Numbers 🎉
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            These incredible stats show the magic we&apos;ve created together!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statistics.map((stat, index) => {
            const IconComponent = iconMap[stat.icon as keyof typeof iconMap];
            
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
              >
                <IconComponent className="h-12 w-12 text-white mx-auto mb-4" />
                <div className="text-4xl font-quicksand font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-quicksand font-medium text-white/90 mb-2">
                  {stat.label}
                </div>
                <div className="text-sm text-white/70">
                  {stat.description}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
