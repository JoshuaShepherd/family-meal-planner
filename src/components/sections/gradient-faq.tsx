"use client";

import React from "react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqItems } from "@/data/content";

export function GradientFAQ() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-quicksand font-bold mb-6">
            <span className="gradient-text bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Got Questions? We&apos;ve Got Answers!
            </span>
            <span className="ml-3">🤔</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know to get started on your amazing journey with us.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-2xl shadow-gradient border border-white/20 overflow-hidden"
              >
                <AccordionTrigger className="px-8 py-6 text-left hover:no-underline hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-200">
                  <span className="font-quicksand font-semibold text-lg text-gray-800">
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-8 pb-6">
                  <p className="text-gray-600 font-inter leading-relaxed">
                    {item.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
