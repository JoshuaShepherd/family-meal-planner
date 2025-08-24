"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { pricingPlans } from "@/data/content";

export function PricingCards() {
  const gradientMap = {
    primary: "bg-gradient-to-br from-purple-500 to-pink-500",
    forest: "bg-gradient-to-br from-emerald-500 to-green-600",
    aurora: "bg-gradient-to-br from-purple-500 to-amber-500",
  };

  return (
    <section id="pricing" className="py-24 px-6 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-quicksand font-bold mb-6">
            <span className="gradient-text bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Pick Your Perfect Plan
            </span>
            <span className="ml-3">🎯</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your needs and start your amazing journey today!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white rounded-3xl p-8 shadow-gradient border ${
                plan.popular 
                  ? "border-purple-200 ring-2 ring-purple-200 scale-105" 
                  : "border-white/20"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-quicksand font-medium">
                    Most Popular 🔥
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-quicksand font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-quicksand font-bold text-gray-800">{plan.price}</span>
                  <span className="text-gray-600 ml-2">{plan.priceDetail}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-emerald-500" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 rounded-2xl font-quicksand font-semibold text-lg transition-all duration-300 ${
                  plan.popular
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-gradient hover:shadow-gradient-lg"
                    : gradientMap[plan.gradient as keyof typeof gradientMap] + " text-white shadow-gradient hover:shadow-gradient-lg"
                }`}
              >
                {plan.buttonText}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
