"use client"; // VERY important

import React, { useState } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "../Navbar/Navbar";
import SideBar from "../Sidebar/SideBar";
const theme = extendTheme({});

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <div>{children}</div>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
