import connect from "@/utilities/connect";

export async function GET() {
  const db = connect();
  try {
    const result = await db.query(`
      SELECT reviews.review_id, reviews.rating, reviews.review_text, reviews.likes, reviews.created_at, reviews.user_id, reviews.anime_id,
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

export async function POST(req) {
  const db = connect();

  try {
    const formData = await req.formData();

    console.log("Received form data:");
    for (let key of formData.keys()) {
      console.log(key, ":", formData.get(key));
    }

    const anime_id = formData.get("anime_id");
    const rating = parseInt(formData.get("rating"), 10); // Parse rating as an integer
    const review_text = formData.get("review_text");
    const current_user = formData.get("current_user");
    // console.log("anime_id:", anime_id);
    // console.log("rating:", rating);
    // console.log("review_text:", review_text);
    // console.log("current_user:", current_user);

    // Ensure all fields are provided
    if (!anime_id || isNaN(rating) || !review_text || !current_user) {
      return new Response(
        JSON.stringify({ success: false, error: "All fields are required" }),
        { status: 400 }
      );
    }

    // Insert logic to handle the review submission (e.g., inserting into the database)
    const result = await db.query(
      `INSERT INTO reviews (anime_id, user_id, rating, review_text)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [anime_id, current_user, rating, review_text]
    );

    if (result.rowCount === 1) {
      const redirectURL = new URL("/", req.url);
      return Response.redirect(redirectURL.toString(), 302);
    }
  } catch (error) {
    console.error("Error inserting review:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }

  return new Response(
    JSON.stringify({ success: false, error: "Failed to submit review" }),
    { status: 500 }
  );
}
