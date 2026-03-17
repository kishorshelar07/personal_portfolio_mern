import React from 'react';
import { motion } from 'framer-motion';
import useScrollReveal from '../../hooks/useScrollReveal';
import { fadeUp, slideLeft, slideRight } from '../../animations/variants';
import './About.css';

const highlights = [
  { icon: 'bi-code-slash', label: 'Full-Stack Dev', color: '#6366f1' },
  { icon: 'bi-palette', label: 'UI/UX Focus', color: '#f59e0b' },
  { icon: 'bi-lightning-charge', label: 'Fast Learner', color: '#a78bfa' },
  { icon: 'bi-people', label: 'Team Player', color: '#f59e0b' },
];

const About = () => {
  const [titleRef, titleInView] = useScrollReveal();
  const [leftRef, leftInView] = useScrollReveal();
  const [rightRef, rightInView] = useScrollReveal();

  return (
    <section id="about" className="section-padding about-section">
      <div className="container" style={{ maxWidth: 1200 }}>
        {/* Section header */}
        <motion.div
          ref={titleRef}
          className="section-header text-center mb-5"
          variants={fadeUp}
          initial="hidden"
          animate={titleInView ? 'visible' : 'hidden'}
        >
          <p className="section-label">Get to know me</p>
          <h2 className="section-title">About Me</h2>
          <div className="divider-gradient" style={{ maxWidth: 120, margin: '12px auto 0' }} />
        </motion.div>

        <div className="row align-items-center g-5">
          {/* Left: Visual card */}
          <div className="col-lg-5">
            <motion.div
              ref={leftRef}
              variants={slideLeft}
              initial="hidden"
              animate={leftInView ? 'visible' : 'hidden'}
            >
              <div className="about-visual-card glass-card">
                {/* Code window mockup */}
                <div className="code-window">
                  <div className="code-window-header">
                    <div className="code-dots">
                      <span style={{ background: '#ff5f57' }} />
                      <span style={{ background: '#febc2e' }} />
                      <span style={{ background: '#28c840' }} />
                    </div>
                    <span className="code-filename">about.js</span>
                  </div>
                  <div className="code-body">
                    <pre className="code-text">
{`const kishor = {
  name: "Kishor Shelar",
  role: "Full-Stack Developer",
  location: "Pune, India 📍",
  
  skills: [
    "React", "Node.js",
    "MongoDB", "Express",
    "PHP", "MySQL"
  ],

  experience: "1+ Year",
  
  passions: [
    "Clean Code",
    "Problem Solving",
    "Building Products"
  ],

  status: "Open to Work ✅"
};`}
                    </pre>
                  </div>
                </div>

                {/* Highlight pills */}
                <div className="about-highlights">
                  {highlights.map((h) => (
                    <div key={h.label} className="highlight-pill" style={{ '--pill-color': h.color }}>
                      <i className={`bi ${h.icon}`} />
                      <span>{h.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Text content */}
          <div className="col-lg-7">
            <motion.div
              ref={rightRef}
              variants={slideRight}
              initial="hidden"
              animate={rightInView ? 'visible' : 'hidden'}
            >
              <h3 className="about-heading">
                Turning ideas into <span className="gradient-text">real-world</span> digital experiences
              </h3>

              <p className="about-text">
                I'm an aspiring Full-Stack Developer with training and internship experience in building
                responsive web applications, REST APIs, and full-stack solutions. I'm passionate about writing
                clean, maintainable code and crafting intuitive user interfaces.
              </p>

              <p className="about-text">
                During my internship at <span className="about-highlight">C Infotech, Pune</span>, I gained
                hands-on experience with the full software development lifecycle — from planning and design
                to deployment and collaboration with teams using GitHub.
              </p>

              {/* Info grid */}
              <div className="about-info-grid">
                {[
                  { label: 'Name', value: 'Kishor Shelar' },
                  { label: 'Location', value: 'Pune, India' },
                  { label: 'Experience', value: '1+ Year' },
                  { label: 'Availability', value: 'Open to Work' },
                  { label: 'Languages', value: 'English, Hindi, Marathi' },
                  { label: 'Education', value: 'B.Sc. Computer Science' },
                ].map((item) => (
                  <div key={item.label} className="info-item">
                    <span className="info-label">{item.label}</span>
                    <span className="info-value">{item.value}</span>
                  </div>
                ))}
              </div>

              <div className="about-cta">
                <a href="/resume.pdf" download className="btn-primary-custom">
                  <i className="bi bi-file-earmark-person" />
                  Download Resume
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
