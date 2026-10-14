import { motion } from 'framer-motion';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img src="/personal-homepage/avatar.png" alt="Shuanglin Li" className={styles.avatar} />
        <h1 className={styles.name}>Shuanglin Li</h1>
        <p className={styles.title}>PhD Student in Electronic Information</p>
        <p className={styles.subtitle}>Southeast University & Hetao College, Shenzhen</p>
        <p className={styles.subtitle}>Bachelor’s in Automation · Nanjing University of Posts and Telecommunications</p>
        <p className={styles.interests}>Reinforcement Learning · Deep Learning · Artificial Intelligence</p>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>4.29</span>
            <span className={styles.statLabel}>Undergraduate GPA / 5</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>2 / 138</span>
            <span className={styles.statLabel}>Undergraduate Class Rank</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>557</span>
            <span className={styles.statLabel}>CET-6</span>
          </div>
        </div>

        <a href="#projects" className={styles.cta}>
          Explore My Projects ↓
        </a>
      </motion.div>
    </section>
  );
}
