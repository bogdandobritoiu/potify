import { Box } from "@atoms/Flex";
import { usePlayerContext } from "@contexts/player";
import { usePlaylistsContext } from "@contexts/playlists";
import { useRouting } from "expo-next-react-navigation";
import { rgba } from "polished";
import { useEffect, useMemo, useState } from "react";
import { ListRenderItem } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Track } from "../../../";
import { TrackItem } from "../components/TrackItem";

export const SearchScreen = () => {
  const { getParam } = useRouting();
  const { searchAll } = usePlaylistsContext();
  const { current } = usePlayerContext();
  const [results, setResults] = useState<Track[]>([]);

  const text: string = getParam("text");

  useEffect(() => {
    const getResults = async (text: string) => {
      setResults(text.length ? await searchAll(text) : []);
    };
    getResults(text);
  }, [text]);

  const renderItem: ListRenderItem<Track> = ({ item, index }) => {
    return (
      <TrackItem
        isActive={current.id === item.id}
        index={index + 1}
        {...item}
      />
    );
  };

  return (
    <Box flex={1} color={rgba(255, 255, 255, 0.1)} borderRadius={15}>
      <FlatList
        data={results}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </Box>
  );
};
