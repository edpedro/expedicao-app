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
import { inventoryContext } from "../../contexts/hooks/Inventory";
import Toast from "react-native-toast-message";
import { ItemData, UpdateData } from "../../contexts/types";
import { useLoading } from "../../contexts/hooks/Loading";
import Spinner from "../../components/Spinner";

export default function FlatListEnderecoGeral() {
  const { control, handleSubmit } = useForm();
  const { ciclicoData, UpdateItemData } = inventoryContext();

  const { isLoadingFetch } = useLoading();

  const [ativeInputCodigo, setAtiveInputCodigo] = useState(false);
  const [ativeInputs, setAtiveInputs] = useState(false);
  const [loadingAddress, setLoandingAddress] = useState(false);
  const [loadingItem, setLoandingItem] = useState(false);
  const [dataItem, setDataItem] = useState<ItemData[]>([]);
  const [updateItem, setUpdateItem] = useState<ItemData>();

  const [codigo, setCodigo] = useState(false);
  const [saldo, setSaldo] = useState(false);
  const [descricao, setDescricao] = useState("");

  const inputAdress = useRef<TextInput>(null);
  const inputItem = useRef<TextInput>(null);
  const inputSaldo = useRef<TextInput>(null);

  useEffect(() => {
    if (inputAdress.current && !codigo && !saldo) {
      inputAdress.current.focus();
    }
    if (codigo && inputItem.current && !saldo) {
      inputItem.current.focus();
    }
    if (saldo && inputSaldo.current) {
      inputSaldo.current.focus();
    }
  }, [ciclicoData, codigo, saldo]);

  const handleInputAdressChange = debounce((address: string) => {
    setLoandingAddress(true);

    const resultEnd = ciclicoData
      ? ciclicoData.filter(
          (end) =>
            end.endereco.toUpperCase() === address.toUpperCase() ||
            end.codeEnd === parseInt(address)
        )
      : [];

    if (resultEnd.length > 0) {
      setAtiveInputCodigo(true);
      setDataItem(resultEnd);
    } else {
      setAtiveInputCodigo(false);
      setDataItem([]);
      setCodigo(false);
    }

    setLoandingAddress(false);
  }, 500);

  const handleInputChange = debounce((item: string) => {
    setLoandingItem(true);
    const resultItem = dataItem.filter(
      (inv) => inv.item.toUpperCase() === item.toUpperCase()
    );
    if (resultItem.length > 0) {
      setAtiveInputs(true);
      setDescricao(resultItem[0].descricao);
      setUpdateItem(resultItem[0]);
    } else {
      setAtiveInputs(false);
      setDescricao("");
      setSaldo(false);
    }
    setLoandingItem(false);
  }, 500);

  const onSubmit = (value) => {
    if (value.saldoFisico) {
      const data: UpdateData = {
        id: Number(updateItem.id),
        saldoFisico: Number(value.saldoFisico),
        status: true,
      };
      const type = "geral";

      UpdateItemData(updateItem.baseNameInventario_id, type, data);
    } else {
      Toast.show({
        type: "error",
        text1: "Erro atualizar",
        text2: "Favor preencher dados corretos!",
      });
    }
  };

  return (
    <Box alignItems="center" justifyContent="center" p="4" w="100%">
      <Center w="100%" bgColor="white">
        {isLoadingFetch ? (
          <Spinner />
        ) : (
          <>
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
                render={({ field: { onBlur, value } }) => (
                  <InputNative
                    ref={inputAdress}
                    bg="gray.200"
                    _focus={{
                      bg: "gray.100",
                    }}
                    onBlur={onBlur}
                    onChangeText={handleInputAdressChange}
                    value={value}
                  />
                )}
                name="endereco"
              />
            </FormControl>
            {loadingAddress ? (
              <Spinner />
            ) : (
              <>
                {ativeInputCodigo && (
                  <>
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
                            ref={inputItem}
                            bg="gray.200"
                            _focus={{
                              bg: "gray.100",
                            }}
                            onBlur={onBlur}
                            onChangeText={handleInputChange}
                            value={value}
                            onLayout={() => setCodigo(true)}
                          />
                        )}
                        name="codigo"
                      />
                    </FormControl>
                  </>
                )}
              </>
            )}
            {loadingItem ? (
              <Spinner />
            ) : (
              <>
                {ativeInputs && (
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
                        Saldo
                      </FormControl.Label>
                      <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <InputNative
                            ref={inputSaldo}
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
                )}
              </>
            )}
          </>
        )}
      </Center>
    </Box>
  );
}
