import {
  useIsFocused,
  useNavigation as _useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useState } from "react";

export const useNavigation = () => {
  const navigator = _useNavigation<any>();
  const { params: routeParams }: { params?: Record<string, any> } = useRoute();
  const [route, setRoute] = useState("Home");
  const isFocused = useIsFocused();

  const navigate = (r: string, params?: object, _relative?: boolean) => {
    setRoute(r);
    navigator?.navigate(r, params);
  };

  const reset = (name: string, params?: any) => {
    navigator?.reset({
      routes: [{ name, params }],
    });
  };

  const goBack = () => navigator?.goBack();

  const getParam = <T = any>(key: string) => {
    if (routeParams && routeParams[key]) return routeParams[key] as T;
    return null;
  };

  const followRedirect = () => {
    const redirectTo = getParam<string>("redirectTo");
    navigate(redirectTo || Routes.Home());
  };

  return {
    navigator,
    canGoBack: navigator?.canGoBack(),
    isFocused,
    navigate,
    followRedirect,
    goBack,
    push: navigator?.push,
    getParam,
    redirectTo: (r: string) => navigate(r),
    reset,
    route,
  };
};
