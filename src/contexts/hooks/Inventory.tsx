import { createContext, useContext, useEffect, useState } from "react";
import api from "../../services/api";
import { useAuth } from "./Auth";
import {
  AddItemData,
  AddressData,
  InventoryData,
  ItemData,
  UIadress,
  UpdateData,
} from "../types";
import Toast from "react-native-toast-message";
import { navigate } from "../../routes/stack/Navigate";
import { useLoading } from "./Loading";

interface InventoryContextData {
  inventoryData?: InventoryData[];
  inventoryDataAll?: InventoryData[];
  findOneAddressData?: InventoryData;
  addressData?: AddressData[];
  enderecoItemData?: ItemData[];
  itemData?: ItemData;
  updateDataTrue: boolean;
  allFirstSecondStatus: boolean;
  ciclicoData?: ItemData[];
  adressesData?: UIadress[];
  loadListInventoryData: () => Promise<void>;
  ListAddressInventoryData: (id: string) => Promise<void>;
  ListOneAddressData: (id: string) => Promise<void>;
  ListItemEnderecoData: (id: string, endereco: string) => Promise<void>;
  ListItemData: (idItem: string, idName: string) => Promise<void>;
  UpdateItemData: (id: string, type: string, data: UpdateData) => Promise<void>;
  setUpdateDataTrue: (value: boolean) => void;
  ListCiclicoInventoryData: (id: string) => Promise<void>;
  ListAllAdresses: () => Promise<void>;
  StoreItemInventario: (id: string, dataItem: AddItemData) => Promise<void>;
}

const InventoryContext = createContext<InventoryContextData>(
  {} as InventoryContextData
);

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { token, loadPoints } = useAuth();
  const [inventoryData, setInventoryData] = useState<InventoryData[]>();
  const [inventoryDataAll, setInventoryDataAll] = useState<InventoryData[]>();
  const [addressData, setAddressData] = useState<AddressData[]>();
  const [findOneAddressData, setFindOneAddressData] = useState<InventoryData>();
  const [enderecoItemData, setEnderecoItemData] = useState<ItemData[]>();
  const [itemData, setItemData] = useState<ItemData>();
  const [updateDataTrue, setUpdateDataTrue] = useState(false);
  const [allFirstSecondStatus, setAllFirstSecondStatus] = useState(true);
  const [countSecond, setCountSecond] = useState(false);
  const [ciclicoData, setCiclicoData] = useState<ItemData[]>();
  const [adressesData, setAdressesData] = useState<UIadress[]>();

  const { setLoadingFetch } = useLoading();

  useEffect(() => {
    if (token) {
      loadListInventoryData();
      loadPoints();
    }
  }, [token]);

  async function loadListInventoryData(): Promise<void> {
    setLoadingFetch(true);
    if (token) {
      const { data } = await api.get("/nameinv", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.length > 0) {
        const allTrueFirst = data.every((obj) => obj.firstStatus === true);

        if (!allTrueFirst) {
          const newData = data.filter(
            (inventory: InventoryData) => inventory.firstStatus === false
          );
          setAllFirstSecondStatus(false);
          setCountSecond(false);
          setInventoryData(newData);
        } else {
          const newData = data.filter(
            (inventory: InventoryData) => inventory.secondStatus === false
          );
          if (newData.length > 0) {
            setAllFirstSecondStatus(true);
            setCountSecond(true);
            setInventoryData(newData);
          } else {
            setCountSecond(false);
            setInventoryData(null);
          }
        }
      }
      const newData = data.filter(
        (inventory: InventoryData) =>
          inventory.firstStatus === true && inventory.secondStatus === true
      );
      setInventoryDataAll(newData);
    }

    setLoadingFetch(false);
  }

  async function ListAddressInventoryData(id: string): Promise<void> {
    try {
      setLoadingFetch(true);
      const { data } = await api.get(`/ciclico/endereco/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.length > 0) {
        if (!countSecond) {
          const allTrueFirst = data.every(
            (obj: AddressData) => obj.firstStatus === true
          );
          if (!allTrueFirst) {
            const newData = data.filter(
              (address: AddressData) => address.firstStatus === false
            );
            setAddressData(newData);
          } else {
            navigate({
              name: "Inicio",
            });
            await loadListInventoryData();
          }
        } else {
          const newDataSecond = data.filter(
            (address: AddressData) => address.secondStatus === false
          );

          if (newDataSecond.length > 0) {
            setAddressData(newDataSecond);
          } else {
            navigate({
              name: "Inicio",
            });
            await loadListInventoryData();
          }
        }
      }

      setLoadingFetch(false);
    } catch (error) {
      setLoadingFetch(false);
      setAddressData(null);
      console.log(error);
    }
  }

  async function ListOneAddressData(id: string): Promise<void> {
    try {
      setLoadingFetch(true);
      const { data } = await api.get(`/nameinv/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFindOneAddressData(data);
      setLoadingFetch(false);
    } catch (error) {
      setLoadingFetch(false);
      setFindOneAddressData(null);
      console.log(error);
    }
  }

  async function ListItemEnderecoData(id: string, end: string): Promise<void> {
    const endereco = { endereco: end };

    try {
      setLoadingFetch(true);
      const { data } = await api.post<ItemData[]>(
        `/ciclico/endereco/${id}`,
        endereco,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.length > 0) {
        if (!countSecond) {
          const allTrueFirst = data.every(
            (obj: ItemData) => obj.firstStatus === true
          );

          if (!allTrueFirst) {
            const newData = data.filter(
              (item: ItemData) => item.firstStatus === false
            );

            setEnderecoItemData(newData);
          } else {
            navigate({
              name: "Endereco",
              params: {
                id: id,
              },
            });
            await ListAddressInventoryData(id);
          }
        } else {
          const newData = data.filter(
            (item: ItemData) => item.secondStatus === false
          );
          if (newData.length > 0) {
            setEnderecoItemData(newData);
          } else {
            navigate({
              name: "Endereco",
              params: {
                id: id,
              },
            });
            await ListAddressInventoryData(id);
          }
        }
      }

      setLoadingFetch(false);
    } catch (error) {
      setLoadingFetch(false);
      setEnderecoItemData(null);
      console.log(error.messagem);
    }
  }

  async function ListItemData(idItem: string, idName: string): Promise<void> {
    const newData = { id: idItem };

    try {
      setLoadingFetch(true);
      const { data } = await api.post(`/ciclico/item/${idName}`, newData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoadingFetch(false);
      setItemData(data);
    } catch (error) {
      setLoadingFetch(false);
      setItemData(null);
      console.log(error.messagem);
    }
  }

  async function UpdateItemData(
    id: string,
    type: string,
    dataItem: UpdateData
  ): Promise<void> {
    try {
      setLoadingFetch(true);
      const { data } = await api.patch<ItemData>(`/ciclico/${id}`, dataItem, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (type === "geral") {
        navigate({
          name: "Endereco",
          params: {
            id: data.baseNameInventario_id,
            type: type,
          },
        });
      } else {
        navigate({
          name: "Item",
          params: {
            endereco: data.endereco,
            id: data.baseNameInventario_id,
          },
        });

        await ListItemEnderecoData(data.baseNameInventario_id, data.endereco);
      }

      setUpdateDataTrue(true);

      loadPoints();

      Toast.show({
        type: "success",
        text1: "Status",
        text2: "Atualizado com sucesso",
      });
      setLoadingFetch(false);
    } catch (error) {
      setLoadingFetch(false);
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Dados invalido!",
      });

      console.log(error);
    }
  }

  async function ListCiclicoInventoryData(id: string): Promise<void> {
    try {
      setLoadingFetch(true);
      const { data } = await api.get(`/ciclico/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.length > 0) {
        if (!countSecond) {
          const allTrueFirst = data.every(
            (obj: AddressData) => obj.firstStatus === true
          );
          if (!allTrueFirst) {
            const newData = data.filter(
              (address: AddressData) => address.firstStatus === false
            );
            setCiclicoData(newData);
          } else {
            navigate({
              name: "Inicio",
            });
            await loadListInventoryData();
          }
        } else {
          const newDataSecond = data.filter(
            (address: AddressData) => address.secondStatus === false
          );

          if (newDataSecond.length > 0) {
            setCiclicoData(newDataSecond);
          } else {
            navigate({
              name: "Inicio",
            });
            await loadListInventoryData();
          }
        }
      }

      setLoadingFetch(false);
    } catch (error) {
      setLoadingFetch(false);
      setAddressData(null);
      console.log(error);
    }
  }
  async function ListAllAdresses(): Promise<void> {
    const { data } = await api.get(`/adresses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setAdressesData(data);
  }

  async function StoreItemInventario(
    id: string,
    dataItem: AddItemData
  ): Promise<void> {
    try {
      setLoadingFetch(true);
      await api.post(`/ciclico/store/${id}`, dataItem, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Toast.show({
        type: "success",
        text1: "Status",
        text2: "Adicionando com sucesso",
      });
      setLoadingFetch(false);
    } catch (error) {
      setLoadingFetch(false);
      console.log(error);
    }
  }
  return (
    <InventoryContext.Provider
      value={{
        inventoryData,
        inventoryDataAll,
        loadListInventoryData,
        addressData,
        ListAddressInventoryData,
        ListOneAddressData,
        findOneAddressData,
        enderecoItemData,
        ListItemEnderecoData,
        itemData,
        ListItemData,
        UpdateItemData,
        updateDataTrue,
        allFirstSecondStatus,
        setUpdateDataTrue,
        ciclicoData,
        ListCiclicoInventoryData,
        ListAllAdresses,
        adressesData,
        StoreItemInventario,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export function inventoryContext(): InventoryContextData {
  const context = useContext(InventoryContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
