import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { contactAPI } from '../../utils/api';
import { useToast } from '../Toast/ToastProvider';
import useScrollReveal from '../../hooks/useScrollReveal';
import { fadeUp, slideLeft, slideRight } from '../../animations/variants';
import './Contact.css';

const CONTACT_INFO = [
  { icon: 'bi-envelope-fill', label: 'Email', value: 'kishorshelar@gmail.com', href: 'mailto:kishorshelar@gmail.com', color: '#6366f1' },
  { icon: 'bi-telephone-fill', label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210', color: '#f59e0b' },
  { icon: 'bi-geo-alt-fill', label: 'Location', value: 'Pune, Maharashtra, India', href: 'https://maps.google.com/?q=Pune,India', color: '#a78bfa' },
  { icon: 'bi-linkedin', label: 'LinkedIn', value: 'linkedin.com/in/kishorshelar', href: 'https://linkedin.com/in/kishorshelar', color: '#0077b5' },
];

const initForm = { name: '', email: '', message: '' };

const Contact = () => {
  const [form, setForm] = useState(initForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success
  const { addToast } = useToast();

  const [titleRef, titleInView] = useScrollReveal();
  const [leftRef,  leftInView]  = useScrollReveal();
  const [rightRef, rightInView] = useScrollReveal();

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2)
      e.name = 'Name must be at least 2 characters.';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      e.email = 'Enter a valid email address.';
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = 'Message must be at least 10 characters.';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus('loading');
    try {
      const res = await contactAPI.submit(form);
      addToast(res.data.message || 'Message sent successfully!', 'success');
      setStatus('success');
      setForm(initForm);
    } catch (err) {
      addToast(err.message || 'Something went wrong. Please try again.', 'error');
      setStatus('idle');
    }
  };

  return (
    <section id="contact" className="section-padding contact-section">
      <div className="container" style={{ maxWidth: 1200 }}>
        <motion.div ref={titleRef} className="section-header text-center mb-5"
          variants={fadeUp} initial="hidden" animate={titleInView ? 'visible' : 'hidden'}>
          <p className="section-label">Get in touch</p>
          <h2 className="section-title">Contact Me</h2>
          <div className="divider-gradient" style={{ maxWidth: 120, margin: '12px auto 16px' }} />
          <p className="section-subtitle mx-auto">
            Have a project in mind or want to hire me? Drop a message — I'll reply within 24 hours.
          </p>
        </motion.div>

        <div className="row g-5">
          {/* ── Left: contact info ── */}
          <div className="col-lg-5">
            <motion.div ref={leftRef} variants={slideLeft}
              initial="hidden" animate={leftInView ? 'visible' : 'hidden'}>
              <h3 className="contact-heading">Let's work together</h3>
              <p className="contact-subtext">
                I'm available for freelance projects, full-time roles, and exciting collaborations.
              </p>
              <div className="contact-info-list">
                {CONTACT_INFO.map((item) => (
                  <a key={item.label} href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="contact-info-card glass-card"
                    style={{ '--info-color': item.color }}>
                    <div className="contact-info-icon">
                      <i className={`bi ${item.icon}`} />
                    </div>
                    <div className="contact-info-text">
                      <span className="contact-info-label">{item.label}</span>
                      <span className="contact-info-value">{item.value}</span>
                    </div>
                    <i className="bi bi-arrow-up-right contact-arrow" />
                  </a>
                ))}
              </div>
              <div className="availability-banner">
                <div className="availability-dot" />
                <div>
                  <p className="availability-title">Currently Available</p>
                  <p className="availability-sub">Open to full-time and freelance roles</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Right: form ── */}
          <div className="col-lg-7">
            <motion.div ref={rightRef} variants={slideRight}
              initial="hidden" animate={rightInView ? 'visible' : 'hidden'}>
              <div className="contact-form-card glass-card">
                {status === 'success' ? (
                  <motion.div className="form-success"
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                    <div className="success-icon"><i className="bi bi-check-circle-fill" /></div>
                    <h3>Message Sent!</h3>
                    <p>Thanks for reaching out. I'll get back to you within 24 hours.</p>
                    <button className="btn-primary-custom" onClick={() => setStatus('idle')}>
                      Send Another
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="contact-form">
                    <div className="form-row-2col">
                      <div className={`form-group${errors.name ? ' has-error' : ''}`}>
                        <label className="form-label-custom" htmlFor="name">
                          <i className="bi bi-person" /> Your Name
                        </label>
                        <input id="name" name="name" type="text"
                          className={`form-input-custom${errors.name ? ' error' : ''}`}
                          placeholder="Rahul Deshmukh"
                          value={form.name} onChange={handleChange} autoComplete="name" />
                        {errors.name && <span className="field-error">{errors.name}</span>}
                      </div>
                      <div className={`form-group${errors.email ? ' has-error' : ''}`}>
                        <label className="form-label-custom" htmlFor="email">
                          <i className="bi bi-envelope" /> Email Address
                        </label>
                        <input id="email" name="email" type="email"
                          className={`form-input-custom${errors.email ? ' error' : ''}`}
                          placeholder="rahul@example.com"
                          value={form.email} onChange={handleChange} autoComplete="email" />
                        {errors.email && <span className="field-error">{errors.email}</span>}
                      </div>
                    </div>

                    <div className={`form-group${errors.message ? ' has-error' : ''}`}>
                      <label className="form-label-custom" htmlFor="message">
                        <i className="bi bi-chat-text" /> Message
                        <span className="char-count">{form.message.length}/1000</span>
                      </label>
                      <textarea id="message" name="message" rows={6}
                        className={`form-input-custom form-textarea${errors.message ? ' error' : ''}`}
                        placeholder="Tell me about your project, opportunity, or just say hello..."
                        value={form.message} onChange={handleChange} maxLength={1000} />
                      {errors.message && <span className="field-error">{errors.message}</span>}
                    </div>

                    <motion.button type="submit" className="btn-primary-custom submit-btn"
                      disabled={status === 'loading'}
                      whileHover={{ scale: status !== 'loading' ? 1.02 : 1 }}
                      whileTap={{ scale: 0.98 }}>
                      {status === 'loading' ? (
                        <><span className="spinner" /> Sending...</>
                      ) : (
                        <><i className="bi bi-send-fill" /> Send Message</>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
