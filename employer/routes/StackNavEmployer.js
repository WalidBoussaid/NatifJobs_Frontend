import React from "react";

import HomeEmployer from "../screens/HomeEmployer";
import ProfilEmployer from "../screens/ProfilEmployer";
import { MaterialIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import AddOfferEmployer from "../screens/AddOfferEmployer";

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
                    title: "Mes offres",
                    headerRight: () => (
                        <MaterialIcons
                            name="library-add"
                            size={24}
                            color="black"
                            onPress={() =>
                                navigation.navigate("AddOfferEmployer")
                            }
                        />
                    ),
                }}
            />

            <StackNav.Screen name="ProfilEmployer" component={ProfilEmployer} />
            <StackNav.Screen
                name="AddOfferEmployer"
                component={AddOfferEmployer}
                options={{ title: "Ajouter une offre" }}
            />
        </StackNav.Navigator>
    );
};

export default StackNavScreenEmployer;
