import { NextResponse } from "next/server";
import connect from "@/utilities/connect";

const CLIENT_ID = process.env.MAL_CLIENT_ID;

export async function GET() {
  // Connect to PostgreSQL
  const db = connect();

  try {
    await db.connect();

    // Get all anime with a dummy cover image that starts with "https://www.example.com"
    const res = await db.query(
      "SELECT anime_id, title FROM anime WHERE TRIM(cover_image) LIKE 'https://example.com%';"
    );
    const animes = res.rows;

    // Loop through each anime and get the MAL cover image
    for (const anime of animes) {
      const coverImageUrl = await getMalCoverImage(anime.title);

      if (coverImageUrl) {
        // Update cover image in the database
        await db.query(
          "UPDATE anime SET cover_image = $1 WHERE anime_id = $2",
          [coverImageUrl, anime.anime_id]
        );
        console.log(`Updated cover image for anime '${anime.title}'`);
      } else {
        console.log(`Could not find cover image for anime '${anime.title}'`);
      }
    }

    return NextResponse.json({ message: "Update process completed" });
  } catch (error) {
    console.error("Error updating cover images:", error);
    return NextResponse.json(
      { error: "An error occurred while updating cover images" },
      { status: 500 }
    );
  }
}

// Function to fetch cover image from MyAnimeList
async function getMalCoverImage(title) {
  const searchUrl = "https://api.myanimelist.net/v2/anime";
  const params = new URLSearchParams({
    q: title,
    limit: 1,
    fields: "main_picture",
  });

  const response = await fetch(`${searchUrl}?${params.toString()}`, {
    headers: {
      "X-MAL-CLIENT-ID": CLIENT_ID,
    },
  });

  if (response.ok) {
    const data = await response.json();
    if (data.data && data.data.length > 0) {
      return data.data[0].node.main_picture.medium;
    }
  } else {
    console.error(
      "MAL API request failed:",
      response.status,
      response.statusText
    );
  }
  return null;
}
