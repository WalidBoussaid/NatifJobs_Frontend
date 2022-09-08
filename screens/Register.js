import React, { useState } from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Register = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isCandidate, setIsCandidate] = useState(false);
    const [isEmployer, setIsEmployer] = useState(false);

    const handleSubmitCandidate = () => {
        if (email.length > 0 && password.length > 0) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    navigation.replace("RegisterCandidate", { user });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    if (errorCode === "auth/email-already-in-use") {
                        alert("Email existe deja");
                    } else if (errorCode === "auth/invalid-email") {
                        alert("Email invalide");
                    } else if (errorCode === "auth/weak-password") {
                        alert("Le mot de passe doit contenir min 6 caratères");
                    } else {
                        alert(errorMessage);
                    }
                });
        } else {
            alert("Veuillez remplir tous les champs !");
        }
    };

    const handleSubmitEmployer = () => {
        if (email.length > 0 && password.length > 0) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    navigation.replace("RegisterEmployer", { user });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    if (errorCode === "auth/email-already-in-use") {
                        alert("Email existe deja");
                    } else if (errorCode === "auth/invalid-email") {
                        alert("Email invalide");
                    } else if (errorCode === "auth/weak-password") {
                        alert("Le mot de passe doit contenir min 6 caratères");
                    } else {
                        alert(errorMessage);
                    }
                });
        } else {
            alert("Veuillez remplir tous les champs !");
        }
    };

    return (
        <LinearGradient colors={["#1A91DA", "white"]} style={styles.container}>
            <View style={styles.logo}>
                <MaterialIcons name="person-search" size={80} color="white" />
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Votre email"
                    keyboardType="email-address"
                    style={styles.input}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    placeholder="Votre mot de passe"
                    secureTextEntry
                    style={styles.input}
                    onChangeText={(text) => setPassword(text)}
                />
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
        backgroundColor: "turquoise",
        borderRadius: 7,
        padding: 9,
    },
    btnText: {
        textAlign: "center",
        fontSize: 17,
        textTransform: "uppercase",
    },
});
