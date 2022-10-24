// Polyfills
// import "core-js/features/promise";
// import "raf";
// import "setimmediate";
// if (!global.setImmediate) {
//   // @ts-ignore
//   global.setImmediate = setTimeout;
// }

// FIXME need reanimated update, see https://github.com/software-mansion/react-native-reanimated/issues/3355
if (process.browser) {
  // @ts-ignore
  window._frameTimestamp = null;
}

import Store from "@contexts";
import { DashboardLayout } from "@screens/Dashboard/layout";
import { LandingLayout } from "@screens/Home/layout";
import { LoginLayout } from "@screens/Login/layout";
import type { AppProps } from "next/app";
import React, { useEffect } from "react";
import "react-native-match-media-polyfill";
import "./app.css";

function MyApp({ Component, pageProps }: AppProps) {
  let LayoutComponent = DashboardLayout;
  if (pageProps?.layout === "landing") LayoutComponent = LandingLayout;
  if (pageProps?.layout === "login") LayoutComponent = LoginLayout;

  return (
    <Store>
      <LayoutComponent>
        <Component {...pageProps} />
      </LayoutComponent>
    </Store>
  );
}

export default MyApp;
