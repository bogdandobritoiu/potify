import React from "react";
import { useAuthContext } from "@contexts/auth";
import { Dashboard } from "./screens/Dashboard";
import { LoginScreen } from "@screens/Login";
import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PlaylistScreen } from "@screens/Dashboard/Playlist";
import { NewPlaylistScreen } from "@screens/Dashboard/Playlist/new";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const AuthStack = createNativeStackNavigator();
const AuthNavigator = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Home" component={LoginScreen} />
    </AuthStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();
const DashboardStackNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Playlist" component={PlaylistScreen} />
      <Tab.Screen name="New" component={NewPlaylistScreen} />
    </Tab.Navigator>
  );
};

export const Navigation = () => {
  const { isLoggedIn } = useAuthContext();

  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen
          name="Dashboard"
          component={DashboardStackNavigator}
        />
        <AuthStack.Screen name="Login" component={LoginScreen} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
};
