import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoAlertCircleOutline, IoChevronForward } from 'react-icons/io5';
import HeroSection from '../components/HeroSection';
import CategoryChips from '../components/CategoryChips';
import NewsCard from '../components/NewsCard';
import Skeleton from '../components/Skeleton';
import { useFetch } from '../hooks/useFetch';
import { getTopHeadlines } from '../api/gnews';
import './Dashboard.css';

export default function Dashboard() {
    const [category, setCategory] = useState('general');

    const { data, loading, error, refetch } = useFetch(
        () => getTopHeadlines({ category }),
        [category]
    );

    const articles = data?.articles || [];

    return (
        <div className="dashboard">
            <HeroSection />

            <div className="container">
                {/* Category navigation */}
                <section className="dashboard__section">
                    <CategoryChips active={category} onChange={setCategory} />
                </section>

                {/* Headlines */}
                <section className="dashboard__section">
                    <div className="dashboard__section-header">
                        <h2 className="dashboard__section-title">
                            {category === 'general' ? 'Top Headlines' : `${category.charAt(0).toUpperCase() + category.slice(1)} News`}
                        </h2>
                        <Link to={`/category/${category}`} className="dashboard__section-link">
                            View all <IoChevronForward />
                        </Link>
                    </div>

                    {error && (
                        <div className="error-banner">
                            <IoAlertCircleOutline className="error-banner__icon" />
                            <span>{error}</span>
                            <button className="error-banner__retry" onClick={refetch}>
                                Retry
                            </button>
                        </div>
                    )}

                    <div className="news-grid">
                        {loading ? (
                            <Skeleton count={6} />
                        ) : (
                            articles.map((article, index) => (
                                <NewsCard
                                    key={article.url}
                                    article={article}
                                    featured={index === 0}
                                />
                            ))
                        )}
                    </div>

                    {!loading && !error && articles.length === 0 && (
                        <div className="empty-state">
                            <div className="empty-state__icon">📰</div>
                            <h3 className="empty-state__title">No articles found</h3>
                            <p className="empty-state__text">
                                Try selecting a different category or check back later.
                            </p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}
