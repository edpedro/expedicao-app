import {
  Box,
  HStack,
  Heading,
  VStack,
  Divider,
  Text,
  Pressable,
} from "native-base";

import { AddressData } from "../../contexts/types";
import { useNavigation } from "@react-navigation/native";
import { inventoryContext } from "../../contexts/hooks/Inventory";

export default function FlatListEnderecoCiclico({
  data,
}: {
  data: AddressData;
}) {
  const navigation = useNavigation();

  const { allFirstSecondStatus } = inventoryContext();

  const handlePress = () => {
    navigation.navigate("Item", {
      endereco: data.endereco,
      id: data.baseNameInventario_id,
    });
  };

  return (
    <Pressable onPress={handlePress}>
      {({ isPressed }) => (
        <>
          <Box
            _dark={{
              borderColor: "muted.50",
            }}
            borderColor="muted.800"
            pl={["0", "4"]}
            pr={["0", "5"]}
            style={{
              transform: [
                {
                  scale: isPressed ? 0.96 : 1,
                },
              ],
            }}
          >
            <HStack w="100%" padding={4}>
              <Divider
                bg={allFirstSecondStatus === true ? "red.500" : "green.500"}
                thickness="6"
                h="90"
                orientation="vertical"
                rounded="md"
              />
              <Box w="95%" h={90} bg="white" rounded="md" shadow="3">
                <VStack
                  space={1}
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  <Heading
                    size="md"
                    fontWeight="300"
                    color="gray.500"
                    ml="4"
                    mt="2"
                    bold
                  >
                    ENDEREÇO
                  </Heading>
                  <Heading
                    size="xs"
                    fontWeight="300"
                    color="gray.700"
                    mt="3"
                    mr="5"
                  >
                    SKU{" "}
                    <Heading
                      size="xs"
                      fontWeight="300"
                      color="gray.700"
                      mt="3"
                      mr="5"
                      bold
                    >
                      {data.item}
                    </Heading>
                  </Heading>
                </VStack>
                <Divider
                  _light={{
                    bg: "gray.100",
                  }}
                />
                <HStack ml={4}>
                  <VStack justifyContent="space-between">
                    <Text fontSize="3xl" bold>
                      {data.endereco}
                    </Text>
                  </VStack>
                </HStack>
              </Box>
            </HStack>
          </Box>
        </>
      )}
    </Pressable>
  );
}
