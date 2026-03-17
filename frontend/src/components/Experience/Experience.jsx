import React from 'react';
import { motion } from 'framer-motion';
import useScrollReveal from '../../hooks/useScrollReveal';
import { fadeUp, slideLeft } from '../../animations/variants';
import './Experience.css';

const experiences = [
  {
    company: 'C Infotech',
    location: 'Pune, India',
    role: 'Full-Stack Development Intern',
    period: 'Jan 2024 – Dec 2024',
    duration: '12 months',
    type: 'Internship',
    icon: 'bi-building',
    color: '#6366f1',
    responsibilities: [
      'Developed responsive web applications using React.js, Node.js, PHP, and MySQL',
      'Designed and built RESTful APIs for various data-driven features',
      'Crafted pixel-perfect, mobile-first UI layouts using Bootstrap and CSS3',
      'Collaborated with team members using Git & GitHub for version control',
      'Built a fully functional Calendar Generator application with image upload and event management',
      'Gained experience with the full software development lifecycle (SDLC)',
    ],
    techUsed: ['React', 'Node.js', 'PHP', 'MySQL', 'Express', 'Bootstrap', 'Git', 'REST APIs'],
  },
];

const Experience = () => {
  const [titleRef, titleInView] = useScrollReveal();

  return (
    <section id="experience" className="section-padding experience-section">
      <div className="container" style={{ maxWidth: 1200 }}>
        <motion.div
          ref={titleRef}
          className="section-header text-center mb-5"
          variants={fadeUp}
          initial="hidden"
          animate={titleInView ? 'visible' : 'hidden'}
        >
          <p className="section-label">Work history</p>
          <h2 className="section-title">Experience</h2>
          <div className="divider-gradient" style={{ maxWidth: 120, margin: '12px auto 0' }} />
        </motion.div>

        <div className="experience-timeline">
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.company} exp={exp} index={i} />
          ))}

          {/* Education */}
          <EducationCard />
        </div>
      </div>
    </section>
  );
};

const ExperienceCard = ({ exp, index }) => {
  const [ref, inView] = useScrollReveal();
  return (
    <motion.div
      ref={ref}
      className="timeline-item"
      variants={slideLeft}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      custom={index}
    >
      {/* Timeline dot */}
      <div className="timeline-dot" style={{ '--dot-color': exp.color }}>
        <i className={`bi ${exp.icon}`} />
      </div>

      <div className="timeline-card glass-card">
        {/* Header */}
        <div className="exp-header">
          <div className="exp-header-left">
            <div className="exp-company-badge" style={{ '--badge-color': exp.color }}>
              <i className="bi bi-building" />
              <span>{exp.company}</span>
            </div>
            <h3 className="exp-role">{exp.role}</h3>
            <div className="exp-meta">
              <span className="exp-period">
                <i className="bi bi-calendar3" />
                {exp.period}
              </span>
              <span className="exp-location">
                <i className="bi bi-geo-alt" />
                {exp.location}
              </span>
              <span className="exp-type-badge">{exp.type}</span>
            </div>
          </div>
          <div className="exp-duration-badge">
            <span className="duration-num">{exp.duration}</span>
          </div>
        </div>

        {/* Responsibilities */}
        <ul className="exp-responsibilities">
          {exp.responsibilities.map((r, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.1 * i }}
            >
              <span className="resp-dot" />
              {r}
            </motion.li>
          ))}
        </ul>

        {/* Tech stack */}
        <div className="exp-tech-row">
          <span className="tech-row-label">Technologies:</span>
          <div className="tech-tags">
            {exp.techUsed.map(t => (
              <span key={t} className="exp-tech-tag">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const EducationCard = () => {
  const [ref, inView] = useScrollReveal();
  return (
    <motion.div
      ref={ref}
      className="timeline-item"
      variants={slideLeft}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      <div className="timeline-dot" style={{ '--dot-color': '#f59e0b' }}>
        <i className="bi bi-mortarboard-fill" />
      </div>
      <div className="timeline-card glass-card">
        <div className="exp-header">
          <div>
            <div className="exp-company-badge" style={{ '--badge-color': '#f59e0b' }}>
              <i className="bi bi-mortarboard" />
              <span>Education</span>
            </div>
            <h3 className="exp-role">B.Sc. Computer Science</h3>
            <div className="exp-meta">
              <span className="exp-period"><i className="bi bi-calendar3" />2021 – 2024</span>
              <span className="exp-location"><i className="bi bi-geo-alt" />Pune, India</span>
              <span className="exp-type-badge" style={{ '--badge-bg': 'rgba(245,158,11,0.12)', '--badge-color': '#f59e0b' }}>Graduation</span>
            </div>
          </div>
        </div>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: 12 }}>
          Studied Computer Science with focus on programming fundamentals, data structures, web technologies, database management, and software engineering principles.
        </p>
      </div>
    </motion.div>
  );
};

export default Experience;
