import { useEffect, useState, useRef } from "react";
import { TextInput } from "react-native";
import {
  Center,
  Box,
  FormControl,
  Button,
  Input as InputNative,
  Icon,
} from "native-base";
import { useForm, Controller } from "react-hook-form";
import { AntDesign } from "@expo/vector-icons";
import { inventoryContext } from "../../contexts/hooks/Inventory";
import Toast from "react-native-toast-message";
import { AddItemData } from "../../contexts/types";
import { useLoading } from "../../contexts/hooks/Loading";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type StackParamList = {
  AddItem: {
    id: string;
  };
};

type EnderecoScreenRouteProp = RouteProp<StackParamList, "AddItem">;

type EnderecoScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  "AddItem"
>;

type Props = {
  route: EnderecoScreenRouteProp;
  navigation: EnderecoScreenNavigationProp;
};

export default function AddItem({ route }: Props) {
  const { control, handleSubmit } = useForm();
  const { ListAllAdresses, adressesData, StoreItemInventario } =
    inventoryContext();

  const { isLoadingFetch } = useLoading();

  const [codigo, setCodigo] = useState("");
  const [saldo, setSaldo] = useState("");
  const [endereco, setEndereco] = useState("");

  const inputAdress = useRef<TextInput>(null);

  const { id } = route.params;

  useEffect(() => {
    ListAllAdresses();
    if (inputAdress.current) {
      inputAdress.current.focus();
    }
    if (!isLoadingFetch) {
      setCodigo("");
      setEndereco("");
      setSaldo("");
    }
  }, [isLoadingFetch]);

  const onSubmit = () => {
    if (codigo && endereco && saldo) {
      const resultAdresses = adressesData.find(
        (adress) => adress.codeAdress === parseInt(endereco)
      );

      if (resultAdresses) {
        const data: AddItemData = {
          endereco: resultAdresses.codeAdress,
          item: codigo,
          firstCount: Number(saldo),
        };
        StoreItemInventario(id, data);

        if (inputAdress.current) {
          inputAdress.current.focus();
        }
      } else {
        Toast.show({
          type: "error",
          text1: "Erro no Endereço",
          text2: "Endereço não encontrado",
        });
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Erro ao cadastrar",
        text2: "Favor preencher dados corretos!",
      });
    }
  };

  return (
    <Center w="100%" bgColor="white" mt="-40">
      <Box alignItems="center" justifyContent="center" p="4" w="100%" h="100%">
        <FormControl>
          <FormControl.Label
            _text={{
              color: "black",
            }}
          >
            Endereço
          </FormControl.Label>
          <Controller
            control={control}
            render={({ field: { onBlur } }) => (
              <InputNative
                ref={inputAdress}
                bg="gray.200"
                _focus={{
                  bg: "gray.100",
                }}
                onBlur={onBlur}
                onChangeText={(endereco) => setEndereco(endereco)}
                value={endereco}
              />
            )}
            name="endereco"
          />
        </FormControl>
        <FormControl>
          <FormControl.Label
            _text={{
              color: "black",
            }}
          >
            Codigo
          </FormControl.Label>
          <Controller
            control={control}
            render={({ field: { onBlur, value } }) => (
              <InputNative
                bg="gray.200"
                _focus={{
                  bg: "gray.100",
                }}
                onBlur={onBlur}
                onChangeText={(codigo) => setCodigo(codigo)}
                value={codigo}
              />
            )}
            name="codigo"
          />
        </FormControl>
        <FormControl>
          <FormControl.Label
            _text={{
              color: "black",
            }}
          >
            Saldo
          </FormControl.Label>
          <Controller
            control={control}
            render={({ field: { onBlur, value } }) => (
              <InputNative
                keyboardType="numeric"
                bg="gray.200"
                _focus={{
                  bg: "gray.100",
                }}
                onBlur={onBlur}
                onChangeText={(saldo) => setSaldo(saldo)}
                value={saldo}
              />
            )}
            name="saldoFisico"
          />
        </FormControl>
        <Button
          mt="6"
          h="12"
          bg="tertiary.200"
          w="100%"
          _text={{
            color: "black",
          }}
          _pressed={{
            bg: "tertiary.100",
          }}
          onPress={handleSubmit(onSubmit)}
          isLoading={isLoadingFetch}
          _loading={{
            _text: {
              color: "black",
            },
          }}
          _spinner={{
            color: "black",
          }}
          isLoadingText="Salvando..."
          leftIcon={
            <Icon as={AntDesign} name="checkcircleo" size="md" color="black" />
          }
        ></Button>
      </Box>
    </Center>
  );
}
