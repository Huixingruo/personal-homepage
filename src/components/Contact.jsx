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
