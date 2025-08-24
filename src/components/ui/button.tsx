import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { type ButtonGradientVariants } from "@/lib/gradient-variants"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        // Gradient variants
        gradient: "text-white font-quicksand font-medium shadow-gradient hover-lift",
        "gradient-outline": "border-2 border-transparent bg-transparent hover:text-white font-quicksand font-medium",
        "gradient-ghost": "bg-transparent hover:text-white font-quicksand font-medium",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        xl: "h-12 rounded-2xl px-8 text-base has-[>svg]:px-6",
        "2xl": "h-14 rounded-2xl px-10 text-lg has-[>svg]:px-8",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface ButtonProps extends 
  React.ComponentProps<"button">,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
  gradient?: ButtonGradientVariants["gradient"]
  animation?: ButtonGradientVariants["animation"]
  withMotion?: boolean
}

function Button({
  className,
  variant,
  size,
  gradient,
  animation,
  asChild = false,
  withMotion = false,
  ...props
}: ButtonProps) {
  // Apply gradient classes if gradient variant is used
  const gradientClasses = React.useMemo(() => {
    if (!gradient || !["gradient", "gradient-outline", "gradient-ghost"].includes(variant || "")) {
      return ""
    }
    
    const gradientMap = {
      primary: "gradient-primary",
      secondary: "gradient-secondary", 
      warm: "gradient-warm",
      cool: "gradient-cool",
      ocean: "gradient-ocean",
      sunset: "gradient-sunset", 
      forest: "gradient-forest",
      aurora: "gradient-aurora",
    }
    
    const animationMap = {
      pulse: "animate-glow-pulse",
      bounce: "animate-bounce-gentle",
    }
    
    return cn(
      gradientMap[gradient],
      animation && animation !== "none" && animationMap[animation as keyof typeof animationMap],
      variant === "gradient-outline" && "gradient-border hover:" + gradientMap[gradient]
    )
  }, [gradient, animation, variant])

  const Comp = asChild ? Slot : "button"
  
  const motionWrapperProps = withMotion ? {
    whileHover: { scale: 1.02, y: -2 },
    whileTap: { scale: 0.98 },
    transition: { type: "spring" as const, stiffness: 400, damping: 25 }
  } : {}

  const ButtonElement = (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size }), 
        gradientClasses,
        className
      )}
      {...props}
    />
  )

  if (withMotion) {
    return (
      <motion.div
        {...motionWrapperProps}
        className="inline-flex"
      >
        {ButtonElement}
      </motion.div>
    )
  }

  return ButtonElement
}

// Gradient-specific button component
interface GradientButtonProps extends ButtonProps {
  gradient: ButtonGradientVariants["gradient"]
  variant?: "gradient" | "gradient-outline" | "gradient-ghost"
}

function GradientButton({ 
  variant = "gradient", 
  withMotion = true, 
  ...props 
}: GradientButtonProps) {
  return (
    <Button 
      variant={variant}
      withMotion={withMotion}
      {...props}
    />
  )
}

export { Button, GradientButton, buttonVariants }
