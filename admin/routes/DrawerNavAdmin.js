import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialIcons } from "@expo/vector-icons";
import StackNavScreenAdmin from "./StackNavAdmin";
import CustomDrawerAdmin from "../components/CustomDrawerAdmin";

const Drawer = createDrawerNavigator();

const DrawerNavAdmin = () => {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerAdmin {...props} />}
        >
            <Drawer.Screen
                name="HomeCandidate"
                component={StackNavScreenAdmin}
                options={{
                    title: "Acceuil",
                    drawerIcon: () => (
                        <MaterialIcons name="home" size={24} color="black" />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
};

export default DrawerNavAdmin;
