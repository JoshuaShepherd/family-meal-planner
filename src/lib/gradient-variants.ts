import { type VariantProps, cva } from "class-variance-authority";

// Gradient background variants
export const gradientVariants = cva("", {
  variants: {
    gradient: {
      primary: "gradient-primary",
      secondary: "gradient-secondary", 
      warm: "gradient-warm",
      cool: "gradient-cool",
      ocean: "gradient-ocean",
      sunset: "gradient-sunset",
      forest: "gradient-forest",
      aurora: "gradient-aurora",
    },
    animation: {
      none: "",
      shift: "animate-gradient-shift",
      pulse: "animate-glow-pulse",
      float: "animate-float",
    },
    shadow: {
      none: "",
      sm: "shadow-glow-sm",
      md: "shadow-gradient",
      lg: "shadow-gradient-lg",
      glow: "shadow-glow",
    }
  },
  defaultVariants: {
    gradient: "primary",
    animation: "none",
    shadow: "none",
  },
});

// Button gradient variants
export const buttonGradientVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-medium font-quicksand transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover-lift",
  {
    variants: {
      variant: {
        gradient: "text-white shadow-gradient",
        "gradient-outline": "border-2 border-transparent bg-transparent hover:text-white",
        "gradient-ghost": "bg-transparent hover:text-white",
      },
      gradient: {
        primary: "gradient-primary",
        secondary: "gradient-secondary",
        warm: "gradient-warm", 
        cool: "gradient-cool",
        ocean: "gradient-ocean",
        sunset: "gradient-sunset",
        forest: "gradient-forest",
        aurora: "gradient-aurora",
      },
      size: {
        sm: "h-9 px-6 text-xs",
        md: "h-11 px-8",
        lg: "h-12 px-10 text-base",
        xl: "h-14 px-12 text-lg",
      },
      animation: {
        none: "",
        pulse: "animate-glow-pulse",
        bounce: "animate-bounce-gentle",
      }
    },
    compoundVariants: [
      {
        variant: "gradient-outline",
        gradient: "primary",
        className: "gradient-border hover:gradient-primary",
      },
      {
        variant: "gradient-outline", 
        gradient: "secondary",
        className: "gradient-border hover:gradient-secondary",
      },
    ],
    defaultVariants: {
      variant: "gradient",
      gradient: "primary",
      size: "md",
      animation: "none",
    },
  }
);

// Card gradient variants
export const cardGradientVariants = cva(
  "rounded-3xl border-0 transition-all duration-300",
  {
    variants: {
      variant: {
        gradient: "text-white",
        surface: "bg-white/80 backdrop-blur-sm border border-white/20",
        glass: "bg-white/10 backdrop-blur-md border border-white/20",
      },
      gradient: {
        primary: "gradient-primary",
        secondary: "gradient-secondary",
        warm: "gradient-warm",
        cool: "gradient-cool", 
        ocean: "gradient-ocean",
        sunset: "gradient-sunset",
        forest: "gradient-forest",
        aurora: "gradient-aurora",
      },
      shadow: {
        none: "",
        sm: "shadow-glow-sm",
        md: "shadow-gradient", 
        lg: "shadow-gradient-lg",
        glow: "shadow-glow",
      },
      hover: {
        none: "",
        lift: "hover-lift",
        glow: "hover:shadow-glow transition-shadow",
      }
    },
    defaultVariants: {
      variant: "surface",
      shadow: "md",
      hover: "lift",
    },
  }
);

// Text gradient variants  
export const textGradientVariants = cva("font-quicksand font-semibold", {
  variants: {
    gradient: {
      primary: "gradient-text",
      secondary: "bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent",
      warm: "bg-gradient-to-r from-amber-400 via-red-400 to-pink-400 bg-clip-text text-transparent",
      cool: "bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent",
      ocean: "bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-400 bg-clip-text text-transparent",
      sunset: "bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent",
      forest: "bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-600 bg-clip-text text-transparent",
      aurora: "bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg", 
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
      "6xl": "text-6xl",
    },
    animation: {
      none: "",
      shift: "animate-gradient-shift",
    }
  },
  defaultVariants: {
    gradient: "primary",
    size: "md",
    animation: "shift",
  },
});

export type GradientVariants = VariantProps<typeof gradientVariants>;
export type ButtonGradientVariants = VariantProps<typeof buttonGradientVariants>;
export type CardGradientVariants = VariantProps<typeof cardGradientVariants>;
export type TextGradientVariants = VariantProps<typeof textGradientVariants>;
