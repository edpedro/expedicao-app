import { useEffect, useState } from "react";
import { Box, FlatList, Spinner, Heading, Text } from "native-base";
import Header from "../../components/Header";
import FlatListInventario from "../../components/FlatListInventario";
import { inventoryContext } from "../../contexts/hooks/Inventory";
import { useLoading } from "../../contexts/hooks/Loading";

export default function Home() {
  const { inventoryData, loadListInventoryData, updateDataTrue } =
    inventoryContext();

  const { isLoadingFetch } = useLoading();

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const handleLoadList = async () => {
      await loadListInventoryData();
      setRefreshing(false);
    };
    if (refreshing) {
      handleLoadList();
    }
  }, [refreshing, updateDataTrue]);

  return (
    <Box flex={1} h="full" w="100%" flexDirection="column" bg="white">
      <Heading p="4" pb="3" size="xl">
        Inventarios
      </Heading>
      {isLoadingFetch ? (
        <Spinner />
      ) : (
        <>
          {inventoryData && inventoryData.length > 0 ? (
            <FlatList
              data={inventoryData}
              renderItem={({ item }) => <FlatListInventario data={item} />}
              keyExtractor={(item) => item.id}
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
