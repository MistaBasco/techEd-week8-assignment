import connect from "@/utilities/connect";
import bcrypt from "bcrypt";

export async function POST(req) {
  const { username, password } = await req.json();
  const db = connect();

  try {
    const result = await db.query(
      "SELECT * FROM appusers WHERE username = $1",
      [username]
    );
    if (result.rows.length === 0) {
      return new Response(
        JSON.stringify({ error: "Invalid username or password" }),
        { status: 400 }
      );
    }

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return new Response(
        JSON.stringify({ error: "Invalid username or password" }),
        { status: 400 }
      );
    }

    // Here you'd store session information
    return new Response(
      JSON.stringify({
        success: "Logged in successfully",
        user: { id: user.user_id, username: user.username },
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to login" }), {
      status: 500,
    });
  }
}
