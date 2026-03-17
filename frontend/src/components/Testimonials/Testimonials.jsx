import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useScrollReveal from '../../hooks/useScrollReveal';
import { fadeUp } from '../../animations/variants';
import './Testimonials.css';

const testimonials = [
  {
    id: 1,
    name: 'Rahul Deshmukh',
    role: 'Senior Developer',
    company: 'C Infotech',
    avatar: 'RD',
    color: '#6366f1',
    rating: 5,
    text: "Kishor is an exceptionally talented developer who consistently delivered high-quality code during his internship. His ability to quickly understand requirements and translate them into clean, functional solutions was impressive. He showed great initiative, especially with the Calendar Generator project.",
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Project Manager',
    company: 'TechVision Pune',
    avatar: 'PS',
    color: '#f59e0b',
    rating: 5,
    text: "Working with Kishor was a pleasure. He has a strong understanding of both frontend and backend development. His React skills are top-notch, and he always ensures the UI is responsive and polished. He communicates well and is proactive about solving problems.",
  },
  {
    id: 3,
    name: 'Amit Kulkarni',
    role: 'Tech Lead',
    company: 'StartupHub India',
    avatar: 'AK',
    color: '#a78bfa',
    rating: 5,
    text: "I was impressed by Kishor's ability to pick up new technologies quickly. He built a complete REST API from scratch for our project in record time, with proper security measures and clean code structure. A very dedicated and hardworking developer.",
  },
  {
    id: 4,
    name: 'Sneha Patil',
    role: 'UI/UX Designer',
    company: 'DesignCraft Studio',
    avatar: 'SP',
    color: '#f59e0b',
    rating: 5,
    text: "Kishor has a great eye for design as well as strong coding skills. He implemented all our design specifications perfectly, including the subtle animations and hover effects. The collaboration was smooth, and he always delivered on time.",
  },
  {
    id: 5,
    name: 'Vikram Joshi',
    role: 'Full-Stack Developer',
    company: 'Freelance',
    avatar: 'VJ',
    color: '#10b981',
    rating: 5,
    text: "Kishor helped me with a client project involving Node.js APIs and MongoDB. His problem-solving approach is methodical and efficient. The code he wrote was well-structured, commented, and easy to maintain. Highly recommend!",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef(null);
  const [titleRef, titleInView] = useScrollReveal();

  const goTo = (index, dir) => {
    setDirection(dir);
    setCurrent(index);
  };

  const next = () => {
    setDirection(1);
    setCurrent(c => (c + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent(c => (c - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrent(c => (c + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timerRef.current);
  }, []);

  const slideVariants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60, scale: 0.96 }),
    center: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: (dir) => ({
      opacity: 0,
      x: dir > 0 ? -60 : 60,
      scale: 0.96,
      transition: { duration: 0.35 },
    }),
  };

  const t = testimonials[current];

  return (
    <section id="testimonials" className="section-padding testimonials-section">
      <div className="container" style={{ maxWidth: 1200 }}>
        <motion.div
          ref={titleRef}
          className="section-header text-center mb-5"
          variants={fadeUp}
          initial="hidden"
          animate={titleInView ? 'visible' : 'hidden'}
        >
          <p className="section-label">What people say</p>
          <h2 className="section-title">Testimonials</h2>
          <div className="divider-gradient" style={{ maxWidth: 120, margin: '12px auto' }} />
        </motion.div>

        <div className="testimonials-wrapper">
          {/* Main card */}
          <div className="testimonial-main">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                className="testimonial-card glass-card"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <div className="quote-icon">
                  <i className="bi bi-quote" />
                </div>

                <div className="testimonial-stars">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <i key={i} className="bi bi-star-fill" />
                  ))}
                </div>

                <p className="testimonial-text">"{t.text}"</p>

                <div className="testimonial-author">
                  <div
                    className="author-avatar"
                    style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}88)` }}
                  >
                    {t.avatar}
                  </div>
                  <div className="author-info">
                    <span className="author-name">{t.name}</span>
                    <span className="author-role">{t.role} · {t.company}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="testimonial-nav">
              <button className="testi-nav-btn" onClick={prev} aria-label="Previous">
                <i className="bi bi-arrow-left" />
              </button>
              <div className="testi-dots">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    className={`testi-dot${i === current ? ' active' : ''}`}
                    onClick={() => goTo(i, i > current ? 1 : -1)}
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <button className="testi-nav-btn" onClick={next} aria-label="Next">
                <i className="bi bi-arrow-right" />
              </button>
            </div>
          </div>

          {/* Sidebar thumbs */}
          <div className="testimonial-thumbs">
            {testimonials.map((item, i) => (
              <motion.button
                key={item.id}
                className={`testi-thumb${i === current ? ' active' : ''}`}
                onClick={() => goTo(i, i > current ? 1 : -1)}
                whileHover={{ scale: 1.02 }}
                style={{ '--thumb-color': item.color }}
              >
                <div
                  className="thumb-avatar"
                  style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}88)` }}
                >
                  {item.avatar}
                </div>
                <div className="thumb-info">
                  <span className="thumb-name">{item.name}</span>
                  <span className="thumb-role">{item.role}</span>
                </div>
                {i === current && (
                  <motion.div
                    className="thumb-active-indicator"
                    layoutId="activeThumb"
                    style={{ background: item.color }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
