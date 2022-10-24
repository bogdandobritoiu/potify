import { Flex } from "@atoms/Flex";

export const LoginLayout = ({ children }) => {
  return (
    <Flex black flex={1}>
      {children}
    </Flex>
  );
};
