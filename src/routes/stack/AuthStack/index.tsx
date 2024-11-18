import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../../../screens/Login";

const { Navigator, Screen } = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Navigator initialRouteName="Login">
      <Screen options={{ headerShown: false }} name="Login" component={Login} />
    </Navigator>
  );
}
