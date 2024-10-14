"use client";
import { useEffect, useState } from "react";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ChakraProvider } from "@chakra-ui/react";

export function Providers({ children }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Prevent rendering until we are sure we're in the client
  }

  return (
    <ClerkProvider>
      <ChakraProvider>{children}</ChakraProvider>
    </ClerkProvider>
  );
}
