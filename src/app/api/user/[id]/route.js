import connect from "@/utilities/connect";

export async function GET(req, { params }) {
  const { id } = params;
  const db = connect();

  try {
    // Fetch user details
    const userResult = await db.query(
      `
      SELECT user_id, username, email, created_at
      FROM appusers
      WHERE user_id = $1
    `,
      [id]
    );

    if (userResult.rows.length === 0) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    const user = userResult.rows[0];

    // Fetch reviews posted by the user
    const reviewsResult = await db.query(
      `
      SELECT reviews.review_id, reviews.rating, reviews.review_text, reviews.created_at, reviews.likes, reviews.user_id,
       anime.title AS anime_title, anime.anime_id, appusers.username AS reviewer_name
      FROM reviews
      JOIN anime ON reviews.anime_id = anime.anime_id
      JOIN appusers ON reviews.user_id = appusers.user_id
      WHERE reviews.user_id = $1
      ORDER BY reviews.created_at DESC;
    `,
      [id]
    );

    const reviews = reviewsResult.rows;
    console.log("Fetched reviews from DB:", reviews);

    // Return the user details and their reviews as a JSON response
    const response = {
      user,
      reviews,
    };

    console.log("API Response being sent:", response);

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch user details" }),
      { status: 500 }
    );
  }
}
