import Link from "next/link";
import Image from "next/image";
import styles1 from "@/components/AnimeCard.module.css";
import styles2 from "@/app/page.module.css";

export default function AnimeCard({ anime }) {
  const {
    anime_id,
    title,
    synopsis,
    release_year,
    genre_id,
    genre_name,
    tag_ids,
    tag_names,
    average_rating,
    cover_image,
  } = anime;

  return (
    <div className={styles1.AnimeCard}>
      <Link className={styles1.Link} href={`/anime/${anime_id}`}>
        <h1 className={styles1.AnimeTitle}>{title}</h1>
      </Link>
      {/* Placeholder for the image */}
      <div className={styles1.imageContainer}>
        <Image
          className={styles1.AnimeCover}
          src={cover_image}
          alt={title}
          width={1408} // Placeholder aspect ratio width
          height={1140} // Placeholder aspect ratio height
        />
      </div>
      <p className={styles2.spacer}>{synopsis}</p>
      <p className={styles2.spacer}>
        <strong>Release Year:</strong> {release_year}
      </p>
      <p className={styles2.spacer}>
        <strong>Avg Rating:</strong> {average_rating}
      </p>
      <p className={styles2.spacer}>
        <strong>Genre:</strong>
        <Link href={`/genre/${genre_id}`}>
          <span className={styles1.GenreLink}>{genre_name}</span>
        </Link>
      </p>
      <div className={styles1.TagWrapper}>
        <strong>Tags:</strong>
        {tag_names.length === 0 ? (
          <p>No tags available.</p>
        ) : (
          <ul>
            {tag_names.map((tag_name, index) => (
              <li key={tag_ids[index]}>{tag_name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
