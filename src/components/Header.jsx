"use client";
import { useUser } from "@clerk/nextjs";
import { getUserIdByClerkId } from "@/utilities/getUserByClerkId";
import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { Flex, Heading, Link, Box } from "@chakra-ui/react";

export default function Header() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (user) {
      getUserIdByClerkId(user.id).then(setUserId); // Fetch user ID and set it
    }
  }, [user]);

  if (!isLoaded) {
    return <Box>Loading...</Box>; // Loading state until Clerk is loaded
  }

  return (
    <Flex
      width="100%"
      height="15%"
      alignItems="flex-end"
      justifyContent="space-between"
      bg="gray.800"
    >
      <NavBar />

      {isSignedIn && userId && (
        <Heading as="h1" size="lg" color="gray.200">
          Welcome&nbsp;
          <Link
            href={`/user/${userId}`}
            color="gray.100"
            _hover={{ textDecoration: "underline" }}
          >
            {user.username}
          </Link>
        </Heading>
      )}
    </Flex>
  );
}
