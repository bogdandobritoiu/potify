import { Icon, IconInterface } from "@atoms/Icon";
import { Text } from "@atoms/Text";
import React from "react";
import { Pressable, View } from "react-native";
import styled, { useTheme } from "styled-components/native";

export interface IButton {
  text: string;
  stroke?: boolean;
  primary?: boolean;
  white?: boolean;
  black?: boolean;
  small?: boolean;
  big?: boolean;
  icon?: string;
  iconRight?: boolean;
  round?: boolean;
  iconProps?: IconInterface;
  onPress?: () => void;
}

export const Button = ({
  stroke,
  primary,
  white,
  black,
  small,
  big,
  text,
  icon,
  iconRight,
  round,
  iconProps,
  onPress,
}: IButton) => {
  const theme = useTheme();
  let backgroundColor = "transparent";
  let strokeColor = theme.color.white;
  let fontColor = theme.color.white;
  let fontSize = theme.text.smallest;

  if (small) fontSize = theme.text.tiny;
  if (big) fontSize = theme.text.smaller;

  if (stroke) {
    backgroundColor = "transparent";
    fontColor = theme.color.white;
  }

  if (black) {
    backgroundColor = theme.color.black;
  }

  if (primary) {
    backgroundColor = theme.color.primary;
    fontColor = theme.color.white;
    if (stroke) {
      backgroundColor = "transparent";
      strokeColor = theme.color.primary;
      fontColor = theme.color.primary;
    }
  }

  if (white) {
    if (stroke) {
      backgroundColor = "transparent";
      strokeColor = theme.color.white;
      fontColor = theme.color.white;
    } else {
      fontColor = theme.color.primary;
      backgroundColor = theme.color.white;
    }
  }

  return (
    <StyledButton
      small={small}
      big={big}
      onPress={onPress}
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor,
        borderColor: strokeColor,
        borderRadius: round ? 100 : 40,
        borderWidth: stroke ? 1 : 0,
        flexDirection: iconRight ? "row-reverse" : "row",
      }}
    >
      {icon && (
        <View
          style={{
            paddingLeft: iconRight && text?.length > 0 ? 4 : 0,
            paddingRight: text?.length > 0 ? 4 : 0,
          }}
        >
          <Icon name={icon} size={fontSize} color={fontColor} {...iconProps} />
        </View>
      )}
      <View>
        <Text size={fontSize} color={fontColor}>
          {text}
        </Text>
      </View>
    </StyledButton>
  );
};

export const StyledButton = styled(Pressable)<{
  small?: boolean;
  big?: boolean;
}>`
  ${({ big, small }) => {
    if (big) {
      return `
				height: 40px;
				min-width: 40px;
				padding: 0 10px;
			`;
    }
    if (small) {
      return `
				height: 26px;
				min-width: 26px;
				padding: 0 6px;
			`;
    }
    return `
			height: 32px;
			min-width: 32px;
			padding: 0 8px;
		`;
  }}
`;
