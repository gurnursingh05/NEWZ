import * as React from "react"
import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "motion/react"
import { Menu, X, Search, Bookmark, Sun, Moon } from "lucide-react"
import { useTheme } from "@/context/ThemeContext"

const Navbar1 = () => {
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const { theme, toggleTheme } = useTheme()

    const toggleMenu = () => setIsOpen(!isOpen)

    const navItems = [
        { label: "Home", path: "/" },
        { label: "World", path: "/category/world" },
        { label: "Technology", path: "/category/technology" },
        { label: "Sports", path: "/category/sports" },
        { label: "Business", path: "/category/business" },
    ]

    const isActive = (path) => {
        if (path === "/") return location.pathname === "/"
        return location.pathname.startsWith(path)
    }

    const handleNav = (path) => {
        navigate(path)
        setIsOpen(false)
    }

    return (
        <div className="navbar1-wrap">
            <div className="navbar1">
                {/* Brand */}
                <div className="navbar1__left">
                    <motion.div
                        className="navbar1__brand"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => handleNav("/")}
                        style={{ cursor: "pointer" }}
                    >
                        <img
                            src="/newz-logo.svg"
                            alt="NEWZ"
                            className="navbar1__logo-img"
                        />
                    </motion.div>
                </div>

                {/* Desktop Navigation */}
                <nav className="navbar1__nav">
                    {navItems.map((item, i) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.05 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <button
                                className={`navbar1__link ${isActive(item.path) ? "active" : ""}`}
                                onClick={() => handleNav(item.path)}
                            >
                                {item.label}
                            </button>
                        </motion.div>
                    ))}
                </nav>

                {/* Desktop Actions */}
                <div className="navbar1__actions">
                    <motion.button
                        className="navbar1__action-btn"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleNav("/search")}
                        aria-label="Search"
                    >
                        <Search size={18} />
                    </motion.button>
                    <motion.button
                        className="navbar1__action-btn"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleNav("/bookmarks")}
                        aria-label="Bookmarks"
                    >
                        <Bookmark size={18} />
                    </motion.button>
                    <motion.button
                        className="navbar1__action-btn"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                    >
                        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                    </motion.button>

                    {/* Mobile hamburger */}
                    <motion.button
                        className="navbar1__hamburger"
                        onClick={toggleMenu}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Menu"
                    >
                        <Menu size={22} />
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="navbar1__mobile-overlay"
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    >
                        <motion.button
                            className="navbar1__mobile-close"
                            onClick={toggleMenu}
                            whileTap={{ scale: 0.9 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <X size={24} />
                        </motion.button>

                        <div className="navbar1__mobile-links">
                            {navItems.map((item, i) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.08 + 0.1 }}
                                    exit={{ opacity: 0, x: 20 }}
                                >
                                    <button
                                        className={`navbar1__mobile-link ${isActive(item.path) ? "active" : ""}`}
                                        onClick={() => handleNav(item.path)}
                                    >
                                        {item.label}
                                    </button>
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                                exit={{ opacity: 0, x: 20 }}
                            >
                                <button
                                    className="navbar1__mobile-link"
                                    onClick={() => handleNav("/search")}
                                >
                                    Search
                                </button>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.55 }}
                                exit={{ opacity: 0, x: 20 }}
                            >
                                <button
                                    className="navbar1__mobile-link"
                                    onClick={() => handleNav("/bookmarks")}
                                >
                                    Bookmarks
                                </button>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.65 }}
                                exit={{ opacity: 0, y: 20 }}
                                className="navbar1__mobile-cta-wrap"
                            >
                                <button
                                    className="navbar1__mobile-cta"
                                    onClick={toggleTheme}
                                >
                                    {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export { Navbar1 }
