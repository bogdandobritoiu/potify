import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useRef,
} from "react";
// import Spotify from "rn-spotify-sdk";

import { PlayerContext } from "./player";
import { PlaylistsContext } from "./playlists";

const TrackContext = createContext({});

const useTrackContext = () => {
  const { setIsPaused, seekSpotify, nextTrack, togglePaused, previousTrack } =
    useContext(PlayerContext);
  const { currentService } = useContext(PlaylistsContext);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentState, setCurrentState] = useState({});
  const [seekTime, setSeekTime] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  // Refs
  const playerRef = useRef(0);
  const youtubeRef = useRef(0);

  // SEEK
  const onSeekValueChange = (e) => {
    // setSeekTime(Math.floor(e))
  };

  const showProgress = () => {};

  const onSeekStart = () => {
    setIsSeeking(true);
  };

  const onSeekComplete = (e) => {
    const value = Math.floor(e);
    switch (currentService.kind) {
      case "youtube": {
        youtubeRef.current.seekTo(value);
        break;
      }
      case "spotify": {
        seekSpotify(value);
        break;
      }
      case "other": {
        playerRef.current.seek(value);
        break;
      }
      default:
        break;
    }
    setSeekTime(value);
    setIsSeeking(false);
  };

  const getTrackDuration = async () => {
    if (youtubeRef.current) {
      await youtubeRef.current.getDuration();
    }
  };

  const onYoutubeChangeState = async (event: any) => {
    setCurrentState(event.state);
    setDuration(await youtubeRef.current.getDuration());

    switch (event) {
      case "unstarted": {
        setCurrentTime(0);
        setSeekTime(0);
        break;
      }
      case "playing": {
        // setCurrentTime(0)
        break;
      }
      case "buffering": {
        // setCurrentTime(0)
        break;
      }
      case "ended": {
        nextTrack();
        break;
      }
    }
  };

  const onLoad = (e) => {
    console.warn("onLoad", e);
    console.warn(youtubeRef.current.getDuration());
    // setDuration(e.duration)
  };

  const onReady = (e) => {
    console.warn("onReady", e);
    // getTrackDuration()
  };

  const onLoadStart = (e) => {
    console.warn("onLoadStart", e);
    setIsPaused(true);
  };

  const onBuffer = (e) => {
    console.warn("onBuffer", e);
  };

  const onError = (e) => {
    console.warn("onError", e);
  };
  const onEnd = (e) => {
    console.warn("onEnd", e);
    setIsPaused(true);
  };

  const onProgress = (event) => {
    setCurrentTime(event.currentTime);
  };

  const onYoutubeError = (error: any) => {
    console.warn(error);
  };

  useEffect(() => {
    // Spotify.addListener("audioDeliveryDone", (data) => {
    //   nextTrack();
    // });

    // Spotify.addListener('play', (data) => {
    //     console.log("PLAY")
    //     data.metadata.currentTrack && setDuration(data.metadata.currentTrack.duration)
    // })
    // Spotify.addListener('pause', (data) => {
    //     console.log("PAUSE")
    //     setDuration(data.metadata.currentTrack.duration)
    // })

    // Spotify.addListener('trackChange', (data) => {
    //     console.log("trackChange")
    //     setDuration(data.metadata.currentTrack.duration)
    // })

    // Spotify.addListener('audioFlush', (data) => {
    //     console.log("audioFlush")
    //     console.log(data)
    //     // setDuration(data.metadata.currentTrack.duration)
    // })
    // Spotify.addListener('getCurrentState', (data) => {
    //     console.log("currentState")
    //     console.log(data)
    //     // setDuration(data.metadata.currentTrack.duration)
    // })
    // const contextChangeListener = Spotify.addListener('contextChange', (data) => {
    //     console.log("contextChange")
    //     console.log(data)
    //     // setDuration(data)
    // })

    // Spotify.addListener('metadataChange', (data) => {
    //     console.log("metadataChange")
    //     console.log(data)
    //     // const current = {
    //     //     ...data.state,
    //     //     duration: data.metadata.currentTrackDuration
    //     // }
    //     // console.warn(current)
    //     // setCurrentTime(current.position)
    // })

    // Spotify.addListener('pause', (data) => {
    //     console.log("PAUSE")
    //     // console.log(data)
    // })
    return () => {
      // Spotify.removeListener('trackChange')
      // Spotify.removeListener('audioFlush')
      // Spotify.removeListener('getCurrentState')
      // Spotify.removeListener('play')
      // Spotify.removeListener('pause')
    };
  }, []);

  return {
    currentTime,
    setCurrentTime,
    duration,
    setDuration,
    getTrackDuration,
    playerRef,
    youtubeRef,
    onYoutubeChangeState,
    onYoutubeError,
    onProgress,
    onEnd,
    onError,
    onBuffer,
    onLoadStart,
    onReady,
    onLoad,
    currentState,
    setCurrentState,
    seekTime,
    setSeekTime,
    isSeeking,
    onSeekStart,
    onSeekComplete,
  };
};

const TrackProvider = ({ children }) => {
  const value = useTrackContext();
  return (
    <TrackContext.Provider value={value}>{children}</TrackContext.Provider>
  );
};

export { TrackContext, TrackProvider };
