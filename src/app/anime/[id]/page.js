import AnimeDetailClient from "@/components/AnimeDetailClient";
import styles1 from "@/app/anime/[id]/AnimeDetailPage.module.css";
import styles2 from "@/app/page.module.css";
import dotenv from "dotenv";

export default async function AnimeDetailPage({ params }) {
  const { id } = params;

  dotenv.config();

  try {
    // Fetch the anime details from your API route
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(
      `${baseUrl}/api/anime/${id}?cache_buster=timestamp`
    );

    if (!response.ok) {
      console.error("Failed to fetch anime details:", response.statusText);
      return <p>Anime not found or failed to fetch anime details.</p>;
    }

    const data = await response.json();
    const { anime, reviews, tags } = data;

    return <AnimeDetailClient anime={anime} reviews={reviews} tags={tags} />;
  } catch (error) {
    console.error("Error fetching anime details:", error);
    return <p>Error fetching anime details.</p>;
  }
}
