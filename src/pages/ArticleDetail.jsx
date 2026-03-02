import { useLocation, useNavigate } from 'react-router-dom';
import { IoArrowBack, IoOpenOutline, IoBookmarkOutline, IoBookmark, IoShareSocialOutline } from 'react-icons/io5';
import { HiOutlineNewspaper } from 'react-icons/hi2';
import { useBookmarks } from '../context/BookmarkContext';
import './ArticleDetail.css';

export default function ArticleDetail() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { isBookmarked, toggleBookmark } = useBookmarks();

    const article = state?.article;

    if (!article) {
        return (
            <div className="article-detail">
                <div className="container" style={{ paddingTop: 'calc(var(--navbar-height) + 4rem)', textAlign: 'center' }}>
                    <h2>Article not found</h2>
                    <p style={{ color: 'var(--color-text-muted)', marginTop: '1rem' }}>
                        The article you're looking for doesn't exist or has been removed.
                    </p>
                    <button className="article-detail__btn article-detail__btn--primary" onClick={() => navigate('/')} style={{ marginTop: '2rem' }}>
                        <IoArrowBack /> Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    const bookmarked = isBookmarked(article.url);
    const publishedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({ title: article.title, url: article.url });
            } catch { /* user cancelled */ }
        } else {
            await navigator.clipboard.writeText(article.url);
            alert('Link copied to clipboard!');
        }
    };

    return (
        <div className="article-detail">
            {/* Hero image */}
            <div className="article-detail__hero">
                {article.image ? (
                    <>
                        <img className="article-detail__hero-img" src={article.image} alt={article.title} />
                        <div className="article-detail__hero-overlay" />
                    </>
                ) : (
                    <div className="article-detail__hero-fallback">
                        <HiOutlineNewspaper />
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="article-detail__content">
                <button className="article-detail__back" onClick={() => navigate(-1)}>
                    <IoArrowBack /> Back
                </button>

                <div className="article-detail__meta">
                    <span className="article-detail__source-badge">
                        {article.source?.name || 'Unknown Source'}
                    </span>
                    <span className="article-detail__date">{publishedDate}</span>
                </div>

                <h1 className="article-detail__title">{article.title}</h1>

                {article.description && (
                    <p className="article-detail__description">{article.description}</p>
                )}

                {article.content && (
                    <div className="article-detail__body">
                        <p>{article.content}</p>
                    </div>
                )}

                <div className="article-detail__actions">
                    <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="article-detail__btn article-detail__btn--primary"
                    >
                        <IoOpenOutline /> Read Full Article
                    </a>
                    <button
                        className={`article-detail__btn article-detail__btn--secondary ${bookmarked ? 'active' : ''}`}
                        onClick={() => toggleBookmark(article)}
                    >
                        {bookmarked ? <IoBookmark /> : <IoBookmarkOutline />}
                        {bookmarked ? 'Bookmarked' : 'Bookmark'}
                    </button>
                    <button className="article-detail__btn article-detail__btn--secondary" onClick={handleShare}>
                        <IoShareSocialOutline /> Share
                    </button>
                </div>
            </div>
        </div>
    );
}
