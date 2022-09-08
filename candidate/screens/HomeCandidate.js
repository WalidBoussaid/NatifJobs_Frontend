import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

const HomeCandidate = () => {
    return (
        <View style={styles.container}>
            <Text>HomeCandidate</Text>
            <TextInput
                placeholder="Numero de telephone"
                keyboardType="decimal-pad"
            />
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

export default HomeCandidate;
