import { motion } from 'framer-motion';
import styles from './Projects.module.css';

const projects = [
  {
    title: 'Intelligent Perception with 3D Point Clouds',
    role: 'National Undergraduate Innovation Program · Technical Lead',
    time: 'Apr 2024 – Jun 2025',
    tags: ['Deep Learning', 'Point Cloud Processing', 'Semantic Segmentation', 'RandLA-Net'],
    desc: 'Developed a health monitoring system for power transmission towers using LiDAR and high-resolution cameras. Improved RandLA-Net with power corridor segmentation preprocessing and multimodal data fusion.',
    results: [
      'Improved mIoU from 73.2% to 76.0%, with 94.4% overall accuracy',
      'Published a paper in Sensors (SCI Q3) as second author',
      'Filed an invention patent as first inventor; application accepted for processing',
    ],
    color: 'var(--accent-indigo)',
  },
  {
    title: '2025 Mathematical Contest in Modeling (MCM)',
    role: 'Team Programmer',
    time: 'Oct 2024 – Feb 2025',
    tags: ['CNN-LSTM', 'MLP Regression', 'CGO Optimization', 'Data Visualization'],
    desc: 'Built a multilevel Olympic medal prediction model combining CNN-LSTM, MLP regression, and CGO optimization to forecast medal distributions at the Los Angeles 2028 Olympics.',
    results: [
      'Awarded Finalist (F Award), placing in the top 2% worldwide',
    ],
    links: [
      { label: '📄 Award Certificate', url: '/personal-homepage/mcm-certificate.pdf' },
      { label: '📝 Competition Paper', url: '/personal-homepage/mcm-paper.pdf' },
    ],
    color: 'var(--accent-cyan)',
  },
  {
    title: 'LLM-Enhanced Reinforcement Learning for Multi-Agent Coordination',
    role: 'Graduation Project',
    time: 'Oct 2025 – Present',
    tags: ['LLM', 'Multi-Agent Reinforcement Learning', 'Reward Function Design'],
    desc: 'Designed an LLM-guided hierarchical reinforcement learning framework for cooperative pursuit and capture by multiple unmanned systems in highly adversarial environments with sparse rewards.',
    results: [
      'Outer loop: LLM-generated dense reward functions',
      'Inner loop: real-time enhancement through monitoring, intervention, and imitation',
    ],
    links: [
      { label: '🔗 GitHub Repository', url: 'https://github.com/Huixingruo/LLM-Evolved-MARL-System-LEMS' },
    ],
    color: 'var(--accent-emerald)',
  },
];

export default function Projects() {
  return (
    <section id="projects" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Research Projects</h2>
        <div className={styles.grid}>
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }}
            >
              <div className={styles.accentBar} style={{ background: p.color }} />
              <div className={styles.cardBody}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.title}>{p.title}</h3>
                  <span className={styles.meta}>{p.role} · {p.time}</span>
                </div>
                <div className={styles.tags}>
                  {p.tags.map(t => (
                    <span key={t} className={styles.tag} style={{ '--tag-color': p.color }}>{t}</span>
                  ))}
                </div>
                <p className={styles.desc}>{p.desc}</p>
                <ul className={styles.results}>
                  {p.results.map(r => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
                {p.links && (
                  <div className={styles.links}>
                    {p.links.map(l => (
                      <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
                        {l.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
