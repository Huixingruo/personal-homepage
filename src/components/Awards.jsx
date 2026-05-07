import { motion } from 'framer-motion';
import styles from './Awards.module.css';

const awards = [
  { name: '2025 美国数学建模竞赛', level: '特等奖提名 F 奖（Top 2%）', color: 'var(--accent-indigo)' },
  { name: '2024 全国大学生数学建模竞赛', level: '江苏赛区一等奖', color: 'var(--accent-cyan)' },
  { name: '第十五届全国大学生数学竞赛', level: '非数学 A 类 · 江苏赛区一等奖', color: 'var(--accent-emerald)' },
  { name: '2024 ICM', level: '二等奖', color: 'var(--accent-amber)' },
  { name: '国家励志奖学金', level: '×2', color: 'var(--accent-rose)' },
  { name: '优秀青年志愿者', level: '校级', color: 'var(--accent-indigo)' },
];

export default function Awards() {
  return (
    <section id="awards" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>荣誉奖项</h2>
        <div className={styles.grid}>
          {awards.map((a, i) => (
            <motion.div
              key={a.name}
              className={styles.card}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className={styles.dot} style={{ background: a.color }} />
              <div>
                <h3 className={styles.name}>{a.name}</h3>
                <p className={styles.level}>{a.level}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
