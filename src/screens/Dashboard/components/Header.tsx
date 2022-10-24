import { Flex } from "@atoms/Flex";
import { Button } from "@molecules/Button";
import { useRouting } from "expo-next-react-navigation";
import { rgba } from "polished";
import { useState } from "react";
import { TextInput, View } from "react-native";
import styled from "styled-components/native";

export const Header = () => {
  const { navigate, goBack } = useRouting();
  const [searchFor, setSearchFor] = useState("");

  function onFocus() {
    if (searchFor.length)
      navigate({
        routeName: "search",
        params: {
          text: searchFor,
        },
        web: {
          path: "/search",
        },
      });
  }

  const onSearch = async (text: string) => {
    setSearchFor(text);
    navigate({
      routeName: "search",
      params: {
        text,
      },
      web: {
        path: `/search`,
      },
    });
  };

  const openLogin = () => {
    navigate({
      routeName: "login",
      web: {
        path: `/login`,
      },
    });
  };

  return (
    <Flex
      style={{ padding: 32, paddingVertical: 16 }}
      align="center"
      justify="space-between"
    >
      <Button
        round
        icon="caret"
        onPress={goBack}
        iconProps={{ rotate: 180 }}
        black
      />
      <Input
        style={{ width: 250 }}
        onFocus={onFocus}
        onChangeText={onSearch}
        placeholder="What do you want to listen to?"
      />
      <Button black text="Login" onPress={openLogin} />
    </Flex>
  );
};

const Input = (props) => {
  const [isFocused, setIsFocused] = useState(false);

  const onFocusInput = () => {
    setIsFocused(true);
    if (props.onFocus) props.onFocus();
  };

  const onBlurInput = () => {
    setIsFocused(false);
    if (props.onBlur) props.onBlur();
  };

  return (
    <StyledInputContainer isFocused={isFocused}>
      <StyledInput
        {...props}
        onFocus={onFocusInput}
        onBlur={onBlurInput}
        placeholderTextColor={rgba(255, 255, 255, 0.5)}
      />
    </StyledInputContainer>
  );
};

const StyledInput = styled(TextInput)`
  height: 100%;
  color: ${({ theme }) => theme.color.white};
  padding-left: ${({ theme }) => theme.spacing.small};
  font-family: ${({ theme }) => theme.text.regular};
`;

const StyledInputContainer = styled(View)`
  border: 1px solid
    ${({ theme, isFocused }) => (isFocused ? theme.color.white : "transparent")};
  border-radius: 15px;
  height: 32px;
  padding-left: ${({ theme }) => theme.spacing.smallest};
  background: ${({ theme }) => rgba(theme.color.white, 0.15)};
`;
