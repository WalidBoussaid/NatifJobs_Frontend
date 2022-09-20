import React from "react";

import HomeAdmin from "../screen/HomeAdmin";
import { MaterialIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";

const StackNav = createStackNavigator();

const StackNavScreenAdmin = ({ navigation }) => {
    return (
        <StackNav.Navigator
            screenOptions={{
                headerLeft: () => (
                    <MaterialIcons
                        name="menu"
                        size={24}
                        color="black"
                        onPress={() => navigation.openDrawer()}
                    />
                ),
            }}
        >
            <StackNav.Screen
                name="HomeAdmin"
                component={HomeAdmin}
                options={{
                    title: "Utilisateur",
                }}
            />
        </StackNav.Navigator>
    );
};

export default StackNavScreenAdmin;
