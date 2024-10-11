"use client";
import { useState, useEffect } from "react";
import styles from "@/components/FollowButton.module.css";

export default function FollowButton({ current_user, user_id }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check if the current user is following this user
  useEffect(() => {
    if (!current_user || !user_id) return;

    async function checkIfFollowing() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/follows/${current_user}/${user_id}`
      );
      const result = await response.json();
      setIsFollowing(result.isFollowing);
    }

    checkIfFollowing();
  }, [current_user, user_id]);

  // Handle follow/unfollow
  async function handleFollow() {
    setLoading(true);
    const action = isFollowing ? "unfollow" : "follow";

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/follows/${action}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            follower_id: current_user,
            followed_id: user_id,
          }),
        }
      );

      if (response.ok) {
        setIsFollowing(!isFollowing); // Toggle the follow state
      }
    } catch (error) {
      console.error(`Failed to ${action} user:`, error);
    } finally {
      setLoading(false);
    }
  }

  if (!current_user) {
    return null; // Hide button if no user is logged in
  }

  return (
    <button
      className={styles.FollowButton}
      onClick={handleFollow}
      disabled={loading}
    >
      {loading ? "Loading..." : isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
}
