import { Box, FlatList, Spinner, Heading, Text } from "native-base";
import FlatListAllInventario from "../../components/FlatListAllInventario";
import Header from "../../components/Header";
import { InventoryData } from "../../contexts/types";
import { useEffect, useState } from "react";
import { inventoryContext } from "../../contexts/hooks/Inventory";
import { useLoading } from "../../contexts/hooks/Loading";

export default function Inventario() {
  const { inventoryDataAll, loadListInventoryData } = inventoryContext();

  const { isLoadingFetch } = useLoading();

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const handleLoadList = async () => {
      await loadListInventoryData();
      setRefreshing(false);
    };
    handleLoadList();
  }, [refreshing]);
  return (
    <Box flex={1} h="full" w="100%" flexDirection="column" bg="white">
      <Heading p="4" pb="3" size="xl">
        Inventarios Finalizados
      </Heading>
      {isLoadingFetch ? (
        <Spinner />
      ) : (
        <>
          {inventoryDataAll && inventoryDataAll.length > 0 ? (
            <FlatList
              data={inventoryDataAll}
              renderItem={({ item }) => <FlatListAllInventario data={item} />}
              keyExtractor={(inventory: InventoryData) => inventory.id}
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
              }}
            />
          ) : (
            <FlatList
              data={[1]}
              renderItem={() => (
                <Box alignItems="center" mt="20">
                  <Text>No momento sem inventário</Text>
                </Box>
              )}
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
              }}
            />
          )}
        </>
      )}
    </Box>
  );
}
