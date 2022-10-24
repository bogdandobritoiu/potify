import { StyleProp, View, ViewProps, ViewStyle } from "react-native";
import styled from "styled-components/native";
import { css } from "../../../types/styled-components";

interface IBox extends ViewProps {
  direction?: StyleProp<ViewStyle["flexDirection"]>;
  align?: StyleProp<ViewStyle["alignItems"]>;
  justify?: StyleProp<ViewStyle["justifyContent"]>;
  flex?: StyleProp<ViewStyle["flex"]>;
  color?: string;
  red?: boolean;
  black?: boolean;
  borderRadius?: number;
}

export const Box = styled(View)<IBox>`
  ${({ borderRadius }) => {
    if (borderRadius)
      return css`
        border-radius: ${borderRadius};
      `;
  }}
  ${({ flex }) => {
    if (flex)
      return css`
        flex: ${flex};
      `;
  }}
  ${({ direction }) => {
    if (direction)
      return css`
        flex-direction: ${direction};
      `;
  }}
  ${({ justify }) => {
    if (justify)
      return css`
        justify-content: ${justify};
      `;
  }}

  ${({ align }) => {
    if (align)
      return css`
        align-items: ${align};
      `;
  }}

  ${({ theme, color, black, red }) => {
    if (color) {
      return css`
        background: ${color};
      `;
    }
    if (black) {
      return css`
        background: ${theme.color.black};
      `;
    }
    if (red) {
      return css`
        background: ${theme.color.red};
      `;
    }
  }}
`;

export const Flex = styled(Box)`
  flex-direction: ${({ direction }) => direction ?? "row"};
`;
