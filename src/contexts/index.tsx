import React from "react";

import { LoadingProvider } from "./hooks/Loading";
import { AuthProvider } from "./hooks/Auth";
import { InventoryProvider } from "./hooks/Inventory";

interface AppProviderProps {
  children: React.ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <LoadingProvider>
      <AuthProvider>
        <InventoryProvider>{children}</InventoryProvider>
      </AuthProvider>
    </LoadingProvider>
  );
};

export default AppProvider;
