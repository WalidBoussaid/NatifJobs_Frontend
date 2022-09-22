import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { ip } from "../../ip";

const Profil = ({ navigation }) => {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [verifyNewPassword, setVerifyNewPassword] = useState("");
    const [name, setName] = useState("");
    const [firstName, setFirsttName] = useState("");
    const [admin, setAdmin] = useState([]);
    const [loginId, setLoginId] = useState("");
    const [login, setLogin] = useState([]);
    const [isLoadingLogin, setIsLoadingLogin] = useState(true);
    const [isLoadingAdmin, setIsLoadingAdmin] = useState(true);

    const fetchLogin = async () => {
        try {
            const tok = await AsyncStorage.getItem("token"); //recupère le token
            const decoded = jwt_decode(tok); // decode le token
            setLoginId(decoded.loginId);

            const response = await fetch(
                `http://${ip}:3000/login/findLogin/${loginId}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${tok}`,
                    },
                }
            );

            if (response.ok) {
                const result = await response.json();
                setLogin(result);
                setOldPassword(result.password);
                setMail(result.mail);
            }
        } catch (error) {
            alert(error.message);
        } finally {
            setIsLoadingLogin(false);
        }
    };

    const fetchAdmin = async () => {
        const tok = await AsyncStorage.getItem("token"); //recupère le token
        try {
            const response = await fetch(`http://${ip}:3000/admin/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tok}`,
                },
            });

            if (response.ok) {
                const result = await response.json();
                setAdmin(result);

                setFirsttName(result.firstName);
                setName(result.name);
            }
        } catch (error) {
            alert(error.message);
        } finally {
            setIsLoadingAdmin(false);
        }
    };
    useEffect(() => {
        fetchLogin();
        fetchAdmin();
    }, [isLoadingLogin == true && isLoadingAdmin == true]);

    const handleSubmit = async () => {
        const tok = await AsyncStorage.getItem("token");
        try {
            let isVerified = true;
            let passwordVerified = true;
            let newPasswordVerified = true;

            if (
                !/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/.test(mail) ||
                mail.length < 7
            ) {
                isVerified = false;
                console.log("mail");
                alert("Veuillez entrer un email valide");
            }
            if (password !== oldPassword) {
                isVerified = false;
                passwordVerified = false;
                alert("Mot de passe incorrect");
            }
            if (newPassword == null || newPassword == "") {
                newPasswordVerified = false;
            }
            if (newPasswordVerified && newPassword.length < 6) {
                isVerified = false;
                alert("Veuillez entrer un mot de passe à min 6 caractères");
            }
            if (
                newPasswordVerified &&
                (verifyNewPassword == null || verifyNewPassword == "")
            ) {
                newPasswordVerified = false;
                alert("Veuillez confirmer votre nouveau mot de passe");
            }
            if (
                (newPassword !== null || newPassword !== "") &&
                newPassword !== verifyNewPassword
            ) {
                isVerified = false;
                newPasswordVerified = false;
                alert("Confirmation mot de passe incorrect");
            }
            if (firstName.length < 2 || !/^[aA-zZ]+$/.test(firstName)) {
                isVerified = false;
                alert("Veuillez entrer un prenom avec min 2 caractères");
            }
            if (name.length < 2 || !/^[aA-zZ]+$/.test(name)) {
                isVerified = false;
                alert("Veuillez entrer un nom avec min 2 caractères");
            }

            if (isVerified && passwordVerified && newPasswordVerified) {
                const admin = {
                    mail: mail,
                    password: newPassword,
                    firstName: firstName,
                    name: name,
                };

                const response = await fetch(
                    `http://${ip}:3000/admin/updateAdmin`,
                    {
                        method: "POST",
                        body: JSON.stringify(admin),
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${tok}`,
                        },
                    }
                );
                if (response.ok) {
                    navigation.replace("HomeAdmin");
                } else {
                    const error = await response.json();
                    console.log(error);
                }
            } else if (isVerified && passwordVerified && !newPasswordVerified) {
                const admin = {
                    mail: mail,
                    password: password,
                    firstName: firstName,
                    name: name,
                };

                const response = await fetch(
                    `http://${ip}:3000/admin/updateAdmin`,
                    {
                        method: "POST",
                        body: JSON.stringify(admin),
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${tok}`,
                        },
                    }
                );
                if (response.ok) {
                    navigation.replace("HomeAdmin");
                } else {
                    const error = await response.json();
                    console.log(error);
                }
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.inputContainer}>
                    <Text style={styles.text}>Modifier Log's</Text>

                    <Text style={styles.sousText}>Votre email</Text>
                    <TextInput
                        defaultValue={mail}
                        style={styles.input}
                        keyboardType="email-address"
                        onChangeText={(text) => setMail(text)}
                    />
                    <Text style={styles.sousText}>
                        Votre Mot De Passe Actuel
                    </Text>
                    <TextInput
                        placeholder="Votre Mot De Passe Actuel"
                        style={styles.input}
                        secureTextEntry
                        onChangeText={(text) => setPassword(text)}
                    />
                    <Text style={styles.sousText}>
                        Votre Nouveau Mot De Passe
                    </Text>
                    <TextInput
                        placeholder="Remplir si changement de mdp"
                        style={styles.input}
                        secureTextEntry
                        onChangeText={(text) => setNewPassword(text)}
                    />

                    <Text style={styles.sousText}>
                        Confirmer Votre Nouveau Mot De Passe
                    </Text>
                    <TextInput
                        placeholder="Remplir si changement de mdp"
                        style={styles.input}
                        secureTextEntry
                        onChangeText={(text) => setVerifyNewPassword(text)}
                    />

                    <Text style={styles.text}>Modifier Informations</Text>
                    <Text style={styles.sousText}>Votre Nom</Text>
                    <TextInput
                        defaultValue={name}
                        style={styles.input}
                        onChangeText={(text) => setName(text)}
                    />
                    <Text style={styles.sousText}>Votre Prénom</Text>
                    <TextInput
                        defaultValue={firstName}
                        style={styles.input}
                        onChangeText={(text) => setFirsttName(text)}
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
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "teal",
    },
    containerWait: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "teal",
        alignItems: "center",
    },
    textWait: {
        color: "white",
        fontSize: 18,
    },
    inputContainer: {
        width: "100%",
        paddingHorizontal: 30,
        paddingVertical: 30,
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
    btnContainerImage: {},
    btnText: {
        textAlign: "center",
        fontSize: 17,
        textTransform: "uppercase",
    },
    photoContainer: {
        alignItems: "center",
        marginVertical: 25,
    },
    wrapper: {
        width: "100%",
        height: 300,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 9,
    },
    photo: {
        width: "100%",
        height: "100%",
        marginVertical: 10,
        borderRadius: 20,
    },
    btnTextImage: {
        color: "blue",
        textAlign: "center",
        fontSize: 17,
        fontWeight: "bold",
    },
    checkboxContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        margin: 9,
    },
    checkbox: {
        marginRight: 10,
    },
    sousText: {
        color: "white",
        fontSize: 18,
        textAlign: "center",
    },
});

export default Profil;
