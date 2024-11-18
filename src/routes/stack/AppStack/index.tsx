import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MenuTabs from "../MenuTabs";
import Input from "../../../screens/Input";
import Item from "../../../screens/Item";
import Endereco from "../../../screens/Endereco";
import AddItem from "../../../screens/addItem";

const { Navigator, Screen } = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Navigator>
      <Screen
        options={{ headerShown: false, animation: "none" }}
        name="Inicio"
        component={MenuTabs}
      />
      <Screen
        options={{ headerShown: false, animation: "none" }}
        name="Input"
        component={Input}
      />
      <Screen
        options={{ headerShown: false, animation: "none" }}
        name="AddItem"
        component={AddItem}
      />
      <Screen
        options={{ headerShown: false, animation: "none" }}
        name="Item"
        component={Item}
      />
      <Screen
        options={{ headerShown: false, animation: "none" }}
        name="Endereco"
        component={Endereco}
      />
    </Navigator>
  );
}
