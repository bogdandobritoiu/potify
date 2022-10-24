import React from "react";

import { AppProvider } from "./app";
import { AuthProvider } from "./auth";
import { PlayerProvider } from "./player";
import { PlaylistsProvider } from "./playlists";

const Store = ({ children }) => {
  return (
    <AppProvider>
      <AuthProvider>
        <PlaylistsProvider>
          <PlayerProvider>{children}</PlayerProvider>
        </PlaylistsProvider>
      </AuthProvider>
    </AppProvider>
  );
};

export default Store;
