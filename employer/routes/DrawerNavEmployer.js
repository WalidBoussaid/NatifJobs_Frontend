import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTabNavEmployer from "./BottomTabNavEmployer";
import { MaterialIcons } from "@expo/vector-icons";
import CustomDrawerEmployer from "../components/CustomDrawerEmployer";

const Drawer = createDrawerNavigator();

const DrawerNavEmployer = () => {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerEmployer {...props} />}
        >
            <Drawer.Screen
                name="HomeEmployer"
                component={BottomTabNavEmployer}
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
