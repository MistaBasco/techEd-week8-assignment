"use client";
import { useState, useEffect, useRef } from "react";
import styles from "@/components/ReviewList.module.css";
import ReviewCard from "@/components/ReviewCard";

export default function ReviewList({ current_user }) {
  const [reviews, setReviews] = useState([]);
  const reviewListRef = useRef(null);
  const scrollInterval = useRef(null);
  const scrollTimeout = useRef(null);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch("/api/review"); // Update API endpoint for Next.js
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      }
    }

    fetchReviews();

    function startAutoScroll() {
      scrollTimeout.current = setTimeout(() => {
        scrollInterval.current = setInterval(() => {
          if (reviewListRef.current) {
            reviewListRef.current.scrollTop += 1; // Adjust scroll speed
          }
        }, 50); // Adjust scroll interval
      }, 5000);
    }

    startAutoScroll();

    return () => {
      clearInterval(scrollInterval.current);
      clearTimeout(scrollTimeout.current);
    };
  }, []);

  function handleMouseEnter() {
    clearInterval(scrollInterval.current);
    clearTimeout(scrollTimeout.current);
  }

  function handleMouseLeave() {
    scrollTimeout.current = setTimeout(() => {
      scrollInterval.current = setInterval(() => {
        if (reviewListRef.current) {
          reviewListRef.current.scrollTop += 1;
        }
      }, 50);
    }, 1000);
  }

  function handleDeleteReview(reviewId) {
    setReviews((prevReviews) =>
      prevReviews.filter((review) => review.review_id !== reviewId)
    );
  }

  if (reviews.length === 0) {
    return <p>No reviews available</p>;
  }

  return (
    <div
      className={styles.ReviewList}
      ref={reviewListRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {reviews.map((review) => (
        <ReviewCard
          key={review.review_id}
          review={review}
          current_user={current_user}
          onDelete={() => handleDeleteReview(review.review_id)}
        />
      ))}
    </div>
  );
}
