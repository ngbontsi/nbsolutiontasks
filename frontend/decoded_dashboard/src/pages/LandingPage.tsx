import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop',
    title: 'Marketplace Platform',
    subtitle: 'Connecting local businesses with their community',
  },
  {
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=600&fit=crop',
    title: 'Guesthouse Booking System',
    subtitle: 'Seamless reservations for boutique stays',
  },
  {
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&h=600&fit=crop',
    title: 'Restaurant Management',
    subtitle: 'Digital menus and online ordering made simple',
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="landing-page">
      <nav className="landing-nav">
        <div className="landing-nav-brand">
          <span className="logo-mark">DS</span>
          <span className="logo-text">Decoded Solutions</span>
        </div>
        <div className="landing-nav-links">
          <button className="landing-btn landing-btn-ghost" onClick={() => navigate('/login')}>
            Sign In
          </button>
        </div>
      </nav>

      <section className="hero-slider">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`slide ${i === current ? 'active' : ''}`}
            style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${slide.image})` }}
          >
            <div className="slide-content">
              <h1>{slide.title}</h1>
              <p>{slide.subtitle}</p>
            </div>
          </div>
        ))}

        <button className="slider-arrow left" onClick={prev}><ChevronLeft size={24} /></button>
        <button className="slider-arrow right" onClick={next}><ChevronRight size={24} /></button>

        <div className="slider-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === current ? 'active' : ''}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
      </section>

      <section className="founder-section">
        <div className="founder-image">
          <div className="founder-placeholder">NB</div>
        </div>
        <div className="founder-info">
          <h2>Ndimphiwe Bontsi</h2>
          <p className="founder-title">Founder & Full-Stack Developer</p>
          <p className="founder-bio">
            Building digital solutions that bridge the gap between local businesses and modern technology.
            Specializing in Spring Boot microservices, React frontends, and cloud-native deployments.
          </p>
          <div className="landing-actions">
            <button className="landing-btn landing-btn-primary" onClick={() => navigate('/login')}>
              Login to Dashboard <ArrowRight size={16} />
            </button>
            <a
              href="https://ngbontsi.github.io/decodedsolutionsite/"
              target="_blank"
              rel="noopener noreferrer"
              className="landing-btn landing-btn-secondary"
            >
              Visit Decoded Solutions <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <p>&copy; {new Date().getFullYear()} Decoded Solutions. All rights reserved.</p>
      </footer>
    </div>
  );
}
