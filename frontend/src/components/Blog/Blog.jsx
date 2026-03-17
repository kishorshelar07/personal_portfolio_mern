import React from 'react';
import { motion } from 'framer-motion';
import useScrollReveal from '../../hooks/useScrollReveal';
import { fadeUp, scaleIn } from '../../animations/variants';
import './Blog.css';

const posts = [
  {
    id: 1,
    title: 'Building a Secure REST API with Node.js, Express & JWT',
    excerpt:
      'A step-by-step guide on creating production-ready REST APIs with authentication, rate limiting, input validation, and best security practices.',
    date: 'Dec 12, 2024',
    readTime: '8 min read',
    category: 'Backend',
    categoryColor: '#f59e0b',
    tags: ['Node.js', 'JWT', 'Express', 'Security'],
    emoji: '🔐',
    gradient: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(59,130,246,0.08))',
  },
  {
    id: 2,
    title: 'React Performance: Memoization, Code Splitting & Lazy Loading',
    excerpt:
      'Deep-dive into React optimization techniques — when to use useMemo, useCallback, React.memo, and how to implement lazy loading for dramatic speed improvements.',
    date: 'Nov 28, 2024',
    readTime: '10 min read',
    category: 'Frontend',
    categoryColor: '#6366f1',
    tags: ['React', 'Performance', 'Hooks'],
    emoji: '⚡',
    gradient: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(167,139,250,0.08))',
  },
  {
    id: 3,
    title: 'MongoDB Schema Design: Patterns & Anti-Patterns',
    excerpt:
      'Understanding when to embed vs. reference documents, how to model relationships efficiently, and common schema mistakes to avoid in production apps.',
    date: 'Nov 10, 2024',
    readTime: '7 min read',
    category: 'Database',
    categoryColor: '#10b981',
    tags: ['MongoDB', 'Mongoose', 'Schema'],
    emoji: '🗄️',
    gradient: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(245,158,11,0.08))',
  },
];

const Blog = () => {
  const [titleRef, titleInView] = useScrollReveal();

  return (
    <section id="blog" className="section-padding blog-section">
      <div className="container" style={{ maxWidth: 1200 }}>
        <motion.div
          ref={titleRef}
          className="section-header text-center mb-5"
          variants={fadeUp}
          initial="hidden"
          animate={titleInView ? 'visible' : 'hidden'}
        >
          <p className="section-label">Thoughts & tutorials</p>
          <h2 className="section-title">Latest Articles</h2>
          <div className="divider-gradient" style={{ maxWidth: 120, margin: '12px auto 16px' }} />
          <p className="section-subtitle mx-auto">
            I write about web development, software engineering, and lessons learned building real-world projects.
          </p>
        </motion.div>

        <div className="row g-4">
          {posts.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} />
          ))}
        </div>

        {/* Coming soon / link */}
        <motion.div
          className="blog-cta text-center mt-5"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="blog-cta-card glass-card">
            <span className="blog-cta-emoji">✍️</span>
            <div>
              <p className="blog-cta-title">More articles coming soon</p>
              <p className="blog-cta-sub">
                Follow me on GitHub or LinkedIn to get notified when I publish new content.
              </p>
            </div>
            <div className="blog-cta-btns">
              <a
                href="https://github.com/kishorshelar"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-custom btn-sm-custom"
              >
                <i className="bi bi-github" /> GitHub
              </a>
              <a
                href="https://linkedin.com/in/kishorshelar"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary-custom btn-sm-custom"
              >
                <i className="bi bi-linkedin" /> LinkedIn
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const BlogCard = ({ post, index }) => {
  const [ref, inView] = useScrollReveal();
  return (
    <div className="col-lg-4 col-md-6">
      <motion.article
        ref={ref}
        className="blog-card glass-card"
        variants={scaleIn}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        custom={index}
        whileHover={{ y: -8, boxShadow: '0 24px 64px rgba(0,0,0,0.5)' }}
        transition={{ duration: 0.3 }}
      >
        {/* Top banner */}
        <div className="blog-banner" style={{ background: post.gradient }}>
          <span className="blog-emoji">{post.emoji}</span>
          <span
            className="blog-category"
            style={{ color: post.categoryColor, borderColor: `${post.categoryColor}44`, background: `${post.categoryColor}14` }}
          >
            {post.category}
          </span>
        </div>

        {/* Body */}
        <div className="blog-body">
          <div className="blog-meta">
            <span className="blog-date">
              <i className="bi bi-calendar3" />
              {post.date}
            </span>
            <span className="blog-dot-sep">·</span>
            <span className="blog-read">
              <i className="bi bi-clock" />
              {post.readTime}
            </span>
          </div>

          <h3 className="blog-title">{post.title}</h3>
          <p className="blog-excerpt">{post.excerpt}</p>

          <div className="blog-tags">
            {post.tags.map(t => (
              <span key={t} className="blog-tag">{t}</span>
            ))}
          </div>

          <button className="blog-read-btn">
            Read Article
            <i className="bi bi-arrow-right" />
          </button>
        </div>
      </motion.article>
    </div>
  );
};

export default Blog;
