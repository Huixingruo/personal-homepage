# 个人主页实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 为李双林打造一个求职/自我介绍的 React 单页个人主页

**架构：** React + Vite 单页应用，5 个全屏 section（Hero / Skills / Projects / Awards / Contact），Framer Motion 驱动过渡动效，CSS Modules + CSS 变量实现样式

**技术栈：** React 18、Vite、Framer Motion、CSS Modules

---

## 文件结构

| 文件 | 职责 |
|------|------|
| `src/main.jsx` | 入口，挂载 App |
| `src/App.jsx` | 主布局，组合所有 section，管理滚动状态 |
| `src/index.css` | 全局样式、CSS 变量、字体、重置 |
| `src/components/Navbar.jsx` | 固定顶部导航，锚点滚动，当前高亮 |
| `src/components/Hero.jsx` | 渐变背景、头像、姓名、简介、关键数据 |
| `src/components/Skills.jsx` | 学术成绩 + 技能标签 + 证书 |
| `src/components/Projects.jsx` | 3 张项目卡片，技术栈标签 + 成果 |
| `src/components/Awards.jsx` | 荣誉奖项网格卡片 |
| `src/components/Contact.jsx` | 联系方式 + GitHub + 微信二维码 |
| `public/avatar.png` | 卡通头像（复制自用户提供） |
| `public/wechat-qr.png` | 微信二维码（复制自用户提供） |

---

### 任务 1：初始化项目与安装依赖

**文件：**
- 创建：`package.json`、`vite.config.js`、`index.html`、`src/main.jsx`
- 复制：`public/avatar.png`、`public/wechat-qr.png`

- [ ] **步骤 1：初始化 Vite + React 项目**

```bash
cd /Users/huixingruo/project/personal-homepage
npm create vite@latest . -- --template react
```

选择 React 模板。如果目录非空，选择忽略现有文件继续。

- [ ] **步骤 2：安装 Framer Motion**

```bash
npm install framer-motion
```

- [ ] **步骤 3：复制静态资源**

```bash
# 创建 public 目录（如果不存在）
mkdir -p public

# 复制头像
cp /Users/huixingruo/Downloads/mmqrcode1773633437864.png public/wechat-qr.png
```

头像文件需要用户确认路径后复制。如果暂时没有头像文件，创建一个 200x200 的占位 PNG。

- [ ] **步骤 4：验证项目启动**

```bash
npm run dev -- --host
```

预期：浏览器打开 `http://localhost:5173` 显示 Vite 默认页面

- [ ] **步骤 5：清理默认文件**

删除 `src/App.css`、`src/assets/` 目录中 Vite 默认的内容，保留 `src/main.jsx`。

- [ ] **步骤 6：Commit**

```bash
git init
git add -A
git commit -m "feat: 初始化 Vite + React 项目"
```

---

### 任务 2：全局样式与 CSS 变量

**文件：**
- 创建：`src/index.css`
- 修改：`index.html`（添加中文 lang 属性）

- [ ] **步骤 1：修改 index.html**

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>李双林 - 个人主页</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **步骤 2：编写全局样式**

```css
/* src/index.css */
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --text-primary: #0f172a;
  --text-secondary: #64748b;
  --accent-indigo: #6366f1;
  --accent-cyan: #06b6d4;
  --accent-amber: #f59e0b;
  --accent-emerald: #10b981;
  --accent-rose: #f43f5e;
  --max-width: 960px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: -apple-system, "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif;
  color: var(--text-primary);
  background: var(--bg-primary);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

a {
  text-decoration: none;
  color: inherit;
}

img {
  max-width: 100%;
  display: block;
}
```

- [ ] **步骤 3：Commit**

```bash
git add index.html src/index.css
git commit -m "style: 添加全局样式与 CSS 变量"
```

---

### 任务 3：创建 Navbar 组件

**文件：**
- 创建：`src/components/Navbar.jsx`

- [ ] **步骤 1：编写 Navbar**

```jsx
// src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

const sections = [
  { id: 'hero', label: '简介' },
  { id: 'skills', label: '技能' },
  { id: 'projects', label: '项目' },
  { id: 'awards', label: '荣誉' },
  { id: 'contact', label: '联系' },
];

export default function Navbar() {
  const [active, setActive] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const offsets = sections.map(s => {
        const el = document.getElementById(s.id);
        return { id: s.id, top: el ? el.getBoundingClientRect().top : Infinity };
      });

      const current = offsets.reduce((closest, s) =>
        Math.abs(s.top) < Math.abs(closest.top) ? s : closest
      );
      setActive(current.id);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        {sections.map(s => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`${styles.link} ${active === s.id ? styles.active : ''}`}
          >
            {s.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
```

- [ ] **步骤 2：编写 Navbar 样式**

```css
/* src/components/Navbar.module.css */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 0.75rem 1.5rem;
  transition: background 0.3s, box-shadow 0.3s;
}

.scrolled {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.inner {
  max-width: var(--max-width);
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.link {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-secondary);
  transition: color 0.2s;
}

.link:hover,
.link.active {
  color: var(--accent-indigo);
}
```

- [ ] **步骤 3：Commit**

```bash
git add src/components/Navbar.jsx src/components/Navbar.module.css
git commit -m "feat: 添加 Navbar 导航组件"
```

---

### 任务 4：创建 Hero 组件

**文件：**
- 创建：`src/components/Hero.jsx`、`src/components/Hero.module.css`

- [ ] **步骤 1：编写 Hero**

```jsx
// src/components/Hero.jsx
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
        <img src="/avatar.png" alt="李双林" className={styles.avatar} />
        <h1 className={styles.name}>李双林</h1>
        <p className={styles.title}>东南大学博士预录取 · 电子信息</p>
        <p className={styles.interests}>强化学习 · 深度学习 · 人工智能</p>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>4.29</span>
            <span className={styles.statLabel}>GPA / 5</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>2 / 138</span>
            <span className={styles.statLabel}>专业排名</span>
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
```

- [ ] **步骤 2：编写 Hero 样式**

```css
/* src/components/Hero.module.css */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--accent-indigo), var(--accent-cyan));
  color: #fff;
  text-align: center;
  padding: 2rem;
}

.content {
  max-width: 600px;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid rgba(255, 255, 255, 0.3);
  margin: 0 auto 1.5rem;
  object-fit: cover;
}

.name {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.title {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 0.25rem;
}

.interests {
  font-size: 0.95rem;
  opacity: 0.8;
  margin-bottom: 2rem;
}

.stats {
  display: flex;
  justify-content: center;
  gap: 2.5rem;
  margin-bottom: 2rem;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.statValue {
  font-size: 1.5rem;
  font-weight: 700;
}

.statLabel {
  font-size: 0.8rem;
  opacity: 0.8;
}

.cta {
  display: inline-block;
  padding: 0.75rem 2rem;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  color: #fff;
  font-weight: 500;
  transition: background 0.2s;
  cursor: pointer;
}

.cta:hover {
  background: rgba(255, 255, 255, 0.25);
}

@media (max-width: 768px) {
  .name {
    font-size: 1.8rem;
  }

  .stats {
    gap: 1.5rem;
  }

  .statValue {
    font-size: 1.2rem;
  }
}
```

- [ ] **步骤 3：Commit**

```bash
git add src/components/Hero.jsx src/components/Hero.module.css
git commit -m "feat: 添加 Hero 个人简介组件"
```

---

### 任务 5：创建 Skills 组件

**文件：**
- 创建：`src/components/Skills.jsx`、`src/components/Skills.module.css`

- [ ] **步骤 1：编写 Skills**

```jsx
// src/components/Skills.jsx
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
          <h2 className={styles.heading}>学术成绩</h2>
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
```

- [ ] **步骤 2：编写 Skills 样式**

```css
/* src/components/Skills.module.css */
.section {
  padding: 5rem 2rem;
  background: var(--bg-secondary);
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

.heading {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.gpaBar {
  position: relative;
  height: 28px;
  background: #e2e8f0;
  border-radius: 14px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.gpaFill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-indigo), var(--accent-cyan));
  border-radius: 14px;
}

.gpaText {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.85rem;
  font-weight: 600;
  color: #fff;
}

.rank {
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.rank strong {
  color: var(--accent-indigo);
}

.courses {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.course {
  display: flex;
  justify-content: space-between;
  padding: 0.4rem 0.75rem;
  background: var(--bg-primary);
  border-radius: 6px;
  font-size: 0.85rem;
}

.score {
  font-weight: 600;
  color: var(--accent-indigo);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  display: inline-block;
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--tag-color);
  background: color-mix(in srgb, var(--tag-color) 12%, transparent);
}

@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **步骤 3：Commit**

```bash
git add src/components/Skills.jsx src/components/Skills.module.css
git commit -m "feat: 添加 Skills 技能与学术组件"
```

---

### 任务 6：创建 Projects 组件

**文件：**
- 创建：`src/components/Projects.jsx`、`src/components/Projects.module.css`

- [ ] **步骤 1：编写 Projects**

```jsx
// src/components/Projects.jsx
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
```

- [ ] **步骤 2：编写 Projects 样式**

```css
/* src/components/Projects.module.css */
.section {
  padding: 5rem 2rem;
  background: var(--bg-primary);
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
}

.heading {
  font-size: 1.4rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2.5rem;
}

.grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.card {
  background: var(--bg-secondary);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  transition: transform 0.2s, box-shadow 0.2s;
}

.accentBar {
  height: 4px;
}

.cardBody {
  padding: 1.5rem;
}

.cardHeader {
  margin-bottom: 0.75rem;
}

.title {
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.meta {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 0.75rem;
}

.tag {
  display: inline-block;
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--tag-color);
  background: color-mix(in srgb, var(--tag-color) 12%, transparent);
}

.desc {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
}

.results {
  list-style: none;
  padding: 0;
}

.results li {
  font-size: 0.85rem;
  color: var(--text-primary);
  padding: 0.2rem 0;
  padding-left: 1rem;
  position: relative;
}

.results li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: var(--accent-indigo);
}
```

- [ ] **步骤 3：Commit**

```bash
git add src/components/Projects.jsx src/components/Projects.module.css
git commit -m "feat: 添加 Projects 科研项目组件"
```

---

### 任务 7：创建 Awards 组件

**文件：**
- 创建：`src/components/Awards.jsx`、`src/components/Awards.module.css`

- [ ] **步骤 1：编写 Awards**

```jsx
// src/components/Awards.jsx
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
```

- [ ] **步骤 2：编写 Awards 样式**

```css
/* src/components/Awards.module.css */
.section {
  padding: 5rem 2rem;
  background: var(--bg-secondary);
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
}

.heading {
  font-size: 1.4rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2.5rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}

.card {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  background: var(--bg-primary);
  border-radius: 10px;
  border: 1px solid #e2e8f0;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-top: 0.35rem;
  flex-shrink: 0;
}

.name {
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 0.15rem;
}

.level {
  font-size: 0.82rem;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **步骤 3：Commit**

```bash
git add src/components/Awards.jsx src/components/Awards.module.css
git commit -m "feat: 添加 Awards 荣誉奖项组件"
```

---

### 任务 8：创建 Contact 组件

**文件：**
- 创建：`src/components/Contact.jsx`、`src/components/Contact.module.css`

- [ ] **步骤 1：编写 Contact**

```jsx
// src/components/Contact.jsx
import { motion } from 'framer-motion';
import styles from './Contact.module.css';

export default function Contact() {
  return (
    <section id="contact" className={styles.section}>
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className={styles.heading}>联系方式</h2>
        <p className={styles.subtitle}>欢迎交流与合作</p>

        <div className={styles.info}>
          <div className={styles.item}>
            <span className={styles.label}>电话</span>
            <span>17314840323</span>
          </div>
          <div className={styles.item}>
            <span className={styles.label}>邮箱</span>
            <span>jzgkpl84@163.com</span>
          </div>
          <div className={styles.item}>
            <span className={styles.label}>GitHub</span>
            <a href="https://github.com/Huixingruo" target="_blank" rel="noopener noreferrer" className={styles.link}>
              github.com/Huixingruo
            </a>
          </div>
        </div>

        <div className={styles.qrBlock}>
          <img src="/wechat-qr.png" alt="微信二维码" className={styles.qr} />
          <span className={styles.qrLabel}>扫码添加微信</span>
        </div>
      </motion.div>
    </section>
  );
}
```

- [ ] **步骤 2：编写 Contact 样式**

```css
/* src/components/Contact.module.css */
.section {
  padding: 5rem 2rem;
  background: var(--bg-primary);
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  text-align: center;
}

.heading {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.info {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}

.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.95rem;
}

.label {
  font-size: 0.8rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.link {
  color: var(--accent-indigo);
  transition: color 0.2s;
}

.link:hover {
  color: var(--accent-cyan);
}

.qrBlock {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.qr {
  width: 160px;
  height: 160px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  object-fit: cover;
}

.qrLabel {
  font-size: 0.82rem;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .info {
    flex-direction: column;
    gap: 1rem;
  }
}
```

- [ ] **步骤 3：Commit**

```bash
git add src/components/Contact.jsx src/components/Contact.module.css
git commit -m "feat: 添加 Contact 联系方式组件"
```

---

### 任务 9：组装 App 并验证

**文件：**
- 修改：`src/App.jsx`、`src/main.jsx`

- [ ] **步骤 1：编写 App.jsx**

```jsx
// src/App.jsx
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Awards from './components/Awards';
import Contact from './components/Contact';

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <Awards />
      <Contact />
    </>
  );
}
```

- [ ] **步骤 2：确认 main.jsx**

```jsx
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

- [ ] **步骤 3：启动开发服务器验证**

```bash
npm run dev -- --host
```

预期：浏览器打开后依次看到 Hero（渐变背景）、Skills（左右分栏）、Projects（3 张卡片）、Awards（6 项奖项）、Contact（联系信息 + 二维码），导航栏固定顶部可点击跳转。

- [ ] **步骤 4：验证响应式**

浏览器缩小至 768px 以下，确认所有 section 单列堆叠，无溢出。

- [ ] **步骤 5：Commit**

```bash
git add src/App.jsx src/main.jsx
git commit -m "feat: 组装所有组件，完成个人主页"
```

---

### 任务 10：最终验证

- [ ] **步骤 1：构建生产版本**

```bash
npm run build
```

预期：无报错，`dist/` 目录生成

- [ ] **步骤 2：本地预览生产版本**

```bash
npm run preview -- --host
```

预期：浏览器打开 `http://localhost:4173`，所有页面正常显示

- [ ] **步骤 3：最终 Commit**

```bash
git add -A
git commit -m "chore: 构建验证通过，个人主页完成"
```
