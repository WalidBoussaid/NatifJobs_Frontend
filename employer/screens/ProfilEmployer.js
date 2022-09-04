import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ProfilEmployer = () => {
    return (
        <View style={styles.container}>
            <Text>ProfilEmployer</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "lightgreen",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default ProfilEmployer;
