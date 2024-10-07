import connect from "@/utilities/connect";

export async function DELETE(req, { params }) {
  const { reviewId } = params;
  const { current_user } = await req.json();

  const db = connect();

  try {
    // Ensure the user has permission to delete the review
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
