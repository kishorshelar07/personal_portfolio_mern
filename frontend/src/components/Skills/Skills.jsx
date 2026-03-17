import React from 'react';
import { motion } from 'framer-motion';
import useScrollReveal from '../../hooks/useScrollReveal';
import { fadeUp } from '../../animations/variants';
import './Skills.css';

const skillGroups = [
  {
    category: 'Frontend',
    icon: 'bi-window',
    color: '#6366f1',
    skills: [
      { name: 'HTML5', level: 92, icon: 'bi-filetype-html' },
      { name: 'CSS3', level: 88, icon: 'bi-filetype-css' },
      { name: 'JavaScript', level: 85, icon: 'bi-filetype-js' },
      { name: 'React JS', level: 80, icon: 'bi-gear' },
      { name: 'Bootstrap', level: 88, icon: 'bi-bootstrap' },
      { name: 'jQuery', level: 78, icon: 'bi-code-slash' },
      { name: 'Angular', level: 60, icon: 'bi-triangle' },
    ],
  },
  {
    category: 'Backend',
    icon: 'bi-server',
    color: '#f59e0b',
    skills: [
      { name: 'Node.js', level: 78, icon: 'bi-hdd-stack' },
      { name: 'Express.js', level: 76, icon: 'bi-layout-wtf' },
      { name: 'PHP', level: 72, icon: 'bi-filetype-php' },
      { name: 'REST APIs', level: 80, icon: 'bi-plug' },
      { name: 'MongoDB', level: 74, icon: 'bi-database' },
      { name: 'MySQL', level: 76, icon: 'bi-table' },
    ],
  },
  {
    category: 'Tools & Others',
    icon: 'bi-tools',
    color: '#a78bfa',
    skills: [
      { name: 'Git / GitHub', level: 82, icon: 'bi-git' },
      { name: 'UI/UX Design', level: 70, icon: 'bi-palette' },
      { name: 'Problem Solving', level: 85, icon: 'bi-puzzle' },
      { name: 'VS Code', level: 90, icon: 'bi-terminal' },
    ],
  },
];

const SkillBar = ({ name, level, icon, color, index, inView }) => (
  <motion.div
    className="skill-item"
    custom={index}
    variants={fadeUp}
    initial="hidden"
    animate={inView ? 'visible' : 'hidden'}
  >
    <div className="skill-header">
      <div className="skill-name-row">
        <i className={`bi ${icon}`} style={{ color }} />
        <span className="skill-name">{name}</span>
      </div>
      <span className="skill-pct" style={{ color }}>{level}%</span>
    </div>
    <div className="skill-track">
      <motion.div
        className="skill-fill"
        style={{ '--skill-color': color }}
        initial={{ width: 0 }}
        animate={inView ? { width: `${level}%` } : { width: 0 }}
        transition={{ duration: 1, delay: 0.15 * index, ease: 'easeOut' }}
      />
    </div>
  </motion.div>
);

const Skills = () => {
  const [titleRef, titleInView] = useScrollReveal();

  return (
    <section id="skills" className="section-padding skills-section">
      <div className="container" style={{ maxWidth: 1200 }}>
        <motion.div
          ref={titleRef}
          className="section-header text-center mb-5"
          variants={fadeUp}
          initial="hidden"
          animate={titleInView ? 'visible' : 'hidden'}
        >
          <p className="section-label">What I know</p>
          <h2 className="section-title">My Skills</h2>
          <div className="divider-gradient" style={{ maxWidth: 120, margin: '12px auto 0' }} />
        </motion.div>

        <div className="row g-4">
          {skillGroups.map((group) => (
            <SkillGroup key={group.category} group={group} />
          ))}
        </div>

        {/* Tech orbit display */}
        <TechOrbit />
      </div>
    </section>
  );
};

const SkillGroup = ({ group }) => {
  const [ref, inView] = useScrollReveal();
  return (
    <div className="col-lg-4 col-md-6">
      <motion.div
        ref={ref}
        className="skill-card glass-card"
        variants={fadeUp}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <div className="skill-card-header" style={{ '--group-color': group.color }}>
          <div className="skill-card-icon">
            <i className={`bi ${group.icon}`} />
          </div>
          <h3 className="skill-card-title">{group.category}</h3>
        </div>
        <div className="skill-list">
          {group.skills.map((skill, i) => (
            <SkillBar
              key={skill.name}
              {...skill}
              color={group.color}
              index={i}
              inView={inView}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const techIcons = [
  { icon: 'bi-filetype-html', label: 'HTML', color: '#e34f26' },
  { icon: 'bi-filetype-css', label: 'CSS', color: '#264de4' },
  { icon: 'bi-filetype-js', label: 'JS', color: '#f7df1e' },
  { icon: 'bi-gear', label: 'React', color: '#61dafb' },
  { icon: 'bi-hdd-stack', label: 'Node', color: '#8cc84b' },
  { icon: 'bi-database', label: 'MongoDB', color: '#47a248' },
  { icon: 'bi-git', label: 'Git', color: '#f05032' },
  { icon: 'bi-bootstrap', label: 'Bootstrap', color: '#7952b3' },
];

const TechOrbit = () => {
  const [ref, inView] = useScrollReveal(0.1);
  return (
    <motion.div
      ref={ref}
      className="tech-orbit-section"
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay: 0.3 }}
    >
      <p className="section-label text-center" style={{ marginBottom: 24 }}>Technologies I work with</p>
      <div className="tech-icons-row">
        {techIcons.map((t, i) => (
          <motion.div
            key={t.label}
            className="tech-icon-chip"
            whileHover={{ scale: 1.15, y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.05 * i }}
          >
            <i className={`bi ${t.icon}`} style={{ color: t.color, fontSize: '1.5rem' }} />
            <span>{t.label}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Skills;
