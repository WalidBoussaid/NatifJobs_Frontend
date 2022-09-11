import React, { useState } from "react";
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Checkbox from "expo-checkbox";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { doc, setDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const RegisterEmployer = ({ route, navigation }) => {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState(mail);
    const [town, setTown] = useState("");
    const [profilImg, setProfilImg] = useState(
        "https://gem.ec-nantes.fr/wp-content/uploads/2019/01/profil-vide.png"
    );
    const [adress, setAdress] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [phone, setPhone] = useState("");
    const [website, setWebsite] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [urlProfilImage, setUrlProfilImage] = useState("");

    const storageRef = ref(storage, "profilImg/" + email);

    const handleSubmit = async () => {
        try {
            let isVerified = true;

            if (
                !/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/.test(mail) ||
                mail.length < 7
            ) {
                isVerified = false;
                console.log("mail");
                alert("Veuillez entrer un email valide");
            }
            if (password.length < 6) {
                isVerified = false;
                alert("Veuillez entrer un mot de passe à min 6 caractères");
            }

            if (name.length < 2) {
                isVerified = false;
                alert("Veuillez entrer un nom avec min 2 caractères");
            }
            if (town.length < 4) {
                isVerified = false;
                alert("Veuillez entrer une ville avec min 4 caractères");
            }
            if (adress.length < 5) {
                isVerified = false;
                alert("Veuillez entrer une adresse avec min 5 caractères");
            }
            if (postalCode.length != 4) {
                isVerified = false;
                alert("Veuillez entrer un code postal valide");
            }
            if (!/^[0-9]{9,13}$/.test(phone) || phone.length == 11) {
                isVerified = false;
                alert("Veuillez entrer un numero de telephone valide");
            }
            if (profilImg.length < 5) {
                isVerified = false;
                alert("Veuillez entrer une adresse avec min 5 caractères");
            }
            if (
                website.length < 9 ||
                !/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(
                    website
                )
            ) {
                isVerified = false;
                alert("Veuillez entrer une adresse avec min 5 caractères");
            }
            if (isChecked !== true) {
                alert("Veuillez accepter les mentions légales");
            }
            if (isVerified) {
                const emp = {
                    mail: mail,
                    password: password,
                    name: name,
                    email: email,
                    town: town,
                    adress: adress,
                    postalCode: postalCode,
                    phone: phone,
                    profilImg: urlProfilImage,
                    website: website,
                };

                const response = await fetch(
                    "http://192.168.0.119:3000/registerLogin/employer",
                    {
                        method: "POST",
                        body: JSON.stringify(emp),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (response.ok) {
                    navigation.replace("Login");
                } else {
                    const error = await response.json();
                    console.log(error);
                }
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result);

        if (!result.cancelled) {
            setProfilImg(result.uri);

            const img = await fetch(result.uri);
            const bytes = await img.blob();

            await uploadBytes(storageRef, bytes)
                .then(() => {
                    console.log("success");
                })
                .catch((error) => {
                    console.log("Failed !");
                });
        }

        await fetchUrl();
    };

    const fetchUrl = async () => {
        const test = await getDownloadURL(storageRef);
        setUrlProfilImage(test);
    };

    return (
        <LinearGradient colors={["teal", "white"]} style={styles.container}>
            <ScrollView>
                <View style={styles.inputContainer}>
                    <Text style={styles.text}>Log's</Text>

                    <TextInput
                        placeholder="Votre email"
                        style={styles.input}
                        keyboardType="email-address"
                        onChangeText={(text) => setMail(text)}
                    />

                    <TextInput
                        placeholder="Votre Mot De Passe"
                        style={styles.input}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <Text style={styles.text}>Informations société</Text>

                    <TextInput
                        placeholder="Nom"
                        style={styles.input}
                        onChangeText={(text) => setName(text)}
                    />
                    <TextInput
                        placeholder="Ville"
                        style={styles.input}
                        onChangeText={(text) => setTown(text)}
                    />

                    <View style={styles.photoContainer}>
                        <View style={styles.wrapper}>
                            <Image
                                style={styles.photo}
                                source={{ uri: profilImg }}
                            />

                            <TouchableOpacity
                                style={styles.touchableImage}
                                onPress={pickImage}
                            >
                                <View style={styles.btnContainerImage}>
                                    <Text style={styles.btnTextImage}>
                                        Sélectionner une photo
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TextInput
                        placeholder="Adresse(rue, numero)"
                        style={styles.input}
                        onChangeText={(text) => setAdress(text)}
                    />

                    <TextInput
                        placeholder="Code postal"
                        keyboardType="numeric"
                        style={styles.input}
                        onChangeText={(text) => setPostalCode(text)}
                    />

                    <TextInput
                        placeholder="Numero de telephone"
                        keyboardType="phone-pad"
                        style={styles.input}
                        onChangeText={(text) => setPhone(text)}
                    />

                    <TextInput
                        placeholder="Site web"
                        style={styles.input}
                        onChangeText={(text) => setWebsite(text)}
                    />

                    <View style={styles.checkboxContainer}>
                        <Checkbox
                            style={styles.checkbox}
                            disabled={false}
                            value={isChecked}
                            onValueChange={(newValue) => setIsChecked(newValue)}
                            color={isChecked ? "blue" : undefined}
                        />
                        <Text>Mention légale</Text>
                    </View>

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
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputContainer: {
        width: "100%",
        paddingHorizontal: 50,
        paddingVertical: 50,
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
});

export default RegisterEmployer;
