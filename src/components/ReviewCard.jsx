"use client";
import { format } from "date-fns";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
  Flex,
} from "@chakra-ui/react";
import LikeButton from "@/components/LikeButton";
import DeleteButton from "@/components/DeleteButton";

export default function ReviewCard({ review, current_user, onDelete }) {
  const {
    anime_title,
    reviewer_name,
    rating,
    review_text,
    likes,
    created_at,
    anime_id,
    review_id,
    user_id,
  } = review;

  const [currentLikes, setCurrentLikes] = useState(likes);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  const formattedDate = format(new Date(created_at), "MMM dd, yyyy");

  const isAuthor = user_id === current_user;
  //   console.log(user_id);
  useEffect(() => {
    async function fetchLikeStatus() {
      if (!current_user) return;

      try {
        const response = await fetch(
          `/api/review/${review_id}/liked?current_user=${encodeURIComponent(
            current_user
          )}`
        );
        const data = await response.json();
        setLiked(data.liked);
      } catch (error) {
        console.error("Error fetching like status:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLikeStatus();
  }, [review_id, current_user]);

  function handleLike() {
    if (liked) {
      setCurrentLikes(currentLikes - 1);
    } else {
      setCurrentLikes(currentLikes + 1);
    }
    setLiked(!liked);
  }

  return (
    <Card bg="gray.700" color="white" borderRadius="md" shadow="md" p={1}>
      <CardHeader p={2} pl={4}>
        <Link href={`/anime/${anime_id}`}>
          <Heading as="h3" size="md" _hover={{ textDecoration: "underline" }}>
            {anime_title}
          </Heading>
        </Link>
      </CardHeader>

      <CardBody pl={4}>
        <Flex alignItems="center" mb={2}>
          <Text fontWeight="bold" mr={1}>
            Review by:
          </Text>
          <Link href={`/user/${user_id}`}>
            <Text _hover={{ textDecoration: "underline" }}>
              {reviewer_name}
            </Text>
          </Link>
        </Flex>

        <Text mb={2}>
          <Text as="span" fontWeight="bold">
            Rating:&nbsp;
          </Text>
          {rating}/10
        </Text>

        <Text mb={2}>{review_text}</Text>

        <Text mb={2}>
          <Text as="span" fontWeight="bold">
            Likes:&nbsp;
          </Text>
          {currentLikes}
        </Text>

        <Text mb={2}>
          <Text as="span" fontWeight="bold">
            Date:&nbsp;
          </Text>
          {formattedDate}
        </Text>
      </CardBody>

      <CardFooter p={1} pl={4}>
        <Flex gap={4} alignItems="center">
          {current_user && !loading && (
            <LikeButton
              reviewId={review_id}
              current_user={current_user}
              onLike={handleLike}
              liked={liked}
            />
          )}
          {isAuthor && current_user && (
            <DeleteButton
              reviewId={review_id}
              current_user={current_user}
              onDelete={onDelete}
            />
          )}
        </Flex>
      </CardFooter>
    </Card>
  );
}
