import React, { useEffect } from 'react';
import logo from './public/logo-samudhra.png';
import landingGif from './assets/samudhra-landing.gif';

function App() {
  useEffect(() => {
    // MOBILE NAV TOGGLE
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    const handleToggle = () => {
      if (!navToggle || !navMenu) return;
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      navMenu.classList.toggle('is-open', !isOpen);
    };

    const handleMenuClick = (event) => {
      const target = event.target;
      if (target instanceof HTMLAnchorElement && navToggle && navMenu) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
      }
    };

    if (navToggle && navMenu) {
      navToggle.addEventListener('click', handleToggle);
      navMenu.addEventListener('click', handleMenuClick);
    }

    // SCROLL REVEAL ANIMATIONS
    const animatedElements = document.querySelectorAll('[data-animate]');
    let observer;

    if ('IntersectionObserver' in window && animatedElements.length > 0) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.25,
          rootMargin: '0px 0px -10% 0px',
        },
      );

      animatedElements.forEach((el) => observer.observe(el));
    } else {
      animatedElements.forEach((el) => el.classList.add('is-visible'));
    }

    // SMOOTH SCROLL FOR IN-PAGE LINKS
    const handleDocumentClick = (event) => {
      const target = event.target;
      if (!(target instanceof HTMLAnchorElement)) return;

      const href = target.getAttribute('href');
      if (!href || !href.startsWith('#') || href.length <= 1) return;

      const section = document.querySelector(href);
      if (!section) return;

      event.preventDefault();
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    document.addEventListener('click', handleDocumentClick);

    // Clean up listeners and observers when React unmounts this component
    return () => {
      if (navToggle && navMenu) {
        navToggle.removeEventListener('click', handleToggle);
        navMenu.removeEventListener('click', handleMenuClick);
      }
      if (observer) {
        observer.disconnect();
      }
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <>
      <header className="site-header" id="top">
        <div className="container header-inner">
          <a href="#top" className="logo" aria-label="Samudhra Shipping Solutions">
            <img
              src={logo}
              alt="Samudhra Shipping Solutions Pvt Ltd"
              className="logo-img"
            />
          </a>

          <nav className="main-nav" aria-label="Main navigation">
            <button
              className="nav-toggle"
              aria-expanded="false"
              aria-controls="nav-menu"
              type="button"
            >
              <span className="nav-toggle-line" />
              <span className="nav-toggle-line" />
            </button>
            <ul id="nav-menu" className="nav-menu">
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#network">Network</a>
              </li>
              <li>
                <a href="#why-us">Why Samudhra</a>
              </li>
              <li>
                <a href="#careers">Careers</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section
          className="section hero hero--full"
          aria-labelledby="hero-heading"
          style={{ backgroundImage: `url(${landingGif})` }}
        >
          <div className="container hero-inner">
            <div className="hero-copy hero-copy--center" data-animate="fade-up">
              <p className="eyebrow">Global logistics, coastal spirit</p>
              <h1 id="hero-heading">
                Powering your success
                <span className="hero-highlight">beyond limits.</span>
              </h1>
              <p className="hero-text">
                We are a logistics solutions provider offering end-to-end cargo and freight services.
                We specialise in freight forwarding, project logistics, break bulk cargo, and both LCL
                and FCL shipments. With a strong focus on efficiency, compliance, and timely delivery,
                we manage cargo movement seamlessly from origin to destination.
              </p>
              <div className="hero-actions">
                <a className="button primary" href="#contact">
                  Request a quote
                </a>
                <a className="button ghost" href="#services">
                  View services
                </a>
              </div>
              <div className="hero-meta hero-meta--center">
                <div>
                  <span className="hero-meta-label">On-time deliveries</span>
                  <span className="hero-meta-value">98%+</span>
                </div>
                <div>
                  <span className="hero-meta-label">Global trade lanes</span>
                  <span className="hero-meta-value">30+</span>
                </div>
              </div>
            </div>
          </div>

          <a href="#services" className="scroll-indicator" aria-label="Scroll to services">
            <span className="scroll-indicator-icon" />
          </a>
        </section>

        {/* SERVICES */}
        <section
          id="services"
          className="section section-alt"
          aria-labelledby="services-heading"
        >
          <div className="container">
            <header className="section-header" data-animate="fade-up">
              <p className="eyebrow">What we move</p>
              <h2 id="services-heading">Logistics that fit your routes.</h2>
              <p className="section-text">
                From standard containers to complex project cargo, we design the right combination of
                ocean, air, and road solutions for your business.
              </p>
            </header>

            <div className="cards-grid">
              <article className="card" data-animate="fade-up">
                <h3>Ocean freight</h3>
                <p>
                  Full container (FCL) and less-than-container (LCL) services on key international
                  trade lanes with reliable transit times.
                </p>
                <ul>
                  <li>Port-to-port and door-to-door</li>
                  <li>Reefer and special equipment options</li>
                  <li>Transparent schedules and tracking</li>
                </ul>
              </article>

              <article className="card" data-animate="fade-up" data-animate-delay="80">
                <h3>Air freight</h3>
                <p>
                  Time-critical shipments handled through trusted carrier partners, balancing speed and
                  cost for your cargo.
                </p>
                <ul>
                  <li>Express and consolidated options</li>
                  <li>Door-to-airport and door-to-door</li>
                  <li>Temperature-controlled solutions</li>
                </ul>
              </article>

              <article className="card" data-animate="fade-up" data-animate-delay="160">
                <h3>Road &amp; last-mile</h3>
                <p>
                  Reliable inland haulage and distribution from port or airport to your warehouses and
                  customers.
                </p>
                <ul>
                  <li>Container drayage and bulk movement</li>
                  <li>Last-mile delivery coordination</li>
                  <li>Route planning and consolidation</li>
                </ul>
              </article>

              <article className="card" data-animate="fade-up" data-animate-delay="240">
                <h3>Customs &amp; compliance</h3>
                <p>
                  Documentation, clearances, and regulatory guidance to keep your cargo moving without
                  surprises.
                </p>
                <ul>
                  <li>Import &amp; export documentation</li>
                  <li>Duty and tax advisory</li>
                  <li>License and permit coordination</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* NETWORK */}
        <section id="network" className="section" aria-labelledby="network-heading">
          <div className="container">
            <header className="section-header" data-animate="fade-up">
              <p className="eyebrow">Where we operate</p>
              <h2 id="network-heading">A network built around your lanes.</h2>
              <p className="section-text">
                Use our strategic partner network across major ports and airports to connect Asia,
                Europe, and the Middle East.
              </p>
            </header>

            <div className="network-layout">
              <div className="network-map" data-animate="fade-right">
                <div className="network-map-placeholder">
                  <span>World map placeholder</span>
                  <span>We&apos;ll refine this once we know your key routes.</span>
                </div>
              </div>
              <div className="network-list" data-animate="fade-left">
                <h3>Focus corridors</h3>
                <ul>
                  <li>India ↔ Europe</li>
                  <li>India ↔ Middle East</li>
                  <li>Intra-Asia trade lanes</li>
                </ul>
                <h3>Example gateways</h3>
                <ul>
                  <li>Chennai, Mumbai, Mundra</li>
                  <li>Dubai, Jebel Ali</li>
                  <li>Hamburg, Rotterdam</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* WHY US */}
        <section
          id="why-us"
          className="section section-alt"
          aria-labelledby="why-heading"
        >
          <div className="container">
            <header className="section-header" data-animate="fade-up">
              <p className="eyebrow">Why choose Samudhra</p>
              <h2 id="why-heading">Operationally sharp. Personally attentive.</h2>
            </header>

            <div className="pillars-grid">
              <article className="pillar" data-animate="fade-up">
                <h3>Dedicated control tower</h3>
                <p>
                  A single point of contact follows your shipments from booking to final delivery.
                </p>
              </article>

              <article className="pillar" data-animate="fade-up" data-animate-delay="80">
                <h3>Transparent communication</h3>
                <p>
                  Proactive updates on milestones, exceptions, and alternative options – no last-minute
                  surprises.
                </p>
              </article>

              <article className="pillar" data-animate="fade-up" data-animate-delay="160">
                <h3>Process-driven reliability</h3>
                <p>
                  Standard operating procedures aligned with your internal workflow and documentation
                  needs.
                </p>
              </article>

              <article className="pillar" data-animate="fade-up" data-animate-delay="240">
                <h3>Scalable with your growth</h3>
                <p>
                  From first container to full global program, we scale capacity, reporting, and service
                  levels with you.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* CAREERS */}
        <section id="careers" className="section" aria-labelledby="careers-heading">
          <div className="container careers-layout">
            <div className="careers-copy" data-animate="fade-right">
              <p className="eyebrow">Careers</p>
              <h2 id="careers-heading">Join a team that moves trade forward.</h2>
              <p className="section-text">
                We&apos;re building a team that combines maritime heritage with modern logistics
                technology. If you&apos;re curious, reliable, and customer-focused, we&apos;d love to hear
                from you.
              </p>
              <a href="#contact" className="button ghost">
                Share your profile
              </a>
            </div>
            <div className="careers-panel" data-animate="fade-left">
              <h3>Sample roles</h3>
              <ul>
                <li>Customer service executive</li>
                <li>Operations coordinator</li>
                <li>Sales &amp; key account manager</li>
              </ul>
              <p className="careers-note">
                Once your actual openings and office locations are ready, we&apos;ll replace this
                placeholder content with real listings.
              </p>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          className="section section-alt"
          aria-labelledby="contact-heading"
        >
          <div className="container contact-layout">
            <div className="contact-info" data-animate="fade-right">
              <p className="eyebrow">Contact</p>
              <h2 id="contact-heading">Let&apos;s plan your next shipment.</h2>
              <p className="section-text">
                Share a few details about your cargo and routes. We&apos;ll respond with a tailored plan
                and clear next steps.
              </p>
              <div className="contact-details">
                <p>
                  <strong>Samudhra Shipping Solutions Pvt Ltd</strong>
                  <br />
                  Address to be updated
                  <br />
                  City, State, Country
                </p>
                <p>
                  Phone:{' '}
                  <a href="tel:+910000000000">
                    +91 00000 00000
                  </a>
                  <br />
                  Email:{' '}
                  <a href="mailto:info@samudhrashipping.com">
                    info@samudhrashipping.com
                  </a>
                </p>
              </div>
            </div>

            <div className="contact-form-card" data-animate="fade-left">
              <form className="contact-form" autoComplete="on">
                <div className="form-row">
                  <label htmlFor="name">Name*</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="company">Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    autoComplete="organization"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="email">Email*</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    autoComplete="email"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    autoComplete="tel"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="message">Shipment details*</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Origin, destination, cargo type, timeline..."
                  />
                </div>
                <div className="form-row form-row-inline">
                  <label className="checkbox-label">
                    <input type="checkbox" name="privacy" required />
                    <span>I agree to the use of my data for contact purposes.</span>
                  </label>
                </div>
                <p className="form-note">Fields marked * are required.</p>
                <button type="submit" className="button primary full-width">
                  Send message
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <p>
            &copy; {currentYear} Samudhra Shipping Solutions Pvt Ltd. All rights reserved.
          </p>
          <nav aria-label="Footer navigation">
            <a href="#top">Back to top</a>
          </nav>
        </div>
      </footer>
    </>
  );
}

export default App;

