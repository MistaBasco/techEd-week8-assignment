import connect from "@/utilities/connect";

export async function GET() {
  const db = connect();
  try {
    const result = await db.query(`
      SELECT
        anime.anime_id,
        anime.title,
        anime.synopsis,
        anime.release_year,
        anime.cover_image,
        genres.genre_id,
        genres.name AS genre_name,
        array_agg(DISTINCT tags.tag_id) AS tag_ids,
        array_agg(DISTINCT tags.tag_name) AS tag_names,
        COALESCE(ROUND(AVG(reviews.rating), 1), 0) AS average_rating
      FROM anime
      JOIN genres ON anime.genre_id = genres.genre_id
      LEFT JOIN anime_tags ON anime.anime_id = anime_tags.anime_id
      LEFT JOIN tags ON anime_tags.tag_id = tags.tag_id
      LEFT JOIN reviews ON anime.anime_id = reviews.anime_id
      GROUP BY anime.anime_id, genres.genre_id, genres.name
      ORDER BY anime.title;
    `);
    return new Response(JSON.stringify(result.rows), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch anime" }), {
      status: 500,
    });
  }
}
