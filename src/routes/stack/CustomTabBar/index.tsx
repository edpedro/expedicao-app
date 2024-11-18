import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

import {
  Entypo,
  MaterialIcons,
  FontAwesome5,
  FontAwesome,
} from "@expo/vector-icons";
import { Theme } from "../../../themes";

export default function CustomTabBar({ state, navigation }) {
  function goTo(screen: string) {
    navigation.navigate(screen);
  }

  return (
    <View style={styles.container}>
      <View></View>
      <TouchableOpacity style={styles.tabItem} onPress={() => goTo("Home")}>
        <MaterialIcons
          name="dashboard"
          size={24}
          color={
            state.index === 0 ? Theme.colors.green : Theme.colors.secondaryText
          }
        />
        <Text style={styles.itemText}>Inicio</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => goTo("Inventario")}
      >
        <FontAwesome
          name="bars"
          size={24}
          color={
            state.index === 1 ? Theme.colors.green : Theme.colors.secondaryText
          }
        />

        <Text style={styles.itemText}>Inventario</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabItem} onPress={() => goTo("User")}>
        <FontAwesome5
          name="user"
          size={24}
          color={
            state.index === 2 ? Theme.colors.green : Theme.colors.secondaryText
          }
        />
        <Text style={styles.itemText}>Usuario</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
    height: 66,
  },
  tabItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: {
    fontSize: 14,
    color: "#000",
    fontWeight: "600",
  },
});
