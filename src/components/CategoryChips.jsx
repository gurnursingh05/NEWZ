import { CATEGORIES } from '../api/gnews';
import './CategoryChips.css';

export default function CategoryChips({ active, onChange }) {
    return (
        <div className="category-chips" role="tablist" aria-label="News categories">
            {CATEGORIES.map((cat) => (
                <button
                    key={cat}
                    className={`category-chip ${active === cat ? 'active' : ''}`}
                    onClick={() => onChange(cat)}
                    role="tab"
                    aria-selected={active === cat}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
}
