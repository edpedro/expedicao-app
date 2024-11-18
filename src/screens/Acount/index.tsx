import { Box, Button, Center, Heading, Text } from "native-base";
import { Theme } from "../../themes";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../../contexts/hooks/Auth";

export default function Acount() {
  const { signOut, points } = useAuth();

  return (
    <Box flex={1} w="100%" h="100%" flexDirection="column" bg="white" p="4">
      <Box>
        <Heading pb="3" size="xl">
          Sistema de Pontos
        </Heading>
        <Text>
          Soma Total: <Text bold>{points && points.somaTotal}</Text>
        </Text>
        <Text>
          Total de acertos:{" "}
          <Text bold>{points && points.totalPrimeiraContagem}</Text>
        </Text>
        <Text>
          Total de erros:
          <Text bold>
            {points && points.totalSegundaContagem <= 0
              ? ` ${points && points.totalSegundaContagem}`
              : `-${points && points.totalSegundaContagem}`}
          </Text>
        </Text>
        <Text>
          Total de pontos: <Text bold>{points && points.totalPoints}</Text>
        </Text>
      </Box>
      <Center mt="60">
        <Heading pb="3" size="xl" alignItems="center">
          Sair
        </Heading>
        <Button
          bg="tertiary.200"
          _text={{
            color: "dark.100",
          }}
          _pressed={{
            bg: "tertiary.100",
          }}
          onPress={signOut}
          _loading={{
            color: "black",
            _text: {
              color: "black",
            },
          }}
          isLoadingText="Carregando..."
        >
          <MaterialIcons
            name="exit-to-app"
            size={100}
            color={Theme.colors.green}
          />
        </Button>
      </Center>
    </Box>
  );
}
