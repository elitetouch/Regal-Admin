"use client";
import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { Menu, MenuList, MenuButton, IconButton } from "@chakra-ui/react";
import Image from "next/image";
import user from "../../public/Profile.jpg";
import { UserContext } from "../ProjectWrap/ProjectWrap";
import { useContext } from "react";
import { getUser } from "../Api/GetApi";
function Navbar() {
  const { data, isPending, error } = getUser();
  const profile = data?.data?.data;
  console.log(profile);
  return (
    <Box
      style={
        {
          // borderBottom: "0.5px solid gray",
        }
      }
      className=" h-[80px] border-b border-black  border-b shadow "
    >
      <Box
        shadow={"sm"}
        className=" lg:grid hidden h-[80px] items-center  w-full"
      >
        <Box className=" flex  items-center justify-between  w-11/12 m-auto">
          <Box></Box>
          {/* <Box>
          <SearchInput />
        </Box> */}
          <Box className=" flex items-center gap-x-[20px]">
            <Box></Box>
            <Box borderLeft="1px" borderColor="gray.300">
              <Box className=" flex items-center gap-x-[10px] m-auto pl-[10px] ">
                <Box className=" relative">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="20" cy="20" r="20" fill="#E5E7EB" />
                    <path
                      d="M20 20C23.3137 20 26 17.3137 26 14C26 10.6863 23.3137 8 20 8C16.6863 8 14 10.6863 14 14C14 17.3137 16.6863 20 20 20Z"
                      fill="#9CA3AF"
                    />
                    <path
                      d="M10 32C10 27.5817 13.5817 24 18 24H22C26.4183 24 30 27.5817 30 32V33H10V32Z"
                      fill="#9CA3AF"
                    />
                  </svg>
                  <Box className=" h-[12px] w-[12px] rounded-full bg-[#23A149] absolute bottom-0 right-0"></Box>
                </Box>
                <Box className=" flex justify-between w-full text-[15px]">
                  <Box>
                    <Text className="text-[#454545]">
                      {profile?.name || ""}
                    </Text>
                    <Text className=" mt-[10px] text-[#B0B0B0]">Admin</Text>
                  </Box>
                  <Box className="">
                    <IconButton
                      aria-label=""
                      backgroundColor={"transparent"}
                      icon={
                        <Box>
                          <svg
                            width="18"
                            height="10"
                            viewBox="0 0 18 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 1L9 9L17 1"
                              stroke="#454545"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Box>
                      }
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Navbar;
