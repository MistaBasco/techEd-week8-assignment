import AnimeList from "@/components/AnimeList";
import SideBar from "@/components/SideBar";
import connect from "@/utilities/connect";
import styles from "@/app/page.module.css";

// Fetch data server-side
export default async function Home() {
  const db = connect();

  const result = await db.query(`
    SELECT
      anime.anime_id,
      anime.title,
      anime.synopsis,
      anime.release_year,
      anime.cover_image,
      genres.genre_id,
      genres.name AS genre_name,
      array_agg(DISTINCT tags.tag_id) AS tag_ids,
      array_agg(DISTINCT tags.tag_name) AS tag_names,
      COALESCE(ROUND(AVG(reviews.rating), 1), 0) AS average_rating
    FROM anime
    JOIN genres ON anime.genre_id = genres.genre_id
    LEFT JOIN anime_tags ON anime.anime_id = anime_tags.anime_id
    LEFT JOIN tags ON anime_tags.tag_id = tags.tag_id
    LEFT JOIN reviews ON anime.anime_id = reviews.anime_id
    GROUP BY anime.anime_id, genres.genre_id, genres.name
    ORDER BY anime.title;
  `);

  const animeList = result.rows;

  return (
    <>
      <div className={`${styles.page} ${styles.HomePage}`}>
        <div className={styles.MainContent}>
          <h1>Anime Collection</h1>
          <AnimeList animeList={animeList} />
        </div>
        <SideBar />
      </div>
    </>
  );
}
