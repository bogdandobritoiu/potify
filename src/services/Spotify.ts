import { useState, useContext } from "react";
import { Alert } from "react-native";

// import { SpotifyWebApi } from "spotify-web-api-ts";
import {
  parseArtist,
  parseArtistPlaylist,
  parsePlayLists,
  parseTrackList,
} from "./";

import { useAuthContext } from "@contexts/auth";
import { Artist, Track } from "../";
export const useSpotify = () => {
  const { token } = useAuthContext();
  //   const { notify } = useContext(AppContext);
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [user, setUser] = useState({
    id: "",
    name: "",
    followers: "",
    url: "",
    image: "",
  });

  const initialize = async () => {};

  const fetchData = async () => {
    // await getUser();
    await getPlaylists();
  };

  const getPlaylists = async () => {
    try {
      console.warn("@@@", token);
      const result = await fetch(`https://api.spotify.com/v1/me/playlists`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json());
      setPlaylists(parsePlayLists(result.items, "spotify"));
    } catch (err) {
      console.warn(err);
    }
  };

  const fetchArtist = async (id: string): Promise<Artist | null> => {
    try {
      const result = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json());
      return parseArtist(result, "spotify");
    } catch (err) {
      return null;
    }
  };

  const fetchArtistTopTracks = async (id: string) => {
    try {
      const result = await fetch(
        `https://api.spotify.com/v1/artists/${id}/top-tracks?market=${"RO"}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((res) => res.json());
      return parseTrackList(result.tracks, "spotify", "playlist", id);
    } catch (err) {
      console.warn(err);
      return [];
    }
  };

  const fetchArtistPlaylists = async (id: string) => {
    try {
      const result = await fetch(
        `https://api.spotify.com/v1/artists/${id}/albums`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((res) => res.json());
      return parseArtistPlaylist(result.items, "spotify");
    } catch (err) {
      return [];
    }
  };

  const fetchTrackList = async (id: string): Promise<Track[]> => {
    try {
      const result = await fetch(
        `https://api.spotify.com/v1/playlists/${id}/tracks`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((res) => res.json());
      return parseTrackList(result.items, "spotify", "playlist", id);
    } catch (err) {
      return [];
    }
  };

  const fetchRecommended = async ({
    artists = [],
    genres = [],
    tracks = [],
  }: {
    artists: string[];
    genres: string[];
    tracks: string[];
  }): Promise<Track[]> => {
    try {
      const result = await fetch(
        `https://api.spotify.com/v1/recommendations?seed_artists=${artists.slice(
          0,
          4
        )}&tracks=${tracks.slice(0, 4)}&genres=${genres.slice(0, 4)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((res) => res.json());
      return parseTrackList(result.tracks, "spotify", "playlist");
    } catch (err) {
      return [];
    }
  };

  const search = async (keyword: string): Promise<Track[]> => {
    try {
      const result = await fetch(
        `https://api.spotify.com/v1/search?type=track&include_external=audio&q=${keyword}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((res) => res.json());
      return parseTrackList(result.tracks.items, "spotify", "track");
    } catch (err) {
      return [];
    }
  };

  const logIn = () => {
    // Spotify.login()
    //   .then((loggedIn) => {
    //     if (loggedIn) {
    //       // logged in
    //       setIsLoggedIn(true);
    //     } else {
    //       // cancelled
    //       setIsLoggedIn(false);
    //     }
    //   })
    //   .catch((error) => {
    //     // error
    //     Alert.alert("Error", error.message);
    //   });
  };

  const logOut = () => {
    // Spotify.logout().finally(() => {
    //   Alert.alert("Logged out of Spotify");
    // });
  };

  const setTrack = (uri) => {
    playTrack(uri);
  };

  const playTrack = (uri) => {
    // Spotify.playURI("spotify:track:" + uri, 0, 0)
    //   .then(async (success) => {
    //     play();
    //     await getMetadata();
    //   })
    //   .catch((error) => {
    //     // notify(error);
    //     console.warn("err", error);
    //   });
  };

  const getMetadata = async () => {
    // await Spotify.getPlaybackMetadataAsync().then((success) => {
    //   console.warn(success);
    // });
  };

  const pause = () => {
    console.warn("SPOTIFY: Paused");
    // Spotify.setPlaying(false);
  };

  const play = () => {
    console.warn("SPOTIFY: Playing");
    // Spotify.setPlaying(true);
  };

  const getUser = async () => {
    // const user = await Spotify.getMe();
    // setUser({
    //   id: user.id,
    //   name: user.display_name,
    //   followers: user.followers.total,
    //   url: user.href,
    //   image: user.images[0] && user.images[0].url,
    // });
  };

  const next = () => {
    // Spotify.skipToNext()
    //   .then((success) => {
    //     console.warn("success", success);
    //   })
    //   .catch((error) => {
    //     console.warn("error", error);
    //   });
  };

  const seek = (position) => {
    // Spotify.seek(position)
    //   .then((success) => console.log("Spotify seek:", success))
    //   .catch((error) => console.warn("Spotify seek error:", error));
  };

  return {
    initialize,
    logIn,
    logOut,
    isReady,
    user,
    playlists,
    isLoggedIn,
    fetchData,
    fetchArtist,
    fetchArtistPlaylists,
    fetchArtistTopTracks,
    fetchTrackList,
    fetchRecommended,
    setTrack,
    search,
    seek,
    pause,
    play,
    next,
  };
};
