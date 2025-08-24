# 🍽️ FamilyMeals - Smart Family Meal Planning & Grocery Management

A modern, image-heavy family meal planning application that helps families plan their meals and automatically generates smart shopping lists.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=for-the-badge&logo=postgresql)

## ✨ Features

### 🎯 Visual Meal Selector
- **Image-Heavy UX**: Beautiful, appetizing photos for ingredients and meals
- **Smart Meal Suggestions**: AI-powered meal recommendations based on selected ingredients
- **Category Filtering**: Browse ingredients by category (produce, meat, dairy, etc.)
- **Interactive Selection**: Click to select/deselect ingredients with visual feedback

### 📅 Interactive Meal Planner
- **Weekly Calendar View**: Drag and drop meals onto specific days and meal types
- **Meal Library**: Pre-built meals with cooking times, difficulty levels, and serving sizes
- **Flexible Scheduling**: Plan breakfast, lunch, dinner, and snacks
- **Visual Meal Cards**: Rich meal information with images and metadata

### 🛒 Smart Shopping List
- **Auto-Generation**: Automatically creates shopping lists from planned meals
- **Priority System**: 
  - **This Trip**: Items needed for planned meals
  - **Urgent**: Out-of-stock essentials  
  - **Stock Up**: Pantry staples and bulk items
- **Category Organization**: Groups items by grocery store sections
- **Manual Additions**: Easy addition of custom items
- **Progress Tracking**: Visual progress bars and completion statistics

## 🛠️ Technology Stack

- **Frontend**: Next.js 15 with React 19
- **UI Components**: Radix UI primitives with custom styling
- **Styling**: Tailwind CSS v4 with custom animations
- **Drag & Drop**: @hello-pangea/dnd for meal planning
- **Type Safety**: TypeScript for all components
- **Date Handling**: date-fns for calendar operations
- **Database**: PostgreSQL (schema provided)

## 🗄️ Database Schema

The app includes a comprehensive PostgreSQL database schema with:

- **ingredients**: Base ingredient data with categories and images
- **meals**: Reusable meal templates with metadata
- **meal_ingredients**: Many-to-many relationship between meals and ingredients
- **meal_calendar**: Scheduled meals for specific dates
- **shopping_lists** & **shopping_list_items**: Shopping list management
- **pantry_items**: Home inventory tracking (optional)
- **family_preferences**: Dietary restrictions and preferences

## 🚀 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Open in Browser**:
   ```
   http://localhost:3000
   ```

## 🧭 App Navigation

### 🎯 Meal Selector
- Browse ingredients by category with beautiful images
- Select ingredients you want to cook with
- Get intelligent meal suggestions based on your selections
- View detailed meal information

### 📅 Meal Planner  
- Weekly calendar view with easy navigation
- Drag meals from the library to calendar slots
- Plan for different meal types throughout the week
- Adjust serving sizes for your family

### 🛒 Shopping List
- Auto-generated from your planned meals
- Organize items by store categories
- Track completion and estimated costs
- Add manual items as needed

## 🎨 Design Philosophy

### Image-Heavy UX
- High-quality food photography from Unsplash
- Visual ingredient selection for intuitive planning
- Appealing meal cards that inspire cooking

### Family-Focused
- Serving size adjustments
- Kid-friendly meal tags
- Dietary restriction support
- Smart shopping automation

## 📊 Mock Data

The app includes rich mock data:
- 16 common ingredients with categories and images
- 4 sample meals with complete ingredient lists
- Pre-planned calendar meals
- Generated shopping list items

## 🔧 Database Setup (Optional)

For production use, run the provided SQL schema:

```bash
psql -d your_database -f database/schema.sql
```

The app works with mock data by default for development.

## 📝 License

MIT License - Use this project for your family's meal planning needs!

## 🙏 Acknowledgments

- Images from [Unsplash](https://unsplash.com)
- UI components from [Radix UI](https://www.radix-ui.com/)  
- Icons from [Lucide React](https://lucide.dev/)
