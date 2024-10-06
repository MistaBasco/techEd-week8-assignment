import connect from "@/utilities/connect";
import bcrypt from "bcrypt";

export async function POST(req) {
  const { username, email, password } = await req.json();
  const db = connect();

  try {
    const userCheck = await db.query(
      "SELECT * FROM appusers WHERE username = $1 OR email = $2",
      [username, email]
    );
    if (userCheck.rows.length > 0) {
      return new Response(
        JSON.stringify({ error: "Username or email already exists" }),
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query(
      "INSERT INTO appusers (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );

    return new Response(
      JSON.stringify({
        success: "User registered successfully",
        user: { id: result.rows[0].user_id, username: result.rows[0].username },
      }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to register user" }), {
      status: 500,
    });
  }
}
