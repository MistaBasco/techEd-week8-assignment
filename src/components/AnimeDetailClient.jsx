"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { getUserIdByClerkId } from "@/utilities/getUserByClerkId";
import ReviewCard from "@/components/ReviewCard";
import styles1 from "@/components/AnimeDetailClient.module.css";
import styles2 from "@/app/page.module.css";

export default function AnimeDetailClient({ anime, reviews, tags }) {
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
    <div className={`${styles2.page} ${styles1.AnimeDetailPage}`}>
      <div className={styles1.AnimeContainer}>
        <h1 className={styles1.AnimeTitle}>{anime.title}</h1>
        {/* <img src={anime.cover_image} alt={anime.title} /> */}
        <div className={styles1.AnimeCover}>
          <h1>This is definitely an image!</h1>
        </div>
        <p className={styles2.spacer}>{anime.synopsis}</p>
        <p className={styles2.spacer}>
          <strong>Release Year:</strong> {anime.release_year}
        </p>
        <p className={styles2.spacer}>
          <strong>Avg Rating:</strong> {anime.average_rating}
        </p>
        <p className={styles2.spacer}>
          <strong>Genre:</strong>
          <span className={styles1.GenreLink}>{anime.genre_name}</span>
        </p>
        <div className={styles1.TagWrapper}>
          <strong>Tags:</strong>
          {tags.length === 0 ? (
            <p>No tags available.</p>
          ) : (
            <ul>
              {tags.map((tag) => (
                <li key={tag.tag_id}>{tag.tag_name}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className={styles1.ReviewContainer}>
        <h1>Reviews</h1>
        <div className={styles1.Reviews}>
          {reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            reviews.map((review) => (
              <ReviewCard
                key={review.review_id}
                review={review}
                current_user={userId}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
