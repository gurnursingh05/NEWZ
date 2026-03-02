import { IoSearchOutline, IoCloseOutline } from 'react-icons/io5';
import './SearchBar.css';

export default function SearchBar({ value, onChange, onClear, placeholder = 'Search news...' }) {
    return (
        <div className="search-bar-wrap">
            <div className="search-bar">
                <IoSearchOutline className="search-bar__icon" />
                <input
                    className="search-bar__input"
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    aria-label="Search articles"
                />
                {value && (
                    <button className="search-bar__clear" onClick={onClear} aria-label="Clear search">
                        <IoCloseOutline />
                    </button>
                )}
            </div>
        </div>
    );
}
