import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { BookmarkProvider } from './context/BookmarkContext';
import { Particles } from './components/ui/Particles';
import './components/ui/Particles.css';
import { Navbar1 } from './components/ui/Navbar1';
import './components/ui/Navbar1.css';
import Dashboard from './pages/Dashboard';
import Search from './pages/Search';
import ArticleDetail from './pages/ArticleDetail';
import Bookmarks from './pages/Bookmarks';
import Category from './pages/Category';
import { useBookmarks } from './context/BookmarkContext';
import './App.css';

function ToastLayer() {
  const { toast } = useBookmarks();
  if (!toast) return null;
  return (
    <div className="toast-container">
      <div className="toast">{toast}</div>
    </div>
  );
}

function ParticlesBackground() {
  const { theme } = useTheme();
  const color = theme === 'dark' ? '#ffffff' : '#000000';
  return (
    <Particles
      className="particles-bg"
      quantity={120}
      ease={80}
      size={0.5}
      staticity={40}
      color={color}
      refresh
    />
  );
}

function AppContent() {
  return (
    <div className="app">
      <ParticlesBackground />
      <Navbar1 />
      <main className="app__main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/search" element={<Search />} />
          <Route path="/article" element={<ArticleDetail />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/category/:name" element={<Category />} />
        </Routes>
      </main>

      <footer className="app__footer">
        <div className="container app__footer-inner">
          <span className="app__footer-brand">NEWZ</span>
          <span className="app__footer-text">
            Powered by <a href="https://gnews.io" target="_blank" rel="noopener noreferrer" className="app__footer-link">GNews.io API</a>
          </span>
          <div className="app__footer-links">
            <a href="https://gnews.io/docs/v4" target="_blank" rel="noopener noreferrer" className="app__footer-link">API Docs</a>
            <a href="https://github.com/gurnursingh05" target="_blank" rel="noopener noreferrer" className="app__footer-link">GitHub</a>
          </div>
        </div>
      </footer>

      <ToastLayer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <BookmarkProvider>
          <AppContent />
        </BookmarkProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
