import React from "react";

import HomeEmployer from "../screens/HomeEmployer";
import ProfilEmployer from "../screens/ProfilEmployer";
import { MaterialIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";

const StackNav = createStackNavigator();

const StackNavScreenEmployer = ({ navigation }) => {
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
                name="HomeEmployer"
                component={HomeEmployer}
                options={{
                    title: "Accueil",
                }}
            />

            <StackNav.Screen name="ProfilEmployer" component={ProfilEmployer} />
        </StackNav.Navigator>
    );
};

export default StackNavScreenEmployer;
