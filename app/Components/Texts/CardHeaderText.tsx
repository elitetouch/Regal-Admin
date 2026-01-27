import React from "react";
import { Text } from "@chakra-ui/react";
import { TextProps } from "@chakra-ui/react";
import { robotoSlab } from "../Fonts/Font";
function CardHeaderText({
  children,
  ...props
}: TextProps & { children: React.ReactNode }) {
  return (
    <Text className={` font-semibold text-[18px] pt-4`} {...props}>
      {children}
    </Text>
  );
}

export default CardHeaderText;
