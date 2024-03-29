import React from "react";

import HomeAdmin from "../screen/HomeAdmin";
import { MaterialIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import AddCategoryJob from "../screen/AddCategoryJob";
import AddCity from "../screen/AddCity";
import AddTypeOffer from "../screen/AddTypeOffer";
import RgpdUpdate from "../screen/RgpdUpdate";
import ListCandidate from "../screen/ListCandidate";
import ListEmployer from "../screen/ListEmployer";
import CandidatDetails from "../screen/CandidatDetails";
import EmployerDetails from "../screen/EmployerDetails";
import Profil from "../screen/Profil";

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
            <StackNav.Screen
                name="RgpdUpdate"
                component={RgpdUpdate}
                options={{
                    title: "Mention légale",
                }}
            />
            <StackNav.Screen
                name="ListEmployer"
                component={ListEmployer}
                options={{
                    title: "Liste employeur",
                }}
            />
            <StackNav.Screen
                name="ListCandidate"
                component={ListCandidate}
                options={{
                    title: "Liste candidat",
                }}
            />
            <StackNav.Screen
                name="CandidatDetails"
                component={CandidatDetails}
                options={{
                    title: "Profil candidat",
                }}
            />
            <StackNav.Screen
                name="EmployerDetails"
                component={EmployerDetails}
                options={{
                    title: "Profil employeur",
                }}
            />
            <StackNav.Screen
                name="Profil"
                component={Profil}
                options={{
                    title: "Modifier profil",
                }}
            />
        </StackNav.Navigator>
    );
};

export default StackNavScreenAdmin;
