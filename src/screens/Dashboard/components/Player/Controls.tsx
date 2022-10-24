import { Flex } from "@atoms/Flex";
import { Text } from "@atoms/Text";
import { usePlayerContext } from "@contexts/player";
import { Button } from "@molecules/Button";
import { Pressable } from "react-native";

export const Controls = () => {
  const { isPlaying, togglePlay, isRepeat, toggleRepeat, onPrev, onNext } =
    usePlayerContext();

  return (
    <Flex justify="center" align="center">
      <Button onPress={onPrev} text="Prev" />
      <Button onPress={togglePlay} text={isPlaying ? "Pause" : "Play"} />
      <Button onPress={onNext} text="Next" />
      <Button
        onPress={toggleRepeat}
        text={isRepeat ? "Remove repeate" : "Repeat"}
      />
    </Flex>
  );
};
