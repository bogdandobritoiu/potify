import {
  DefaultSectionT,
  Pressable,
  SectionList,
  SectionListRenderItem,
} from "react-native";

import { Box, Flex } from "@atoms/Flex";
import { Text } from "@atoms/Text";
import { usePlaylistsContext } from "@contexts/playlists";
import { useRouting } from "expo-next-react-navigation";
import { rgba } from "polished";
import { useMemo } from "react";
import { IPlayList } from "../../../../";
import SPOTIFY_LOGO from "../../../../../assets/spotify.svg";
import YOUTUBE_LOGO from "../../../../../assets/youtube.svg";
import { Image } from "@atoms/Image";

type Section = {
  title: string;
  data: IPlayList[];
};

export const Sidebar = () => {
  const { musicServices } = usePlaylistsContext();
  const { navigate, getParam } = useRouting();

  const id = getParam("id");

  const sections: Section[] = useMemo(() => {
    return [
      {
        title: musicServices.spotify.name,
        data: musicServices.spotify.playlists,
      },
      {
        title: musicServices.youtube.name,
        data: musicServices.youtube.playlists,
      },
    ];
  }, [musicServices]);

  const currentIndex = useMemo(() => {
    return [
      ...musicServices.spotify.playlists,
      ...musicServices.youtube.playlists,
    ].findIndex((playlist) => playlist.id === id);
  }, [musicServices, id]);

  function openPlaylist(id: string) {
    navigate({
      routeName: `playlist`,
      web: {
        path: `/playlist/${id}`,
      },
    });
  }

  const renderItem: SectionListRenderItem<IPlayList, DefaultSectionT> = useMemo(
    () =>
      ({ item, index }) => {
        return (
          <Pressable onPress={() => openPlaylist(item.id)}>
            <Flex
              align="center"
              style={{
                paddingLeft: 24,
                paddingRight: 24,
                paddingTop: 8,
                paddingBottom: 8,
              }}
            >
              <Text
                smaller
                color={rgba(255, 255, 255, currentIndex === index ? 1 : 0.7)}
              >
                {item.title}
              </Text>
            </Flex>
          </Pressable>
        );
      },
    [id]
  );

  const renderSectionHeader = ({ section }) => (
    <Flex
      align="center"
      style={{
        padding: 24,
      }}
    >
      <Image
        source={
          section.title.toLowerCase() === "spotify"
            ? SPOTIFY_LOGO
            : YOUTUBE_LOGO
        }
        width={section.title.toLowerCase() === "spotify" ? 24 : 30}
        height={24}
        layout="fixed"
      />
      <Text big bolder style={{ paddingLeft: 10 }}>
        {section.title}
      </Text>
    </Flex>
  );

  return (
    <Box flex={1}>
      <Box
        style={{
          padding: 24,
          paddingBottom: 0,
        }}
      >
        <Text bold huge>
          Tubify
        </Text>
      </Box>

      <Box
        style={{
          margin: 24,
          marginBottom: 0,
          paddingBottom: 24,
          borderColor: rgba(255, 255, 255, 0.2),
          borderBottomWidth: 1,
        }}
      >
        <Flex style={{ paddingVertical: 8 }}>
          <Text smaller bold>
            Home
          </Text>
        </Flex>
        <Flex style={{ paddingVertical: 8 }}>
          <Text smaller bold>
            Search
          </Text>
        </Flex>
        <Flex style={{ paddingVertical: 8 }}>
          <Text smaller bold>
            Your library
          </Text>
        </Flex>
      </Box>

      <SectionList<IPlayList>
        sections={sections}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
      />
    </Box>
  );
};
