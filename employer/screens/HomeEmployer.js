import { StyleSheet, Text, View, Button } from "react-native";
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

    return (
        <View style={styles.container}>
            <Text>HomeEmployer</Text>
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
