// /app/api/follows/follow/route.js
import connect from "@/utilities/connect";

export async function POST(req) {
  const db = connect();
  const { follower_id, followed_id } = await req.json();

  try {
    await db.query(
      `INSERT INTO follows (follower_id, followed_id) VALUES ($1, $2)`,
      [follower_id, followed_id]
    );
    return new Response(JSON.stringify({ message: "Followed user" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error following user:", error);
    return new Response(JSON.stringify({ error: "Failed to follow user" }), {
      status: 500,
    });
  }
}
