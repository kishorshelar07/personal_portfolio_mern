import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { TypeAnimation } from 'react-type-animation';
import './Hero.css';

const floatVariants = {
  animate: {
    y: [-12, 12, -12],
    transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
  },
};

const Hero = () => {
  const canvasRef = useRef(null);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    let animId;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > W) p.dx *= -1;
        if (p.y < 0 || p.y > H) p.dy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,102,241,${p.alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <section id="hero" className="hero-section">
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="hero-canvas" />

      {/* Background orbs */}
      <div className="hero-orb orb-1" />
      <div className="hero-orb orb-2" />
      <div className="hero-grid" />

      <div className="container hero-container">
        <div className="row align-items-center min-vh-100">
          {/* Left content */}
          <div className="col-lg-7 hero-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="hero-badge">
                <span className="badge-dot" />
                <span>Available for opportunities</span>
              </div>
            </motion.div>

            <motion.h1
              className="hero-name"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
            >
              Hi, I'm <br />
              <span className="name-gradient">Kishor Shelar</span>
            </motion.h1>

            <motion.div
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <span className="title-prefix">&gt; </span>
              <TypeAnimation
                sequence={[
                  'Full-Stack Developer', 2200,
                  'React JS Developer', 2000,
                  'Node.js Engineer', 2000,
                  'UI/UX Enthusiast', 2000,
                  'Problem Solver', 2000,
                ]}
                repeat={Infinity}
                className="typed-text"
              />
            </motion.div>

            <motion.p
              className="hero-desc"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
            >
              Aspiring Full-Stack Developer building responsive web applications,
              scalable APIs, and clean UI experiences. Based in{' '}
              <span className="highlight-text">Pune, India 📍</span>
            </motion.p>

            <motion.div
              className="hero-btns"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              <Link to="projects" smooth duration={700} offset={-80}>
                <button className="btn-primary-custom">
                  <i className="bi bi-grid-3x3-gap-fill" />
                  View Projects
                </button>
              </Link>
              <a
                href="/resume.pdf"
                download
                className="btn-outline-custom"
              >
                <i className="bi bi-download" />
                Download Resume
              </a>
              <Link to="contact" smooth duration={700} offset={-80}>
                <button className="btn-cyan-outline">
                  <i className="bi bi-lightning-fill" />
                  Hire Me
                </button>
              </Link>
            </motion.div>

            {/* Social links */}
            <motion.div
              className="hero-socials"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {[
                { icon: 'bi-github', href: 'https://github.com/kishorshelar', label: 'GitHub' },
                { icon: 'bi-linkedin', href: 'https://linkedin.com/in/kishorshelar', label: 'LinkedIn' },
                { icon: 'bi-envelope-fill', href: 'mailto:kishorshelar@gmail.com', label: 'Email' },
              ].map(s => (
                <a
                  key={s.icon}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  aria-label={s.label}
                >
                  <i className={`bi ${s.icon}`} />
                </a>
              ))}
              <div className="social-divider" />
              <span className="social-label">Connect with me</span>
            </motion.div>
          </div>

          {/* Right: Floating card */}
          <div className="col-lg-5 hero-right d-none d-lg-flex">
            <motion.div
              className="hero-card-wrapper"
              variants={floatVariants}
              animate="animate"
            >
              <div className="hero-avatar-card glass-card">
                <div className="avatar-ring">
                  <div className="avatar-initials">KS</div>
                </div>

                <div className="avatar-info">
                  <h3 className="avatar-name">Kishor Shelar</h3>
                  <p className="avatar-role">Full-Stack Developer</p>
                  <div className="avatar-location">
                    <i className="bi bi-geo-alt-fill" />
                    <span>Pune, India</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="avatar-stats">
                  {[
                    { num: '1+', label: 'Year Exp' },
                    { num: '10+', label: 'Projects' },
                    { num: '5+', label: 'Tech Stack' },
                  ].map(s => (
                    <div key={s.label} className="stat-item">
                      <span className="stat-num">{s.num}</span>
                      <span className="stat-label">{s.label}</span>
                    </div>
                  ))}
                </div>

                {/* Tech badges */}
                <div className="avatar-tech-badges">
                  {['React', 'Node.js', 'MongoDB', 'Express'].map(t => (
                    <span key={t} className="tech-badge">{t}</span>
                  ))}
                </div>

                {/* Status indicator */}
                <div className="avatar-status">
                  <span className="status-dot" />
                  <span>Open to work</span>
                </div>

                {/* Decorative circles */}
                <div className="card-deco-1" />
                <div className="card-deco-2" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <Link to="about" smooth duration={600} offset={-80}>
            <div className="scroll-mouse">
              <div className="scroll-wheel" />
            </div>
          </Link>
          <span>Scroll down</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
