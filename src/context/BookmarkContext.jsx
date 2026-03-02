import { createContext, useContext, useState, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const BookmarkContext = createContext();

export function BookmarkProvider({ children }) {
    const [bookmarks, setBookmarks] = useLocalStorage('gnews-bookmarks', []);
    const [toast, setToast] = useState(null);

    const showToast = (message) => {
        setToast(message);
        setTimeout(() => setToast(null), 3000);
    };

    const isBookmarked = useCallback(
        (url) => bookmarks.some((b) => b.url === url),
        [bookmarks]
    );

    const toggleBookmark = useCallback(
        (article) => {
            setBookmarks((prev) => {
                const exists = prev.some((b) => b.url === article.url);
                if (exists) {
                    showToast('Bookmark removed');
                    return prev.filter((b) => b.url !== article.url);
                }
                showToast('Article bookmarked!');
                return [...prev, { ...article, bookmarkedAt: Date.now() }];
            });
        },
        [setBookmarks]
    );

    const removeBookmark = useCallback(
        (url) => {
            setBookmarks((prev) => prev.filter((b) => b.url !== url));
            showToast('Bookmark removed');
        },
        [setBookmarks]
    );

    return (
        <BookmarkContext.Provider
            value={{ bookmarks, isBookmarked, toggleBookmark, removeBookmark, toast }}
        >
            {children}
        </BookmarkContext.Provider>
    );
}

export function useBookmarks() {
    const ctx = useContext(BookmarkContext);
    if (!ctx) throw new Error('useBookmarks must be used within BookmarkProvider');
    return ctx;
}
