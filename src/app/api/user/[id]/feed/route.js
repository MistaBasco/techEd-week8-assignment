import connect from "@/utilities/connect";

export async function GET(req, { params }) {
  const { id } = params;
  const db = connect();

  try {
    // Fetch reviews from the user and from users they follow
    const result = await db.query(
      `
      SELECT reviews.review_id, reviews.rating, reviews.review_text, reviews.created_at, reviews.likes, reviews.user_id, 
             anime.title AS anime_title, anime.anime_id, appusers.username AS reviewer_name
      FROM reviews
      JOIN anime ON reviews.anime_id = anime.anime_id
      JOIN appusers ON reviews.user_id = appusers.user_id
      WHERE reviews.user_id = $1 OR reviews.user_id IN (
          SELECT followed_id FROM follows WHERE follower_id = $1
      )
      ORDER BY reviews.created_at DESC;
      `,
      [id]
    );

    const reviews = result.rows;

    return new Response(JSON.stringify(reviews), { status: 200 });
  } catch (error) {
    console.error("Error fetching user feed:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch user feed" }),
      { status: 500 }
    );
  }
}
