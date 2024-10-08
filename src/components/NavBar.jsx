"use client";
import styles from "@/components/NavBar.module.css";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { getUserIdByClerkId } from "@/utilities/getUserByClerkId";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function NavBar() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    if (user) {
      getUserIdByClerkId(user.id).then(setUserId); // Fetch user ID and set it
    }
  }, [user]);
  // Add a loading check
  if (!isLoaded) {
    return <div>Loading...</div>; // Optional: Display a loading spinner/message
  }

  console.log("userId", userId);

  return (
    <div className={styles.NavBar}>
      <Link className={styles.Link} href={"/"}>
        Home
      </Link>
      <SignedIn>
        {userId && (
          <Link className={styles.Link} href={`/user/${userId}`}>
            Profile
          </Link>
        )}
        <Link className={styles.Link} href="/review/create-review">
          Post Review
        </Link>
        {/* The Clerk UserButton allows users to access their account and sign out */}
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
      <SignedOut>
        <Link className={styles.Link} href="/auth/signup">
          Sign Up
        </Link>
        <Link className={styles.Link} href="/auth/login">
          Sign In
        </Link>
      </SignedOut>
    </div>
  );
}
