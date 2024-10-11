import connect from "@/utilities/connect";

export async function GET(req, { params }) {
  const { follower_id, followed_id } = params;
  const db = connect();

  try {
    const result = await db.query(
      `SELECT * FROM follows WHERE follower_id = $1 AND followed_id = $2`,
      [follower_id, followed_id]
    );

    return new Response(
      JSON.stringify({ isFollowing: result.rows.length > 0 }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking follow status:", error);
    return new Response(
      JSON.stringify({ error: "Failed to check follow status" }),
      { status: 500 }
    );
  }
}
