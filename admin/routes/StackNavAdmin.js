import React from "react";

import HomeAdmin from "../screen/HomeAdmin";
import { MaterialIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import AddCategoryJob from "../screen/AddCategoryJob";
import AddCity from "../screen/AddCity";
import AddTypeOffer from "../screen/AddTypeOffer";

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
            <StackNav.Screen
                name="AddCategoryJob"
                component={AddCategoryJob}
                options={{
                    title: "Categorie Job",
                }}
            />
            <StackNav.Screen
                name="AddCity"
                component={AddCity}
                options={{
                    title: "Ville",
                }}
            />
            <StackNav.Screen
                name="AddTypeOffer"
                component={AddTypeOffer}
                options={{
                    title: "Type d'offre",
                }}
            />
        </StackNav.Navigator>
    );
};

export default StackNavScreenAdmin;
