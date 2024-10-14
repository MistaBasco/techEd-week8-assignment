"use client";
import NavBar from "./NavBar";
import styles1 from "@/components/Header.module.css";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { getUserIdByClerkId } from "@/utilities/getUserByClerkId";
import { useState, useEffect } from "react";

export default function Header() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (user) {
      getUserIdByClerkId(user.id).then(setUserId); // Fetch user ID and set it
    }
  }, [user]);

  if (!isLoaded) {
    return <div>Loading...</div>; // Loading state until Clerk is loaded
  }

  return (
    <>
      <div className={styles1.Header}>
        <NavBar />
        {isSignedIn && (
          <h1>
            Welcome <Link href={`/user/${userId}`}>{user.username}</Link>
          </h1>
        )}
      </div>
    </>
  );
}
