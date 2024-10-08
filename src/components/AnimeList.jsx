import { useState, useEffect, useRef } from "react";
import AnimeCard from "@/components/AnimeCard";
import styles from "@/components/AnimeList.module.css";

export default function AnimeList({ animeList }) {
  const mainContentRef = useRef(null);

  useEffect(() => {
    const handleWheelScroll = (event) => {
      if (mainContentRef.current) {
        // Scroll horizontally instead of vertically
        mainContentRef.current.scrollLeft += event.deltaY;
      }
    };

    const contentDiv = mainContentRef.current;
    if (contentDiv) {
      // Add the wheel event listener to the main content
      contentDiv.addEventListener("wheel", handleWheelScroll);
    }

    // Cleanup event listener on component unmount
    return () => {
      if (contentDiv) {
        contentDiv.removeEventListener("wheel", handleWheelScroll);
      }
    };
  }, []);

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
