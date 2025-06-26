import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import './App.css';
import profilePic from './images/pfp.jpg';
import resumePDF from './MainResume.pdf';

function App() {
 const [activeSection, setActiveSection] = useState('about');
 const controls = useAnimation();
 
 useEffect(() => {
 controls.start({
 y: [0, -10, 0],
 transition: { 
 repeat: Infinity, 
 duration: 2,
 ease: "easeInOut"
 }
 });
 }, [controls]);

 const pageTransition = {
 hidden: { opacity: 0, y: 20 },
 visible: { 
 opacity: 1, 
 y: 0,
 transition: { 
 duration: 0.7,
 ease: [0.6, -0.05, 0.01, 0.99]
 }
 },
 exit: { 
 opacity: 0, 
 y: -20,
 transition: { duration: 0.5 }
 }
 };

 const staggerContainer = {
 hidden: { opacity: 0 },
 visible: {
 opacity: 1,
 transition: {
 staggerChildren: 0.1,
 delayChildren: 0.3
 }
 }
 };

 const staggerItem = {
 hidden: { y: 20, opacity: 0 },
 visible: {
 y: 0,
 opacity: 1,
 transition: {
 type: "spring",
 stiffness: 100
 }
 }
 };

 return (
 <div className="App">
 <div className="background-shapes">
 <div className="shape shape-1"></div>
 <div className="shape shape-2"></div>
 <div className="shape shape-3"></div>
 <div className="shape shape-4"></div>
 </div>
 
 <nav>
 <motion.div 
 className="name"
 initial={{ opacity: 0, y: -20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5 }}
 whileHover={{ scale: 1.05 }}
 >
 Mohammed Zaid
 </motion.div>
 <motion.ul
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ delay: 0.3, staggerChildren: 0.1 }}
 >
 <motion.li 
 className={activeSection === 'about' ? 'active' : ''}
 whileHover={{ scale: 1.05, color: "#e0ead6" }}
 whileTap={{ scale: 0.95 }}
 onClick={() => setActiveSection('about')}
 >
 About
 </motion.li>
 <motion.li 
 className={activeSection === 'experience' ? 'active' : ''}
 whileHover={{ scale: 1.05, color: "#e0ead6" }}
 whileTap={{ scale: 0.95 }}
 onClick={() => setActiveSection('experience')}
 >
 Experience
 </motion.li>
 <motion.li 
 className={activeSection === 'education' ? 'active' : ''}
 whileHover={{ scale: 1.05, color: "#e0ead6" }}
 whileTap={{ scale: 0.95 }}
 onClick={() => setActiveSection('education')}
 >
 Education
 </motion.li>
 <motion.li 
 className={activeSection === 'projects' ? 'active' : ''}
 whileHover={{ scale: 1.05, color: "#e0ead6" }}
 whileTap={{ scale: 0.95 }}
 onClick={() => setActiveSection('projects')}
 >
 Projects
 </motion.li>
 <motion.li 
 className={activeSection === 'skills' ? 'active' : ''}
 whileHover={{ scale: 1.05, color: "#e0ead6" }}
 whileTap={{ scale: 0.95 }}
 onClick={() => setActiveSection('skills')}
 >
 Skills
 </motion.li>
 </motion.ul>
 </nav>

 <main>
 <AnimatePresence mode="wait">
 {activeSection === 'about' && (
 <motion.section 
 key="about"
 variants={pageTransition}
 initial="hidden"
 animate="visible"
 exit="exit"
 className="about-section"
 >
 <div className="profile-container">
 <motion.div className="profile-spotlight"></motion.div>
 <motion.img 
 src={profilePic} 
 alt="Mohammed Zaid" 
 className="profile-pic"
 initial={{ opacity: 0, scale: 0.8 }}
 animate={{ 
 opacity: 1, 
 scale: 1,
 rotate: [0, 5, 0, -5, 0]
 }}
 transition={{ 
 duration: 1.2,
 rotate: { repeat: 0, duration: 1.5 }
 }}
 whileHover={{ 
 scale: 1.05,
 boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
 transition: { duration: 0.3 }
 }}
 />
 </div>

 <motion.div
 className="about-content"
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ delay: 0.3, duration: 0.8 }}
 >
 <h2 className="hero-title">
 <motion.span
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ delay: 0.2, duration: 0.8 }}
 >
 About Me
 </motion.span>
 </h2>

 <motion.div 
 className="contact-info"
 variants={staggerContainer}
 initial="hidden"
 animate="visible"
 >
 <motion.p variants={staggerItem}>mdyasinzaidabir@gmail.com | Lake Elsinore, CA</motion.p>
 <motion.p variants={staggerItem}>
 <a href="https://www.linkedin.com/in/mohammed-zaid-304a9b279/" target="_blank" rel="noopener noreferrer">LinkedIn</a> | 
 <a href="https://github.com/mzaid03" target="_blank" rel="noopener noreferrer"> GitHub</a> 
 </motion.p>
 </motion.div>

 <motion.p 
 className="bio"
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.6, duration: 0.8 }}
 >
 Hi, I am Mohammed Zaid.
 I'm a 4th-year Mathematics & Computer Science student at UC San Diego with hands-on experience in robotics, 
 machine learning, front-end development and leading high-performing teams. I thrive on solving complex problems and 
 building innovative solutions that make a difference. Welcome to my digital space, where curiosity meets code.
 </motion.p>

 <motion.div 
 className="cta-container"
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.8, duration: 0.8 }}
 >
 <motion.button 
 className="cta-button"
 whileHover={{ 
 scale: 1.05, 
 backgroundColor: "#1e3a29",
 boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
 }}
 whileTap={{ scale: 0.95 }}
 onClick={() => setActiveSection('experience')}
 >
 View Experience
 </motion.button>
 <motion.button 
 className="cta-button secondary"
 whileHover={{ 
 scale: 1.05,
 backgroundColor: "#e9f0e3",
 boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
 }}
 whileTap={{ scale: 0.95 }}
 onClick={() => setActiveSection('projects')}
 >
 See Projects
 </motion.button>
 <motion.a 
 href={resumePDF}
 target="_blank"
 rel="noopener noreferrer"
 className="cta-button resume-button"
 whileHover={{ 
 scale: 1.05,
 boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
 }}
 whileTap={{ scale: 0.95 }}
 >
 View Resume
 </motion.a>
 </motion.div>
 </motion.div>
 </motion.section>
 )}

 {activeSection === 'experience' && (
 <motion.section 
 key="experience"
 variants={pageTransition}
 initial="hidden"
 animate="visible"
 exit="exit"
 className="experience-section"
 >
 <motion.h2 
 initial={{ opacity: 0, x: -20 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ duration: 0.5 }}
 >
 Work & Leadership Experience
 </motion.h2>
 
 <motion.div 
 className="experience-grid"
 variants={staggerContainer}
 initial="hidden"
 animate="visible"
 >
 <motion.div className="experience-item card-effect" variants={staggerItem}>
 <div className="experience-header">
 <h3>UCSD Associated Students</h3>
 <p className="position">Campus Wide Senator</p>
 <p className="location-date">La Jolla, CA | April 2025 - Present</p>
 </div>
 <ul>
 <li>Strategically managed an $8 million operational budget, implementing rigorous oversight processes and developing targeted funding initiatives that efficiently allocated resources across campus priorities</li>
 <li>Orchestrated management systems for 600+ student organizations, designing streamlined approval processes and resource allocation protocols that enhanced club operations and campus engagement</li>
 <li>Advocated for comprehensive student needs through data driven policy development, collaborating with administration to implement solutions that measurably improved campus experience and services</li>
 <li>Executed critical departmental decisions through structured analysis frameworks, ensuring alignment with strategic objectives while maintaining transparent communication with stakeholders</li>
 </ul>
 </motion.div>

 <motion.div className="experience-item card-effect" variants={staggerItem}>
 <div className="experience-header">
 <h3>UCSD Information Desk</h3>
 <p className="position">Student Administrative Support</p>
 <p className="location-date">La Jolla, CA | September 2024 - Present</p>
 </div>
 <ul>
 <li>Orchestrated real-time resource allocation system for optimizing student workflow efficiency, implementing data-driven scheduling algorithms that reduced station transition times by 15%</li>
 <li>Developed and executed escalation protocols for priority customer requests, implementing a structured methodology that ensured 99% on-time delivery of complex orders while maintaining quality standards</li>
 </ul>
 </motion.div>

 <motion.div className="experience-item card-effect" variants={staggerItem}>
 <div className="experience-header">
 <h3>UCSD Cafe Ventanas</h3>
 <p className="position">Student Operations Lead</p>
 <p className="location-date">La Jolla, CA | September 2022 - June 2024</p>
 </div>
 <ul>
 <li>Led and developed a diverse team of 80 staff members, implementing structured performance monitoring systems and conducting regular meetings that fostered effective interdepartmental communication</li>
 <li>Spearheaded strategic funding initiatives and financial oversight operations, continuously analyzing profit margins and implementing data-driven adjustments that optimized store profitability</li>
 </ul>
 </motion.div>

 <motion.div className="experience-item card-effect" variants={staggerItem}>
 <div className="experience-header">
 <h3>VEX Robotics</h3>
 <p className="position">Founder & President</p>
 <p className="location-date">Lake Elsinore, CA | June 2021 - July 2022</p>
 </div>
 <ul>
 <li>Programmed autonomous object manipulation algorithms in C for the team's robot, serving as lead driver during testing, optimizing system performance through iterative debugging and real-time adjustments</li>
 <li>Architected the robot's control systems using object-oriented design principles, developed comprehensive technical documentation including UML diagrams, and system architecture specifications</li>
 <li>Pioneered school's first-ever finals appearance in VEX Robotics competition, implementing advanced MatLab simulations for motion planning and mechanical stress analysis that secured 2nd place overall</li>
 </ul>
 </motion.div>
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
 className="education-section"
 >
 <motion.h2
 initial={{ opacity: 0, x: -20 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ duration: 0.5 }}
 >
 Education
 </motion.h2>
 <motion.div 
 className="education-item card-effect"
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.3, duration: 0.7 }}
 >
 <div className="education-header">
 <h3>University of California, San Diego</h3>
 <p className="degree">B.S. - Computer Science & Mathematics</p>
 <p className="date">June 2026</p>
 </div>
 <motion.div 
 className="coursework"
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.5, duration: 0.7 }}
 >
 <h4>Relevant Coursework:</h4>
 <p>Advanced Data Structures, Software Engineering, Supervised Machine Learning, Components and Design Techniques for Digital Systems, Introduction to Numerical Analysis, Modern Algebra II</p>
 </motion.div>
 </motion.div>
 <motion.div 
 className="education-decoration"
 initial={{ opacity: 0, scale: 0.8 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ delay: 0.7, duration: 0.5 }}
 >
 <motion.div 
 className="edu-icon"
 animate={controls}
 >
 🎓
 </motion.div>
 </motion.div>
 </motion.section>
 )}

 {activeSection === 'projects' && (
 <motion.section 
 key="projects"
 variants={pageTransition}
 initial="hidden"
 animate="visible"
 exit="exit"
 className="projects-section"
 >
 <motion.h2
 initial={{ opacity: 0, x: -20 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ duration: 0.5 }}
 >
 Projects
 </motion.h2>
 <motion.div 
 className="project-item card-effect"
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.3, duration: 0.7 }}
 whileHover={{ y: -10, boxShadow: "0 15px 30px rgba(0,0,0,0.15)" }}
 >
 <h3>Huffman Code Decypher</h3>
 <p className="tech-stack">C, Data Structures, Algorithms, Binary Trees</p>
 <ul>
 <li>Architected a high-performance computational pattern recognition system utilizing Huffman tree algorithms in C, implementing optimized binary encoding techniques to achieve sub-linear time complexity for decryption operations while maintaining O(log n) space efficiency</li>
 </ul>
 <h3>FIFA Rankings & Political Corruption Analysis</h3>
 <p className="tech-stack">Python, Data Analysis, Pandas, Matplotlib, Statistical Modeling, Data Visualization</p>
 <ul>
 <li>Developed a comprehensive data science project analyzing the correlation between political corruption, press freedom, and national football performance by leveraging FIFA rankings, CPI, and GDP data; implemented statistical analysis and dynamic visualizations in Python to uncover patterns of institutional influence and sportswashing in international tournaments.</li>
 </ul>
 <h3>Islamic Prayer Reminder Website</h3>
 <p className="tech-stack">HTML, CSS, JavaScript, Aladhan API, Open-Meteo API, Web UI/UX</p>
 <ul>
 <li>Designed and implemented a location-based Islamic prayer reminder web application that dynamically displays daily Salah times, Hijri dates, Quranic verses by integrating the Aladhan and Open-Meteo geolocation APIs; enabled both auto-location and manual ZIP/city entry for flexible user access across regions. Engineered a visually appealing and mobile-responsive interface using modern JavaScript, HTML, and CSS, with advanced features such as animated Dhikr page titles, interactive Hadith refresh, dark mode toggling, and an embedded PDF guide for learning how to pray, prioritizing both accessibility and spiritual enrichment through thoughtful design and real-time religious functionality.</li>
 </ul>
 <div className="project-visual">
 <div className="binary-tree">
 <div className="node root">H</div>
 <div className="branches level-1">
 <div className="branch left">
 <div className="node">U</div>
 </div>
 <div className="branch right">
 <div className="node">F</div>
 </div>
 </div>
 </div>
 </div>
 </motion.div>
 </motion.section>
 )}

 {activeSection === 'skills' && (
 <motion.section 
 key="skills"
 variants={pageTransition}
 initial="hidden"
 animate="visible"
 exit="exit"
 className="skills-section"
 >
 <motion.h2
 initial={{ opacity: 0, x: -20 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ duration: 0.5 }}
 >
 Technical Skills
 </motion.h2>
 
 <motion.div 
 className="skills-container"
 variants={staggerContainer}
 initial="hidden"
 animate="visible"
 >
 <motion.div className="skills-group card-effect" variants={staggerItem}>
 <h3>Languages</h3>
 <div className="skills-badges">
 <span className="skill-badge">Java</span>
 <span className="skill-badge">Python</span>
 <span className="skill-badge">JavaScript</span>
 <span className="skill-badge">MATLAB</span>
 <span className="skill-badge">C</span>
 </div>
 </motion.div>
 
 <motion.div className="skills-group card-effect" variants={staggerItem}>
 <h3>Libraries & Tools</h3>
 <div className="skills-badges">
 <span className="skill-badge">React</span>
 <span className="skill-badge">Tailwind CSS</span>
 <span className="skill-badge">Next.js</span>
 <span className="skill-badge">Git</span>
 <span className="skill-badge">Node.js</span>
 <span className="skill-badge">Firebase</span>
 <span className="skill-badge">Figma</span>
 <span className="skill-badge">HTML</span>
 <span className="skill-badge">CSS</span>
 <span className="skill-badge">Leetcode</span>
 </div>
 </motion.div>
 
 <motion.div className="skills-group card-effect" variants={staggerItem}>
 <h3>Managerial Skills</h3>
 <div className="skills-badges">
 <span className="skill-badge">Project management</span>
 <span className="skill-badge">Team leadership</span>
 <span className="skill-badge">Workflow optimization</span>
 <span className="skill-badge">Strategic thinking</span>
 <span className="skill-badge">UX design</span>
 <span className="skill-badge">Accessibility</span>
 <span className="skill-badge">Quality assurance</span>
 <span className="skill-badge">Version control</span>
 <span className="skill-badge">Data integrity</span>
 </div>
 </motion.div>
 </motion.div>
 </motion.section>
 )}
 </AnimatePresence>
 </main>

 <motion.footer
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ delay: 1 }}
 >
 <p>© {new Date().getFullYear()} Mohammed Zaid. All rights reserved.</p>
 </motion.footer>
 </div>
 );
}

export default App;