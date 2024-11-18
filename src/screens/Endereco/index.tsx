import { Box, FlatList, Heading, Pressable, HStack } from "native-base";
import FlatListEnderecoCiclico from "../../components/FlatListEnderecoCiclico";
import { inventoryContext } from "../../contexts/hooks/Inventory";
import { useEffect } from "react";
import { AddressData } from "../../contexts/types";
import { useLoading } from "../../contexts/hooks/Loading";
import Spinner from "../../components/Spinner";
import FlatListEnderecoGeral from "../../components/FlatListEnderecoGeral";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "../../themes";
import { useNavigation } from "@react-navigation/native";

type StackParamList = {
  Endereco: {
    id: string;
    type: string;
  };
};

type EnderecoScreenRouteProp = RouteProp<StackParamList, "Endereco">;

type EnderecoScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  "Endereco"
>;

type Props = {
  route: EnderecoScreenRouteProp;
  navigation: EnderecoScreenNavigationProp;
};

export default function Endereco({ route }: Props) {
  const {
    ListAddressInventoryData,
    addressData,
    ListOneAddressData,
    findOneAddressData,
    updateDataTrue,
    setUpdateDataTrue,
    ListCiclicoInventoryData,
  } = inventoryContext();

  const { isLoadingFetch } = useLoading();

  const { id, type } = route.params;

  useEffect(() => {
    ListCiclicoInventoryData(id);
    ListAddressInventoryData(id);

    ListOneAddressData(id);
    setUpdateDataTrue(false);
  }, [id, updateDataTrue, type]);

  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("AddItem", { id });
  };

  return (
    <Box flex={1} flexDirection="column" bg="white">
      {isLoadingFetch ? (
        <Spinner />
      ) : (
        <>
          <HStack justifyContent="space-between">
            <Box rounded="md">
              <Heading p="4" size="xl">
                {findOneAddressData && findOneAddressData.name}
              </Heading>
            </Box>
            {type === "geral" && (
              <Pressable onPress={handlePress}>
                {({ isPressed }) => (
                  <>
                    <Box rounded="md" p="4" pr="8">
                      <Ionicons
                        name="add-circle"
                        size={36}
                        color={Theme.colors.green}
                      />
                    </Box>
                  </>
                )}
              </Pressable>
            )}
          </HStack>

          {addressData && addressData.length > 0 ? (
            type === "geral" ? (
              <FlatListEnderecoGeral />
            ) : (
              <FlatList
                data={addressData}
                renderItem={({ item }) => {
                  return <FlatListEnderecoCiclico data={item} />;
                }}
                keyExtractor={(address: AddressData) => address.id}
              />
            )
          ) : null}
        </>
      )}
    </Box>
  );
}
