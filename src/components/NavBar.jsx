"use client";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { getUserIdByClerkId } from "@/utilities/getUserByClerkId";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Flex, Button } from "@chakra-ui/react";

export default function NavBar() {
  const { isLoaded, isSignedIn, user } = useUser();

  const [userId, setUserId] = useState(null);
  useEffect(() => {
    if (user) {
      getUserIdByClerkId(user.id).then(setUserId); // Fetch user ID and set it
    }
  }, [user]);
  // Add a loading check
  if (!isLoaded) {
    return <div>Loading...</div>; // Optional: Display a loading spinner/message
  }

  console.log("userId", userId);

  return (
    <Flex
      as="nav"
      bg="gray.700"
      p={4}
      gap="0.3vw"
      alignItems="center"
      width="fit-content"
      height="50%"
    >
      <Link href="/" passHref>
        <Button
          textAlign="center"
          p={4}
          bg="gray.500"
          textDecoration="none"
          fontSize="2xl"
          fontWeight="bold"
          color="rgb(0, 13, 6)"
          textShadow="1px 2px 2px rgba(26, 214, 155, 0.87)"
          _hover={{ bg: "rgb(98, 118, 112)" }}
        >
          Home
        </Button>
      </Link>

      <SignedIn>
        {userId && (
          <Link href={`/user/${userId}`} passHref>
            <Button
              textAlign="center"
              p={4}
              bg="gray.500"
              textDecoration="none"
              fontSize="2xl"
              fontWeight="bold"
              color="rgb(0, 13, 6)"
              textShadow="1px 2px 2px rgba(26, 214, 155, 0.87)"
              _hover={{ bg: "rgb(98, 118, 112)" }}
            >
              Profile
            </Button>
          </Link>
        )}

        <Link href="/review/create-review" passHref>
          <Button
            textAlign="center"
            p={4}
            bg="gray.500"
            textDecoration="none"
            fontSize="2xl"
            fontWeight="bold"
            color="rgb(0, 13, 6)"
            textShadow="1px 2px 2px rgba(26, 214, 155, 0.87)"
            _hover={{ bg: "rgb(98, 118, 112)" }}
          >
            Post Review
          </Button>
        </Link>

        <UserButton afterSignOutUrl="/" />
      </SignedIn>

      <SignedOut>
        <Link href="/auth/signup" passHref>
          <Button
            textAlign="center"
            p={4}
            bg="gray.500"
            textDecoration="none"
            fontSize="2xl"
            fontWeight="bold"
            color="rgb(0, 13, 6)"
            textShadow="1px 2px 2px rgba(26, 214, 155, 0.87)"
            _hover={{ bg: "rgb(98, 118, 112)" }}
          >
            Sign Up
          </Button>
        </Link>

        <Link href="/auth/login" passHref>
          <Button
            textAlign="center"
            p={4}
            bg="gray.500"
            textDecoration="none"
            fontSize="2xl"
            fontWeight="bold"
            color="rgb(0, 13, 6)"
            textShadow="1px 2px 2px rgba(26, 214, 155, 0.87)"
            _hover={{ bg: "rgb(98, 118, 112)" }}
          >
            Sign In
          </Button>
        </Link>
      </SignedOut>
    </Flex>
  );
}
