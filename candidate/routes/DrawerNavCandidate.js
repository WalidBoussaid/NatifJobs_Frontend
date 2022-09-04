import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTabNavCandidate from "./BottomTabNavCandidate";
import { MaterialIcons } from "@expo/vector-icons";
import HomeCandidate from "../screens/HomeCandidate";
import CustomDrawerCandidate from "../components/CustomDrawerCandidate";

const Drawer = createDrawerNavigator();

const DrawerNavCandidate = () => {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerCandidate {...props} />}
        >
            <Drawer.Screen
                name="HomeCandidate"
                component={BottomTabNavCandidate}
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
