import React, { createContext, useContext, useState } from "react";

interface LoadingContextData {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
  isLoadingButton: boolean;
  setLoadingButton: (isLoading: boolean) => void;
  isLoadingFetch: boolean;
  setLoadingFetch: (isLoading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextData>(
  {} as LoadingContextData
);

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [isLoadingFetch, setIsLoadingFetch] = useState(false);

  const setLoading = (newIsLoading: boolean) => {
    setIsLoading(newIsLoading);
  };

  const setLoadingButton = (isLoadingButton: boolean) => {
    setIsLoadingButton(isLoadingButton);
  };

  const setLoadingFetch = (isLoadingFetch: boolean) => {
    setIsLoadingFetch(isLoadingFetch);
  };

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        setLoading,
        isLoadingButton,
        setLoadingButton,
        isLoadingFetch,
        setLoadingFetch,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export function useLoading(): LoadingContextData {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
