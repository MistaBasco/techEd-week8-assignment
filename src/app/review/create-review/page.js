import ReviewForm from "@/components/ReviewForm";
import connect from "@/utilities/connect";
import styles1 from "@/app/review/create-review/CreateReviewPage.module.css";
import styles2 from "@/app/page.module.css";

export async function getAnimeList() {
  const db = connect();
  const current_user = 1;
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

export default async function CreateReviewPage({ current_user }) {
  const animeList = await getAnimeList();
  return (
    <div className={`${styles2.page} ${styles1.CreateReviewPage}`}>
      <h1>Post A Review!</h1>
      <ReviewForm current_user={current_user} animeList={animeList} />
    </div>
  );
}
