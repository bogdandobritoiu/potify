import { Flex } from "@atoms/Flex";
import { Text } from "@atoms/Text";
import { useRouting } from "expo-next-react-navigation";
import { useState } from "react";
import { Pressable } from "react-native";

export const TrackArtistItem = ({
  artists,
}: {
  artists: { id: string; name: string }[];
}) => {
  const { navigate } = useRouting();

  const openArtist = (id: string) => {
    navigate({
      routeName: "artist",
      web: {
        path: `/artist/${id}`,
      },
    });
  };

  if (!artists?.length) return null;

  return (
    <Flex align="center">
      {artists.map((artist, index) => {
        return (
          <Item
            onPress={() => openArtist(artist.id)}
            text={`${artist.name}${artists.length - 1 !== index ? ", " : ""}`}
          />
        );
      })}
    </Flex>
  );
};

const Item = ({ text, onPress }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Text
        smaller
        style={{ textDecoration: isHovered ? "underline" : "none" }}
      >
        {text}
      </Text>
    </Pressable>
  );
};
