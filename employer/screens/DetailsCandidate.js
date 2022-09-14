import { StyleSheet, Text, View } from "react-native";
import React from "react";

const DetailsCandidate = ({ route, navigation }) => {
    const { idCand } = route.params;

    return (
        <View>
            <Text>{idCand}</Text>
        </View>
    );
};

const styles = StyleSheet.create({});

export default DetailsCandidate;
