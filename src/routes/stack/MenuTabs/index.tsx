import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import Acount from "../../../screens/Acount";
import Inventario from "../../../screens/Inventario";
import Home from "../../../screens/Home";

import CustomTabBar from "../CustomTabBar";

const Tab = createBottomTabNavigator();

export default function MenuTabs() {
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />

      <Tab.Screen
        options={{ headerShown: false }}
        name="Inventario"
        component={Inventario}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="User"
        component={Acount}
      />
    </Tab.Navigator>
  );
}
