import './Skeleton.css';

export default function Skeleton({ count = 6 }) {
    return (
        <>
            {Array.from({ length: count }, (_, i) => (
                <div className="skeleton-card" key={i} aria-hidden="true">
                    <div className="skeleton-card__image" />
                    <div className="skeleton-card__body">
                        <div className="skeleton-line skeleton-line--sm" />
                        <div className="skeleton-line skeleton-line--lg" />
                        <div className="skeleton-line skeleton-line--md" />
                    </div>
                </div>
            ))}
        </>
    );
}
