import "expo/build/Expo.fx";
import withExpoRoot from "expo/build/launch/withExpoRoot";
import { AppRegistry, Platform } from "react-native";

import { createRoot } from "react-dom/client";
import { App } from "./src/App";
import React from "react";

AppRegistry.registerComponent("main", () => withExpoRoot(App));
if (Platform.OS === "web") {
  const rootTag = createRoot(
    document.getElementById("root") ?? document.getElementById("main")
  );
  const RootComponent = withExpoRoot(App);
  rootTag.render(
    <React.StrictMode>
      <RootComponent />
    </React.StrictMode>
  );
}
