import styled, { css } from "styled-components/native";
import { Text as RNText, TextProps } from "react-native";
import { isWeb } from "../../constants";

export interface IText extends TextProps {
  secondaryFont?: boolean;
  lineHeight?: number | string;
  letterSpacing?: number;
  light?: boolean;
  semiBold?: boolean;
  bold?: boolean;
  bolder?: boolean;
  textAlign?: string;
  whiteSpace?: string;
  textOverflow?: string;
  ellipsis?: boolean;
  uppercase?: boolean;
  lowercase?: boolean;
  capitalize?: boolean;

  color?: string;
  primary?: boolean;
  red?: boolean;
  white?: boolean;
  black?: boolean;

  size?: string | number;
  tiny?: boolean;
  smallest?: boolean;
  smaller?: boolean;
  small?: boolean;
  medium?: boolean;
  big?: boolean;
  bigger?: boolean;
  biggest?: boolean;
  huge?: boolean;
}

export const Text = styled(RNText)<IText>`
  text-align: ${({ textAlign }) => textAlign || "left"};

  ${({ whiteSpace }) => {
    if (whiteSpace && isWeb) {
      return css`
        white-space: ${whiteSpace};
      `;
    }
  }}

  ${({ textOverflow }) => {
    if (textOverflow && isWeb) {
      return css`
        text-overflow: ${textOverflow};
      `;
    }
  }}

	${({ ellipsis }) => {
    if (ellipsis && isWeb)
      return css`
        text-overflow: ellipsis;
        white-space: nowrap;
      `;
  }}
	${({ lineHeight, size }) => {
    if (isWeb) {
      return css`
        line-height: ${lineHeight ?? size ?? "100%"};
      `;
    }
    if (lineHeight || size)
      return css`
        line-height: ${lineHeight ?? size};
      `;
  }}
	${({ uppercase, lowercase, capitalize }) => {
    if (uppercase)
      return css`
        text-transform: uppercase;
      `;
    if (lowercase)
      return css`
        text-transform: lowercase;
      `;
    if (capitalize)
      return css`
        text-transform: capitalize;
      `;
  }};
  ${({ bold, bolder, semiBold }) => {
    if (bolder) {
      return css`
        font-weight: 900;
      `;
    }
    if (bold) {
      return css`
        font-weight: 700;
        font-family: ${({ theme }) => theme.text.bold};
      `;
    }
    if (semiBold) {
      return css`
        font-weight: 600;
        font-family: ${({ theme }) => theme.text.semiBold};
      `;
    }

    return css`
      font-family: ${({ theme }) => theme.text.regular};
      font-weight: 400;
    `;
  }};
  ${({ theme, primary, red, white, green, black, color }) => {
    if (color)
      return css`
        color: ${color};
      `;
    if (primary)
      return css`
        color: ${theme.color.primary};
      `;
    if (black)
      return css`
        color: ${theme.color.black};
      `;
    if (red)
      return css`
        color: ${theme.color.red};
      `;
    if (green)
      return css`
        color: ${theme.color.green};
      `;
    if (white)
      return css`
        color: ${theme.color.white};
      `;
    return css`
      color: ${theme.color.white};
    `;
  }};
  ${({
    theme,
    tiny,
    smallest,
    smaller,
    small,
    big,
    bigger,
    biggest,
    huge,
    size,
  }) => {
    if (size)
      return css`
        font-size: ${size}px;
      `;
    if (tiny)
      return css`
        font-size: ${theme.text.tiny}px;
      `;
    if (smallest)
      return css`
        font-size: ${theme.text.smallest}px;
      `;
    if (smaller)
      return css`
        font-size: ${theme.text.smaller}px;
      `;
    if (small)
      return css`
        font-size: ${theme.text.small}px;
      `;
    if (big)
      return css`
        font-size: ${theme.text.big}px;
      `;
    if (bigger)
      return css`
        font-size: ${theme.text.bigger}px;
      `;
    if (biggest)
      return css`
        font-size: ${theme.text.biggest}px;
      `;
    if (huge)
      return css`
        font-size: ${theme.text.huge}px;
      `;
    return css`
      font-size: ${theme.text.medium}px;
    `;
  }};
`;
