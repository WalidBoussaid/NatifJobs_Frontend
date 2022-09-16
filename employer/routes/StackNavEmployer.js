import React from "react";

import HomeEmployer from "../screens/HomeEmployer";
import ProfilEmployer from "../screens/ProfilEmployer";
import MessageEmployeur from "../screens/MessageEmployer";
import { MaterialIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import AddOfferEmployer from "../screens/AddOfferEmployer";
import OfferDetails from "../screens/OfferDetails";
import NotifEmployer from "../screens/NotifEmployer";
import DetailsCandidate from "../screens/DetailsCandidate";
import MsgDetailsEmployer from "../screens/MsgDetailsEmployer";
import Rdv from "../screens/Rdv";
import AddRdv from "../screens/AddRdv";

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

            <StackNav.Screen
                name="ProfilEmployer"
                component={ProfilEmployer}
                options={{
                    title: "Modifier Profil",
                }}
            />
            <StackNav.Screen
                name="AddOfferEmployer"
                component={AddOfferEmployer}
                options={{ title: "Ajouter une offre" }}
            />
            <StackNav.Screen
                name="OfferDetails"
                component={OfferDetails}
                options={{ title: "Detail de l'offre" }}
            />
            <StackNav.Screen
                name="MessageEmployer"
                component={MessageEmployeur}
                options={{ title: "Message" }}
            />
            <StackNav.Screen
                name="NotifEmployer"
                component={NotifEmployer}
                options={{ title: "Notification" }}
            />
            <StackNav.Screen
                name="DetailsCandidate"
                component={DetailsCandidate}
                options={{ title: "Profil du candidat" }}
            />
            <StackNav.Screen
                name="MsgDetailsEmployer"
                component={MsgDetailsEmployer}
                options={{ title: "Message" }}
            />
            <StackNav.Screen
                name="Rdv"
                component={Rdv}
                options={{
                    title: "Rendez-vous",
                    headerRight: () => (
                        <MaterialIcons
                            name="library-add"
                            size={24}
                            color="black"
                            onPress={() => navigation.navigate("AddRdv")}
                        />
                    ),
                }}
            />
            <StackNav.Screen
                name="AddRdv"
                component={AddRdv}
                options={{ title: "Créer un Rendez-vous" }}
            />
        </StackNav.Navigator>
    );
};

export default StackNavScreenEmployer;
