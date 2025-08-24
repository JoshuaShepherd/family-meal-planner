# 🌈 Playful Gradient Modern Homepage Template

A vibrant, gradient-driven React Next.js homepage template designed to delight and engage visitors with colorful gradients, smooth animations, and friendly interactions.

![Playful Gradient Homepage](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer-Motion-0055FF?style=for-the-badge&logo=framer)

## ✨ Features

### 🎨 Vibrant Design System
- **Custom Gradient Palette**: 8 unique gradient themes (primary, secondary, warm, cool, ocean, sunset, forest, aurora)
- **Animated Backgrounds**: Smooth gradient transitions and floating elements
- **Modern Typography**: Quicksand for headings, Inter for body text
- **Rounded Design Language**: Generous border-radius throughout for friendly feel

### 🚀 Homepage Sections
1. **Floating Gradient Navigation** - Glassmorphism nav with search and mobile menu
2. **Hero Section with Gradient Magic** - Eye-catching hero with animated elements
3. **Floating Feature Cards** - 6 feature cards with individual gradient themes
4. **Gradient Stats Celebration** - Animated statistics with celebration icons
5. **Testimonial Carousel** - Customer testimonials with gradient accents
6. **Interactive Pricing Cards** - 3-tier pricing with hover effects
7. **FAQ with Gradient Accents** - Expandable FAQ with smooth animations
8. **Newsletter with Gradient Vibes** - Email signup with floating particles
9. **Footer with Gradient Elements** - Comprehensive footer with wave transition

### 🎬 Advanced Animations
- **Framer Motion Integration**: Smooth page transitions and micro-interactions
- **Scroll-triggered Animations**: Elements animate into view
- **Hover Effects**: Lift, glow, and scale animations
- **Floating Elements**: Continuous background animations
- **Custom Keyframes**: CSS-based gradient shifting and floating

### 🛠️ Technical Stack
- **Next.js 15**: Latest version with App Router and TypeScript
- **Tailwind CSS v4**: Cutting-edge styling with custom gradient utilities
- **Framer Motion**: Professional animation library
- **shadcn/ui**: High-quality component primitives
- **Lucide React**: Beautiful, consistent icons
- **Class Variance Authority**: Type-safe component variants

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone or use this template**
   ```bash
   git clone <repository-url>
   cd react-playful-gradient
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3003
   ```

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Main homepage
│   └── globals.css         # Global styles & gradient utilities
├── components/
│   ├── ui/                 # Enhanced shadcn components
│   ├── layout/             # Navigation and footer
│   └── sections/           # Homepage sections
├── lib/
│   ├── utils.ts            # Utility functions
│   ├── gradient-variants.ts # Gradient component variants
│   └── animation-presets.ts # Framer Motion presets
└── data/
    └── content.ts          # Website content and data
```

## 🎨 Customization

### Gradient Colors
Edit the CSS variables in `src/app/globals.css`:

```css
:root {
  --gradient-primary: linear-gradient(135deg, #ec4899, #8b5cf6, #3b82f6);
  --gradient-secondary: linear-gradient(135deg, #22c55e, #10b981, #06b6d4);
  /* Add your own gradients */
}
```

### Content
Update content in `src/data/content.ts` for features, testimonials, pricing, and FAQ.

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel
```

## 🧹 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production  
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎪 Live Demo

Visit: [http://localhost:3003](http://localhost:3003)

## 📄 License

MIT License - Feel free to use this template for your projects!

---

**Made with 💖 and lots of gradients** ✨
