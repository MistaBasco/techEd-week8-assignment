import connect from "@/utilities/connect";

export async function POST(req) {
  const db = connect();
  const { follower_id, followed_id } = await req.json();

  try {
    await db.query(
      `DELETE FROM follows WHERE follower_id = $1 AND followed_id = $2`,
      [follower_id, followed_id]
    );
    return new Response(JSON.stringify({ message: "Unfollowed user" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error unfollowing user:", error);
    return new Response(JSON.stringify({ error: "Failed to unfollow user" }), {
      status: 500,
    });
  }
}
