import React, { useState, useEffect, useContext, useMemo } from "react";

import { useYoutube } from "../services/Youtube";
import { useSpotify } from "../services/Spotify";
import { Artist, IPlayList, Track, TrackList } from "../";
import { useAuthContext } from "@contexts/auth";
import { ActivityIndicator } from "react-native";

export interface MusicServices {
  spotify: {
    name: "Spotify";
    playlists: IPlayList[];
  };
  youtube: {
    name: "Youtube";
    playlists: IPlayList[];
  };
}

type IPlaylistsContext = {
  loading: boolean;
  playlists: IPlayList[];
  musicServices: MusicServices;
  fetchArtist: (id: string) => Artist;
  fetchTrackList: (id: string, kind: string) => Track[];
  fetchArtistPlaylists: (id: string) => IPlayList[];
  fetchArtistTop: (id: string) => Track[];
  fetchRecommended: (
    id: string,
    filters: {
      artists?: string[];
      genres?: string[];
      tracks?: string[];
    },
    kind?: string
  ) => Track[];
};

const PlaylistsContext = React.createContext({} as IPlaylistsContext);

const usePlaylists = () => {
  const { isLoggedIn } = useAuthContext();
  const [loading, setLoading] = useState(true);

  const {
    fetchData: fetchYoutubeData,
    fetchTrackList: fetchYoutubeTrackList,
    fetchArtist: fetchYoutubeArtist,
    search: searchYouTube,
    playlists: YoutubePlayLists,
  } = useYoutube();

  const {
    fetchData: fetchSpotifyData,
    fetchArtist: fetchSpotifyArtist,
    fetchArtistTopTracks: fetchSpotifyArtistTopTracks,
    fetchArtistPlaylists: fetchSpotifyArtistPlaylists,
    fetchRecommended: fetchSpotifyRecommendedTracks,
    fetchTrackList: fetchSpotifyTrackList,
    search: searchSpotify,
    playlists: SpotifyPlayLists,
  } = useSpotify();

  const musicServices: MusicServices = useMemo(
    () => ({
      spotify: {
        name: "Spotify",
        playlists: SpotifyPlayLists,
      },
      youtube: {
        name: "Youtube",
        playlists: YoutubePlayLists,
      },
    }),
    [YoutubePlayLists, SpotifyPlayLists]
  );

  useEffect(() => {
    initiateMusicServices();
  }, [isLoggedIn]);

  const initiateMusicServices = async () => {
    console.warn("INITIATING MUSIC SERVICES");
    await fetchYoutubeData();
    await fetchSpotifyData();
    setLoading(false);
  };

  const getPlaylist = (id: string) => {
    return [
      ...musicServices.spotify.playlists,
      ...musicServices.youtube.playlists,
    ].find((playlist) => playlist.id === id);
  };

  const fetchTrackList = async (id: string, kind: string): Promise<Track[]> => {
    switch (kind) {
      case "youtube": {
        return await fetchYoutubeTrackList(id);
      }
      case "spotify": {
        return await fetchSpotifyTrackList(id);
      }
      default:
        return [];
    }
  };

  // ARTIST
  const fetchArtist = async (
    id: string,
    kind: string
  ): Promise<Artist | null> => {
    if (!kind)
      if (id.length === 22) kind = "spotify";
      else kind = "youtube";

    switch (kind) {
      case "youtube": {
        return await fetchYoutubeArtist(id);
      }
      case "spotify": {
        return await fetchSpotifyArtist(id);
      }
      default:
        return null;
    }
  };

  const fetchArtistTop = async (id: string, kind: string) => {
    if (id.length === 22) kind = "spotify";
    else kind = "youtube";
    switch (kind) {
      case "youtube": {
        // return await fetchYoutubeTrackList(id);
      }
      case "spotify": {
        return await fetchSpotifyArtistTopTracks(id);
      }
      default:
        return [];
    }
  };

  const fetchArtistPlaylists = async (id: string, kind: string) => {
    if (!kind)
      if (id.length === 22) kind = "spotify";
      else kind = "youtube";

    switch (kind) {
      case "youtube": {
        return await fetchYoutubeData();
      }
      case "spotify": {
        return await fetchSpotifyArtistPlaylists(id);
      }
      default:
        return [];
    }
  };

  const fetchRecommended = async (
    id: string,
    {
      artists = [],
      genres = [],
      tracks = [],
    }: { artists: string[]; genres: string[]; tracks: string[] },
    kind: string
  ) => {
    if (id.length === 22) kind = "spotify";
    else kind = "youtube";

    switch (kind) {
      case "youtube": {
        // return await fetchYoutubeData();
      }
      case "spotify": {
        return await fetchSpotifyRecommendedTracks({
          artists,
          genres,
          tracks,
        });
      }
      default:
        return [];
    }
  };

  const searchAll = async (keyword: string) => {
    const youtube = await searchYouTube(keyword);
    const spotify = await searchSpotify(keyword);

    return [...youtube, ...spotify].sort((a, b) =>
      a.title.length < b.title.length ? -1 : 1
    );
  };

  return {
    loading,
    musicServices,
    YoutubePlayLists,
    SpotifyPlayLists,
    fetchArtist,
    fetchArtistTop,
    fetchArtistPlaylists,
    fetchRecommended,
    getPlaylist,
    initiateMusicServices,
    fetchTrackList,
    searchYouTube,
    searchSpotify,
    searchAll,
  };
};

const PlaylistsProvider = ({ children }) => {
  const value = usePlaylists();

  if (value.loading) {
    return <ActivityIndicator />;
  }
  return (
    <PlaylistsContext.Provider value={value}>
      {children}
    </PlaylistsContext.Provider>
  );
};

const usePlaylistsContext = () => useContext(PlaylistsContext);

export { PlaylistsContext, PlaylistsProvider, usePlaylistsContext };
