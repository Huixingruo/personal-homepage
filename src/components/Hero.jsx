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
        <img src="/personal-homepage/avatar.png" alt="李双林" className={styles.avatar} />
        <h1 className={styles.name}>李双林</h1>
        <p className={styles.title}>东南大学 & 深圳河套学院 · 电子信息博士</p>
        <p className={styles.subtitle}>南京邮电大学 · 自动化学士</p>
        <p className={styles.interests}>强化学习 · 深度学习 · 人工智能</p>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>4.29</span>
            <span className={styles.statLabel}>本科 GPA / 5</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>2 / 138</span>
            <span className={styles.statLabel}>本科专业排名</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>557</span>
            <span className={styles.statLabel}>CET-6</span>
          </div>
        </div>

        <a href="#projects" className={styles.cta}>
          查看项目经历 ↓
        </a>
      </motion.div>
    </section>
  );
}
