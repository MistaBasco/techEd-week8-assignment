import connect from "@/utilities/connect";
import { auth } from "@clerk/nextjs/server";

export async function GET(req, { params }) {
  const { reviewId } = params; // Extract dynamic route param
  const { userId: clerkId } = auth();

  if (!clerkId) {
    return new Response(JSON.stringify({ error: "User not authenticated" }), {
      status: 400,
    });
  }

  const db = connect();

  try {
    const userResult = await db.query(
      `SELECT user_id FROM appusers WHERE clerk_id = $1`,
      [clerkId]
    );

    if (userResult.rows.length === 0) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    const userId = userResult.rows[0].user_id;

    const result = await db.query(
      `SELECT * FROM likes WHERE user_id = $1 AND review_id = $2`,
      [userId, reviewId]
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
