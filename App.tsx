import { NativeBaseProvider } from "native-base";
import Routes from "./src/routes";
import Toast from "react-native-toast-message";

import AppProvider from "./src/contexts";
import { theme } from "./src/utils/theme";

export default function App() {
  return (
    <AppProvider>
      <NativeBaseProvider theme={theme}>
        <Routes />
        <Toast />
      </NativeBaseProvider>
    </AppProvider>
  );
}
