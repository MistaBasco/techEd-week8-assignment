import ReviewList from "@/components/ReviewList";
import styles from "@/components/SideBar.module.css";

export default function SideBar() {
  return (
    <div className={styles.SideBar}>
      <ReviewList />
    </div>
  );
}
