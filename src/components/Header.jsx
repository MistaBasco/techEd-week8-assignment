"use client";
import LoginForm from "./LoginForm";
import NavBar from "./NavBar";
import styles from "@/components/Header.module.css";

export default function Header({ current_user, setCurrentUser }) {
  async function handleLogout() {
    try {
      await fetch("https://teched-week7-assignment.onrender.com/logout", {
        method: "POST",
        credentials: "include",
      });
      setCurrentUser(null); // Clear the user from state after logout
    } catch (error) {
      console.error("Failed to log out", error);
    }
  }
  return (
    <>
      <div className={styles.Header}>
        <NavBar />
        {/* {!current_user && <LoginForm setCurrentUser={setCurrentUser} />}
        {current_user && (
          <>
            <h1>Logged in!</h1> <button onClick={handleLogout}>Logout</button>
          </>
        )} */}
      </div>
    </>
  );
}
