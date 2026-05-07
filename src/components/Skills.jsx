import { motion } from 'framer-motion';
import styles from './Skills.module.css';

const courses = [
  { name: '电路', score: 99 },
  { name: '微型计算机原理与接口技术', score: 98 },
  { name: '现代控制理论', score: 98 },
  { name: '计算机控制系统', score: 97 },
  { name: '自动控制原理', score: 96 },
  { name: '高级程序语言设计', score: 95 },
  { name: '数字电路与逻辑设计', score: 95 },
];

const skills = [
  { name: 'Python', color: 'var(--accent-indigo)' },
  { name: 'Matlab', color: 'var(--accent-cyan)' },
  { name: 'C 语言', color: 'var(--accent-amber)' },
  { name: '汇编', color: 'var(--accent-emerald)' },
  { name: 'PyTorch', color: 'var(--accent-rose)' },
  { name: '数据分析', color: 'var(--accent-indigo)' },
  { name: '机器学习', color: 'var(--accent-cyan)' },
];

const cert = ['CET-6（557分）', 'Auto CAD 高级证书'];

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
          <h2 className={styles.heading}>本科 · 学术成绩</h2>
          <div className={styles.gpaBar}>
            <div className={styles.gpaFill} style={{ width: '85.8%' }} />
            <span className={styles.gpaText}>GPA 4.29 / 5.00</span>
          </div>
          <p className={styles.rank}>专业排名 <strong>2 / 138</strong></p>

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
          <h2 className={styles.heading}>技术能力</h2>
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

          <h2 className={styles.heading} style={{ marginTop: '2rem' }}>证书</h2>
          <div className={styles.tags}>
            {cert.map(c => (
              <span key={c} className={styles.tag} style={{ '--tag-color': 'var(--accent-amber)' }}>
                {c}
              </span>
            ))}
          </div>

          <h2 className={styles.heading} style={{ marginTop: '2rem' }}>研究方向</h2>
          <div className={styles.tags}>
            <span className={styles.tag} style={{ '--tag-color': 'var(--accent-indigo)' }}>强化学习</span>
            <span className={styles.tag} style={{ '--tag-color': 'var(--accent-cyan)' }}>深度学习</span>
            <span className={styles.tag} style={{ '--tag-color': 'var(--accent-emerald)' }}>大模型应用</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
