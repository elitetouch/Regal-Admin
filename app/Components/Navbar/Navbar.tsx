import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { Menu, MenuList, MenuButton, IconButton } from "@chakra-ui/react";
import Image from "next/image";
import user from "../../public/Profile.jpg";
function Navbar() {
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
            <Box>
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={
                    <Box className=" relative ">
                      <svg
                        width="16"
                        height="21"
                        viewBox="0 0 16 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 4C10.7614 4 13 6.23858 13 9V11.2396C13 11.7294 13.1798 12.2022 13.5052 12.5683L14.7808 14.0035C15.6407 14.9708 14.954 16.5 13.6597 16.5H2.34025C1.04598 16.5 0.35927 14.9708 1.21913 14.0035L2.4948 12.5683C2.82022 12.2022 2.99998 11.7294 2.99998 11.2396L3 9C3 6.23858 5.23858 4 8 4ZM8 4V1.5M6.99994 19.5H8.99994"
                          stroke="#535961"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <Box className=" absolute top-0 right-0 grid h-[10px] w-[10px] justify-center items-center bg-[#EA3030] text-[8px] text-white rounded-full ">
                        <Text>0</Text>
                      </Box>
                    </Box>
                  }
                  variant="ghost"
                  className="w-[49px]"
                />
                <MenuList>
                  {/* <NotificationDrop /> */}
                  Go to Notification Page
                </MenuList>
              </Menu>
            </Box>
            <Box borderLeft="1px" borderColor="gray.300">
              <Box className=" flex items-center gap-x-[10px] m-auto pl-[10px] ">
                <Box className=" relative">
                  <Image
                    alt=""
                    src={user}
                    className=" w-[50px] h-[50px] rounded-lg"
                  />
                  <Box className=" h-[12px] w-[12px] rounded-full bg-[#23A149] absolute bottom-0 right-0"></Box>
                </Box>
                <Box className=" flex justify-between w-full text-[15px]">
                  <Box>
                    <Text className="text-[#454545]">Ashirama Senju</Text>
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
