import { useState, useEffect } from 'react';
import { IoSearchOutline, IoAlertCircleOutline } from 'react-icons/io5';
import SearchBar from '../components/SearchBar';
import NewsCard from '../components/NewsCard';
import Skeleton from '../components/Skeleton';
import { useDebounce } from '../hooks/useDebounce';
import { searchArticles, LANGUAGES, COUNTRIES } from '../api/gnews';
import './Search.css';

const SUGGESTIONS = ['Artificial Intelligence', 'Climate Change', 'Space Exploration', 'Cryptocurrency', 'Elections 2026', 'Olympics'];

export default function Search() {
    const [query, setQuery] = useState('');
    const [lang, setLang] = useState('en');
    const [country, setCountry] = useState('');
    const [sortby, setSortby] = useState('publishedAt');
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);

    const debouncedQuery = useDebounce(query, 400);

    useEffect(() => {
        if (!debouncedQuery.trim()) {
            setArticles([]);
            setHasSearched(false);
            return;
        }

        let cancelled = false;
        const doSearch = async () => {
            setLoading(true);
            setError(null);
            setHasSearched(true);
            try {
                const data = await searchArticles({ q: debouncedQuery, lang, country, sortby });
                if (!cancelled) setArticles(data.articles || []);
            } catch (err) {
                if (!cancelled) setError(err.message);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        doSearch();
        return () => { cancelled = true; };
    }, [debouncedQuery, lang, country, sortby]);

    const handleSuggestion = (s) => setQuery(s);

    return (
        <div className="search-page">
            <div className="container">
                <div className="search-page__header">
                    <h1 className="search-page__title">Search News</h1>
                    <SearchBar
                        value={query}
                        onChange={setQuery}
                        onClear={() => setQuery('')}
                        placeholder="Search any topic..."
                    />

                    <div className="search-page__filters">
                        <select className="search-filter-select" value={lang} onChange={(e) => setLang(e.target.value)} aria-label="Language filter">
                            {LANGUAGES.map((l) => (
                                <option key={l.code} value={l.code}>{l.label}</option>
                            ))}
                        </select>
                        <select className="search-filter-select" value={country} onChange={(e) => setCountry(e.target.value)} aria-label="Country filter">
                            {COUNTRIES.map((c) => (
                                <option key={c.code} value={c.code}>{c.label}</option>
                            ))}
                        </select>
                        <select className="search-filter-select" value={sortby} onChange={(e) => setSortby(e.target.value)} aria-label="Sort order">
                            <option value="publishedAt">Newest First</option>
                            <option value="relevance">Relevance</option>
                        </select>
                    </div>
                </div>

                {error && (
                    <div className="error-banner">
                        <IoAlertCircleOutline className="error-banner__icon" />
                        <span>{error}</span>
                    </div>
                )}

                {!hasSearched && !loading && (
                    <div className="search-page__prompt">
                        <IoSearchOutline className="search-page__prompt-icon" />
                        <h2 className="search-page__prompt-title">Discover stories that matter</h2>
                        <p className="search-page__prompt-text">
                            Type a keyword or phrase to search across 80,000+ news sources worldwide.
                        </p>
                        <div className="search-suggestions">
                            {SUGGESTIONS.map((s) => (
                                <button key={s} className="search-suggestion" onClick={() => handleSuggestion(s)}>
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {hasSearched && (
                    <>
                        {!loading && !error && (
                            <p className="search-page__result-count">
                                {articles.length} result{articles.length !== 1 ? 's' : ''} for "{debouncedQuery}"
                            </p>
                        )}
                        <div className="news-grid">
                            {loading ? (
                                <Skeleton count={6} />
                            ) : (
                                articles.map((article) => (
                                    <NewsCard key={article.url} article={article} />
                                ))
                            )}
                        </div>

                        {!loading && !error && articles.length === 0 && (
                            <div className="empty-state">
                                <div className="empty-state__icon">🔍</div>
                                <h3 className="empty-state__title">No results found</h3>
                                <p className="empty-state__text">
                                    Try different keywords or adjust your filters.
                                </p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
