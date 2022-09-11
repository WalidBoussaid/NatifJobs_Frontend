import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialIcons } from "@expo/vector-icons";
import CustomDrawerCandidate from "../components/CustomDrawerCandidate";
import StackNavScreenCandidate from "./StackNavCandidate";

const Drawer = createDrawerNavigator();

const DrawerNavCandidate = () => {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerCandidate {...props} />}
        >
            <Drawer.Screen
                name="HomeCandidate"
                component={StackNavScreenCandidate}
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

export default DrawerNavCandidate;
