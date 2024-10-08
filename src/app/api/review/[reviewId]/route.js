import connect from "@/utilities/connect";
import { auth } from "@clerk/nextjs/server";

export async function DELETE(req, { params }) {
  const { reviewId } = params;

  const db = connect();

  try {
    // Ensure the user has permission to delete the review
    const { userId: clerkId } = auth();

    if (!clerkId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }
    const userResult = await db.query(
      `SELECT user_id FROM appusers WHERE clerk_id = $1`,
      [clerkId]
    );

    if (userResult.rows.length === 0) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    const current_user = userResult.rows[0].user_id;

    const result = await db.query(
      `SELECT * FROM reviews WHERE review_id = $1 AND user_id = $2`,
      [reviewId, current_user]
    );

    if (result.rows.length === 0) {
      return new Response(
        JSON.stringify({ error: "Not authorized to delete this review" }),
        {
          status: 403,
        }
      );
    }

    // Delete the review
    await db.query(`DELETE FROM reviews WHERE review_id = $1`, [reviewId]);

    return new Response(JSON.stringify({ success: "Review deleted" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting review:", error);
    return new Response(JSON.stringify({ error: "Failed to delete review" }), {
      status: 500,
    });
  }
}
