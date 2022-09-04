import React from "react";
import { StyleSheet, Text, View } from "react-native";
import StackNavScreenEmployer from "./StackNavEmployer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import MessageEmployer from "../screens/MessageEmployer";

const Tab = createBottomTabNavigator();

const BottomTabNavEmployer = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === "HomeEmployer") {
                        iconName = "home";
                        size = focused ? 35 : 20;
                    } else if (route.name === "MessageEmployer") {
                        iconName = "chat";
                        size = focused ? 35 : 20;
                    }
                    return (
                        <MaterialIcons
                            name={iconName}
                            size={size}
                            color={color}
                        />
                    );
                },
            })}
            tabBarOptions={{
                activeTintColor: "rebeccapurple",
                inactiveTintColor: "grey",
                activeBackgroundColor: "#ccc",
                showLabel: false,
            }}
        >
            <Tab.Screen
                name="HomeEmployer"
                component={StackNavScreenEmployer}
                options={{
                    title: "Acceuil",
                }}
            />
            <Tab.Screen
                name="MessageEmployer"
                component={MessageEmployer}
                options={{ title: "Message" }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({});

export default BottomTabNavEmployer;
