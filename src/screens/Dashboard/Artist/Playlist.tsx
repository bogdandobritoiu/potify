import { Box, Flex } from "@atoms/Flex";
import { usePlayerContext } from "@contexts/player";
import { usePlaylistsContext } from "@contexts/playlists";
import { useRouting } from "expo-next-react-navigation";
import { IPlayList } from "../../../";
import { rgba } from "polished";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator } from "react-native";

export const ArtistPlaylistScreen = () => {
  const { getParam } = useRouting();
  const { fetchTrackList, fetchArtist, fetchArtistPlaylists } =
    usePlaylistsContext();
  const { current } = usePlayerContext();
  const [playlist, setPlaylist] = useState<IPlayList>([]);
  const [isLoading, setIsLoading] = useState(true);

  const id: string = getParam("id");
  const playlistId = getParam("playlistId");

  const init = async () => {
    try {
      const newArtist = await fetchArtist(id);
      // console.warn(id, playlistId);
      // setArtist(newArtist);
      // setPlaylist(await fetchArtistPlaylists(playlistId));
      setIsLoading(false);
    } catch (err) {
      console.warn(err);
    }
  };

  const currentIndex = useMemo(() => {
    // return tracks.findIndex((i) => i.id === current.id);
  }, [current]);

  //   const renderItem: ListRenderItem<Track> = useMemo(
  //     () =>
  //       ({ item, index }) => {
  //         return <PlaylistItem isActive={currentIndex === index} {...item} />;
  //       },
  //     [currentIndex]
  //   );

  useEffect(() => {
    init();
  }, [id]);

  useEffect(() => {
    init();
  }, []);

  if (isLoading)
    return (
      <Box flex={1} justify="center" color={rgba(255, 255, 255, 0.08)}>
        <ActivityIndicator />;
      </Box>
    );

  const renderHeader = () => {
    return (
      <Box>
        <Flex
          style={{
            backgroundColor: rgba(255, 255, 255, 0.1),
            paddingHorizontal: 40,
            paddingVertical: 30,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
          align="center"
        >
          <Box borderRadius={20}>
            {/* <Image
              source={playlist?.images?.big}
              width={150}
              height={150}
              style={{
                borderRadius: 20,
              }}
            /> */}
          </Box>
          {/* <Box style={{ paddingLeft: 32 }}>
            <Text huge bold>
              {playlist?.title}
            </Text>
            <Text>{playlist?.kind}</Text>
          </Box> */}
        </Flex>
      </Box>
    );
  };

  return (
    <Box flex={1} color={rgba(255, 255, 255, 0.1)}>
      {/* <FlatList
        data={tracks}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeader}
      /> */}
    </Box>
  );
};
