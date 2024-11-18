import {
  Box,
  HStack,
  Heading,
  VStack,
  Text,
  Pressable,
  Divider,
} from "native-base";

import { ItemData } from "../../contexts/types";
import { useNavigation } from "@react-navigation/native";
import { inventoryContext } from "../../contexts/hooks/Inventory";

export default function FlatListItem({ data }: { data: ItemData }) {
  const { allFirstSecondStatus } = inventoryContext();

  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("Input", {
      dataItem: data,
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
              <Box w="95%" h={100} bg="white" rounded="md" shadow="3">
                <VStack
                  space={1}
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  <Heading
                    size="sm"
                    fontWeight="200"
                    color="black"
                    ml="4"
                    mt="3"
                  >
                    Código
                  </Heading>
                </VStack>
                <HStack ml={4}>
                  <VStack justifyContent="space-between">
                    <Text fontSize="2xl" bold>
                      {data.item}
                    </Text>
                    <Text fontSize="xs" color="gray.400">
                      {data.descricao.substring(0, 36)}
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
