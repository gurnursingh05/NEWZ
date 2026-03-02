import { useTheme } from '../context/ThemeContext';
import { IoSunnyOutline, IoMoonOutline } from 'react-icons/io5';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            className="navbar__icon-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            {theme === 'dark' ? <IoSunnyOutline /> : <IoMoonOutline />}
        </button>
    );
}
