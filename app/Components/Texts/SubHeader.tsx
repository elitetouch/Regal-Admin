import React from "react";
import { Text } from "@chakra-ui/react";
import { TextProps } from "@chakra-ui/react";
import { robotoSlab } from "../Fonts/Font";
function SubHeader({
  children,
  ...props
}: TextProps & { children: React.ReactNode }) {
  return (
    <Text className={` font-regular text-[18px] lg:pt-4 pt-3`} {...props}>
      {children}
    </Text>
  );
}

export default SubHeader;
