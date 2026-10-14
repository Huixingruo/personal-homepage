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
        <h2 className={styles.heading}>Contact</h2>
        <p className={styles.subtitle}>Let’s connect and collaborate.</p>

        <div className={styles.info}>
          <div className={styles.item}>
            <span className={styles.label}>Phone</span>
            <a href="tel:+8617314840323" className={styles.link}>+86 173 1484 0323</a>
          </div>
          <div className={styles.item}>
            <span className={styles.label}>Email</span>
            <a href="mailto:jzgkpl84@163.com" className={styles.link}>
              jzgkpl84@163.com
            </a>
            <a href="mailto:B22050413@njupt.edu.cn" className={styles.link}>
              B22050413@njupt.edu.cn
            </a>
          </div>
          <div className={styles.item}>
            <span className={styles.label}>GitHub</span>
            <a href="https://github.com/Huixingruo" target="_blank" rel="noopener noreferrer" className={styles.link}>
              github.com/Huixingruo
            </a>
          </div>
        </div>

        <div className={styles.qrBlock}>
          <img src="/personal-homepage/wechat-qr.png" alt="WeChat contact QR code" className={styles.qr} />
          <span className={styles.qrLabel}>Scan to connect on WeChat</span>
        </div>
      </motion.div>
    </section>
  );
}
