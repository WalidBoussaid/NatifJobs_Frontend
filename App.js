import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Register from "./screens/Register";
import Login from "./screens/Login";
import RegisterCandidate from "./candidate/screens/RegisterCandidate";
import RegisterEmployer from "./employer/screens/RegisterEmployer";
import DrawerNavCandidate from "./candidate/routes/DrawerNavCandidate";
import DrawerNavEmployer from "./employer/routes/DrawerNavEmployer";
import { LogBox } from "react-native";
import DrawerNavAdmin from "./admin/routes/DrawerNavAdmin";
import Rgpd from "./screens/Rgpd";
import ForgotPwd from "./screens/ForgotPwd";

const Stack = createStackNavigator();

export default function App() {
    LogBox.ignoreLogs(["EventEmitter.removeListener"]);
    LogBox.ignoreLogs(["source.uri should not be an empty string"]);
    LogBox.ignoreLogs([
        "Warning: AsyncStorage has been extracted from react-native core and will be removed in a future release.",
    ]);
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="Login" component={Login} />

                <Stack.Screen name="Register" component={Register} />

                <Stack.Screen
                    name="RegisterCandidate"
                    component={RegisterCandidate}
                />

                <Stack.Screen
                    name="RegisterEmployer"
                    component={RegisterEmployer}
                />
                <Stack.Screen
                    name="HomeCandidate"
                    component={DrawerNavCandidate}
                />
                <Stack.Screen
                    name="HomeEmployer"
                    component={DrawerNavEmployer}
                />
                <Stack.Screen
                    name="Rgpd"
                    component={Rgpd}
                    options={{ title: "Mention légale" }}
                />
                <Stack.Screen
                    name="ForgotPwd"
                    component={ForgotPwd}
                    options={{ title: "Mot de passe oublié" }}
                />
                <Stack.Screen name="HomeAdmin" component={DrawerNavAdmin} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
