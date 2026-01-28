"use client"; // VERY important

import React, { useState } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "../Navbar/Navbar";
import SideBar from "../Sidebar/SideBar";
import { useContext, createContext } from "react";
const theme = extendTheme({});
export const UserContext = createContext<any>(null);
export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<{
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    created_at: string;
    updated_at: string;
  }>({
    id: 0,
    name: "string",
    email: "string",
    email_verified_at: "string",
    created_at: "string",
    updated_at: "string",
  });

  const [queryClient] = useState(() => new QueryClient());

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider value={{ setUser, user }}>
          <div>{children}</div>
        </UserContext.Provider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
