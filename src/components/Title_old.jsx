import Link from "next/link";
import styles1 from "@/components/Title.module.css";
import styles2 from "@/app/page.module.css";

export default function Title() {
  return (
    <>
      <div className={`${styles1.Title} ${styles2.glow}`}>
        <Link className="Link" href={"/"}>
          <h1>
            Absolute Weeb Reviews<span className={styles2.copyright}>©</span>
          </h1>
        </Link>
      </div>
    </>
  );
}
