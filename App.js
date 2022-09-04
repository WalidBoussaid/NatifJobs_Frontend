import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Register from "./screens/Register";
import Login from "./screens/Login";
import RegisterCandidate from "./candidate/screens/RegisterCandidate";
import RegisterEmployer from "./employer/screens/RegisterEmployer";
import DrawerNavCandidate from "./candidate/routes/DrawerNavCandidate";
import DrawerNavEmployer from "./employer/routes/DrawerNavEmployer";

const Stack = createStackNavigator();

export default function App() {
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
            </Stack.Navigator>
        </NavigationContainer>
    );
}
