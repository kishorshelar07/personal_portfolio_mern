import React from 'react';
import { motion } from 'framer-motion';
import useScrollReveal from '../../hooks/useScrollReveal';
import { fadeUp, slideLeft, slideRight } from '../../animations/variants';
import './GitHubActivity.css';

const GITHUB_USERNAME = 'kishorshelar';

const GitHubActivity = () => {
  const [titleRef, titleInView] = useScrollReveal();
  const [leftRef, leftInView] = useScrollReveal();
  const [rightRef, rightInView] = useScrollReveal();

  return (
    <section id="github" className="section-padding github-section">
      <div className="container" style={{ maxWidth: 1200 }}>
        <motion.div
          ref={titleRef}
          className="section-header text-center mb-5"
          variants={fadeUp}
          initial="hidden"
          animate={titleInView ? 'visible' : 'hidden'}
        >
          <p className="section-label">Open source</p>
          <h2 className="section-title">GitHub Activity</h2>
          <div className="divider-gradient" style={{ maxWidth: 120, margin: '12px auto' }} />
        </motion.div>

        <div className="row g-4 align-items-stretch">
          {/* GitHub Stats Cards */}
          <div className="col-lg-6">
            <motion.div
              ref={leftRef}
              variants={slideLeft}
              initial="hidden"
              animate={leftInView ? 'visible' : 'hidden'}
              className="h-100"
            >
              <div className="github-stats-grid">
                <img
                  src={`https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&theme=tokyonight&bg_color=050508&title_color=6366f1&text_color=a1a1aa&icon_color=f59e0b&border_color=13131c&border_radius=16`}
                  alt="GitHub Stats"
                  className="github-img"
                  loading="lazy"
                />
                <img
                  src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&layout=compact&theme=tokyonight&bg_color=050508&title_color=6366f1&text_color=a1a1aa&icon_color=f59e0b&border_color=13131c&border_radius=16`}
                  alt="Top Languages"
                  className="github-img"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>

          {/* GitHub Streak + Contribution Graph */}
          <div className="col-lg-6">
            <motion.div
              ref={rightRef}
              variants={slideRight}
              initial="hidden"
              animate={rightInView ? 'visible' : 'hidden'}
              className="h-100"
            >
              <div className="github-stats-grid">
                <img
                  src={`https://streak-stats.demolab.com?user=${GITHUB_USERNAME}&theme=tokyonight&background=050508&border=13131c&stroke=6366f1&ring=8b5cf6&fire=f59e0b&currStreakLabel=f59e0b&border_radius=16`}
                  alt="GitHub Streak"
                  className="github-img"
                  loading="lazy"
                />
                <div className="github-info-card glass-card">
                  <div className="github-profile-row">
                    <div className="github-avatar">
                      <i className="bi bi-github" />
                    </div>
                    <div>
                      <h4 className="github-username">@{GITHUB_USERNAME}</h4>
                      <p className="github-bio">Full-Stack Developer • Building in public</p>
                    </div>
                    <a
                      href={`https://github.com/${GITHUB_USERNAME}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="github-profile-btn"
                    >
                      Visit Profile
                      <i className="bi bi-box-arrow-up-right" />
                    </a>
                  </div>
                  <div className="github-mini-stats">
                    {[
                      { icon: 'bi-folder2', label: 'Repositories', value: '10+' },
                      { icon: 'bi-star', label: 'Stars Earned', value: '5+' },
                      { icon: 'bi-people', label: 'Followers', value: 'Growing' },
                    ].map(s => (
                      <div key={s.label} className="github-mini-stat">
                        <i className={`bi ${s.icon}`} />
                        <span className="mini-stat-val">{s.value}</span>
                        <span className="mini-stat-label">{s.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubActivity;
