import { isMobile } from "@constants";
import { rgba } from "polished";
import { useEffect } from "react";
import { Animated, Easing } from "react-native";
import { useAnimatedValue } from "./useAnimatedValue";

const defaultDuration = 500;

export function useHighlight(
  duration?: number,
  colors = ["#FFFFFF", "#000000"],
  loop = false
) {
  useEffect(() => {}, [loop]);
  const colorValue = useAnimatedValue(1);

  const opacityAnimation = useAnimatedValue(1);
  const colorAnimation = colorValue.interpolate({
    inputRange: [0, 15, 30, 45, 60, 100],
    outputRange: [
      rgba(colors[0], 0.5),
      rgba(colors[1], 0.9),
      rgba(colors[0], 0.5),
      rgba(colors[1], 0.9),
      rgba(colors[0], 0.5),
      rgba(colors[1], 1),
    ],
  });

  useEffect(() => {
    if (!loop) {
      opacityAnimation.stopAnimation();
      opacityAnimation.setValue(1);
    }
  }, [loop]);

  function toggleColor() {
    Animated.timing(colorValue, {
      toValue: 100,
      duration: duration ?? defaultDuration,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }

  const toggleOpacity = () => {
    Animated.sequence([
      Animated.timing(opacityAnimation, {
        toValue: 0.3,
        duration: duration ?? defaultDuration,
        easing: Easing.linear,
        useNativeDriver: isMobile,
      }),
      Animated.timing(opacityAnimation, {
        toValue: 1,
        duration: duration ?? defaultDuration,
        easing: Easing.linear,
        useNativeDriver: isMobile,
      }),
      Animated.timing(opacityAnimation, {
        toValue: 0.3,
        duration: duration ?? defaultDuration,
        easing: Easing.linear,
        useNativeDriver: isMobile,
      }),
      Animated.timing(opacityAnimation, {
        toValue: 1,
        duration: duration ?? defaultDuration,
        easing: Easing.linear,
        useNativeDriver: isMobile,
      }),
      Animated.timing(opacityAnimation, {
        toValue: 0.3,
        duration: duration ?? defaultDuration,
        easing: Easing.linear,
        useNativeDriver: isMobile,
      }),
      Animated.timing(opacityAnimation, {
        toValue: 1,
        duration: duration ?? defaultDuration,
        easing: Easing.linear,
        useNativeDriver: isMobile,
      }),
    ]).start((result) => {
      if (result.finished && loop) toggleOpacity();
    });
  };

  return {
    opacityAnimation,
    colorAnimation,
    toggleOpacity,
    toggleColor,
  };
}
