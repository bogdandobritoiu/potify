import React, { forwardRef, useImperativeHandle, useMemo, useRef } from "react";
import { FlatList, View } from "react-native";
import { useResponsiveWidth } from "react-native-responsive-dimensions";
import styled, { useTheme } from "styled-components/native";
import { SIDEBAR_WIDTH } from "../../../constants";

interface IPager {}

interface IPagerRef {
  setPage: (index: number) => void;
  setPageWithoutAnimation: (index: number) => void;
}

export const Pager = forwardRef<IPagerRef, IPager>((props, ref) => {
  const scrollViewRef = useRef<FlatList>(null);
  const theme = useTheme();

  const ITEM_WIDTH = useResponsiveWidth(100) - SIDEBAR_WIDTH;

  useImperativeHandle(ref, () => ({
    setPage: (index: number) => {
      scrollViewRef.current?.scrollToIndex({ index, animated: true });
    },
    setPageWithoutAnimation: (index: number) => {
      scrollViewRef.current?.scrollToIndex({ index, animated: false });
    },
  }));

  const renderItem = useMemo(
    () =>
      ({ item, index }: { item: any; index: number }) =>
        (
          <StyledPage style={{ width: ITEM_WIDTH, height: "100%" }}>
            {item}
          </StyledPage>
        ),
    [props.children]
  );

  return (
    <FlatList
      ref={scrollViewRef}
      data={React.Children.toArray(props.children)}
      renderItem={renderItem}
      horizontal
      nestedScrollEnabled
      scrollEnabled={false}
      {...props}
    />
  );
});

const StyledPage = styled(View)``;
