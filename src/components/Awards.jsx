import { motion } from 'framer-motion';
import styles from './Awards.module.css';

const awards = [
  { name: '2025 Mathematical Contest in Modeling (MCM)', level: 'Finalist (F Award) · Top 2%', color: 'var(--accent-indigo)' },
  { name: '2024 China Undergraduate Mathematical Contest in Modeling', level: 'First Prize · Jiangsu Region', color: 'var(--accent-cyan)' },
  { name: '15th Chinese Mathematics Competitions', level: 'First Prize · Jiangsu Region · Non-Mathematics Category A', color: 'var(--accent-emerald)' },
  { name: '2024 Interdisciplinary Contest in Modeling (ICM)', level: 'Second Prize', color: 'var(--accent-amber)' },
  { name: 'National Encouragement Scholarship', level: 'Two-time recipient', color: 'var(--accent-rose)' },
  { name: 'Outstanding Youth Volunteer', level: 'University-level recognition', color: 'var(--accent-indigo)' },
];

export default function Awards() {
  return (
    <section id="awards" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Honors & Awards</h2>
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
