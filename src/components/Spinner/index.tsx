import { View, Spinner as SpinnerNavite } from "native-base";

export default function Spinner() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
      }}
    >
      <SpinnerNavite color="blue" size="lg" />
    </View>
  );
}
