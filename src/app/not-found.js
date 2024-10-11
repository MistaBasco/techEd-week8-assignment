import Link from "next/link";
import styles1 from "@/app/not-found.module.css";
import styles2 from "@/app/page.module.css";

export default function NotFound() {
  return (
    <div className={`${styles2.page} ${styles1.container}`}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, we couldn&apos;t find the page you&apos;re looking for.</p>
      <Link href="/">
        <a className={styles1.homeLink}>Go back to Home</a>
      </Link>
    </div>
  );
}
