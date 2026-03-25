import React from 'react';
import { Link } from 'react-scroll';
import './Footer.css';

const NAV = [
  { label: 'About', to: 'about' },
  { label: 'Skills', to: 'skills' },
  { label: 'Experience', to: 'experience' },
  { label: 'Projects', to: 'projects' },
  { label: 'Services', to: 'services' },
  { label: 'Contact', to: 'contact' },
];

const SOCIALS = [
  { icon: 'bi-github', href: 'https://github.com/kishorshelar07', label: 'GitHub' },
  { icon: 'bi-linkedin', href: 'https://linkedin.com/in/kishorshelar1610', label: 'LinkedIn' },
  { icon: 'bi-envelope-fill', href: 'mailto:kishorshelar560@gmail.com', label: 'Email' },
  { icon: 'bi-telephone-fill', href: 'tel:+918308516345', label: 'Phone' },
];

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-glow" />
      <div className="container" style={{ maxWidth: 1200 }}>
        <div className="footer-top">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-box">KS</div>
              <span className="footer-logo-text">Kishor<span className="footer-dot">.</span></span>
            </div>
            <p className="footer-tagline">
              Full-Stack Developer based in Pune, India. Building clean, performant,
              and beautiful web experiences.
            </p>
            <div className="footer-socials">
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="footer-social-btn" aria-label={s.label}>
                  <i className={`bi ${s.icon}`} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-nav-list">
              {NAV.map(n => (
                <li key={n.to}>
                  <Link to={n.to} smooth duration={600} offset={-80} className="footer-link">
                    <i className="bi bi-chevron-right" />{n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Tech Stack</h4>
            <div className="footer-tech-tags">
              {['React', 'Node.js', 'Express', 'MongoDB', 'PHP', 'MySQL', 'Bootstrap', 'Git'].map(t => (
                <span key={t} className="footer-tech-tag">{t}</span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Contact</h4>
            <div className="footer-contact-items">
              {[
                { icon: 'bi-envelope', label: 'kishorshelar560@gmail.com', href: 'mailto:kishorshelar@gmail.com' },
                { icon: 'bi-telephone', label: '+91 8308516345', href: 'tel:+918308516345' },
                { icon: 'bi-geo-alt', label: 'Pune, Maharashtra, India', href: '#' },
              ].map(c => (
                <a key={c.label} href={c.href} className="footer-contact-item">
                  <i className={`bi ${c.icon}`} /><span>{c.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="divider-gradient" />

        <div className="footer-bottom">
          <p className="footer-copy">
            © {year} <span className="gradient-text">Kishor Shelar</span>. All rights reserved.
          </p>
          <p className="footer-made">
            Crafted with <span className="heart">♥</span> using React &amp; Node.js
          </p>
          <button className="back-to-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top">
            <i className="bi bi-arrow-up" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
