import React, { useEffect, useState } from "react";


import {
    Button,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = async () => {
        if (email.length > 0 && password.length > 0) {
            signInWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    //console.log(user);
                    const userId = user.uid;

                    await AsyncStorage.setItem("userId", userId);

                    const c = query(
                        collection(db, "infoCandidate"),
                        where("userId", "==", userId)
                    );
                    const querySnapshotC = await getDocs(c);
                    querySnapshotC.forEach((doc) => {
                        // console.log(doc.id, " => ", doc.data());
                        /*
                        c5ZRE1oZKJbI4WeMceNs8mmUBCh1  =>  {"adress": "aaaaaaaaaa", "cv": "aaaaaaaaaa", "dateOfBirth": "aaaaaaaa", "email": "walid@gmail.com", "firstName": "walid", "hobbies": "aaaaaa", "lastDiplomaObtained": "aaaaaaa", "lastExperiencepro": "aaaaaaaaaaaaaaaa", "lastName": "bou", "nationality": "aaaaaaaaaa", "placeOfBirth": "aaaaaaaaa", "postalCode": "aaaaaaaaa", "profilImg": "https://gem.ec-nantes.fr/wp-content/uploads/2019/01/profil-vide.png", "role": "candidate", "userId": "c5ZRE1oZKJbI4WeMceNs8mmUBCh1"}
                        */
                        if (userId === doc.id) {
                            navigation.navigate("HomeCandidate");
                        }
                    });
                    const e = query(
                        collection(db, "infoEmployer"),
                        where("userId", "==", userId)
                    );
                    const querySnapshotE = await getDocs(e);
                    querySnapshotE.forEach((doc) => {
                        // console.log(doc.id, " => ", doc.data());
                        /*
                        KV5mrYIz9AUXJQu9SZ6RKbJgAfL2  =>  {"adress": "rue du tata, 1289", "email": "test@gmail.com", "fax": "025369968", "name": "Test SPRL", "phone": "025369985", "postalCode": "1090", "profilImg": "https://gem.ec-nantes.fr/wp-content/uploads/2019/01/profil-vide.png", "role": "employer", "tva": "be2426786897", "userId": "KV5mrYIz9AUXJQu9SZ6RKbJgAfL2", "website": "www.test.be"}
                        */
                        if (userId === doc.id) {
                            navigation.navigate("HomeEmployer");
                        }
                    });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    if (errorCode === "auth/invalid-email") {
                        alert("email invalide");
                    } else if (errorCode === "auth/wrong-password") {
                        alert("Mot de passe incorrect");
                    } else if (errorCode === "auth/user-not-found") {
                        alert("email invalide");
                    }
                    alert(errorMessage);
                });
        } else {
            alert("Veuillez remplir tous les champs");
        }
    };

    return (
        <LinearGradient colors={["#1A91DA", "white"]} style={styles.container}>
            <View style={styles.logo}>
                <MaterialIcons name="person-search" size={80} color="white" />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.text}>Connexion</Text>

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
                <TouchableOpacity
                    style={styles.touchable}
                    onPress={handleSubmit}
                >
                    <View style={styles.btnContainer}>
                        <Text style={styles.btnText}>Valider</Text>
                    </View>
                </TouchableOpacity>
                <Pressable onPress={() => navigation.navigate("Register")}>
                    <Text style={{ textAlign: "center", marginTop: 9 }}>
                        Vers Inscription
                    </Text>
                </Pressable>
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

export default Login;
