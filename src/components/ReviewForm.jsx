"use client";
import { useUser } from "@clerk/nextjs";
import styles from "@/components/ReviewForm.module.css";

export default function ReviewForm({ animeList }) {
  const { user } = useUser();
  console.log(user);
  return (
    <form action="/api/review" method="POST" className={styles.ReviewForm}>
      <input type="hidden" name="current_user" value={user?.id} />

      <label htmlFor="anime">Select Anime:</label>
      <select id="anime" name="anime_id" required>
        <option value="">-- Select Anime --</option>
        {animeList.map((anime) => (
          <option key={anime.anime_id} value={anime.anime_id}>
            {anime.title}
          </option>
        ))}
      </select>

      <div className={styles.spacer}>
        <label htmlFor="rating">Rating:</label>
        <input
          id="rating"
          name="rating"
          type="number"
          min="1"
          max="10"
          required
        />
      </div>

      <label htmlFor="review_text">Review:</label>
      <textarea id="review_text" name="review_text" required></textarea>

      <button type="submit">Submit Review</button>
    </form>
  );
}
