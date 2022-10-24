import {
  IPlayList,
  TrackList,
  Track,
  SpotifyTrack,
  YouTubeTrack,
  YoutubePlayList,
  SpotifyPlayList,
  Artist,
} from "../";
import { YOUTUBE_API_KEY } from "@env";

const defaultYoutubeResource = {
  resource: undefined,
  options: {
    part: "snippet",
    maxResults: 50,
    channelId: "",
    safeSearch: "strict",
    type: "video",
    q: "",
  },
};

// type YoutubeResource = {
//   resource: string;
//   options: {
//     part?: string;
//     channelId?: number;
//     playlistlId?: string;
//     type?: string;
//     maxResults?: number;
//     safeSearch?: string;
//     q?: string;
//   };
// } & typeof defaultYoutubeResource;

export const getYoutubeResource = (
  resource: string,
  options: {
    id?: string;
    part?: string;
    mine?: boolean;
    channelId?: string;
    playlistId?: string;
    type?: string;
    maxResults?: number;
    safeSearch?: string;
    q?: string;
  }
): string => {
  const optionsString = Object.keys(options)
    .map((item, index) => `${item}=${options[item]}&`)
    .join("");

  return `https://www.googleapis.com/youtube/v3/${resource}?${optionsString}key=${YOUTUBE_API_KEY}`;
};

// PARSING TRACKS

export const parseYoutubeTrack = (
  track: YouTubeTrack,
  resource: string,
  playlistId: string
): Track => {
  const { snippet } = track;
  const { thumbnails } = track.snippet;

  switch (resource) {
    case "search": {
      return {
        id: track.id.videoId,
        // playlistId: playlistId,
        kind: "youtube",
        title: snippet.title,
        // addedAt: track.contentDetails.videoPublishedAt,
        artists: [
          {
            id: snippet.channelId,
            name: snippet.channelTitle,
          },
        ],
        uri: "https://www.youtube.com/watch?v=" + track.id.videoId,
        share: "https://www.youtube.com/watch?v=" + track.id.videoId,
        description: snippet.description,
        images: {
          default: (thumbnails.standard && thumbnails.standard.url) || "",
          small: (thumbnails.default && thumbnails.default.url) || "",
          medium: (thumbnails.medium && thumbnails.medium.url) || "",
          big: (thumbnails.high && thumbnails.high.url) || "",
          max: (thumbnails.maxres && thumbnails.maxres.url) || "",
        },
      };
    }
    case "playlist": {
      return {
        id: snippet.resourceId.videoId,
        playlistId,
        kind: "youtube",
        title: snippet.title,
        // addedAt: track.contentDetails.videoPublishedAt,
        artists: [
          {
            id: snippet.channelId,
            name: snippet.channelTitle,
          },
        ],
        uri: "https://www.youtube.com/watch?v=" + snippet.resourceId.videoId,
        share: "https://www.youtube.com/watch?v=" + snippet.resourceId.videoId,
        description: snippet.description,
        images: {
          default: (thumbnails.standard && thumbnails.standard.url) || "",
          small: (thumbnails.default && thumbnails.default.url) || "",
          medium: (thumbnails.medium && thumbnails.medium.url) || "",
          big: (thumbnails.high && thumbnails.high.url) || "",
          max: (thumbnails.maxres && thumbnails.maxres.url) || "",
        },
      };
    }
    default:
      return {
        id: "",
        playlistId: "",
        kind: "",
        title: "",
        // addedAt: track.added_at,
        artists: [],
        share: "",
        uri: "",
        description: "",
        images: {
          default: "",
          small: "",
          medium: "",
          big: "",
          max: "",
        },
      };
  }
};

export const parseSpotifyTrack = (
  track: SpotifyTrack,
  resource: string
): Track => {
  const item = track?.track || track;

  const artists = item?.artists?.map((artist: any) => ({
    name: artist.name,
    id: artist.id,
  }));

  switch (resource) {
    case "track": {
      return {
        id: item.id,
        kind: "spotify",
        title: item.name,
        artists,
        // addedAt: item.added_at,
        // duration: Math.ceil(track.duration_ms / 1000,
        share: item.external_urls.spotify,
        uri: item.uri,
        description: "",
        images: {
          default: (item.album.images[0] && item.album.images[0].url) || "",
          small: (item.album.images[2] && item.album.images[2].url) || "",
          medium: (item.album.images[1] && item.album.images[1].url) || "",
          big: (item.album.images[0] && item.album.images[0].url) || "",
          max: (item.album.images[0] && item.album.images[0].url) || "",
        },
      };
    }
    case "playlist": {
      return {
        id: item.id,
        kind: "spotify",
        title: item.name,
        // addedAt: track.added_at,
        artists,
        share: item.external_urls.spotify,
        uri: item.uri,
        description: "",
        images: {
          default: (item.album.images[0] && item.album.images[0].url) || "",
          small: (item.album.images[2] && item.album.images[2].url) || "",
          medium: (item.album.images[1] && item.album.images[1].url) || "",
          big: (item.album.images[0] && item.album.images[0].url) || "",
          max: (item.album.images[0] && item.album.images[0].url) || "",
        },
      };
    }
    default:
      return {
        id: "",
        kind: "",
        title: "",
        // addedAt: track.added_at,
        artists: [],
        share: "",
        uri: "",
        description: "",
        images: {
          default: "",
          small: "",
          medium: "",
          big: "",
          max: "",
        },
      };
  }
};

export const parseTrackList = (
  trackList: Array<{}>,
  kind: string,
  resource: string,
  playlistId?: string
): Track[] => {
  return trackList.map((item: any): Track => {
    if (kind === "youtube")
      return parseYoutubeTrack(item, resource, playlistId);
    if (kind === "spotify")
      return parseSpotifyTrack(item, resource, playlistId);

    return {
      id: "",
      kind: "",
      title: "",
      // addedAt: '',
      share: "",
      artist: [],
      description: "",
      images: {
        default: "",
        small: "",
        medium: "",
        big: "",
        max: "",
      },
    };
  });
};

export const parseArtistPlaylist = (playlists: any, kind: string) => {
  return playlists.map((item: any) => parsePlayList(item, kind));
};

// PARSING PLAYLISTS
export const parsePlayList = (
  playlist: YoutubePlayList | SpotifyPlayList,
  kind: string
): IPlayList => {
  switch (kind) {
    case "youtube": {
      const { snippet } = playlist;
      const { thumbnails } = playlist.snippet;
      return {
        id: playlist.id,
        kind: "youtube",
        title: playlist.snippet.title,
        count: playlist.contentDetails.itemCount,
        description: playlist.snippet.description,
        images: {
          default: (thumbnails.standard && thumbnails.standard.url) || "",
          small: (thumbnails.default && thumbnails.default.url) || "",
          medium: (thumbnails.medium && thumbnails.medium.url) || "",
          big: (thumbnails.high && thumbnails.high.url) || "",
          max: (thumbnails.maxres && thumbnails.maxres.url) || "",
        },
      };
    }
    case "spotify": {
      return {
        id: playlist.id,
        kind: "spotify",
        title: playlist?.name,
        count: playlist?.tracks?.total,
        description: "-",
        images: {
          default: (playlist?.images[0] && playlist?.images[0].url) || "",
          small: (playlist.images[2] && playlist?.images[2].url) || "",
          medium: (playlist.images[1] && playlist.images[1].url) || "",
          big: (playlist.images[0] && playlist.images[0].url) || "",
          max: (playlist.images[0] && playlist.images[0].url) || "",
        },
      };
    }
    default:
      return {
        id: "",
        kind: "",
        count: 0,
        title: "",
        description: "",
        images: {
          default: "",
          small: "",
          medium: "",
          big: "",
          max: "",
        },
      };
  }
};

export const parseArtist = (artist: any, kind: string): Artist => {
  switch (kind) {
    case "youtube": {
      const { snippet, statistics } = artist;
      const { thumbnails } = snippet;
      return {
        id: artist.id,
        name: snippet.title,
        followers: statistics.subscriberCount,
        images: {
          default: (thumbnails.standard && thumbnails.standard.url) || "",
          small: (thumbnails.default && thumbnails.default.url) || "",
          medium: (thumbnails.medium && thumbnails.medium.url) || "",
          big: (thumbnails.high && thumbnails.high.url) || "",
          max: (thumbnails.maxres && thumbnails.maxres.url) || "",
        },
      };
    }
    case "spotify": {
      return {
        id: artist?.id,
        name: artist?.name,
        followers: artist?.followers?.total,
        images: {
          default: (artist?.images[0] && artist?.images[0].url) || "",
          small: (artist.images[2] && artist?.images[2].url) || "",
          medium: (artist.images[1] && artist.images[1].url) || "",
          big: (artist.images[0] && artist.images[0].url) || "",
          max: (artist.images[0] && artist.images[0].url) || "",
        },
      };
    }
    default: {
      return {
        id: "",
        name: "",
        followers: 0,
        images: {
          default: "",
          small: "",
          medium: "",
          big: "",
          max: "",
        },
      };
    }
  }
};

export const parsePlayLists = (
  playlists: Array<{}>,
  kind: string
): IPlayList[] => {
  return playlists.map((item: any): IPlayList => {
    return parsePlayList(item, kind);
  });
};
