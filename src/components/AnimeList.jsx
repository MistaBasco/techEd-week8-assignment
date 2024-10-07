import AnimeCard from "@/components/AnimeCard";
import styles from "@/components/AnimeList.module.css";

export default function AnimeList({ animeList }) {
  return (
    <>
      <div className={styles.AnimeList}>
        {animeList.map((anime) => (
          <AnimeCard key={anime.anime_id} anime={anime} />
        ))}
      </div>
    </>
  );
}
