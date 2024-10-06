import connect from "@/utilities/connect";

export async function GET(req, { params }) {
  const { id } = params;
  const db = connect();
  try {
    const animeResult = await db.query(
      `
      SELECT 
        anime.*, 
        genres.name AS genre_name, 
        genres.genre_id,
        COALESCE(ROUND(AVG(reviews.rating), 1), 0) AS average_rating 
      FROM anime
      JOIN genres ON anime.genre_id = genres.genre_id
      LEFT JOIN reviews ON reviews.anime_id = anime.anime_id
      WHERE anime.anime_id = $1
      GROUP BY anime.anime_id, genres.name, genres.genre_id;
    `,
      [id]
    );

    if (animeResult.rows.length === 0) {
      return new Response(JSON.stringify({ error: "Anime not found" }), {
        status: 404,
      });
    }

    const reviewsResult = await db.query(
      `
      SELECT reviews.review_id, reviews.rating, reviews.review_text, reviews.likes, reviews.created_at,
             appusers.username AS reviewer_name, appusers.user_id
      FROM reviews
      LEFT JOIN appusers ON reviews.user_id = appusers.user_id
      WHERE reviews.anime_id = $1
      ORDER BY reviews.created_at DESC
    `,
      [id]
    );

    const tagsResult = await db.query(
      `
      SELECT tags.tag_id, tags.tag_name
      FROM tags
      JOIN anime_tags ON tags.tag_id = anime_tags.tag_id
      WHERE anime_tags.anime_id = $1
    `,
      [id]
    );

    const response = {
      anime: animeResult.rows[0],
      reviews: reviewsResult.rows,
      tags: tagsResult.rows,
    };

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch anime details" }),
      { status: 500 }
    );
  }
}
