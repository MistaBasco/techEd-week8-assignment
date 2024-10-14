import styles1 from "@/components/Footer.module.css";
import styles2 from "@/app/page.module.css";
export default function Footer() {
  return (
    <>
      <div className={`${styles1.Footer} ${styles2.glow}`}>
        <h1>
          Basco<span className={styles2.copyright}>™</span> Made
          <span className={styles2.copyright}>®</span> This
          <span className={styles2.copyright}>©</span>
        </h1>
      </div>
    </>
  );
}
