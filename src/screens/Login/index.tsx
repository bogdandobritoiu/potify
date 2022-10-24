import React from "react";
import { Box } from "@atoms/Flex";
import { TextInput } from "react-native";
import { Button } from "@molecules/Button";
import { useAuthContext } from "@contexts/auth";

export const LoginScreen = () => {
  const { logIn, logOut } = useAuthContext();

  return (
    <Box black flex={1} align="center">
      <TextInput />
      <TextInput />
      <Button onPress={logIn} white text={"Log In"} />
      <Button onPress={logOut} white text={"Log Out"} />
    </Box>
  );
};
