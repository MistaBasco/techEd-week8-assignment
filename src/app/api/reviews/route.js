import connect from "@/utilities/connect";

export async function GET() {
  const db = connect();
  try {
    const result = await db.query(`
      SELECT reviews.review_id, reviews.rating, reviews.review_text, reviews.likes, reviews.created_at,
             anime.title AS anime_title, appusers.username AS reviewer_name
      FROM reviews
      LEFT JOIN anime ON reviews.anime_id = anime.anime_id
      LEFT JOIN appusers ON reviews.user_id = appusers.user_id
      ORDER BY reviews.created_at DESC
    `);
    return new Response(JSON.stringify(result.rows), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch reviews" }), {
      status: 500,
    });
  }
}
