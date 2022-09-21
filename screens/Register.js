import React from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

const Register = ({ navigation }) => {
    const handleSubmitCandidate = () => {
        navigation.replace("RegisterCandidate");
    };

    const handleSubmitEmployer = () => {
        navigation.replace("RegisterEmployer");
    };

    return (
        <LinearGradient colors={[`teal`, "white"]} style={styles.container}>
            <View style={styles.logo}>
                <MaterialIcons name="person-search" size={80} color="white" />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.text}>
                    Voulez-vous vous inscrire comme candidat ou comme employeur
                    ?
                </Text>

                <TouchableOpacity
                    style={styles.touchable}
                    onPress={handleSubmitCandidate}
                >
                    <View style={styles.btnContainer}>
                        <Text style={styles.btnText}>Candidat</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.touchable}
                    onPress={handleSubmitEmployer}
                >
                    <View style={styles.btnContainer}>
                        <Text style={styles.btnText}>Employeur</Text>
                    </View>
                </TouchableOpacity>
                <Pressable onPress={() => navigation.navigate("Login")}>
                    <Text style={{ textAlign: "center", marginTop: 9 }}>
                        Vers Connexion
                    </Text>
                </Pressable>
            </View>
        </LinearGradient>
    );
};

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
