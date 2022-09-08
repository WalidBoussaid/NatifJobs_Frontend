import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
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
        let response = await fetch(
          'http://10.11.10.78:3000/test/'
        );
        let json = await response.json();
        alert(json[0].firstname);
      }

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
