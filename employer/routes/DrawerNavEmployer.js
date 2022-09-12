import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialIcons } from "@expo/vector-icons";
import CustomDrawerEmployer from "../components/CustomDrawerEmployer";
import StackNavScreenEmployer from "./StackNavEmployer";

const Drawer = createDrawerNavigator();

const DrawerNavEmployer = () => {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerEmployer {...props} />}
        >
            <Drawer.Screen
                name="HomeEmployer"
                component={StackNavScreenEmployer}
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

export default DrawerNavEmployer;
