import { motion } from 'framer-motion';
import styles from './Projects.module.css';

const projects = [
  {
    title: '三维点云全息智慧感知',
    role: '国创项目 · 技术负责人',
    time: '2024.04 - 2025.06',
    tags: ['深度学习', '点云处理', '语义分割', 'RandLA-Net'],
    desc: '开发基于激光雷达和高清相机的电网铁塔健康监测系统。改进 RandLA-Net 算法，引入电力廊道分割预处理和多模态数据融合。',
    results: [
      'mIoU 从 73.2% 提升至 76.0%，整体准确率 94.4%',
      '二作发表 SCI Q3 论文（Sensors）',
      '第一发明人申请发明专利（已受理）',
    ],
    color: 'var(--accent-indigo)',
  },
  {
    title: '2025 美国数学建模竞赛',
    role: '编程手',
    time: '2024.10 - 2025.02',
    tags: ['CNN-LSTM', 'MLP 回归', 'CGO 优化', '数据可视化'],
    desc: '构建多层次奥运奖牌预测模型，集成 CNN-LSTM、MLP 回归与 CGO 优化算法，预测 2028 洛杉矶奥运会奖牌分布。',
    results: [
      '获得特等奖提名 F 奖（Top 2% 全球）',
    ],
    color: 'var(--accent-cyan)',
  },
  {
    title: 'LLM 增强强化学习的集群协同决策',
    role: '毕业设计',
    time: '2025.10 – 至今',
    tags: ['LLM', '多智能体强化学习', '奖励函数设计'],
    desc: '针对多无人系统在强对抗、稀疏奖励环境下的协同围捕难题，设计 LLM 指导的层级化强化学习框架。',
    results: [
      '外循环：LLM 自动生成稠密奖励函数',
      '内循环：监测-干预-模仿的实时增强链路',
    ],
    color: 'var(--accent-emerald)',
  },
];

export default function Projects() {
  return (
    <section id="projects" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>科研项目</h2>
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
