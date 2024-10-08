import Link from "next/link";
import styles from "./404.module.css";

export default function Custom404() {
  return (
    <div className={styles.container}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, we couldn&apos;t find the page you&apos;re looking for.</p>
      <Link href="/">
        <a className={styles.homeLink}>Go back to Home</a>
      </Link>
    </div>
  );
}
