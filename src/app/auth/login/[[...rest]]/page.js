import { SignIn } from "@clerk/nextjs";
import styles1 from "@/app/auth/login/[[...rest]]/LogInPage.module.css";
import styles2 from "@/app/page.module.css";

export default function LogInPage() {
  return (
    <div className={`${styles2.page} ${styles1.LogInPage}`}>
      <SignIn />
    </div>
  );
}
