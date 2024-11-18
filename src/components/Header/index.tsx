import { Box, HStack, Avatar, Text, Heading, Spinner } from "native-base";
import { useAuth } from "../../contexts/hooks/Auth";

const user = require("../../assets/profile.png");

export default function Header() {
  const { authData, points } = useAuth();

  return (
    <Box bgColor="white">
      <HStack
        padding={4}
        w="100%"
        alignItems="center"
        justifyContent="space-between"
        safeArea
      >
        <Box flexDirection="row" alignItems="flex-end">
          <Avatar bg="green.500" source={user}></Avatar>

          <Text fontFamily="Roboto" fontSize={16} ml={2}>
            {authData.name}
          </Text>
        </Box>
        <Box flexDirection="column" alignItems="center" mr={4}>
          <Heading size="sm">Pontos</Heading>
          {points ? (
            <Text>{points && points.totalPoints}</Text>
          ) : (
            <Spinner color="blue" accessibilityLabel="Loading posts" />
          )}
        </Box>
      </HStack>
    </Box>
  );
}
