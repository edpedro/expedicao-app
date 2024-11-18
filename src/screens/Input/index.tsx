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
import { debounce } from "lodash";
import { AntDesign } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import { inventoryContext } from "../../contexts/hooks/Inventory";
import Toast from "react-native-toast-message";
import { ItemData, UpdateData } from "../../contexts/types";
import { useLoading } from "../../contexts/hooks/Loading";
import Spinner from "../../components/Spinner";

interface RouteParams {
  dataItem: ItemData;
}

type RootStackParamList = {
  Input: RouteParams;
};

type ItemRouteProp = RouteProp<RootStackParamList, "Input">;

export default function Input({ route }: { route: ItemRouteProp }) {
  const { control, handleSubmit } = useForm();
  const { UpdateItemData } = inventoryContext();

  const { isLoadingFetch } = useLoading();

  const input2RefCodigo = useRef<TextInput>(null);
  const input2RefSaldo = useRef<TextInput>(null);

  const [ativeInput, setAtiveInput] = useState(false);
  const [loading, setLoanding] = useState(false);

  const [saldo, setSaldo] = useState(false);
  const [codigo, setCodigo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [endereco, setEndereco] = useState("");

  const dataItem = route.params.dataItem;

  useEffect(() => {
    if (input2RefCodigo.current && !saldo) {
      input2RefCodigo.current.focus();
    }

    if (input2RefSaldo.current && saldo) {
      input2RefSaldo.current.focus();
    }

    if (dataItem.catItem !== "MOVEL") {
      setAtiveInput(true);
      setCodigo(dataItem.item);
      setDescricao(dataItem.descricao);
      setEndereco(dataItem.endereco);
    }
  }, [ativeInput, dataItem, saldo]);

  const handleInputChange = debounce((value) => {
    setLoanding(true);
    if (value.toUpperCase() === dataItem.item.toUpperCase()) {
      setLoanding(true);
      setAtiveInput(true);

      setDescricao(dataItem.descricao);
      setEndereco(dataItem.endereco);
    } else {
      setDescricao("");
      setEndereco("");
    }
    setLoanding(false);
  }, 500);

  const onSubmit = (value) => {
    if (descricao && endereco && value.saldoFisico) {
      const data: UpdateData = {
        id: Number(dataItem.id),
        saldoFisico: Number(value.saldoFisico),
        status: true,
      };
      const type = "ciclico";
      UpdateItemData(dataItem.baseNameInventario_id, type, data);
    } else {
      Toast.show({
        type: "error",
        text1: "Erro atualizar",
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
            Código
          </FormControl.Label>
          <Controller
            control={control}
            render={({ field: { onBlur, value } }) => (
              <InputNative
                ref={input2RefCodigo}
                bg="gray.200"
                _focus={{
                  bg: "gray.100",
                }}
                onBlur={onBlur}
                onChangeText={handleInputChange}
                value={codigo || value}
              />
            )}
            name="codigo"
          />
        </FormControl>
        {loading ? (
          <Spinner />
        ) : (
          ativeInput && (
            <>
              <FormControl>
                <FormControl.Label
                  _text={{
                    color: "black",
                  }}
                >
                  Descrição
                </FormControl.Label>
                <InputNative
                  bg="gray.200"
                  isReadOnly={true}
                  value={descricao}
                  onChangeText={(descricao) => setDescricao(descricao)}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label
                  _text={{
                    color: "black",
                  }}
                >
                  Endereço
                </FormControl.Label>
                <InputNative
                  bg="gray.200"
                  isReadOnly={true}
                  value={endereco}
                  onChangeText={(endereco) => setEndereco(endereco)}
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
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputNative
                      ref={input2RefSaldo}
                      keyboardType="numeric"
                      bg="gray.200"
                      _focus={{
                        bg: "gray.100",
                      }}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      onLayout={() => setSaldo(true)}
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
                isLoadingText="Atualizado..."
                leftIcon={
                  <Icon
                    as={AntDesign}
                    name="checkcircleo"
                    size="md"
                    color="black"
                  />
                }
              ></Button>
            </>
          )
        )}
      </Box>
    </Center>
  );
}
