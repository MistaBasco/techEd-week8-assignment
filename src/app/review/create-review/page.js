import ReviewForm from "@/components/ReviewForm";
import connect from "@/utilities/connect";
import styles1 from "@/app/review/create-review/CreateReviewPage.module.css";
import styles2 from "@/app/page.module.css";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export async function getAnimeList() {
  const db = connect();
  try {
    const result = await db.query(`
      SELECT anime_id, title 
      FROM anime
      ORDER BY title;
    `);
    return result.rows; // Return the list of anime
  } catch (error) {
    console.error("Error fetching anime list:", error);
    return [];
  }
}

export default async function CreateReviewPage({ params, req }) {
  const { userId } = auth();

  // Redirect to login page if user is not authenticated
  if (!userId) {
    return (
      <div className={`${styles2.page} ${styles1.CreateReviewPage}`}>
        <h1>Unauthorized</h1>
        <p>
          You must be logged in to post a review. Please
          <Link href="/auth/login">sign in</Link>.
        </p>
      </div>
    );
  }
  const animeList = await getAnimeList();
  return (
    <div className={`${styles2.page} ${styles1.CreateReviewPage}`}>
      <h1>Post A Review!</h1>
      <ReviewForm current_user={userId} animeList={animeList} />
    </div>
  );
}
