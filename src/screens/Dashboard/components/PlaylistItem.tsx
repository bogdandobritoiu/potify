import { Box, Flex } from "@atoms/Flex";
import { Image } from "@atoms/Image";
import { Spacer } from "@atoms/Spacer";
import { Text } from "@atoms/Text";
import { usePlayerContext } from "@contexts/player";
import { useRouting } from "expo-next-react-navigation";
import { rgba } from "polished";
import { useMemo } from "react";
import { Pressable } from "react-native";
import { IPlayList, Track } from "../../..";

interface Props extends IPlayList {}

export const PlaylistItem = ({ ...item }: Props) => {
  const { navigate } = useRouting();

  const openPlaylist = (id: string) => {
    navigate({
      routeName: "playlist",
      web: {
        path: `/playlist/${id}`,
      },
    });
  };

  return (
    <Pressable onPress={() => openPlaylist(item.id)}>
      <Box
        style={{
          marginRight: 24,
          backgroundColor: rgba(255, 255, 255, 0.02),
          borderRadius: 4,
          padding: 16,
          width: 200,
          height: 300,
        }}
      >
        <Box
          style={{
            width: 173,
            height: 173,
          }}
        >
          <Image
            source={item.images.medium}
            width={"100%"}
            height={"100%"}
            layout="responsive"
            style={{ borderRadius: 4 }}
          />
        </Box>
        <Box justify="center" style={{ paddingTop: 20 }}>
          <Text bold smaller ellipsis numberOfLines={1}>
            {item.title}
          </Text>
          <Spacer tiny />
        </Box>
      </Box>
    </Pressable>
  );
};
