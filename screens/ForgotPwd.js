import React, { useEffect, useState } from "react";

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
import { ip } from "../ip";

const ForgotPwd = ({ navigation }) => {
    const [email, setEmail] = useState("");

    const handleSubmit = async () => {
        try {
            let isVerified = true;
            if (
                !/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/.test(email) ||
                email.length < 7
            ) {
                isVerified = false;
                alert("Veuillez entrer un email valide");
            }

            if (isVerified) {
                const log = {
                    mail: email,
                };

                const response = await fetch(
                    `http://${ip}:3000/login/ressetPassword`,
                    {
                        method: "POST",
                        body: JSON.stringify(log),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (response.ok) {
                    alert("Email envoyé");
                    navigation.replace("Login");
                } else {
                    const error = await response.json();
                    alert("Email ou mot de passe incorrect");
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <LinearGradient colors={["teal", "white"]} style={styles.container}>
            <View style={styles.logo}>
                <MaterialIcons name="person-search" size={80} color="white" />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.text}>
                    Entrez votre email pour recevoir un nouveau mot de passe
                </Text>

                <TextInput
                    placeholder="Votre email"
                    keyboardType="email-address"
                    style={styles.input}
                    onChangeText={(text) => setEmail(text)}
                />
                <TouchableOpacity
                    style={styles.touchable}
                    onPress={handleSubmit}
                >
                    <View style={styles.btnContainer}>
                        <Text style={styles.btnText}>Valider</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};

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
    },
});

export default ForgotPwd;
