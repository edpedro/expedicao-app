import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./stack/AppStack";
import AuthStack from "./stack/AuthStack";
import { navigationRef } from "./stack/Navigate";
import { useAuth } from "../contexts/hooks/Auth";
import { useLoading } from "../contexts/hooks/Loading";
import Spinner from "../components/Spinner";
import Header from "../components/Header";

export default function Routes() {
  const { authData } = useAuth();
  const { isLoading } = useLoading();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      {authData ? (
        <>
          <Header />
          <AppStack />
        </>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}
