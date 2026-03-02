# NEWZ – Smart News Aggregator 📰✨

A premium React-based web application that aggregates real-time news from over 80,000 sources worldwide. Built with modern web development practices, it offers a sleek, user-friendly interface to quickly browse, search, and bookmark top headlines.

## ✨ Features

- **Real-Time Global News:** Fetches the latest headlines using the [GNews.io API](https://gnews.io/).
- **Category Browsing:** Quickly filter news by General, World, Nation, Business, Technology, Entertainment, Sports, Science, and Health.
- **Debounced Search:** Find exactly what you're looking for with an intelligent, debounced search experience.
- **Article Bookmarking:** Save your favorite articles locally to read them later in a dedicated Bookmarks section.
- **Premium UI & Animations:** 
  - Floating pill navigation bar with `framer-motion` (via `motion/react`) animations.
  - Interactive, mouse-reactive particle background that adapts to the current theme.
  - Glassmorphic design and smooth, satisfying micro-interactions.
- **Dark/Light Mode:** Full theming support with persistent user preferences, featuring a clean white default and a deep dark override.
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop viewing.

## 🛠️ Tech Stack

- **Frontend:** React (JSX), Vite
- **Styling:** Vanilla CSS (CSS Variables, custom design system), minimal Tailwind
- **Animations:** `motion` (Framer Motion), Canvas API
- **Icons:** `lucide-react`
- **Routing:** `react-router-dom`
- **Data Fetching:** Native `fetch` API, Custom Hooks (`useFetch`)
- **State Management:** React Context API (`ThemeContext`, `BookmarkContext`), LocalStorage

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/gurnursingh05/newz.git
   cd newz
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add your GNews API key:
   ```env
   VITE_GNEWS_API_KEY=your_gnews_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5175` to view it in your browser.

## 💡 Architecture

- `src/components/ui/` - Contains core reusable UI components like the `Navbar1` and `Particles` background.
- `src/pages/` - Contains the main views: `Dashboard`, `Search`, `ArticleDetail`, `Category`, and `Bookmarks`.
- `src/context/` - Global state providers for Theme and Bookmarks.
- `src/api/` - API service layer with built-in session storage caching to minimize API calls.
- `src/lib/` - Utility functions, including a custom `cn` class merger.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
