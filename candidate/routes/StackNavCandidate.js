import React from "react";

import HomeCandidate from "../screens/HomeCandidate";
import ProfilCandidate from "../screens/ProfilCandidate";
import MessageCandidate from "../screens/MessageCandidate";
import { MaterialIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import OfferDetails from "../screens/OfferDetails";
import HistoryCandidate from "../screens/HistoryCandidate";
import NotifCandidate from "../screens/NotifCandidate";
import MsgDetailsCandidate from "../screens/MsgDetailsCandidate";
import RdvCandidate from "../screens/RdvCandidate";
import Rgpd from "../../screens/Rgpd";

const StackNav = createStackNavigator();

const StackNavScreenCandidate = ({ navigation }) => {
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
                name="HomeCandidate"
                component={HomeCandidate}
                options={{
                    title: "Annonce",
                }}
            />

            <StackNav.Screen
                name="ProfilCandidate"
                component={ProfilCandidate}
                options={{
                    title: "Modifier Profil",
                }}
            />
            <StackNav.Screen
                name="MessageCandidate"
                component={MessageCandidate}
                options={{
                    title: "Conversation",
                }}
            />
            <StackNav.Screen
                name="OfferDetails"
                component={OfferDetails}
                options={{
                    title: "Détail de l'offre",
                }}
            />
            <StackNav.Screen
                name="HistoryCandidate"
                component={HistoryCandidate}
                options={{
                    title: "Historique",
                }}
            />
            <StackNav.Screen
                name="NotifCandidate"
                component={NotifCandidate}
                options={{
                    title: "Notification",
                }}
            />
            <StackNav.Screen
                name="MsgDetailsCandidate"
                component={MsgDetailsCandidate}
                options={{
                    title: "Message",
                }}
            />
            <StackNav.Screen
                name="RdvCandidate"
                component={RdvCandidate}
                options={{
                    title: "Mes rdv",
                }}
            />
        </StackNav.Navigator>
    );
};

export default StackNavScreenCandidate;
