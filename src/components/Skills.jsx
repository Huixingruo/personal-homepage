import { motion } from 'framer-motion';
import styles from './Skills.module.css';

const courses = [
  { name: 'Circuit Theory', score: 99 },
  { name: 'Microcomputer Principles and Interfacing', score: 98 },
  { name: 'Modern Control Theory', score: 98 },
  { name: 'Computer Control Systems', score: 97 },
  { name: 'Principles of Automatic Control', score: 96 },
  { name: 'High-Level Programming', score: 95 },
  { name: 'Digital Circuits and Logic Design', score: 95 },
];

const skills = [
  { name: 'Python', color: 'var(--accent-indigo)' },
  { name: 'MATLAB', color: 'var(--accent-cyan)' },
  { name: 'C', color: 'var(--accent-amber)' },
  { name: 'Assembly Language', color: 'var(--accent-emerald)' },
  { name: 'PyTorch', color: 'var(--accent-rose)' },
  { name: 'Data Analysis', color: 'var(--accent-indigo)' },
  { name: 'Machine Learning', color: 'var(--accent-cyan)' },
];

const cert = ['CET-6: 557', 'Advanced AutoCAD Certificate'];

export default function Skills() {
  return (
    <section id="skills" className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.left}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.heading}>Undergraduate Academics</h2>
          <div className={styles.gpaBar}>
            <div className={styles.gpaFill} style={{ width: '85.8%' }} />
            <span className={styles.gpaText}>GPA 4.29 / 5.00</span>
          </div>
          <p className={styles.rank}>Class Rank <strong>2 / 138</strong></p>

          <div className={styles.courses}>
            {courses.map(c => (
              <div key={c.name} className={styles.course}>
                <span>{c.name}</span>
                <span className={styles.score}>{c.score}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className={styles.right}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className={styles.heading}>Technical Skills</h2>
          <div className={styles.tags}>
            {skills.map(s => (
              <span
                key={s.name}
                className={styles.tag}
                style={{ '--tag-color': s.color }}
              >
                {s.name}
              </span>
            ))}
          </div>

          <h2 className={styles.heading} style={{ marginTop: '2rem' }}>Certifications</h2>
          <div className={styles.tags}>
            {cert.map(c => (
              <span key={c} className={styles.tag} style={{ '--tag-color': 'var(--accent-amber)' }}>
                {c}
              </span>
            ))}
          </div>

          <h2 className={styles.heading} style={{ marginTop: '2rem' }}>Research Interests</h2>
          <div className={styles.tags}>
            <span className={styles.tag} style={{ '--tag-color': 'var(--accent-indigo)' }}>Reinforcement Learning</span>
            <span className={styles.tag} style={{ '--tag-color': 'var(--accent-cyan)' }}>Deep Learning</span>
            <span className={styles.tag} style={{ '--tag-color': 'var(--accent-emerald)' }}>Large Language Model Applications</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
