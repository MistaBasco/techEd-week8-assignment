import connect from "@/utilities/connect";

export async function GET(req, { params }) {
  const { reviewId } = params; // Extract dynamic route param
  const { searchParams } = new URL(req.url); // Extract query parameters from the request URL
  const current_user = searchParams.get("current_user"); // Get current_user from query parameters

  if (!current_user) {
    return new Response(JSON.stringify({ error: "User not provided" }), {
      status: 400,
    });
  }

  const db = connect();

  try {
    const result = await db.query(
      `SELECT * FROM likes WHERE user_id = $1 AND review_id = $2`,
      [current_user, reviewId]
    );

    if (result.rows.length > 0) {
      return new Response(JSON.stringify({ liked: true }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ liked: false }), { status: 200 });
    }
  } catch (error) {
    console.error("Error checking like status:", error);
    return new Response(
      JSON.stringify({ error: "Failed to check like status" }),
      { status: 500 }
    );
  }
}
