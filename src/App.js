import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useAnimation, useReducedMotion } from 'framer-motion';
import './App.css';
import profilePic from './images/pfp.jpg';
import resumePDF from './MainResume.pdf';

function App() {
  const [activeSection, setActiveSection] = useState('about');
  const controls = useAnimation();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    controls.start({
      y: [0, -10, 0],
      transition: {
        repeat: Infinity,
        duration: 2,
        ease: 'easeInOut'
      }
    });
  }, [controls, prefersReducedMotion]);

  // --- Variants & Transitions ---
  const pageTransition = useMemo(() => ({
    hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: {
      opacity: 0,
      y: -24,
      filter: 'blur(6px)',
      transition: { duration: 0.45, ease: 'easeInOut' }
    }
  }), []);

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.18 }
    }
  };

  const staggerItem = {
    hidden: { y: 14, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 160, damping: 18 }
    }
  };

  // Keyboard shortcuts for section nav (←/→)
  useEffect(() => {
    const order = ['about', 'experience', 'education', 'projects', 'skills'];
    const onKey = (e) => {
      if (['ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        const idx = order.indexOf(activeSection);
        const next =
          e.key === 'ArrowRight'
            ? order[(idx + 1) % order.length]
            : order[(idx - 1 + order.length) % order.length];
        setActiveSection(next);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeSection]);

  // Magnetic button effect helper
  const magnetize = (e) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    target.style.setProperty('--mx', `${x * 0.12}px`);
    target.style.setProperty('--my', `${y * 0.12}px`);
  };
  const demagnetize = (e) => {
    const target = e.currentTarget;
    target.style.setProperty('--mx', `0px`);
    target.style.setProperty('--my', `0px`);
  };

  return (
    <div className="app-root">
      {/* Background FX */}
      <div className="grid-bg" aria-hidden />
      <div className="aurora">
        <span />
        <span />
        <span />
      </div>
      <div className="noise" aria-hidden />

      {/* Shell */}
      <div className="shell">
        {/* Sidebar / Topbar */}
        <header className="shell-nav">
          <motion.div
            className="brand"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.03 }}
          >
            <span className="brand-dot" />
            Mohammed Zaid
          </motion.div>

          <motion.ul
            className="nav-pills"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {[
              { id: 'about', label: 'About' },
              { id: 'experience', label: 'Experience' },
              { id: 'education', label: 'Education' },
              { id: 'projects', label: 'Projects' },
              { id: 'skills', label: 'Skills' }
            ].map((tab) => (
              <motion.li
                key={tab.id}
                className={`pill ${activeSection === tab.id ? 'active' : ''}`}
                onClick={() => setActiveSection(tab.id)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{tab.label}</span>
                {activeSection === tab.id && (
                  <motion.i
                    layoutId="pill-underline"
                    className="pill-underline"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.li>
            ))}
          </motion.ul>
        </header>

        {/* Main */}
        <main className="shell-main">
          <AnimatePresence mode="wait">
            {activeSection === 'about' && (
              <motion.section
                key="about"
                variants={pageTransition}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="panel"
              >
                <div className="panel-grid about-grid">
                  <motion.div
                    className="glass card profile"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.45 }}
                  >
                    <motion.div className="profile-spotlight" />
                    <motion.img
                      src={profilePic}
                      alt="Mohammed Zaid"
                      className="profile-pic"
                      initial={{ opacity: 0, scale: 0.85, rotate: -2 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ scale: 1.03 }}
                    />
                    <motion.div
                      className="badge-floating"
                      animate={controls}
                      aria-hidden
                    >
                      🎓
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="glass card about-copy"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.h1 variants={staggerItem} className="hero-title">
                      About Me
                    </motion.h1>

                    <motion.div className="contact-info" variants={staggerItem}>
                      <p>mdyasinzaidabir@gmail.com&nbsp;|&nbsp;Lake Elsinore, CA</p>
                      <p>
                        <a href="https://www.linkedin.com/in/mohammed-zaid-304a9b279/" target="_blank" rel="noopener noreferrer">
                          LinkedIn
                        </a>{' '}
                        |{' '}
                        <a href="https://github.com/mzaid03" target="_blank" rel="noopener noreferrer">
                          GitHub
                        </a>
                      </p>
                    </motion.div>

                    <motion.p variants={staggerItem} className="bio">
                      Hi, I am Mohammed Zaid. I'm a 4th-year Mathematics &amp; Computer Science
                      student at UC San Diego with hands-on experience in robotics, machine learning,
                      front-end development and leading high-performing teams. I thrive on solving complex
                      problems and building innovative solutions that make a difference. Welcome to my
                      digital space, where curiosity meets code.
                    </motion.p>

                    <motion.div className="cta-row" variants={staggerItem}>
                      <motion.button
                        className="btn btn-primary magnetic"
                        onMouseMove={magnetize}
                        onMouseLeave={demagnetize}
                        onClick={() => setActiveSection('experience')}
                        whileTap={{ scale: 0.98 }}
                      >
                        View Experience
                      </motion.button>

                      <motion.button
                        className="btn btn-ghost magnetic"
                        onMouseMove={magnetize}
                        onMouseLeave={demagnetize}
                        onClick={() => setActiveSection('projects')}
                        whileTap={{ scale: 0.98 }}
                      >
                        See Projects
                      </motion.button>

                      <motion.a
                        href={resumePDF}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline magnetic"
                        onMouseMove={magnetize}
                        onMouseLeave={demagnetize}
                        whileTap={{ scale: 0.98 }}
                      >
                        View Resume
                      </motion.a>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.section>
            )}

            {activeSection === 'experience' && (
              <motion.section
                key="experience"
                variants={pageTransition}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="panel"
              >
                <motion.h2 className="panel-title" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  Work &amp; Leadership Experience
                </motion.h2>

                <motion.div className="cards-grid" variants={staggerContainer} initial="hidden" animate="visible">
                  {/* UCSD Associated Students */}
                  <motion.article className="glass card hover-tilt" variants={staggerItem}>
                    <div className="card-head">
                      <h3>UCSD Associated Students</h3>
                      <div className="meta">Campus Wide Senator · La Jolla, CA · April 2025 – Present</div>
                    </div>
                    <ul className="card-list">
                      <li>Strategically managed an $8 million operational budget, implementing rigorous oversight processes and developing targeted funding initiatives that efficiently allocated resources across campus priorities</li>
                      <li>Orchestrated management systems for 600+ student organizations, designing streamlined approval processes and resource allocation protocols that enhanced club operations and campus engagement</li>
                      <li>Advocated for comprehensive student needs through data driven policy development, collaborating with administration to implement solutions that measurably improved campus experience and services</li>
                      <li>Executed critical departmental decisions through structured analysis frameworks, ensuring alignment with strategic objectives while maintaining transparent communication with stakeholders</li>
                    </ul>
                  </motion.article>

                  {/* UCSD Information Desk */}
                  <motion.article className="glass card hover-tilt" variants={staggerItem}>
                    <div className="card-head">
                      <h3>UCSD Information Desk</h3>
                      <div className="meta">Student Administrative Support · La Jolla, CA · September 2024 – Present</div>
                    </div>
                    <ul className="card-list">
                      <li>Orchestrated real-time resource allocation system for optimizing student workflow efficiency, implementing data-driven scheduling algorithms that reduced station transition times by 15%</li>
                      <li>Developed and executed escalation protocols for priority customer requests, implementing a structured methodology that ensured 99% on-time delivery of complex orders while maintaining quality standards</li>
                    </ul>
                  </motion.article>

                  {/* VEX Robotics */}
                  <motion.article className="glass card hover-tilt" variants={staggerItem}>
                    <div className="card-head">
                      <h3>VEX Robotics</h3>
                      <div className="meta">Founder &amp; President · Lake Elsinore, CA · June 2021 – July 2022</div>
                    </div>
                    <ul className="card-list">
                      <li>Programmed autonomous object manipulation algorithms in C for the team's robot, serving as lead driver during testing, optimizing system performance through iterative debugging and real-time adjustments</li>
                      <li>Architected the robot's control systems using object-oriented design principles, developed comprehensive technical documentation including UML diagrams, and system architecture specifications</li>
                      <li>Pioneered school's first-ever finals appearance in VEX Robotics competition, implementing advanced MatLab simulations for motion planning and mechanical stress analysis that secured 2nd place overall</li>
                    </ul>
                  </motion.article>
                </motion.div>
              </motion.section>
            )}

            {activeSection === 'education' && (
              <motion.section
                key="education"
                variants={pageTransition}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="panel"
              >
                <motion.h2 className="panel-title" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  Education
                </motion.h2>

                <div className="edu-wrap">
                  <motion.div
                    className="glass card hover-tilt"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <div className="edu-head">
                      <h3>University of California, San Diego</h3>
                      <div className="meta">B.S. – Computer Science &amp; Mathematics · June 2026</div>
                    </div>
                    <div className="edu-body">
                      <h4>Relevant Coursework:</h4>
                      <p>
                        Advanced Data Structures, Software Engineering, Supervised Machine Learning,
                        Components and Design Techniques for Digital Systems, Introduction to Numerical Analysis,
                        Modern Algebra II
                      </p>
                    </div>
                  </motion.div>

                  <motion.div className="edu-icon" animate={controls} aria-hidden>
                    🎓
                  </motion.div>
                </div>
              </motion.section>
            )}

            {activeSection === 'projects' && (
              <motion.section
                key="projects"
                variants={pageTransition}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="panel"
              >
                <motion.h2 className="panel-title" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  Projects
                </motion.h2>

                {/* Each project segmented as its own card/section */}
                <div className="cards-stack">
                  <motion.article className="glass card project hover-tilt" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                    <h3>Huffman Code Decypher</h3>
                    <div className="tech-stack">C, Data Structures, Algorithms, Binary Trees</div>
                    <ul className="card-list">
                      <li>Architected a high-performance computational pattern recognition system utilizing Huffman tree algorithms in C, implementing optimized binary encoding techniques to achieve sub-linear time complexity for decryption operations while maintaining O(log n) space efficiency</li>
                    </ul>

                    <div className="viz">
                      <div className="binary-tree">
                        <div className="node root">H</div>
                        <div className="branches">
                          <div className="branch"><div className="node">U</div></div>
                          <div className="branch"><div className="node">F</div></div>
                        </div>
                      </div>
                    </div>
                  </motion.article>

                  <motion.article className="glass card project hover-tilt" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
                    <h3>FIFA Rankings &amp; Political Corruption Analysis</h3>
                    <div className="tech-stack">Python, Data Analysis, Pandas, Matplotlib, Statistical Modeling, Data Visualization</div>
                    <ul className="card-list">
                      <li>Developed a comprehensive data science project analyzing the correlation between political corruption, press freedom, and national football performance by leveraging FIFA rankings, CPI, and GDP data; implemented statistical analysis and dynamic visualizations in Python to uncover patterns of institutional influence and sportswashing in international tournaments.</li>
                    </ul>
                  </motion.article>

                  <motion.article className="glass card project hover-tilt" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <h3>Islamic Prayer Reminder Website</h3>
                    <div className="tech-stack">HTML, CSS, JavaScript, Aladhan API, Open-Meteo API, Web UI/UX</div>
                    <ul className="card-list">
                      <li>Designed and implemented a location-based Islamic prayer reminder web application that dynamically displays daily Salah times, Hijri dates, Quranic verses by integrating the Aladhan and Open-Meteo geolocation APIs; enabled both auto-location and manual ZIP/city entry for flexible user access across regions. Engineered a visually appealing and mobile-responsive interface using modern JavaScript, HTML, and CSS, with advanced features such as animated Dhikr page titles, interactive Hadith refresh, dark mode toggling, and an embedded PDF guide for learning how to pray, prioritizing both accessibility and spiritual enrichment through thoughtful design and real-time religious functionality.</li>
                    </ul>
                  </motion.article>

                  <motion.article className="glass card project hover-tilt" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                    <h3>IoT Botnet Detection System</h3>
                    <div className="tech-stack">Python, NumPy, Pandas, Scikit-learn, Matplotlib, Seaborn, Machine Learning</div>
                    <ul className="card-list">
                      <li>Designed and implemented a large-scale machine learning pipeline to detect IoT botnet intrusions using the UCI N-BaIoT dataset (7M+ records, 115 engineered features across 9 IoT devices and 8 attack types). Executed comprehensive preprocessing and eliminating 157k+ duplicates, addressing a 92.1% class imbalance through undersampling, and applying Min-Max normalization to ensure statistical robustness. Trained and optimized a Decision Tree classifier (depth=6, 500 samples/leaf) that achieved 99.96% accuracy, precision, recall, and F1-score on a 205k-sample test set with only 86 misclassifications, validated through correlation heatmap analysis and error diagnostics. Positioned the pipeline for scalability by proposing Support Vector Machines for enhanced generalization in high-dimensional feature spaces, demonstrating proficiency in big-data analytics, supervised learning, and applied cybersecurity modeling.</li>
                    </ul>
                  </motion.article>
                </div>
              </motion.section>
            )}

            {activeSection === 'skills' && (
              <motion.section
                key="skills"
                variants={pageTransition}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="panel"
              >
                <motion.h2 className="panel-title" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  Technical Skills
                </motion.h2>

                <motion.div className="skills-grid" variants={staggerContainer} initial="hidden" animate="visible">
                  <motion.div className="glass card hover-tilt" variants={staggerItem}>
                    <h3>Languages</h3>
                    <div className="badges">
                      <span className="badge">Java</span>
                      <span className="badge">Python</span>
                      <span className="badge">JavaScript</span>
                      <span className="badge">MATLAB</span>
                      <span className="badge">C</span>
                    </div>
                  </motion.div>

                  <motion.div className="glass card hover-tilt" variants={staggerItem}>
                    <h3>Libraries &amp; Tools</h3>
                    <div className="badges">
                      <span className="badge">React</span>
                      <span className="badge">Tailwind CSS</span>
                      <span className="badge">Next.js</span>
                      <span className="badge">Git</span>
                      <span className="badge">Node.js</span>
                      <span className="badge">Firebase</span>
                      <span className="badge">Figma</span>
                      <span className="badge">HTML</span>
                      <span className="badge">CSS</span>
                      <span className="badge">Leetcode</span>
                    </div>
                  </motion.div>

                  <motion.div className="glass card hover-tilt" variants={staggerItem}>
                    <h3>Managerial Skills</h3>
                    <div className="badges">
                      <span className="badge">Project management</span>
                      <span className="badge">Team leadership</span>
                      <span className="badge">Workflow optimization</span>
                      <span className="badge">Strategic thinking</span>
                      <span className="badge">UX design</span>
                      <span className="badge">Accessibility</span>
                      <span className="badge">Quality assurance</span>
                      <span className="badge">Version control</span>
                      <span className="badge">Data integrity</span>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.section>
            )}
          </AnimatePresence>
        </main>

        <motion.footer className="shell-foot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <p>© {new Date().getFullYear()} Mohammed Zaid. All rights reserved.</p>
        </motion.footer>
      </div>
    </div>
  );
}

export default App;
