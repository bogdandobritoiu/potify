import { useState } from "react";
import {
  getYoutubeResource,
  parseArtist,
  parsePlayLists,
  parseTrackList,
} from ".";
import { Artist, IPlayList, Track } from "../";

export const useYoutube = () => {
  const MY_YOUTUBE_CHANNEL_ID = "UCHrRORHBkYLryCTGF_GhbXA";
  const [playlists, setPlaylists] = useState<IPlayList[]>([]);

  const initialize = async () => {
    // await fetchData()
  };

  const fetchData = async () => {
    // await getUser()
    // TODO: remove this dummy id after successful authentication
    return await getPlaylists(MY_YOUTUBE_CHANNEL_ID);
  };

  const getPlaylists = async (id: string): Promise<IPlayList[]> => {
    try {
      const playlistUrl = getYoutubeResource("playlists", {
        channelId: id,
        part: "snippet,contentDetails",
        maxResults: 50,
      });
      const result = await fetch(playlistUrl).then((res) => res.json());
      const genericPlaylists = parsePlayLists(result.items, "youtube");
      // Remove this
      setPlaylists(genericPlaylists);
      return genericPlaylists;
    } catch (err) {
      return [];
      console.warn(err);
    }
  };

  const getUser = async () => {
    // const playlistUrl = getYoutubeResource("channels", {
    //   mine: true,
    //   part: "snippet",
    // });
    // // console.warn(playlistUrl)
    // await fetch(playlistUrl, {
    //   headers: {
    //     Authorization: "Bearer " + token,
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((success) => {
    //     console.warn("success youtube", success);
    //     // const genericPlaylists = parsePlayLists(success.items, 'youtube')
    //     // setPlaylists(genericPlaylists)
    //   })
    //   .catch((error) => {
    //     console.warn("error youtube", error);
    //     // notify(error.message)
    //   });
  };

  const fetchTrackList = async (id: string): Promise<Track[]> => {
    try {
      const playlistUrl = getYoutubeResource("playlistItems", {
        playlistId: id,
        part: "snippet,contentDetails",
      });
      const result = await fetch(playlistUrl).then((res) => res.json());
      return parseTrackList(result.items, "youtube", "playlist", id);
    } catch (err) {
      console.warn(err);
      return [];
    }
  };

  const fetchArtist = async (id: string): Promise<Artist | null> => {
    try {
      const url = getYoutubeResource("channels", {
        maxResults: 50,
        id,
        part: "snippet, contentDetails, statistics",
      });
      const result = await fetch(url).then((res) => res.json());
      return parseArtist(result.items[0], "youtube");
    } catch (err) {
      return null;
    }
  };

  const search = async (keyword: string): Promise<Track[]> => {
    try {
      const playlistUrl = getYoutubeResource("search", {
        maxResults: 50,
        q: keyword,
        safeSearch: "moderate",
        type: "video",
        part: "snippet",
      });

      const results = await fetch(playlistUrl).then((res) => res.json());
      return parseTrackList(results.items, "youtube", "track");
    } catch (err) {
      return [];
    }
  };

  return {
    playlists,
    initialize,
    fetchArtist,
    fetchData,
    getPlaylists,
    fetchTrackList,
    search,
  };
};
