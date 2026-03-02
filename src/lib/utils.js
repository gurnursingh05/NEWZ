/**
 * Simple className merge utility (replaces shadcn's cn/clsx+twMerge).
 * Joins class strings, filtering out falsy values.
 */
export function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}
