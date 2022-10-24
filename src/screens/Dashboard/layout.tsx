import { Box, Flex } from "@atoms/Flex";
import { PlaylistsProvider } from "@contexts";
import { Content } from "./components/Content";
import { Header } from "./components/Header";
import { Player } from "./components/Player";
import { Sidebar } from "./components/Sidebar";

export const DashboardLayout = ({ children }) => {
  return (
    <Box black flex={1}>
      <Flex flex={1} style={{ height: "100%", paddingTop: 0 }}>
        <Box style={{ width: 232 }}>
          <Sidebar />
        </Box>

        <Flex flex={1} style={{ paddingLeft: 8 }}>
          {children}
        </Flex>
      </Flex>
      <Player />
    </Box>
  );
};
