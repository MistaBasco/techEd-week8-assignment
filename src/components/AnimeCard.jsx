import Link from "next/link";
import Image from "next/image";
import {
  Box,
  Heading,
  Text,
  Flex,
  Tag,
  UnorderedList,
  ListItem,
  Link as ChakraLink,
} from "@chakra-ui/react";

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
    <Box
      minW="12svw"
      height="fit-content"
      bg="gray.700"
      borderRadius="8px"
      pb="1vh"
      boxShadow="lg"
    >
      <Link href={`/anime/${anime_id}`} passHref>
        <Heading
          as="h1"
          size="md"
          textAlign="center"
          borderRadius="8px 8px 0 0"
          mt={1}
          p={1}
          color="gray.100"
          _hover={{ textDecoration: "underline" }}
        >
          {title}
        </Heading>
      </Link>

      <Box width="auto" overflow="hidden">
        <Link href={`/anime/${anime_id}`} passHref>
          <Box>
            <Image
              src={cover_image}
              alt={title}
              width={1408}
              height={1140}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
              mb={0}
              priority
            />
          </Box>
        </Link>
      </Box>

      <Box p={1} color="gray.200">
        <Text mb="0.2svh">{synopsis}</Text>
        <Text mb="0.2svh">
          <Text as="span" fontWeight="bold">
            Release Year:
          </Text>
          {release_year}
        </Text>
        <Text mb="0.2svh">
          <Text as="span" fontWeight="bold">
            Avg Rating:
          </Text>
          {average_rating}
        </Text>
        <Text mb="0.2svh">
          <Text as="span" fontWeight="bold">
            Genre:
          </Text>
          <Link href={`/genre/${genre_id}`} passHref>
            <Text
              as="span"
              color="teal.300"
              _hover={{ textDecoration: "underline" }}
            >
              {genre_name}
            </Text>
          </Link>
        </Text>
        <Flex mt={2}>
          <Text as="span" fontWeight="bold">
            Tags:&nbsp;
          </Text>
          {tag_names.length === 0 ? (
            <Text>No tags available.</Text>
          ) : (
            <UnorderedList
              display="flex"
              flexWrap="wrap"
              gap="0.3svw"
              styleType="none"
              m={0}
            >
              {tag_names.map((tag_name, index) => (
                <ListItem
                  key={tag_ids[index]}
                  bg="gray.500"
                  px={1}
                  py={0.5}
                  borderRadius="4px"
                  _hover={{ bg: "gray.600", cursor: "pointer" }}
                >
                  {tag_name}
                </ListItem>
              ))}
            </UnorderedList>
          )}
        </Flex>
      </Box>
    </Box>
  );
}
