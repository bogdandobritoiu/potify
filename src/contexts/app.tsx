import React, { createContext, useMemo, useState } from "react";
import {
  Mulish_200ExtraLight,
  Mulish_400Regular,
  Mulish_600SemiBold,
  Mulish_700Bold,
  Mulish_800ExtraBold,
  Mulish_900Black,
  useFonts,
} from "@expo-google-fonts/mulish";
import AppLoading from "expo-app-loading";
import { Asset } from "expo-asset";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "styled-components/native";
import { DarkTheme, isWeb, LightTheme } from "../theme/constants";
import { useMedia } from "../theme/hooks/useMedia";

const AppContext = createContext({});

const useAppContext = () => {
  const Media = useMedia();
  const [isDark, setIsDark] = useState(true);
  const [isReady, setIsReady] = useState(false);

  const theme = useMemo(() => {
    if (isDark)
      return {
        ...DarkTheme,
        Media,
      };
    return {
      ...LightTheme,
      Media,
    };
  }, [isDark]);

  const onAppLoad = () => {
    setIsReady(true);
  };

  const browser = useMemo(() => {
    if (isWeb) {
      const browsers = require("react-device-detect");
      return {
        isIE: browsers.isIE,
        isEdge: browsers.isEdge,
        isFirefox: browsers.isFirefox,
        isChrome: browsers.isChrome,
        isSafari: browsers.isSafari,
        isOpera: browsers.isOpera,
      };
    }
    return {
      isIE: false,
      isEdge: false,
      isFirefox: false,
      isChrome: false,
      isSafari: false,
      isOpera: false,
    };
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return {
    browser,
    isDark,
    isReady,
    Media,
    theme,
    onAppLoad,
    toggleTheme,
  };
};

export interface IAppProvider {
  children: JSX.Element | JSX.Element[];
}

const AppProvider = ({ children }: IAppProvider) => {
  const value = useAppContext();

  let [fontsLoaded] = useFonts({
    Mulish_200ExtraLight,
    Mulish_400Regular,
    Mulish_600SemiBold,
    Mulish_700Bold,
    Mulish_900Black,
    Mulish_800ExtraBold,
  });

  async function cacheResourcesAsync(): Promise<any> {
    const images: string[] = [
      // require("./assets/bubble-top.png"),
      // require("./assets/bubble-left.png"),
      // require("./assets/bubble-right.png"),
    ];

    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages);
  }

  if (!fontsLoaded)
    return (
      <AppLoading
        startAsync={cacheResourcesAsync}
        onFinish={value.onAppLoad}
        onError={console.warn}
      />
    );

  return (
    <AppContext.Provider value={value}>
      <ThemeProvider theme={value.theme}>
        <SafeAreaProvider
          initialMetrics={{
            frame: { x: 0, y: 0, width: 0, height: 0 },
            insets: { top: 0, left: 0, right: 0, bottom: 0 },
          }}
        >
          {children}
        </SafeAreaProvider>
      </ThemeProvider>
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
