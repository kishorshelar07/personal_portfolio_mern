import React from 'react';
import { motion } from 'framer-motion';
import useScrollReveal from '../../hooks/useScrollReveal';
import { fadeUp, scaleIn } from '../../animations/variants';
import './Services.css';

const services = [
  {
    icon: 'bi-layers',
    title: 'Full-Stack Development',
    description: 'End-to-end web application development with React frontend, Node.js backend, and MongoDB/MySQL database integration.',
    features: ['React.js + Node.js', 'Database Design', 'REST API Development', 'Authentication & Security'],
    color: '#6366f1',
    gradient: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(59,130,246,0.05))',
  },
  {
    icon: 'bi-window',
    title: 'Frontend Development',
    description: 'Pixel-perfect, responsive UI with smooth animations using React, Bootstrap, and Framer Motion for engaging user experiences.',
    features: ['React.js Components', 'Responsive Design', 'CSS Animations', 'Cross-browser Compatible'],
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.05))',
  },
  {
    icon: 'bi-hdd-rack',
    title: 'Backend API Development',
    description: 'Scalable, secure REST APIs built with Node.js and Express, featuring JWT auth, rate limiting, and proper validation.',
    features: ['RESTful APIs', 'JWT Authentication', 'Rate Limiting', 'Input Validation'],
    color: '#a78bfa',
    gradient: 'linear-gradient(135deg, rgba(167,139,250,0.15), rgba(167,139,250,0.05))',
  },
  {
    icon: 'bi-phone',
    title: 'Responsive Web Design',
    description: 'Mobile-first websites that look and perform flawlessly on all screen sizes using Bootstrap 5 and custom CSS.',
    features: ['Mobile-First Approach', 'Bootstrap 5', 'Fluid Layouts', 'Touch-Friendly UI'],
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.05))',
  },
  {
    icon: 'bi-palette2',
    title: 'UI/UX Design',
    description: 'Clean, intuitive interface designs focusing on usability, visual hierarchy, and delightful micro-interactions.',
    features: ['Wireframing', 'Color Systems', 'Typography', 'Micro-interactions'],
    color: '#f43f5e',
    gradient: 'linear-gradient(135deg, rgba(244,63,94,0.15), rgba(244,63,94,0.05))',
  },
  {
    icon: 'bi-speedometer2',
    title: 'Website Optimization',
    description: 'Performance audits, lazy loading, code splitting, and best practices to ensure fast load times and smooth UX.',
    features: ['Performance Audits', 'Lazy Loading', 'Code Splitting', 'SEO Best Practices'],
    color: '#10b981',
    gradient: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))',
  },
];

const Services = () => {
  const [titleRef, titleInView] = useScrollReveal();

  return (
    <section id="services" className="section-padding services-section">
      <div className="container" style={{ maxWidth: 1200 }}>
        <motion.div
          ref={titleRef}
          className="section-header text-center mb-5"
          variants={fadeUp}
          initial="hidden"
          animate={titleInView ? 'visible' : 'hidden'}
        >
          <p className="section-label">What I offer</p>
          <h2 className="section-title">My Services</h2>
          <div className="divider-gradient" style={{ maxWidth: 120, margin: '12px auto 16px' }} />
          <p className="section-subtitle mx-auto">
            From concept to deployment, I deliver complete web solutions tailored to your needs.
          </p>
        </motion.div>

        <div className="row g-4">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service, index }) => {
  const [ref, inView] = useScrollReveal();
  return (
    <div className="col-lg-4 col-md-6">
      <motion.div
        ref={ref}
        className="service-card glass-card"
        variants={scaleIn}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        custom={index}
        style={{ '--service-color': service.color }}
        whileHover={{ y: -8, boxShadow: `0 24px 60px rgba(0,0,0,0.5), 0 0 30px ${service.color}20` }}
        transition={{ duration: 0.3 }}
      >
        <div className="service-icon-wrap">
          <div className="service-icon-bg" style={{ background: service.gradient }}>
            <i className={`bi ${service.icon}`} />
          </div>
        </div>
        <h3 className="service-title">{service.title}</h3>
        <p className="service-desc">{service.description}</p>
        <ul className="service-features">
          {service.features.map(f => (
            <li key={f}>
              <i className="bi bi-check2" style={{ color: service.color }} />
              <span>{f}</span>
            </li>
          ))}
        </ul>
        <div className="service-cta">
          <a href="#contact" className="service-link">
            Get Started
            <i className="bi bi-arrow-right" />
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Services;
