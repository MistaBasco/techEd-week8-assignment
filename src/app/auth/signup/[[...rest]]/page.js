import { SignUp } from "@clerk/nextjs";
import styles1 from "@/app/auth/signup/[[...rest]]/SignUpPage.module.css";
import styles2 from "@/app/page.module.css";

export default function SignUpPage() {
  return (
    <div className={`${styles2.page} ${styles1.SignUpPage}`}>
      <SignUp />
    </div>
  );
}
