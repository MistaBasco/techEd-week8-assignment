import { Box, Heading, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box
      as="footer"
      height="5svh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      textShadow="1px 1px 6px slategrey"
      bg="gray.800"
      color="white"
    >
      <Heading as="h1" size="md">
        Basco
        <Text as="span" verticalAlign="text-top" fontSize="0.5em" ml="0.2vw">
          ™
        </Text>{" "}
        Made
        <Text as="span" verticalAlign="text-top" fontSize="0.5em" ml="0.2vw">
          ®
        </Text>{" "}
        This
        <Text as="span" verticalAlign="text-top" fontSize="0.5em" ml="0.2vw">
          ©
        </Text>
      </Heading>
    </Box>
  );
}
