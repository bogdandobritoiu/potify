export interface ServiceList {
  services: Array<Service>;
}

export interface Service {
  name: string;
  id: string;
  logo: string;
}

export type SpotifyPlayList = {
  collaborative: boolean;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: [];
  name: string;
  owner: {};
  primary_color: null;
  public: true;
  snapshot_id: string;
  tracks: {
    href: string;
    total: 5;
  };
  type: string;
  uri: string;
};

export type YoutubePlayList = {
  etag: string;
  id: string;
  kind: string;
  snippet: {
    title: string;
    channelId: string;
    channelTitle: string;
    description: string;
    localized: {
      description: string;
      title: string;
    };
    publishedAt: string;
    thumbnails: {};
  };
};

export type IPlayList = {
  id: string;
  kind: string;
  title: string;
  description: string;
  count: number;
  images: Artwork;
};

export type TrackList = {
  id: string;
  kind: string;
  title: string;
  resource: string;
  description: string;
  images: Artwork;
  items: Array<Track>;
};

const defaultTrackProps = {
  id: "",
  kind: "",
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

export type Artist = {
  id: string;
  name: string;
  followers: number;
  images: Artwork;
};

export type Track = {
  id: string;
  playlistId?: string;
  kind: string;
  title: string;
  share: string;
  artists: {
    id: string;
    name: string;
  }[];
  // addedAt: Moment,
  description: string;
  uri?: string;
  images: Artwork;
} & typeof defaultTrackProps;

export type Artwork = {
  // 640x460
  default: string;
  // 120x90
  small: string;
  // 320x180
  medium: string;
  // 480x360
  big: string;
  // 1280x720
  max: string;
};

export type SpotifyTrack = {
  // title: string;
  // etag: string;
  // id: YouTubeID;
  // kind: string;
  // snippet: {
  //   title: string;
  //   channelId: string;
  //   channelTitle: string;
  //   description: string;
  //   playlistId: string;
  //   position: number;
  //   publishedAt: string;
  //   thumbnails: YouTubeThumbnails;
  //   resourceId: YouTubeID;
  // };
  // thumbnails: YouTubeThumbnails;
};

export type YouTubeTrack = {
  title: string;
  etag: string;
  id: YouTubeID;
  kind: string;
  snippet: {
    title: string;
    channelId: string;
    channelTitle: string;
    description: string;
    playlistId: string;
    position: number;
    publishedAt: string;
    thumbnails: YouTubeThumbnails;
    resourceId: YouTubeID;
  };
  thumbnails: YouTubeThumbnails;
};

type YouTubeThumbnails = {
  default: {
    height: number;
    url: string;
    width: number;
  };
  high: {
    height: number;
    url: string;
    width: number;
  };
  maxres: {
    height: number;
    url: string;
    width: number;
  };
  medium: {
    height: number;
    url: string;
    width: number;
  };
  standard: {
    height: number;
    url: string;
    width: number;
  };
};

type YouTubeID = {
  videoId: string;
  playlistId: string;
  channelId: string;
  kind: string;
};
