import ReviewCard from "@/components/ReviewCard";
import styles1 from "@/app/anime/[id]/AnimeDetailPage.module.css";
import styles2 from "@/app/page.module.css";
import dotenv from "dotenv";

export default async function AnimeDetailPage({ params }) {
  const { id } = params;
  const current_user = 1;
  dotenv.config();
  try {
    // Fetch the anime details from your API route
    console.log("Fetching anime details from API:", `/api/anime/${id}`);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${baseUrl}/api/anime/${id}`);

    console.log("Response status:", response.status);

    if (!response.ok) {
      console.error("Failed to fetch anime details:", response.statusText);
      return <p>Anime not found or failed to fetch anime details.</p>;
    }

    const data = await response.json();
    const { anime, reviews, tags } = data;

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
                  current_user={current_user}
                />
              ))
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching anime details:", error);
    return <p>Error fetching anime details.</p>;
  }
}
