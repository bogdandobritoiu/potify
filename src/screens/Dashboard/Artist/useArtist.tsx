import { usePlayerContext } from "@contexts/player";
import { usePlaylistsContext } from "@contexts/playlists";
import { useRouting } from "expo-next-react-navigation";
import { Artist, IPlayList, Track } from "index";
import { useEffect, useMemo, useState } from "react";

export function useArtist() {
  const { getParam } = useRouting();
  const {
    fetchArtistTop,
    fetchArtist,
    fetchArtistPlaylists,
    fetchRecommended,
  } = usePlaylistsContext();
  const { current } = usePlayerContext();

  const [artist, setArtist] = useState<Artist | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [playlists, setPlaylists] = useState<IPlayList[]>([]);
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [recommended, setRecommended] = useState<Track[]>([]);

  const id: string = getParam("id");

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    init();
  }, [id]);

  const init = async () => {
    try {
      const requests = [
        fetchArtist(id),
        fetchArtistPlaylists(id),
        fetchArtistTop(id),
        fetchRecommended(id, {
          artists: [id],
        }),
      ];
      const [artist, playlist, topTracks, recommended] = await Promise.all(
        requests
      );

      setArtist(artist as Artist);
      setPlaylists(playlist as IPlayList[]);
      setTopTracks(topTracks as Track[]);
      setRecommended(recommended as Track[]);

      setIsLoading(false);
    } catch (err) {
      console.warn(err);
    }
  };

  const onRefreshRecommended = async (_tracks: Track[]) => {
    setRecommended(
      await fetchRecommended(id, {
        artists: [id],
      })
    );
  };

  return {
    current,
    artist,
    playlists,
    topTracks,
    isLoading,
    recommended,
    onRefreshRecommended,
  };
}
