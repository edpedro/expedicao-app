import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Theme } from "../../themes";
import { FontAwesome } from "@expo/vector-icons";

import { ItemData } from "../../contexts/types";
import { useNavigation } from "@react-navigation/native";

export default function FlatListItemNew({ data }: { data: ItemData }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.content}
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate("Input", {
            idItem: data.id,
            idName: data.baseNameInventario_id,
          });
        }}
      >
        <View style={styles.contentBody}>
          <View style={styles.enderecoBody}>
            <Text style={styles.enderecoTitle}>Codigo</Text>
            <FontAwesome name="close" size={24} color={Theme.colors.corIcon} />
          </View>
          <View>
            <View style={styles.enderecoIcon}>
              <Text style={styles.nameTitle}>{data.item}</Text>
              <Text style={styles.nameDesc}>
                {data.descricao.slice(0, 40) + "..."}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  contentBody: {
    width: "95%",
    height: 107,
    paddingHorizontal: 10,

    backgroundColor: Theme.colors.primary,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  enderecoBody: {
    flexDirection: "row",
    justifyContent: "space-between",

    paddingHorizontal: 10,
  },
  enderecoTitle: {
    fontSize: 20,
    fontFamily: "Roboto_700Bold",
    marginBottom: 5,
    color: Theme.colors.secondaryText,
  },
  dateBody: {
    flexDirection: "row",
    alignItems: "center",
  },
  enderecoDate: {
    fontSize: 12,
    fontFamily: "Roboto_500Medium",
    marginLeft: 10,
  },
  enderecoIcon: {
    flexDirection: "column",
    marginRight: 10,
    marginLeft: 10,
  },
  nameTitle: {
    fontSize: 30,
    fontFamily: "Roboto_500Medium",
  },
  nameDesc: {
    fontSize: 12,
    fontFamily: "Roboto_400Regular",
  },
});
