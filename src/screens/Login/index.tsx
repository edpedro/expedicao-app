import { useState } from "react";
import {
  Center,
  Box,
  Heading,
  VStack,
  FormControl,
  Button,
  Input,
  HStack,
} from "native-base";
import Toast from "react-native-toast-message";
import { useLoading } from "../../contexts/hooks/Loading";
import { useAuth } from "../../contexts/hooks/Auth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { isLoadingButton } = useLoading();
  const { signIn } = useAuth();

  function handleSubmit() {
    if (username && password) {
      signIn(username.trim(), password);
    } else {
      Toast.show({
        type: "error",
        text1: "Acesso",
        text2: "Favor preencher todos dados",
      });
    }
  }
  return (
    <Center w="100%" h="full" bgColor="green.500">
      <Box safeArea p="2" py="8" w="100%" maxW="350">
        <HStack
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
        >
          <Heading
            size="lg"
            fontWeight="600"
            color="dark.900"
            mb="5"
            _dark={{
              color: "warmGray.50",
            }}
          >
            Bem-vindo
          </Heading>
          <Heading
            mt="1"
            _dark={{
              color: "warmGray.200",
            }}
            color="dark.900"
            fontWeight="medium"
            size="xl"
          >
            Login
          </Heading>
        </HStack>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label
              _text={{
                color: "dark.900",
              }}
            >
              Usuario
            </FormControl.Label>
            <Input
              bg="white"
              _focus={{
                bg: "white",
              }}
              value={username}
              onChangeText={setUsername}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label
              _text={{
                color: "dark.900",
              }}
            >
              Senha
            </FormControl.Label>
            <Input
              type="password"
              bg="white"
              _focus={{
                bg: "white",
              }}
              value={password}
              onChangeText={setPassword}
            />
          </FormControl>
          <Button
            mt="10"
            h="12"
            bg="tertiary.200"
            _text={{
              color: "dark.100",
            }}
            _pressed={{
              bg: "tertiary.100",
            }}
            onPress={handleSubmit}
            isLoading={isLoadingButton}
            _loading={{
              color: "black",
              _text: {
                color: "black",
              },
            }}
            isLoadingText="Carregando..."
          >
            Acessar
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}
