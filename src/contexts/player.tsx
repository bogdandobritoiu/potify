import React, { useState, useRef, useEffect, useContext } from "react";
import { Track, IPlayList } from "../";
import { PlaylistsContext } from "./playlists";

import ReactPlayer from "react-player";
import { useLocalStorage } from "@hooks/useLocalStorage";

const STORAGE_CURRENT_SONG = "STORAGE_CURRENT_SONG";
const STORAGE_REPEAT = "STORAGE_REPEAT";

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

const PlayerContext = React.createContext({} as IPlayer);

function usePlayer() {
  const { getKey, saveKey } = useLocalStorage();
  const [current, setCurrentTrack] = useState<IPlayer["current"]>(
    initialState.current
  );
  const [isRepeat, setIsRepeat] = useState(true);

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

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const persistCurrent = async () => {
      const oldCurrent = await getKey(STORAGE_CURRENT_SONG);
      if (oldCurrent) setTrack(oldCurrent);
    };
    const persistRepeat = async () => {
      const oldRepeat = await getKey(STORAGE_REPEAT);
      if (oldRepeat != null) setIsRepeat(oldRepeat);
    };
    persistCurrent();
    persistRepeat();
  }, []);

  const onPrev = () => {};
  const onNext = () => {};

  const setCurrent = (item: Track, playlist: IPlayList, index: number) => {
    // isPaused && setIsPaused(false);

    // setCurrentPlaylist(playlist, index);
    trackServiceHandler(item);
  };

  const trackServiceHandler = (item: Track) => {
    setTrack(item);
    if (!isPlaying) setIsPlaying(true);

    // switch (item.kind) {
    //   case "youtube": {
    //     pauseSpotify();
    //     break;
    //   }
    //   case "spotify": {
    //     setSpotifyTrack(item.id);
    //     // playSpotify()
    //     break;
    //   }
    //   default:
    //     break;
    // }
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
    saveKey(STORAGE_CURRENT_SONG, item);
  };

  const toggleRepeat = () => {
    setIsRepeat(!isRepeat);
    saveKey(STORAGE_REPEAT, !isRepeat);
  };

  const togglePlay = (active?: boolean) => {
    if (active === true) {
      console.warn("Paused");
      // if (current.kind === "spotify") playSpotify();
      setIsPlaying(true);
      return;
    } else if (active === false) {
      console.warn("Unpaused");
      // if (current.kind === "spotify") pauseSpotify();
      setIsPlaying(false);
      return;
    }

    if (isPlaying) {
      console.warn("Unpaused");
      // if (current.kind === "spotify") playSpotify();
      setIsPlaying(false);
      return;
    }

    // if (current.kind === "spotify") pauseSpotify();
    setIsPlaying(!isPlaying);
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

  useEffect(() => {}, []);

  return {
    current,
    isPlaying,
    isRepeat,
    setCurrent,
    togglePlay,
    toggleRepeat,
    onPrev,
    onNext,
    isVideoOpen,
    setIsVideoOpen,
    toggleShowVideo,
    isFullscreen,
    toggleFullscreen,
    toggleOpen,
    isOpen,
    isTop,
    setIsTop,
    setIsOpen,
    // seekSpotify,
    nextTrack,
    previousTrack,
  };
}

const PlayerProvider = ({ children }) => {
  const value = usePlayer();
  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};

const usePlayerContext = () => useContext(PlayerContext);

export { PlayerContext, PlayerProvider, usePlayerContext };
