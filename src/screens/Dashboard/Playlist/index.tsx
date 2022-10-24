import { Box, Flex } from "@atoms/Flex";
import { Text } from "@atoms/Text";
import { usePlaylistsContext } from "@contexts/playlists";
import { useRouting } from "expo-next-react-navigation";
import { IPlayList, Track } from "../../../";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Pressable,
  View,
} from "react-native";
import { Image } from "@atoms/Image";
import { Spacer } from "@atoms/Spacer";
import { usePlayerContext } from "@contexts/player";
import { rgba } from "polished";
import { TrackItem } from "../components/TrackItem";
import { PlaylistTemplate } from "../templates/PlaylistTemplate";

export const PlaylistScreen = () => {
  const { getParam } = useRouting();
  const { fetchTrackList, getPlaylist, musicServices, fetchRecommended } =
    usePlaylistsContext();
  const { current } = usePlayerContext();

  const [playlist, setPlaylist] = useState<IPlayList | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [recommended, setRecommended] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const id: string = getParam("id");

  useEffect(() => {
    init();
  }, [id, musicServices]);

  const init = async () => {
    try {
      const requests = [getPlaylist(id), fetchTrackList(id, playlist?.kind)];
      const [_playlist, _tracks] = await Promise.all(requests);
      setPlaylist(_playlist);
      setTracks(_tracks);
      onRefreshRecommended(_tracks);
      setIsLoading(false);
    } catch (err) {
      console.warn(err);
    }
  };

  const onRefreshRecommended = async (_tracks: Track[]) => {
    setRecommended(
      await fetchRecommended(id, {
        tracks: _tracks.map((i) => i.id),
        artists: _tracks.map((i) => i.artists[0].id),
      })
    );
  };

  const renderItem: ListRenderItem<Track> = useMemo(
    () =>
      ({ item, index }) => {
        console.warn("track", item);
        return (
          <TrackItem
            isActive={current.id === item.id}
            index={index + 1}
            {...item}
          />
        );
      },
    [current, tracks]
  );

  if (isLoading)
    return (
      <Box flex={1} justify="center" color={rgba(255, 255, 255, 0.08)}>
        <ActivityIndicator />;
      </Box>
    );

  const renderHeader = () => {
    return (
      <Flex align="flex-end">
        <Image source={playlist?.images?.big} width={232} height={232} />
        <Box style={{ paddingLeft: 24 }}>
          <Text size={96} bold>
            {playlist?.title}
          </Text>
          <Spacer small />
          <Text>{playlist?.kind}</Text>
        </Box>
      </Flex>
    );
  };

  return (
    <Box flex={1} color={rgba(255, 255, 255, 0.08)}>
      <PlaylistTemplate
        gradient
        image={playlist?.images?.big}
        renderHeader={renderHeader}
      >
        <FlatList
          data={tracks}
          contentContainerStyle={{ padding: 32 }}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
        <Flex
          justify="space-between"
          align="center"
          style={{ paddingHorizontal: 32 }}
        >
          <Box>
            <Text biggest bold>
              Recommended
            </Text>
          </Box>
          <Pressable onPress={() => onRefreshRecommended(tracks)}>
            <Text bold>refresh</Text>
          </Pressable>
        </Flex>
        <FlatList
          data={recommended}
          contentContainerStyle={{ padding: 32 }}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </PlaylistTemplate>
    </Box>
  );
};
