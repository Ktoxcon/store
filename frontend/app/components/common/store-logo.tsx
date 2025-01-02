import { Flex, Heading, type FlexProps } from "@radix-ui/themes";
import { StoreLogoIcon } from "../icons/store";

export function StoreLogo({ align = "center", ...restProps }: FlexProps) {
  return (
    <Flex gap="2" align={align} {...restProps}>
      <StoreLogoIcon />
      <Heading>Store</Heading>
    </Flex>
  );
}
