// Animation presets for Framer Motion
export const animationPresets = {
  // Fade animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  },

  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
    transition: { duration: 0.6, ease: "easeOut" }
  },

  fadeInDown: {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 30 },
    transition: { duration: 0.6, ease: "easeOut" }
  },

  // Scale animations
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: { duration: 0.5, ease: "easeOut" }
  },

  scaleInBounce: {
    initial: { opacity: 0, scale: 0.3 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.3 },
    transition: { 
      duration: 0.6, 
      ease: "easeOut",
      scale: { type: "spring", damping: 15, stiffness: 300 }
    }
  },

  // Slide animations
  slideInLeft: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
    transition: { duration: 0.6, ease: "easeOut" }
  },

  slideInRight: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
    transition: { duration: 0.6, ease: "easeOut" }
  },

  // Stagger animations
  staggerContainer: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },

  staggerItem: {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  },

  // Hover animations
  hoverLift: {
    whileHover: { 
      y: -5,
      scale: 1.02,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    whileTap: { scale: 0.98 }
  },

  hoverGlow: {
    whileHover: { 
      boxShadow: "0 0 30px rgba(139, 92, 246, 0.6)",
      transition: { duration: 0.3 }
    }
  },

  // Button animations
  buttonTap: {
    whileTap: { scale: 0.95 },
    transition: { type: "spring", stiffness: 400, damping: 17 }
  },

  buttonHover: {
    whileHover: { 
      scale: 1.05,
      boxShadow: "0 10px 40px -10px rgba(139, 92, 246, 0.5)",
      transition: { duration: 0.2 }
    },
    whileTap: { scale: 0.98 }
  },

  // Floating animations
  float: {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        ease: "easeInOut",
        repeat: Infinity
      }
    }
  },

  floatDelayed: {
    animate: {
      y: [10, -10, 10],
      transition: {
        duration: 8,
        ease: "easeInOut", 
        repeat: Infinity,
        delay: 2
      }
    }
  },

  // Pulse animations
  pulse: {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity
      }
    }
  },

  glowPulse: {
    animate: {
      boxShadow: [
        "0 0 20px rgba(139, 92, 246, 0.3)",
        "0 0 40px rgba(139, 92, 246, 0.6)", 
        "0 0 20px rgba(139, 92, 246, 0.3)"
      ],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity
      }
    }
  },

  // Rotation animations
  rotate: {
    animate: {
      rotate: 360,
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity
      }
    }
  },

  rotateOnHover: {
    whileHover: {
      rotate: 360,
      transition: { duration: 0.6, ease: "easeInOut" }
    }
  },

  // Page transitions
  pageTransition: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5, ease: "easeInOut" }
  },

  // Card reveal animations
  cardReveal: {
    initial: { 
      opacity: 0, 
      y: 50,
      rotateX: 10
    },
    animate: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        delay: 0.1
      }
    }
  },

  // Text animations
  textReveal: {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  },

  // Navbar animations
  navbarSlide: {
    initial: { opacity: 0, y: -20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  },

  // Modal animations
  modalBackdrop: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 }
  },

  modalContent: {
    initial: { opacity: 0, scale: 0.9, y: 20 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9, 
      y: 20,
      transition: { duration: 0.2 }
    }
  }
};

// Easing presets
export const easings = {
  easeOutCubic: [0.215, 0.610, 0.355, 1.000],
  easeInOutCubic: [0.645, 0.045, 0.355, 1.000],
  easeOutBack: [0.175, 0.885, 0.320, 1.275],
  easeInOutBack: [0.680, -0.550, 0.265, 1.550],
  easeOutElastic: [0.190, 1.000, 0.220, 1.000],
  bouncy: [0.175, 0.885, 0.320, 1.275]
};

// Duration presets
export const durations = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  slower: 0.75,
  slowest: 1.0
};
