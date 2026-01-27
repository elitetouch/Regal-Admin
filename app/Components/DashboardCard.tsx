import React from "react";
import { Box, Text } from "@chakra-ui/react";
type DashboardCardType = {
  title?: string;
  routeFunc?: () => void;
  icon?: any;
  Total_number?: string;
  bgColor?: string;
  textColor?: string;
  partners?: string;
  Add_Riders?: string;
};
function DashboardCard({
  title,
  routeFunc,
  icon,
  Total_number,
  bgColor,
  textColor,
  partners,
  Add_Riders,
}: DashboardCardType) {
  return (
    <Box
      cursor={"pointer"}
      onClick={routeFunc && routeFunc}
      border={"1px"}
      // boxShadow={'lg'}
      shadow={"lg"}
      //  border={formPage  ===0&&title==='All orders'&&"1px"||formPage===1&&title==='Picked up'&&"1px"||formPage===2&&title==='Pending'&&"1px"}
      // borderColor={formPage  ===1&&title==='All orders'&&"blue.400"||formPage===2&&title==='Picked up'&&"blue.400"||formPage===3&&title==='Pending'&&"blue.400"||formPage==4&&title==='Failed'&&"blue.400"||'gray.500'}
      borderColor={"#5b2a2e17"}
      borderRadius="lg"
      className="   w-full h-[150px] rounded-lg grid items-center bg-white "
    >
      <Box className=" w-11/12 m-auto pt-[5px]">
        <Box className=" mt-[10px] flex items-center justify-between">
          <Text
            //color={formPage  ===1&&title==='All orders'&&"blue.700"||formPage===2&&title==='Picked up'&&"blue.700"||formPage===3&&title==='Pending'&&"blue.700"||formPage==4&&title==='Failed'&&"blue.700"||'gray.500'}
            color={textColor}
            className=" text-[15px] font-semibold"
          >
            {title}
          </Text>
          <Box>
            {!Add_Riders ? (
              <Box
                backgroundColor={bgColor}
                className={`bg-[${bgColor}] rounded-lg h-[38px] w-[38px] grid justify-center items-center  `}
              >
                {icon}
              </Box>
            ) : (
              <Box className=" grid w-full justify-end">
                {/* <Box>
                  <AddCourier />
                </Box> */}
              </Box>
            )}
          </Box>
        </Box>
        <Box className=" mt-[10px]">
          <Box className=" flex items-center gap-x-[5px]">
            <Text className={`text-[25px] text-[${textColor}] font-bold`}>
              {Total_number}
            </Text>
            {!partners && (
              <Text className=" text-gray-500 text-[15px] pt-[3px]">
                Parcels
              </Text>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default DashboardCard;
