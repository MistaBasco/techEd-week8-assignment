import Link from "next/link";
import { Box, Heading, Text } from "@chakra-ui/react";
import styles2 from "@/app/page.module.css";

export default function Title() {
  return (
    <Box position="absolute" top="1svh" left="2svh">
      <Link href="/" passHref>
        <Box _hover={{ textDecoration: "none" }} color="beige">
          <Heading as="h1" size="xl" textShadow="1px 1px 6px slategrey">
            Absolute Weeb Reviews
            <Text className={styles2.copyright} as="span" fontSize="lg">
              ©
            </Text>
          </Heading>
        </Box>
      </Link>
    </Box>
  );
}
