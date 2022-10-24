import { Box, Flex } from "@atoms/Flex";
import { Image } from "@atoms/Image";
import { useDimensions } from "@hooks/useDimensions";
import { LinearGradient } from "expo-linear-gradient";
import { darken, rgba } from "polished";
import { useEffect, useState } from "react";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Header } from "../components/Header";

type Props = {
  image?: string;
  gradient?: boolean;
  renderHeader: () => JSX.Element;
  children: JSX.Element | JSX.Element[];
};

export const PlaylistTemplate = ({
  children,
  image,
  gradient,
  renderHeader,
}: Props) => {
  const [averageColor, setAverageColor] = useState("#ffffff");
  const dimensions = useDimensions();

  const translationY = useSharedValue(1);
  const opacity = useSharedValue(0);

  useEffect(() => {
    const setNewAverageColor = async () => {
      const newAverageColor = await getAverageColor(image);
      // setAverageColor(darken(0.1, newAverageColor));
    };
    setNewAverageColor();
  }, []);

  const getAverageColor = async (uri: string) => {
    // const result = await ImageColors.getColors(uri, {
    //   fallback: "#228B22",
    //   cache: true,
    //   key: "unique_key",
    // });
    // return result.darkMuted;
  };

  const scrollHandler = useAnimatedScrollHandler((event) => {
    const step = event.contentOffset.y / 5000;
    translationY.value = 1.1 - step;

    opacity.value = event.contentOffset.y / 300;
  });

  const stylez = useAnimatedStyle(() => {
    return {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      transform: [
        {
          scale: translationY.value,
        },
      ],
    };
  });

  const stylez2 = useAnimatedStyle(() => {
    return {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: averageColor,
      opacity: opacity.value,
    };
  });

  return (
    <>
      <Animated.ScrollView onScroll={scrollHandler} scrollEventThrottle={16}>
        <>
          <Box
            style={{
              overflow: "hidden",
              position: "relative",
            }}
          >
            {gradient ? (
              <LinearGradient
                colors={[averageColor, rgba(averageColor, 0.1)]}
                locations={[0, 1]}
                style={{
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  position: "absolute",
                  opacity: 0.2,
                }}
              />
            ) : null}
            {!gradient ? (
              <>
                <Box
                  style={{
                    position: "absolute",
                    right: 0,
                    left: 0,
                    top: 0,
                    bottom: 0,
                  }}
                >
                  <Animated.View style={stylez}>
                    <Image source={image} layout="fill" />
                  </Animated.View>
                </Box>

                <Animated.View style={stylez2} />
              </>
            ) : null}

            <Box
              style={{
                height: (dimensions.height / 100) * (gradient ? 30 : 40),
                maxHeight: gradient ? 500 : "none",
                minHeight: 340,
                paddingHorizontal: 32,
                paddingBottom: 32,
              }}
              justify="flex-end"
            >
              {renderHeader()}
            </Box>
          </Box>
          <Box>
            {!gradient ? (
              <LinearGradient
                colors={[averageColor, rgba(averageColor, 0.2), "transparent"]}
                locations={[0, 0.7, 1]}
                style={{
                  top: 0,
                  height: 250,
                  left: 0,
                  right: 0,
                  opacity: 0.5,
                  position: "absolute",
                }}
              />
            ) : null}
            {children}
          </Box>
        </>
      </Animated.ScrollView>
      <Box style={{ position: "absolute", top: 0, left: 0, right: 0 }}>
        <Header />
      </Box>
    </>
  );
};
