import ReviewList from "@/components/ReviewList";
import styles from "@/components/SideBar.module.css";

export default function SideBar({ current_user }) {
  return (
    <div className={styles.SideBar}>
      <ReviewList current_user={current_user} />
    </div>
  );
}
