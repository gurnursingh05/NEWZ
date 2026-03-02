import './HeroSection.css';

export default function HeroSection() {
    return (
        <section className="hero">
            <div className="hero__bg">
                <div className="hero__orb hero__orb--1" />
                <div className="hero__orb hero__orb--2" />
                <div className="hero__orb hero__orb--3" />
            </div>

            <div className="container hero__content">
                <div className="hero__badge">
                    <span className="hero__badge-dot" />
                    Live Headlines
                </div>

                <h1 className="hero__title">
                    Stay Informed with{' '}
                    <span className="text-gradient">Smarter News</span>
                </h1>

                <p className="hero__subtitle">
                    Real-time headlines from 80,000+ sources worldwide. Browse by category,
                    search any topic, and bookmark the stories that matter to you.
                </p>

                <div className="hero__stats">
                    <div className="hero__stat">
                        <span className="hero__stat-value">80K+</span>
                        <span className="hero__stat-label">Sources</span>
                    </div>
                    <div className="hero__stat">
                        <span className="hero__stat-value">9</span>
                        <span className="hero__stat-label">Categories</span>
                    </div>
                    <div className="hero__stat">
                        <span className="hero__stat-value">50+</span>
                        <span className="hero__stat-label">Languages</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
