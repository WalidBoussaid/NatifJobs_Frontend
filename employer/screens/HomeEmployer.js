import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeEmployer = () => {
    const [id, setId] = useState("");

    // const getData = async () => {
    //     try {
    //         const value = await AsyncStorage.getItem("userId");
    //         if (value !== null) {
    //             console.log(value);
    //         }
    //     } catch (e) {
    //         // error reading value
    //     }
    // };

    const fetchData = async () => {
        const tok = await AsyncStorage.getItem("token");
        console.log(tok);
    };

    return (
        <View style={styles.container}>
            <Text>HomeEmployer</Text>
            <TouchableOpacity onPress={fetchData}>
                <Text>Cliquez ici</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "lightblue",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default HomeEmployer;
