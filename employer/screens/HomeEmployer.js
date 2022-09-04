import { StyleSheet, Text, View } from "react-native";
import React from "react";

const HomeEmployer = () => {
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
