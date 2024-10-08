import connect from "@/utilities/connect";
import { auth } from "@clerk/nextjs/server";

export async function POST(req, { params }) {
  const { reviewId } = params;
  const { userId: clerkId } = auth(); // Get Clerk user ID (clerk_id) from auth

  if (!clerkId) {
    return new Response(JSON.stringify({ error: "User not authenticated" }), {
      status: 401,
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

    // Check if the user has already liked this review
    const checkLike = await db.query(
      `SELECT * FROM likes WHERE user_id = $1 AND review_id = $2`,
      [userId, reviewId]
    );

    if (checkLike.rows.length > 0) {
      // Unlike the review if already liked
      await db.query(
        `DELETE FROM likes WHERE user_id = $1 AND review_id = $2`,
        [userId, reviewId]
      );

      await db.query(
        `UPDATE reviews SET likes = (SELECT COUNT(*) FROM likes WHERE review_id = $1) WHERE review_id = $1`,
        [reviewId]
      );

      return new Response(JSON.stringify({ success: "Review unliked" }), {
        status: 200,
      });
    } else {
      // Like the review if not liked yet
      await db.query(`INSERT INTO likes (user_id, review_id) VALUES ($1, $2)`, [
        userId,
        reviewId,
      ]);

      await db.query(
        `UPDATE reviews SET likes = (SELECT COUNT(*) FROM likes WHERE review_id = $1) WHERE review_id = $1`,
        [reviewId]
      );

      return new Response(JSON.stringify({ success: "Review liked" }), {
        status: 200,
      });
    }
  } catch (error) {
    console.error("Error liking/unliking review:", error);
    return new Response(
      JSON.stringify({ error: "Failed to like/unlike review" }),
      {
        status: 500,
      }
    );
  }
}
