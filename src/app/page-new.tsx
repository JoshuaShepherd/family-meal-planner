"use client";

import { GradientNavigation } from "@/components/layout/gradient-navigation";
import { GradientHero } from "@/components/sections/gradient-hero";
import { FloatingFeatures } from "@/components/sections/floating-features";
import { StatsCelebration } from "@/components/sections/stats-celebration";
import { TestimonialCarousel } from "@/components/sections/testimonial-carousel";
import { PricingCards } from "@/components/sections/pricing-cards";
import { GradientFAQ } from "@/components/sections/gradient-faq";
import { NewsletterGradient } from "@/components/sections/newsletter-gradient";
import { GradientFooter } from "@/components/layout/gradient-footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Floating Gradient Navigation */}
      <GradientNavigation />
      
      {/* Hero Section with Gradient Magic */}
      <GradientHero />
      
      {/* Floating Feature Cards */}
      <FloatingFeatures />
      
      {/* Gradient Stats Celebration */}
      <StatsCelebration />
      
      {/* Testimonial Carousel with Gradients */}
      <TestimonialCarousel />
      
      {/* Interactive Pricing Cards */}
      <PricingCards />
      
      {/* FAQ with Gradient Accents */}
      <GradientFAQ />
      
      {/* Newsletter with Gradient Vibes */}
      <NewsletterGradient />
      
      {/* Footer with Gradient Elements */}
      <GradientFooter />
    </div>
  );
}
