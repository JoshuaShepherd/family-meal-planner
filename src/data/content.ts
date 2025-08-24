export interface Feature {
  title: string;
  description: string;
  icon: string;
  gradient: "primary" | "secondary" | "warm" | "cool" | "ocean" | "sunset" | "forest" | "aurora";
}

export const features: Feature[] = [
  {
    title: "Lightning Fast ⚡",
    description: "Your users will be amazed by how quick everything loads! Our optimized performance ensures smooth sailing.",
    icon: "Zap",
    gradient: "sunset"
  },
  {
    title: "Super Secure 🔒", 
    description: "Sleep peacefully knowing your data is fortress-level protected with enterprise-grade security measures.",
    icon: "Shield",
    gradient: "forest"
  },
  {
    title: "Always Happy 😊",
    description: "Our support team is here 24/7 with smiles and solutions. We're genuinely excited to help you succeed!",
    icon: "Heart",
    gradient: "primary"
  },
  {
    title: "Beautifully Simple 🎨",
    description: "Gorgeous design meets effortless functionality. Everything just works the way you'd expect it to.",
    icon: "Palette",
    gradient: "aurora"
  },
  {
    title: "Smartly Automated 🤖",
    description: "Sit back and relax while our intelligent automation handles the heavy lifting for you.",
    icon: "Bot",
    gradient: "cool"
  },
  {
    title: "Globally Connected 🌍",
    description: "Reach anyone, anywhere, anytime. Our worldwide infrastructure keeps you connected to what matters.",
    icon: "Globe",
    gradient: "ocean"
  }
];

export interface Statistic {
  value: string;
  label: string;
  description: string;
  icon: string;
  gradient: "primary" | "secondary" | "warm" | "cool" | "ocean" | "sunset" | "forest" | "aurora";
}

export const statistics: Statistic[] = [
  {
    value: "1M+",
    label: "Happy Users 🎉",
    description: "People absolutely love what we've built together",
    icon: "Users",
    gradient: "primary"
  },
  {
    value: "99.9%",
    label: "Smiles Generated 😊",
    description: "We measure success by the joy we create",
    icon: "Smile",
    gradient: "warm"
  },
  {
    value: "24/7",
    label: "Love & Support ❤️",
    description: "Always here when you need us most",
    icon: "Heart",
    gradient: "forest"
  },
  {
    value: "150+",
    label: "Countries Reached 🌟",
    description: "Spreading happiness across the globe",
    icon: "Globe",
    gradient: "ocean"
  }
];

export interface Testimonial {
  quote: string;
  author: string;
  company: string;
  role: string;
  avatar: string;
  rating: number;
  gradient: "primary" | "secondary" | "warm" | "cool" | "ocean" | "sunset" | "forest" | "aurora";
}

export const testimonials: Testimonial[] = [
  {
    quote: "This is absolutely incredible! The design is so beautiful and everything just works perfectly. I'm genuinely obsessed! 🤩",
    author: "Sarah Chen",
    company: "Creative Studio",
    role: "Design Director", 
    avatar: "/avatars/sarah.jpg",
    rating: 5,
    gradient: "primary"
  },
  {
    quote: "Finally, a product that actually delivers on its promises! The team's attention to detail is remarkable. Highly recommend! ⭐",
    author: "Marcus Rodriguez",
    company: "Tech Innovations",
    role: "CEO",
    avatar: "/avatars/marcus.jpg", 
    rating: 5,
    gradient: "ocean"
  },
  {
    quote: "I was skeptical at first, but wow - this exceeded every expectation. The user experience is simply delightful! 🚀",
    author: "Emily Watson",
    company: "Digital Agency",
    role: "Product Manager",
    avatar: "/avatars/emily.jpg",
    rating: 5, 
    gradient: "sunset"
  },
  {
    quote: "The customer support is phenomenal. They genuinely care about your success and go above and beyond every time! 💫",
    author: "David Kim",
    company: "Startup Ventures", 
    role: "Founder",
    avatar: "/avatars/david.jpg",
    rating: 5,
    gradient: "forest"
  },
  {
    quote: "Best decision we made this year! Our productivity increased dramatically and the team absolutely loves it. Amazing! 🎯",
    author: "Lisa Thompson",
    company: "Growth Company",
    role: "Operations Director",
    avatar: "/avatars/lisa.jpg",
    rating: 5,
    gradient: "aurora"
  }
];

export interface PricingPlan {
  name: string;
  description: string;
  price: string;
  priceDetail: string;
  features: string[];
  popular?: boolean;
  gradient: "primary" | "secondary" | "warm" | "cool" | "ocean" | "sunset" | "forest" | "aurora";
  buttonText: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    name: "Starter Joy 🌱",
    description: "Perfect for trying out our amazing platform",
    price: "Free",
    priceDetail: "Forever & always",
    features: [
      "Up to 5 projects",
      "Basic templates",
      "Community support",
      "Mobile app access",
      "1GB storage"
    ],
    gradient: "forest",
    buttonText: "Start for Free"
  },
  {
    name: "Professional Happiness 🚀",
    description: "Ideal for growing businesses and teams",
    price: "$19",
    priceDetail: "per month",
    popular: true,
    features: [
      "Unlimited projects", 
      "Premium templates",
      "Priority support",
      "Advanced analytics",
      "100GB storage",
      "Team collaboration",
      "Custom integrations"
    ],
    gradient: "primary",
    buttonText: "Go Pro"
  },
  {
    name: "Enterprise Delight 🎯",
    description: "For large teams that need the ultimate experience",
    price: "$99",
    priceDetail: "per month",
    features: [
      "Everything in Pro",
      "Unlimited storage",
      "Dedicated support",
      "Custom development",
      "SLA guarantee",
      "On-premise option",
      "White-label solution"
    ],
    gradient: "aurora",
    buttonText: "Contact Sales"
  }
];

export interface FAQItem {
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    question: "How does this magical platform actually work? ✨",
    answer: "Great question! Our platform combines cutting-edge technology with intuitive design to make complex tasks feel effortless. Think of it as having a super-smart assistant that never sleeps and always knows exactly what you need."
  },
  {
    question: "Is my data really safe and secure? 🔐",
    answer: "Absolutely! We take security seriously with enterprise-grade encryption, regular security audits, and compliance with international standards. Your data is protected like it's our own (because it basically is)."
  },
  {
    question: "Can I cancel anytime without hassle? 🤔",
    answer: "Of course! We believe in earning your business every day. You can cancel anytime with just one click - no phone calls, no forms, no guilt trips. We'll be sad to see you go, but we want you to feel completely free."
  },
  {
    question: "What kind of support can I expect? 💬",
    answer: "Our support team is legendary (seriously, check the reviews)! We offer 24/7 chat support, detailed documentation, video tutorials, and even personal onboarding calls. We're here to make sure you succeed."
  },
  {
    question: "Do you offer discounts for students or nonprofits? 🎓",
    answer: "We absolutely do! We believe in supporting education and good causes. Students get 50% off any plan, and qualified nonprofits get even better rates. Just reach out to us with your .edu email or nonprofit documentation."
  },
  {
    question: "Can I upgrade or downgrade my plan? 📈",
    answer: "Totally! You can change your plan anytime. Upgrading is instant, and if you downgrade, you'll keep your current features until the next billing cycle. We'll even help you migrate your data safely."
  },
  {
    question: "Is there a mobile app? 📱",
    answer: "Yes! Our mobile apps for iOS and Android are just as beautiful and functional as our web platform. You can manage everything on the go and even work offline. Download links are in your dashboard."
  },
  {
    question: "How do I get started quickly? 🚀",
    answer: "Simply sign up and follow our friendly onboarding process! We've made it super intuitive - most people are up and running in under 5 minutes. Plus, we have quick-start templates to get you going even faster."
  }
];
