/**
 * GNews API Service Layer
 * Wraps fetch calls with sessionStorage caching & error handling.
 */

const API_KEY = import.meta.env.VITE_GNEWS_API_KEY;
const BASE_URL = 'https://gnews.io/api/v4';

const CACHE_PREFIX = 'gnews_cache_';
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

/* ---- helpers ---- */

function cacheKey(endpoint, params) {
    const sorted = Object.entries(params)
        .filter(([, v]) => v)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, v]) => `${k}=${v}`)
        .join('&');
    return `${CACHE_PREFIX}${endpoint}?${sorted}`;
}

function getCache(key) {
    try {
        const raw = sessionStorage.getItem(key);
        if (!raw) return null;
        const { data, ts } = JSON.parse(raw);
        if (Date.now() - ts > CACHE_TTL) {
            sessionStorage.removeItem(key);
            return null;
        }
        return data;
    } catch {
        return null;
    }
}

function setCache(key, data) {
    try {
        sessionStorage.setItem(key, JSON.stringify({ data, ts: Date.now() }));
    } catch {
        // storage full — silently ignore
    }
}

async function apiFetch(endpoint, params = {}) {
    const key = cacheKey(endpoint, params);
    const cached = getCache(key);
    if (cached) return cached;

    const query = new URLSearchParams({ ...params, apikey: API_KEY }).toString();
    const url = `${BASE_URL}/${endpoint}?${query}`;

    const res = await fetch(url);

    if (res.status === 429) {
        throw new Error('API rate limit reached. Please try again later.');
    }
    if (!res.ok) {
        throw new Error(`API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    setCache(key, data);
    return data;
}

/* ---- public API ---- */

/**
 * Fetch top headlines.
 * @param {Object} opts
 * @param {string} [opts.category='general']
 * @param {string} [opts.lang='en']
 * @param {string} [opts.country]
 * @param {number} [opts.max=10]
 */
export async function getTopHeadlines({
    category = 'general',
    lang = 'en',
    country,
    max = 10,
} = {}) {
    const params = { category, lang, max };
    if (country) params.country = country;
    return apiFetch('top-headlines', params);
}

/**
 * Search for articles.
 * @param {Object} opts
 * @param {string} opts.q – search query (required)
 * @param {string} [opts.lang='en']
 * @param {string} [opts.country]
 * @param {string} [opts.sortby='publishedAt']
 * @param {number} [opts.max=10]
 */
export async function searchArticles({
    q,
    lang = 'en',
    country,
    sortby = 'publishedAt',
    max = 10,
}) {
    if (!q) throw new Error('Search query is required');
    const params = { q, lang, sortby, max };
    if (country) params.country = country;
    return apiFetch('search', params);
}

/** All available categories in the Top Headlines endpoint. */
export const CATEGORIES = [
    'general',
    'world',
    'nation',
    'business',
    'technology',
    'entertainment',
    'sports',
    'science',
    'health',
];

/** Supported languages (subset). */
export const LANGUAGES = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'Hindi' },
    { code: 'fr', label: 'French' },
    { code: 'de', label: 'German' },
    { code: 'es', label: 'Spanish' },
    { code: 'pt', label: 'Portuguese' },
    { code: 'ar', label: 'Arabic' },
    { code: 'zh', label: 'Chinese' },
    { code: 'ja', label: 'Japanese' },
];

/** Supported countries (subset). */
export const COUNTRIES = [
    { code: '', label: 'All Countries' },
    { code: 'us', label: 'United States' },
    { code: 'gb', label: 'United Kingdom' },
    { code: 'in', label: 'India' },
    { code: 'au', label: 'Australia' },
    { code: 'ca', label: 'Canada' },
    { code: 'fr', label: 'France' },
    { code: 'de', label: 'Germany' },
    { code: 'jp', label: 'Japan' },
];
