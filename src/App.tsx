// import "node-libs-react-native/globals";
import "react-native-gesture-handler";
// import "react-native-url-polyfill/auto";
import React, { useState } from "react";
// import { connectToDevTools } from "react-devtools-core";
import Store from "./contexts";
import { Navigation } from "./routes";

// if (__DEV__) {
//   connectToDevTools({
//     host: "localhost",
//     port: 19006,
//   });
// }

export const App = () => {
  return (
    <Store>
      <Navigation />
    </Store>
  );
};
