import {
  ComponentType,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface IAuthContext {
  isLoggedIn: boolean;
  isLoading: boolean;
  token: string;
}

export const AuthContext = createContext({} as IAuthContext);
export const useAuthContext = () => useContext(AuthContext);

import { LoadingIndicator } from "@atoms/LoadingIndicator";
import { SPOTIFY_CLIENT_ID } from "@env";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { isWeb } from "@theme/constants";
import { useRouting } from "expo-next-react-navigation";
import { Linking } from "react-native";

const AUTHORIZE_URL = "https://accounts.spotify.com/authorize";
const REDIRECT_URL = isWeb
  ? "https://localhost:3000/"
  : "exp://127.0.0.1:19000/";

const STORAGE_SPOTIFY_TOKEN = "SPOTIFY_TOKEN";
function useAuth() {
  const { getKey, saveKey, deleteKey } = useLocalStorage();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initialize();
    getAuthorizationCode();
  }, []);

  const getAuthorizationCode = () => {
    const scopes = [
      "user-modify-playback-state",
      "user-read-currently-playing",
      "user-read-playback-state",
      "user-library-modify",
      "user-library-read",
      "playlist-read-private",
      "playlist-read-collaborative",
      "playlist-modify-public",
      "playlist-modify-private",
      "user-read-recently-played",
      "user-top-read",
      "streaming",
    ].join(" ");

    return `${AUTHORIZE_URL}?response_type=token&scope=${encodeURIComponent(
      scopes
    )}&redirect_uri=${REDIRECT_URL}&client_id=${SPOTIFY_CLIENT_ID}`;
  };

  const initialize = async () => {
    Linking.getInitialURL().then(async (url) => {
      const localToken = await getKey(STORAGE_SPOTIFY_TOKEN);
      const newToken = url?.split("#access_token=")[1]?.split("&")[0] || "";

      if (newToken) {
        setToken(newToken);
        saveKey(STORAGE_SPOTIFY_TOKEN, newToken);
        setIsLoggedIn(true);
      } else if (localToken) {
        setToken(localToken);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setIsLoading(false);
    });
  };

  const logIn = async () => {
    try {
      Linking.openURL(getAuthorizationCode());
    } catch (err) {
      console.warn(err);
    }
  };

  const logOut = async () => {
    await deleteKey(STORAGE_SPOTIFY_TOKEN);
    setIsLoggedIn(false);
  };

  return {
    isLoggedIn,
    token,
    isLoading,
    logOut,
    logIn,
  };
}

export const AuthProvider = ({ children }) => {
  const value = useAuth();

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const withAuth =
  (WrappedComponent: ComponentType<any>) => (props: any) => {
    const { isLoading, isLoggedIn } = useContext(AuthContext);
    const { navigate } = useRouting();

    useEffect(() => {
      if (!isLoading)
        if (!isLoggedIn) {
          navigate({
            web: {
              path: "/login",
            },
          });
        }
    }, [isLoggedIn]);

    if (isLoading) {
      return <LoadingIndicator />;
    }
    return <WrappedComponent {...props} />;
  };
