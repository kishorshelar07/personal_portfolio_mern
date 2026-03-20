import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useScrollReveal from '../../hooks/useScrollReveal';
import { fadeUp, scaleIn } from '../../animations/variants';
import './Projects.css';

const projects = [
  {
    id: 1,
    title: 'Netflix Clone',
    description: 'A full-stack Netflix-inspired streaming platform with user authentication, browse movies by genre, search functionality, and watch trailers powered by TMDB API.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT', 'TMDB API'],
    githubUrl: 'https://github.com/kishorshelar07',
    liveUrl: '#',
    category: 'Full-Stack',
    featured: true,
    gradient: 'linear-gradient(135deg, #e50914 0%, #831010 100%)',
    icon: 'bi-play-circle-fill',
    bgIcon: '🎬',
  },
  {
    id: 2,
    title: 'CRUD Application',
    description: 'A production-grade CRUD app with React frontend, Node.js/Express REST APIs, and MySQL database. Features full user management with create, read, update, delete operations.',
    techStack: ['React', 'Node.js', 'Express', 'MySQL', 'REST API'],
    githubUrl: 'https://github.com/kishorshelar07',
    liveUrl: '#',
    category: 'Full-Stack',
    featured: true,
    gradient: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)',
    icon: 'bi-database-fill',
    bgIcon: '⚙️',
  },
  {
    id: 3,
    title: 'Personal Calendar Generator',
    description: 'A custom calendar application allowing users to upload images, add events, and generate personalized printable calendars with export functionality.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Cloudinary', 'Express'],
    githubUrl: 'https://github.com/kishorshelar07',
    liveUrl: '#',
    category: 'Full-Stack',
    featured: true,
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    icon: 'bi-calendar2-heart-fill',
    bgIcon: '📅',
  },
  {
    id: 4,
    title: 'Tic Tac Toe Game',
    description: 'An interactive browser-based Tic Tac Toe game with AI opponent using minimax algorithm, sound effects, score tracking, and smooth animations.',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    githubUrl: 'https://github.com/kishorshelar07',
    liveUrl: '#',
    category: 'Frontend',
    featured: false,
    gradient: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)',
    icon: 'bi-grid-3x3-gap-fill',
    bgIcon: '🎮',
  },
];

const FILTERS = ['All', 'Full-Stack', 'Frontend', 'Backend'];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [titleRef, titleInView] = useScrollReveal();

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="section-padding projects-section">
      <div className="container" style={{ maxWidth: 1200 }}>
        <motion.div
          ref={titleRef}
          className="section-header text-center mb-4"
          variants={fadeUp}
          initial="hidden"
          animate={titleInView ? 'visible' : 'hidden'}
        >
          <p className="section-label">What I've built</p>
          <h2 className="section-title">My Projects</h2>
          <div className="divider-gradient" style={{ maxWidth: 120, margin: '12px auto 16px' }} />
          <p className="section-subtitle mx-auto">
            A selection of projects I've built, ranging from full-stack web apps to frontend experiments.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          className="filter-tabs"
          variants={fadeUp}
          initial="hidden"
          animate={titleInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.2 }}
        >
          {FILTERS.map(f => (
            <button
              key={f}
              className={`filter-tab${activeFilter === f ? ' active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Project cards */}
        <motion.div className="row g-4 mt-2" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* GitHub CTA */}
        <motion.div
          className="github-cta text-center mt-5"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="github-cta-text">Want to see more of my work?</p>
          <a
            href="https://github.com/kishorshelar07"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-custom"
          >
            <i className="bi bi-github" />
            View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index }) => {
  const [ref, inView] = useScrollReveal();

  return (
    <motion.div
      ref={ref}
      className={`col-lg-6${project.featured ? '' : ' col-md-6'}`}
      variants={scaleIn}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      exit={{ opacity: 0, scale: 0.9 }}
      custom={index}
      layout
    >
      <motion.div
        className="project-card glass-card"
        whileHover={{ y: -8, boxShadow: '0 24px 64px rgba(0,0,0,0.5)' }}
        transition={{ duration: 0.3 }}
      >
        {/* Card top banner */}
        <div className="project-banner" style={{ background: project.gradient }}>
          <span className="project-bg-icon">{project.bgIcon}</span>
          <div className="project-icon-wrap">
            <i className={`bi ${project.icon}`} />
          </div>
          {project.featured && (
            <div className="featured-badge">
              <i className="bi bi-star-fill" />
              Featured
            </div>
          )}
          <div className="project-category-tag">{project.category}</div>
        </div>

        {/* Card body */}
        <div className="project-body">
          <h3 className="project-title">{project.title}</h3>
          <p className="project-desc">{project.description}</p>

          {/* Tech stack */}
          <div className="project-tech">
            {project.techStack.map(t => (
              <span key={t} className="project-tech-tag">{t}</span>
            ))}
          </div>

          {/* Actions */}
          <div className="project-actions">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-btn project-btn-outline"
            >
              <i className="bi bi-github" />
              Source Code
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-btn project-btn-primary"
            >
              <i className="bi bi-box-arrow-up-right" />
              Live Demo
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Projects;
