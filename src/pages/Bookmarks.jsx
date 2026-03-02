import { IoBookmarkOutline } from 'react-icons/io5';
import NewsCard from '../components/NewsCard';
import { useBookmarks } from '../context/BookmarkContext';
import './Bookmarks.css';

export default function Bookmarks() {
    const { bookmarks, removeBookmark } = useBookmarks();

    const sorted = [...bookmarks].sort((a, b) => b.bookmarkedAt - a.bookmarkedAt);

    const handleClearAll = () => {
        if (window.confirm('Remove all bookmarks?')) {
            sorted.forEach((b) => removeBookmark(b.url));
        }
    };

    return (
        <div className="bookmarks-page">
            <div className="container">
                <div className="bookmarks-page__header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <h1 className="bookmarks-page__title">Bookmarks</h1>
                        <span className="bookmarks-page__count">{bookmarks.length}</span>
                    </div>
                    {bookmarks.length > 0 && (
                        <button className="bookmarks-page__clear" onClick={handleClearAll}>
                            Clear All
                        </button>
                    )}
                </div>

                {bookmarks.length === 0 ? (
                    <div className="empty-state">
                        <IoBookmarkOutline className="empty-state__icon" style={{ fontSize: '4rem' }} />
                        <h3 className="empty-state__title">No bookmarks yet</h3>
                        <p className="empty-state__text">
                            Save articles while browsing and they'll appear here for easy access.
                        </p>
                    </div>
                ) : (
                    <div className="news-grid">
                        {sorted.map((article) => (
                            <NewsCard key={article.url} article={article} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
