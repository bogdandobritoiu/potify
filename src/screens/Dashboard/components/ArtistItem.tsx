import { Box } from "@atoms/Flex";
import { Image } from "@atoms/Image";
import { Spacer } from "@atoms/Spacer";
import { Text } from "@atoms/Text";
import { useRouting } from "expo-next-react-navigation";
import { rgba } from "polished";
import { Pressable } from "react-native";
import { Track } from "../../..";

interface Props extends Track {}

export const ArtistItem = ({ ...item }: Props) => {
  const { navigate } = useRouting();

  const openArtist = (id: string) => {
    navigate({
      routeName: "artist",
      web: {
        path: `/artist/${id}`,
      },
    });
  };

  return (
    <Pressable onPress={() => openArtist(item.id)}>
      <Box
        style={{
          marginRight: 24,
          backgroundColor: rgba(255, 255, 255, 0.02),
          borderRadius: 4,
          padding: 16,
          width: 200,
          height: 300,
        }}
      >
        <Box
          style={{
            width: 173,
            height: 173,
          }}
        >
          <Image
            source={item.images.medium}
            width={"100%"}
            height={"100%"}
            layout={"responsive"}
            style={{ borderRadius: 200 }}
          />
        </Box>
        <Box justify="center" style={{ paddingTop: 20 }}>
          <Text bold smaller ellipsis numberOfLines={1}>
            {item.title}
          </Text>
          <Spacer big />
          <Text smaller ellipsis numberOfLines={1}>
            Artist
          </Text>
        </Box>
      </Box>
    </Pressable>
  );
};
