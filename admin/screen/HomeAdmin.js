import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const HomeAdmin = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <MaterialIcons name="person-search" size={80} color="white" />
            </View>

            <View style={styles.inputContainer}>
                <TouchableOpacity
                    style={styles.touchable}
                    onPress={() => navigation.navigate("ListCandidate")}
                >
                    <View style={styles.btnContainer}>
                        <Text style={styles.btnText}>Liste Candidat</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.touchable}
                    onPress={() => navigation.navigate("ListEmployer")}
                >
                    <View style={styles.btnContainer}>
                        <Text style={styles.btnText}>Liste Employeur</Text>
                    </View>
                </TouchableOpacity>
            </View>
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
    logo: {
        marginBottom: 50,
    },
    inputContainer: {
        width: "100%",
        paddingHorizontal: 50,
    },
    input: {
        backgroundColor: "white",
        width: "100%",
        borderRadius: 25,
        padding: 9,
        textAlign: "center",
        fontSize: 19,
        marginVertical: 5,
    },
    touchable: {
        marginVertical: 9,
    },
    text: {
        color: "white",
        fontSize: 25,
        textAlign: "center",
    },
    btnContainer: {
        backgroundColor: "lightblue",
        borderRadius: 7,
        padding: 9,
    },
    btnText: {
        textAlign: "center",
        fontSize: 17,
        textTransform: "uppercase",
        fontWeight: "bold",
    },
});

export default HomeAdmin;
