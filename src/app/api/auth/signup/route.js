import { currentUser } from "@clerk/nextjs";
import connect from "@/utilities/connect";

export async function POST(req) {
  const db = connect();

  try {
    const user = await currentUser(); // Get the current Clerk user

    // Check if the user already exists in the database
    const existingUser = await db.query(
      "SELECT * FROM appusers WHERE clerk_user_id = $1",
      [user.id]
    );

    if (existingUser.rows.length === 0) {
      // If the user doesn't exist, insert the new user in the database
      const result = await db.query(
        "INSERT INTO appusers (username, email, clerk_user_id) VALUES ($1, $2, $3) RETURNING *",
        [user.username, user.primaryEmailAddress.emailAddress, user.id]
      );

      return new Response(
        JSON.stringify({ success: true, user: result.rows[0] }),
        { status: 200 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, user: existingUser.rows[0] }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during signup:", error);
    return new Response(JSON.stringify({ error: "Failed to register user" }), {
      status: 500,
    });
  }
}
