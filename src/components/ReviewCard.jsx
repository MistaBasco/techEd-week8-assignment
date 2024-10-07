"use client";
import { format } from "date-fns";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles1 from "@/components/ReviewCard.module.css";
import styles2 from "@/app/page.module.css";
import LikeButton from "@/components/LikeButton";
import DeleteButton from "@/components/DeleteButton";

export default function ReviewCard({ review, current_user, onDelete }) {
  const {
    anime_title,
    reviewer_name,
    rating,
    review_text,
    likes,
    created_at,
    anime_id,
    review_id,
    user_id,
  } = review;

  const [currentLikes, setCurrentLikes] = useState(likes);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  const formattedDate = format(new Date(created_at), "MMM dd, yyyy");

  const isAuthor = review.user_id === current_user;
  //   console.log(user_id);
  useEffect(() => {
    async function fetchLikeStatus() {
      if (!current_user) return;

      try {
        const response = await fetch(
          `/api/review/${review_id}/liked?current_user=${encodeURIComponent(
            current_user
          )}`
        );
        const data = await response.json();
        setLiked(data.liked);
      } catch (error) {
        console.error("Error fetching like status:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLikeStatus();
  }, [review_id, current_user]);

  const handleLike = () => {
    if (liked) {
      setCurrentLikes(currentLikes - 1);
    } else {
      setCurrentLikes(currentLikes + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className={styles1.ReviewCard}>
      <Link href={`/anime/${anime_id}`}>
        <h3>{anime_title}</h3>
      </Link>
      <div className={styles2.spacer}>
        <strong>Review by:</strong>
        <Link href={`/user/${user_id}`}>
          <p>{reviewer_name}</p>
        </Link>
      </div>

      <p className={styles2.spacer}>
        <strong>Rating:</strong> {rating}/10
      </p>

      <p className={styles2.spacer}>{review_text}</p>

      <p className={styles2.spacer}>
        <strong>Likes:</strong> {currentLikes}
      </p>

      <p className={styles2.spacer}>
        <strong>Date:</strong> {formattedDate}
      </p>
      {current_user && !loading && (
        <LikeButton
          reviewId={review_id}
          current_user={current_user}
          onLike={handleLike}
          liked={liked}
        />
      )}
      {isAuthor && current_user && (
        <DeleteButton
          reviewId={review.review_id}
          current_user={current_user}
          onDelete={onDelete}
        />
      )}
    </div>
  );
}
