import { Controls } from "./Controls";
import { Details } from "./Details";
import { Options } from "./Options";
import ReactPlayer, { ReactPlayerProps } from "react-player";
import { usePlayerContext } from "@contexts/player";
import { useCallback, useMemo, useRef } from "react";
import { Text } from "@atoms/Text";
import { Image } from "@atoms/Image";
import { Box, Flex } from "@atoms/Flex";
import { View } from "react-native";
import { useAuthContext } from "@contexts/auth";

import SpotifyPlayer from "react-spotify-web-playback";
import { Button } from "@molecules/Button";
import { TrackArtistItem } from "../TrackArtistItem";
export const Player = () => {
  const { current, isPlaying, isRepeat, togglePlay } = usePlayerContext();
  const { token } = useAuthContext();

  const youtubeRef = useRef<ReactPlayer>(null);
  const spotifyRef = useRef<SpotifyPlayer>(null);

  const onPlay = () => {
    togglePlay(true);
  };

  const onPause = () => {
    togglePlay(false);
  };

  const onEnded = () => {
    if (isRepeat) {
      youtubeRef.current?.seekTo(0);
      // spotifyRef.current?.
    }
  };

  const config: ReactPlayerProps["config"] = useMemo(
    () => ({
      youtube: {
        playerVars: { showinfo: 1 },
      },
    }),
    []
  );

  return (
    <Flex
      justify="space-between"
      style={{
        backgroundColor: "#181818",
        borderColor: "#282828",
        borderWidth: 1,
      }}
    >
      <Flex style={{ flex: 0.4, padding: 16 }} align="center">
        <View style={{ height: 56, width: 56 }}>
          <View
            style={{
              position: "absolute",
              opacity: current.kind === "youtube" ? 1 : 0,
            }}
          >
            <ReactPlayer
              ref={youtubeRef}
              config={config}
              playing={current?.kind === "spotify" ? false : isPlaying}
              onPlay={onPlay}
              onEnded={onEnded}
              onPause={onPause}
              height={56}
              width={56}
              url={current?.kind === "spotify" ? undefined : current.share}
            />
          </View>
          <View
            pointerEvents="none"
            style={{
              position: "absolute",
              opacity: 0,
            }}
          >
            <SpotifyPlayer
              play={current?.kind === "youtube" ? false : isPlaying}
              token={token}
              ref={spotifyRef.current}
              uris={[
                current.kind === "spotify" ? `spotify:track:${current.id}` : "",
              ]}
            />
          </View>
          <View>
            <Image source={current?.images.big} width={56} height={56} />
          </View>
        </View>
        <Box flex={1} style={{ paddingLeft: 10 }}>
          <Text bold ellipsis numberOfLines={1}>
            {current?.title}
          </Text>
          <Box style={{ paddingTop: 6 }}>
            <TrackArtistItem artists={current.artists} />
          </Box>
        </Box>
      </Flex>

      <Controls />
      <Options />
    </Flex>
  );
};
