import { useParams } from 'react-router-dom';
import { IoAlertCircleOutline } from 'react-icons/io5';
import CategoryChips from '../components/CategoryChips';
import NewsCard from '../components/NewsCard';
import Skeleton from '../components/Skeleton';
import { useFetch } from '../hooks/useFetch';
import { getTopHeadlines } from '../api/gnews';
import { useNavigate } from 'react-router-dom';
import './Category.css';

export default function Category() {
    const { name } = useParams();
    const navigate = useNavigate();

    const { data, loading, error, refetch } = useFetch(
        () => getTopHeadlines({ category: name }),
        [name]
    );

    const articles = data?.articles || [];

    const handleCategoryChange = (cat) => {
        navigate(`/category/${cat}`);
    };

    return (
        <div className="category-page">
            <div className="container">
                <div className="category-page__header">
                    <h1 className="category-page__title">{name} News</h1>
                    <p className="category-page__subtitle">
                        Latest headlines in {name} from sources worldwide
                    </p>
                </div>

                <CategoryChips active={name} onChange={handleCategoryChange} />

                <div style={{ marginTop: 'var(--space-xl)' }}>
                    {error && (
                        <div className="error-banner">
                            <IoAlertCircleOutline className="error-banner__icon" />
                            <span>{error}</span>
                            <button className="error-banner__retry" onClick={refetch}>Retry</button>
                        </div>
                    )}

                    <div className="news-grid" style={{ marginTop: '1.5rem' }}>
                        {loading ? (
                            <Skeleton count={6} />
                        ) : (
                            articles.map((article, idx) => (
                                <NewsCard key={article.url} article={article} featured={idx === 0} />
                            ))
                        )}
                    </div>

                    {!loading && !error && articles.length === 0 && (
                        <div className="empty-state">
                            <div className="empty-state__icon">📰</div>
                            <h3 className="empty-state__title">No articles found</h3>
                            <p className="empty-state__text">Check back later for {name} news.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
