import {
  Avatar,
  Box,
  HStack,
  Heading,
  VStack,
  Divider,
  Text,
  Pressable,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import ptBR from "date-fns/locale/pt-BR";

const user = require("../../assets/user.png");

import { InventoryData } from "../../contexts/types";
import { inventoryContext } from "../../contexts/hooks/Inventory";
import { navigate } from "../../routes/stack/Navigate";

export default function FlatListInventario({ data }: { data: InventoryData }) {
  const { allFirstSecondStatus } = inventoryContext();

  const fusoHorario = "America/Sao_Paulo";

  const handlePress = () => {
    navigate({ name: "Endereco", params: { id: data.id, type: data.type } });
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
            pr={["1", "4"]}
            style={{
              transform: [
                {
                  scale: isPressed ? 0.96 : 1,
                },
              ],
            }}
          >
            <HStack w="100%" padding={3}>
              <Divider
                bg={allFirstSecondStatus === true ? "red.500" : "green.500"}
                thickness="6"
                orientation="vertical"
                rounded="md"
              />
              <Box w="100%" h={130} bg="white" rounded="md" shadow="3">
                <VStack space={1} justifyContent="space-between">
                  <Heading
                    size="xs"
                    fontWeight="300"
                    color="gray.700"
                    mt="2"
                    ml="2"
                  >
                    {allFirstSecondStatus
                      ? "DIVERGÊNCIA"
                      : "INICIAR INVENTÁRIO AGORA"}
                  </Heading>
                  <Text fontSize="sm" bold ml="2">
                    {format(utcToZonedTime(data.date, fusoHorario), "PPP", {
                      locale: ptBR,
                    })}
                  </Text>
                </VStack>
                <Divider
                  my="1"
                  _light={{
                    bg: "gray.100",
                  }}
                />
                <HStack space={3} ml={4} mt={1}>
                  <Avatar bg="green.500" source={user}></Avatar>
                  <VStack space={1} justifyContent="space-between">
                    <Text fontSize="md" bold>
                      {data.name}
                    </Text>
                    <Text fontSize="sm">{data.user.name} - Admin</Text>
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
