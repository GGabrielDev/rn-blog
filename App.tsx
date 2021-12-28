import React from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as BlogProvider } from "./src/context/BlogContext";
import NavigateIconButton from "./src/components/NavigateIconButton";
import IndexScreen from "./src/screens/IndexScreen";
import ShowScreen from "./src/screens/ShowScreen";
import CreateScreen from "./src/screens/CreateScreen";
import EditScreen from "./src/screens/EditScreen";

const RootStack = createNativeStackNavigator<RootStackParamList>();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#FFFFFF",
  },
};

const App = () => {
  return (
    <BlogProvider>
      <NavigationContainer theme={navTheme}>
        <RootStack.Navigator
          initialRouteName="Index"
          screenOptions={{
            title: "Blog Posts",
          }}
        >
          <RootStack.Screen
            name="Index"
            component={IndexScreen}
            options={{
              headerRight: () => (
                <NavigateIconButton iconName="add" navigateTo="Create" />
              ),
            }}
          />
          <RootStack.Screen
            name="Show"
            component={ShowScreen}
            options={({ route }) => ({
              headerRight: () => (
                <NavigateIconButton
                  iconName="edit"
                  navigateTo="Edit"
                  optionalParams={{ id: route.params.id }}
                />
              ),
            })}
          />
          <RootStack.Screen
            name="Create"
            component={CreateScreen}
            options={{
              headerTitle: "Create new Blog Post",
            }}
          />
          <RootStack.Screen
            name="Edit"
            component={EditScreen}
            options={{
              headerTitle: "Edit Blog Post",
            }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </BlogProvider>
  );
};

export default App;
