import { Box, Flex } from "@atoms/Flex";
import { Image } from "@atoms/Image";
import { Spacer } from "@atoms/Spacer";
import { Text } from "@atoms/Text";
import { usePlayerContext } from "@contexts/player";
import { useRouting } from "expo-next-react-navigation";
import { rgba } from "polished";
import { useMemo, useState } from "react";
import { Pressable } from "react-native";
import { Artist, Track } from "../../..";

import YOUTUBE_LOGO from "../../../../assets/youtube.svg";
import SPOTIFY_LOGO from "../../../../assets/spotify.svg";
import { TrackArtistItem } from "./TrackArtistItem";

interface Props extends Track {
  isActive: boolean;
  index: number;
}

export const TrackItem = ({ isActive, index, ...item }: Props) => {
  const { setCurrent } = usePlayerContext();

  const [isHovered, setIsHovered] = useState(false);

  const playSong = (song: Track) => {
    setCurrent(song);
  };

  return (
    <Pressable
      onPress={() => playSong(item)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Flex
        style={{
          paddingTop: 8,
          paddingBottom: 8,
          backgroundColor: isActive
            ? rgba(255, 255, 255, 0.2)
            : isHovered
            ? rgba(255, 255, 255, 0.1)
            : "transparent",
        }}
      >
        <Box
          justify="center"
          align="center"
          style={{ width: 16, marginHorizontal: 16 }}
        >
          <Text>{index}</Text>
        </Box>
        <Box style={{ position: "relative" }}>
          <Box>
            <Image
              source={item.images.medium}
              width={40}
              height={40}
              style={{ borderRadius: 2 }}
              layout="fixed"
              objectFit="cover"
            />
          </Box>
          <Box style={{ position: "absolute", right: 4, bottom: 4 }}>
            <Image
              source={item.kind === "youtube" ? YOUTUBE_LOGO : SPOTIFY_LOGO}
              width={16}
              height={item.kind === "youtube" ? 10 : 16}
              layout="fixed"
            />
          </Box>
        </Box>
        <Box justify="center" flex={1} style={{ paddingLeft: 10 }}>
          <Text bold smaller>
            {item.title}
          </Text>

          <Box style={{ paddingTop: 6 }}>
            <TrackArtistItem artists={item.artists} />
          </Box>
        </Box>
      </Flex>
    </Pressable>
  );
};
