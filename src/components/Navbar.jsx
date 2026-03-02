import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { HiOutlineNewspaper } from 'react-icons/hi2';
import { IoSearchOutline, IoBookmarkOutline, IoMenuOutline, IoCloseOutline } from 'react-icons/io5';
import ThemeToggle from './ThemeToggle';
import './Navbar.css';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <nav className="navbar" role="navigation" aria-label="Main navigation">
            <Link to="/" className="navbar__brand">
                <span className="navbar__brand-icon">
                    <HiOutlineNewspaper />
                </span>
                GNews
            </Link>

            <button
                className="navbar__menu-toggle"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
            >
                {menuOpen ? <IoCloseOutline /> : <IoMenuOutline />}
            </button>

            <div className={`navbar__links ${menuOpen ? 'open' : ''}`}>
                <NavLink to="/" className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`} onClick={() => setMenuOpen(false)} end>
                    Dashboard
                </NavLink>
                <NavLink to="/category/world" className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
                    World
                </NavLink>
                <NavLink to="/category/technology" className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
                    Technology
                </NavLink>
                <NavLink to="/category/sports" className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
                    Sports
                </NavLink>
                <NavLink to="/category/business" className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
                    Business
                </NavLink>
            </div>

            <div className="navbar__actions">
                <button className="navbar__icon-btn" aria-label="Search" onClick={() => navigate('/search')}>
                    <IoSearchOutline />
                </button>
                <button className="navbar__icon-btn" aria-label="Bookmarks" onClick={() => navigate('/bookmarks')}>
                    <IoBookmarkOutline />
                </button>
                <ThemeToggle />
            </div>
        </nav>
    );
}
