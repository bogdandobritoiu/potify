import { createContext, useContext, useState } from "react";

const PlayerContext = createContext({});

import { useSpotify } from "@services/Spotify";
import { Track } from "../../../../";
import { PlaylistsContext } from "../../../../contexts/playlists";

interface IPlayer {
  current: Track;
  isFullscreen: boolean;
  isVideoOpen: boolean;
  isOpen: boolean;
  isTop: boolean;
  currentState: string;
  isPaused: boolean;
  duration: number;
  seekTime: number;
}

const initialState: IPlayer = {
  current: {
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
  },
  isFullscreen: false,
  isVideoOpen: false,
  isOpen: false,
  isTop: false,
  currentState: "unstarted",
  isPaused: true,
  duration: 0,
  seekTime: 0,
};

function usePlayerContext() {
  const {
    setTrack: setSpotifyTrack,
    seek: seekSpotify,
    pause: pauseSpotify,
    play: playSpotify,
  } = useSpotify();

  const [current, setCurrentTrack] = useState<IPlayer["current"]>(
    initialState.current
  );

  const {
    currentPlaylist,
    setCurrentPlaylist,
    setNextTrack,
    currentPlaylistIndex,
    setPreviousTrack,
  } = useContext(PlaylistsContext);

  // UI
  const [isFullscreen, setIsFullscreen] = useState<IPlayer["isFullscreen"]>(
    initialState.isFullscreen
  );
  const [isVideoOpen, setIsVideoOpen] = useState<IPlayer["isVideoOpen"]>(
    initialState.isVideoOpen
  );
  const [isOpen, setIsOpen] = useState<IPlayer["isOpen"]>(initialState.isOpen);
  const [isTop, setIsTop] = useState<IPlayer["isTop"]>(initialState.isTop);

  const [isPaused, setIsPaused] = useState<IPlayer["isPaused"]>(
    initialState.isPaused
  );

  const setCurrent = (item: Track, playlist, index) => {
    isPaused && setIsPaused(false);

    setCurrentPlaylist(playlist, index);
    trackServiceHandler(item);
  };

  const trackServiceHandler = (item) => {
    setTrack(item);

    switch (item.kind) {
      case "youtube": {
        pauseSpotify();
        break;
      }
      case "spotify": {
        setSpotifyTrack(item.id);
        // playSpotify()
        break;
      }
      default:
        break;
    }
  };

  const nextTrack = () => {
    if (currentPlaylistIndex < currentPlaylist.items.length - 1) {
      const nextIndex = currentPlaylistIndex + 1;
      const nextTrack = currentPlaylist.items[nextIndex];
      setNextTrack(nextIndex);
      trackServiceHandler(nextTrack);
      // console.warn(nextIndex, currentPlaylist.items, nextTrack)
    } else {
      // TODO: IF ending playlist then search for current service suggestions and go to next song suggested by service,
      // Also remove currentPlaylist
    }
  };

  const previousTrack = () => {
    if (currentPlaylistIndex > 0) {
      const previousIndex = currentPlaylistIndex - 1;
      const previousTrack = currentPlaylist.items[previousIndex];
      setPreviousTrack(previousIndex);
      trackServiceHandler(previousTrack);
    }
  };

  const setTrack = (item: Track) => {
    setCurrentTrack(item);
  };

  const togglePaused = (active?: boolean) => {
    if (active === true) {
      console.warn("Paused");
      current.kind === "spotify" && playSpotify();
      setIsPaused(false);
    } else if (active === false) {
      console.warn("Unpaused");
      current.kind === "spotify" && pauseSpotify();
      setIsPaused(true);
    } else {
      if (isPaused) {
        console.warn("Unpaused");
        current.kind === "spotify" && playSpotify();
        setIsPaused(false);
      } else {
        console.warn("Paused");
        current.kind === "spotify" && pauseSpotify();
        setIsPaused(true);
      }
    }
  };

  const toggleOpen = (active: boolean) => {
    setIsOpen(active === undefined ? active : !isOpen);
  };

  const toggleShowVideo = (active: boolean) => {
    setIsVideoOpen(active === undefined ? active : !isVideoOpen);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return {
    isPaused,
    setIsPaused,
    togglePaused,
    isVideoOpen,
    setIsVideoOpen,
    toggleShowVideo,
    isFullscreen,
    toggleFullscreen,
    setCurrent,
    current,
    toggleOpen,
    isOpen,
    isTop,
    setIsTop,
    setIsOpen,
    seekSpotify,
    nextTrack,
    previousTrack,
  };
}

const PlayerProvider = ({ children }) => {
  const value = usePlayerContext();
  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};

export { PlayerContext, PlayerProvider };
