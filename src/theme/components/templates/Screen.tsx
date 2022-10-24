import React, { ReactNode } from "react";
import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  SafeAreaView,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";
// import {useSafeAreaInsets} from 'react-native-safe-area-context'
import styled, { useTheme } from "styled-components/native";
import { isAndroid, isMobile } from "../../constants";

interface IScreen {
  primary?: boolean;
  black?: boolean;
  hasTabs?: boolean;
  centered?: boolean;
  hasBottomSpacing?: boolean;
  renderFooter?: JSX.Element | JSX.Element[];
  children?: JSX.Element | JSX.Element[] | ReactNode;
  keyboardAvoidingView?: KeyboardAvoidingViewProps;
}

export const Screen = ({
  primary,
  black,
  hasBottomSpacing,
  hasTabs,
  renderFooter,
  children,
  centered,
  keyboardAvoidingView,
}: IScreen) => {
  // const {bottom} = useSafeAreaInsets()
  const theme = useTheme();

  let paddingBottom = 0;
  // if (hasBottomSpacing) paddingBottom = bottom

  if (keyboardAvoidingView && isMobile) {
    return (
      <KeyboardAvoidingView
        behavior={isAndroid ? undefined : "padding"}
        contentContainerStyle={{ flexGrow: 1, height: "100%" }}
        style={{
          flexGrow: 1,
          backgroundColor: theme.Colors.background,
        }}
        {...keyboardAvoidingView}
      >
        <StyledWrapper
          style={{
            paddingTop: 0,
            paddingBottom,
          }}
          primary={primary}
          black={black}
        >
          <ScreenContent>
            <ScreenContentInner centered={!!centered}>
              {children}
            </ScreenContentInner>
          </ScreenContent>
          {renderFooter && (
            <ScreenFooter
              style={
                {
                  // marginBottom: bottom,
                }
              }
            >
              {renderFooter}
            </ScreenFooter>
          )}
        </StyledWrapper>
      </KeyboardAvoidingView>
    );
  }

  return (
    <StyledWrapper
      style={{
        paddingTop: 0,
        paddingBottom,
      }}
      primary={primary}
      black={black}
    >
      <ScreenContent>
        <ScreenContentInner centered={!!centered}>
          {children}
        </ScreenContentInner>
      </ScreenContent>
      {renderFooter && (
        <ScreenFooter
          style={
            {
              // marginBottom: bottom,
            }
          }
        >
          {renderFooter}
        </ScreenFooter>
      )}
    </StyledWrapper>
  );
};

type StyledWrapperProp = {
  primary?: boolean;
  black?: boolean;
};

const StyledWrapper = styled(SafeAreaView)<StyledWrapperProp>`
  height: 100%;
  width: 100%;
  flex: 1;
  background: ${({ theme, primary, black }) => {
    if (primary) return theme.Colors.primary;
    if (black) return theme.Colors.black;
    return theme.Colors.background;
  }};
  align-items: center;
`;

interface IScreenFooter {
  children: JSX.Element | JSX.Element[];
  style?: StyleProp<ViewStyle>;
  noLine?: boolean;
  noBottomPadding?: boolean;
}

export const ScreenFooter = ({
  children,
  noLine = false,
  style,
  noBottomPadding = false,
}: IScreenFooter) => {
  const theme = useTheme();
  return (
    <StyledFooter style={style} noLine={noLine}>
      <StyledFooterChildren
        style={{
          paddingBottom: noBottomPadding ? 0 : theme.Spacings.small,
        }}
      >
        {children}
      </StyledFooterChildren>
    </StyledFooter>
  );
};

type StyledFooterChildrenProp = {
  style: StyleProp<ViewStyle>;
};
const StyledFooterChildren = styled(View)<StyledFooterChildrenProp>`
  padding-left: ${({ theme }) => theme.Spacings.small}px;
  padding-right: ${({ theme }) => theme.Spacings.small}px;
  padding-top: ${({ theme }) => theme.Spacings.small}px;
`;

type StyledFooterProp = {
  noLine: boolean;
};
const StyledFooter = styled(SafeAreaView)<StyledFooterProp>`
  border-top-width: ${({ noLine }) => (noLine ? 0 : 1)}px;
  border-style: solid;
  border-top-color: ${({ theme }) => theme.Colors.primary};
  width: 100%;
`;

const ScreenContent = styled(View)`
  width: 100%;
  flex: 1;
  align-items: center;
`;

const ScreenContentInner = styled(View)<{ centered: boolean }>`
  width: 100%;
  max-width: ${({ centered }) => (centered ? `${500}px` : "100%")};
  align-self: center;
  height: 100%;
  flex: 1;
`;
