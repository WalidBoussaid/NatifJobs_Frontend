import { StyleSheet, Text, View } from "react-native";
import React from "react";

const MessageEmployer = () => {
    return (
        <View style={styles.container}>
            <Text>MessageEmployer</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "teal",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default MessageEmployer;
