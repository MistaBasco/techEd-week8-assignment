"use client";
import NavBar from "./NavBar";
import styles from "@/components/Header.module.css";

export default function Header() {
  return (
    <>
      <div className={styles.Header}>
        <NavBar />
      </div>
    </>
  );
}
