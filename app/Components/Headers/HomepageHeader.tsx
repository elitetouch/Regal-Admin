import React from "react";
import { Text } from "@chakra-ui/react";
import { TextProps } from "@chakra-ui/react";
import { robotoSlab } from "../Fonts/Font";
function HomepageHeader({
  children,
  ...props
}: TextProps & { children: React.ReactNode }) {
  return (
    <Text
      className={` font-semibold lg:text-[40px] text-[30px] text-[#BE1011] ${robotoSlab.className}`}
      {...props}
    >
      {children}
    </Text>
  );
}

export default HomepageHeader;
