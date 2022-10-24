import { Box } from "@atoms/Flex";
import { Text } from "@atoms/Text";
import { rgba } from "polished";
import { useMemo } from "react";
import { ActivityIndicator, FlatList, ListRenderItem } from "react-native";
import { IPlayList, Track } from "../../../";
import { ArtistItem } from "../components/ArtistItem";
import { PlaylistItem } from "../components/PlaylistItem";
import { TrackItem } from "../components/TrackItem";

import { PlaylistTemplate } from "../templates/PlaylistTemplate";
import { useArtist } from "./useArtist";

export const ArtistScreen = () => {
  const {
    artist,
    playlists,
    topTracks,
    isLoading,
    current,
    recommended,
    onRefreshRecommended,
  } = useArtist();

  const renderArtistItem: ListRenderItem<Track> = useMemo(
    () =>
      ({ item }) => {
        const id = item.artists[0].id;
        const title = item.artists[0].name;

        return <ArtistItem {...item} title={title} id={id} />;
      },
    [current]
  );

  const renderPlaylistItem: ListRenderItem<IPlayList> = useMemo(
    () =>
      ({ item }) => {
        return <PlaylistItem {...item} />;
      },
    [current]
  );

  const renderTrackItem: ListRenderItem<Track> = useMemo(
    () =>
      ({ item, index }) => {
        return (
          <TrackItem
            {...item}
            isActive={current.id === item.id}
            index={index + 1}
          />
        );
      },
    [current]
  );

  if (isLoading)
    return (
      <Box flex={1} justify="center" color={rgba(255, 255, 255, 0.08)}>
        <ActivityIndicator />;
      </Box>
    );

  const renderHeader = () => {
    return (
      <>
        <Box>
          <Text huge bold size={96} style={{ paddingBottom: 32 }}>
            {artist?.name}
          </Text>
          <Text>{artist?.followers} ascultatori pe luna</Text>
        </Box>
      </>
    );
  };

  return (
    <Box flex={1} color={rgba(255, 255, 255, 0.08)}>
      <PlaylistTemplate image={artist?.images?.big} renderHeader={renderHeader}>
        <Box>
          <Box style={{ marginTop: 32 }}>
            <Box style={{ paddingLeft: 32 }}>
              <Text biggest bold>
                Popular
              </Text>
            </Box>
            <FlatList
              data={topTracks}
              contentContainerStyle={{
                padding: 32,
              }}
              renderItem={renderTrackItem}
              showsVerticalScrollIndicator={false}
            />
            <Box style={{ paddingLeft: 32 }}>
              <Text biggest bold>
                Discografy
              </Text>
            </Box>
            <FlatList
              horizontal={true}
              contentContainerStyle={{
                padding: 32,
              }}
              data={playlists}
              renderItem={renderPlaylistItem}
              showsVerticalScrollIndicator={false}
            />
          </Box>

          <Box style={{ paddingLeft: 32 }}>
            <Text biggest bold>
              Fans also appreciate
            </Text>
          </Box>
          <FlatList
            data={recommended}
            horizontal={true}
            contentContainerStyle={{ padding: 32 }}
            renderItem={renderArtistItem}
            showsVerticalScrollIndicator={false}
          />
        </Box>
      </PlaylistTemplate>
    </Box>
  );
};
