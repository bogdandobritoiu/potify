// @ts-nocheck
import svgs from "./icons";
import React from "react";
import { View } from "react-native";
import SvgIcon from "react-native-svg-icon";
import styled, { useTheme } from "styled-components/native";
import { Circle } from "../Circle";

export interface IconInterface {
  name: string;
  size?: number;
  align?: string;
  viewBox?: string;
  viewWidth?: number;
  viewHeight?: number;
  notification?: number;
  custom?: boolean;

  rotate?: number;

  // Colors
  color?: string;
  primary?: boolean;
  secondary?: boolean;
  red?: boolean;
  green?: boolean;
  white?: boolean;
  black?: boolean;
  gray?: boolean;

  // Sizes
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

/**
 * grabs vector material community responsive icons from react-native-vector-icons
 * @param props
 * @constructor
 */

// iOS HIGs' recommended size for touchable icons
export const Icon = ({
  align,
  notification,
  width,
  height,
  rotate,
  ...props
}: IconInterface) => {
  const theme = useTheme();

  // Color
  let color = theme.color.white;

  if (props.gray) color = theme.color.gray;
  if (props.primary) color = theme.color.primary;
  if (props.red) color = theme.color.red;
  if (props.white) color = theme.color.white;
  if (props.black) color = theme.color.black;
  if (props.color) color = props.color;

  // Sizing
  let size = theme.spacing.bigger;
  const viewHeight = props.viewHeight || theme.spacing.biggest;
  const viewWidth = props.viewWidth || theme.spacing.biggest;

  if (props.tiny) size = theme.spacing.tiny;
  if (props.smallest) size = theme.spacing.smallest;
  if (props.smaller) size = theme.spacing.smaller;
  if (props.small) size = theme.spacing.small;
  if (props.medium) size = theme.spacing.medium;
  if (props.bigger) size = theme.spacing.bigger;
  if (props.biggest) size = theme.spacing.biggest;
  if (props.huge) size = theme.spacing.huge;
  if (props.size) size = props.size;

  if (notification !== undefined && notification !== 0)
    return (
      <StyledNotification style={{ height: size }}>
        <View style={{ height: size, width: size }}>
          <SvgIcon
            {...props}
            viewBox={`0 0 ${viewHeight} ${viewWidth}`}
            fill={color}
            width={size}
            height={size}
            svgs={svgs}
            focusable={false}
            style={{ alignSelf: `${align || "auto"}` }}
          />
        </View>
        <StyledNotificationCircle
          style={{
            left: size / 2,
            bottom: size * 1.4,
          }}
        >
          <Circle
            value={` ${notification} `}
            primary
            small={props.small}
            tiny={props.tiny}
            noWidth
          />
        </StyledNotificationCircle>
      </StyledNotification>
    );

  return (
    <SvgIcon
      {...props}
      viewBox={`0 0 ${viewWidth} ${viewHeight} `}
      fill={color}
      width={width ?? size}
      height={height ?? size}
      svgs={svgs}
      focusable={false}
      style={{
        alignSelf: `${align || "auto"}`,
        transform: [{ rotate: `${rotate || 0}deg` }],
      }}
    />
  );
};

export const RoundedIcon = ({
  name,
  size,
  iconSize = 30,
  background,
  ...props
}) => {
  const theme = useTheme();
  let color = theme.color.white;

  if (props.primary) color = theme.color.primary;
  if (props.red) color = theme.color.red;
  if (props.white) color = theme.color.white;
  if (props.black) color = theme.color.black;
  if (props.color) color = props.color;

  return (
    <StyledWrapper background={color} size={size}>
      <Icon name={name} size={iconSize} white />
    </StyledWrapper>
  );
};

const StyledWrapper = styled(View)`
  width: ${({ size }) => size || 40};
  height: ${({ size }) => size || 40};
  border-radius: ${({ size }) => (size ? size / 2 : 50)};
  background: ${({ background }) => background};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledNotification = styled(View)`
  position: relative;
`;

const StyledNotificationCircle = styled(View)`
  position: relative;
`;
