import styles from "@/components/NavBar.module.css";
import Link from "next/link";

export default function NavBar({ current_user }) {
  return (
    <div className={styles.NavBar}>
      <Link className={styles.Link} href={"/"}>
        Home
      </Link>
      {current_user && (
        <Link className={styles.Link} href={`/user/${current_user}`}>
          Profile
        </Link>
      )}
      {current_user && (
        <Link className={styles.Link} href={"/review/create-review"}>
          Post Review
        </Link>
      )}
      {!current_user && (
        <Link className={styles.Link} href={"/signup"}>
          SignUp
        </Link>
      )}
    </div>
  );
}
{
  /* <Route path="/" element={<HomePage />} />
<Route path="/anime/:id" element={<AnimeDetailPage />} />
<Route path="/create-review" element={<CreateReviewPage />} />
<Route path="/profile" element={<ProfilePage />} /> */
}
