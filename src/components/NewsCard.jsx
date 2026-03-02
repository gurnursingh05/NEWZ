import { useNavigate } from 'react-router-dom';
import { IoBookmarkOutline, IoBookmark } from 'react-icons/io5';
import { HiOutlineNewspaper } from 'react-icons/hi2';
import { useBookmarks } from '../context/BookmarkContext';
import './NewsCard.css';

function timeAgo(dateStr) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 7) return `${days}d ago`;
    return new Date(dateStr).toLocaleDateString();
}

export default function NewsCard({ article, featured = false }) {
    const navigate = useNavigate();
    const { isBookmarked, toggleBookmark } = useBookmarks();
    const bookmarked = isBookmarked(article.url);

    const handleClick = () => {
        navigate('/article', { state: { article } });
    };

    const handleBookmark = (e) => {
        e.stopPropagation();
        toggleBookmark(article);
    };

    return (
        <article
            className={`news-card ${featured ? 'news-card--featured' : ''}`}
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleClick()}
        >
            <div className="news-card__image-wrap">
                {article.image ? (
                    <img
                        className="news-card__image"
                        src={article.image}
                        alt={article.title}
                        loading="lazy"
                    />
                ) : (
                    <div className="news-card__image-fallback">
                        <HiOutlineNewspaper />
                    </div>
                )}
                <button
                    className={`news-card__bookmark ${bookmarked ? 'active' : ''}`}
                    onClick={handleBookmark}
                    aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
                >
                    {bookmarked ? <IoBookmark /> : <IoBookmarkOutline />}
                </button>
            </div>

            <div className="news-card__body">
                <div className="news-card__meta">
                    <span className="news-card__source">{article.source?.name || 'Unknown'}</span>
                    <span className="news-card__dot" />
                    <span>{timeAgo(article.publishedAt)}</span>
                </div>
                <h3 className="news-card__title">{article.title}</h3>
                {article.description && (
                    <p className="news-card__desc">{article.description}</p>
                )}
            </div>
        </article>
    );
}
