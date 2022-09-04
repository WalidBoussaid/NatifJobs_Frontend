import React from "react";
import { StyleSheet, Text, View } from "react-native";
import StackNavScreenCandidate from "./StackNavCandidate";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import MessageCandidate from "../screens/MessageCandidate";

const Tab = createBottomTabNavigator();

const BottomTabNavCandidate = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === "HomeCandidate") {
                        iconName = "home";
                        size = focused ? 35 : 20;
                    } else if (route.name === "MessageCandidate") {
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
                name="HomeCandidate"
                component={StackNavScreenCandidate}
                options={{
                    title: "Acceuil",
                }}
            />
            <Tab.Screen
                name="MessageCandidate"
                component={MessageCandidate}
                options={{ title: "Message" }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({});

export default BottomTabNavCandidate;
