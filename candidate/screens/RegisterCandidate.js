import React, { useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import Checkbox from "expo-checkbox";
import { db } from "../../firebase";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";

const RegisterCandidate = ({ route, navigation }) => {
    const [lastName, setLastName] = useState("");
    const [firstName, setFirsttName] = useState("");
    const [email, setEmail] = useState(route.params.user.email);
    const [profilImg, setProfilImg] = useState(
        "https://gem.ec-nantes.fr/wp-content/uploads/2019/01/profil-vide.png"
    );
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [placeOfBirth, setPlaceOfBirth] = useState("");
    const [nationality, setNationality] = useState("");
    const [adress, setAdress] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [lastExperiencepro, setLastExperiencepro] = useState("");
    const [lastDiplomaObtained, setLastDiplomaObtained] = useState("");
    const [hobbies, setHobbies] = useState("");
    const [cv, setCv] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    const idUser = route.params.user.uid.toString();

    const handleSubmit = async () => {
        if (
            lastName.length > 0 &&
            firstName.length > 0 &&
            email.length > 0 &&
            dateOfBirth.length > 0 &&
            placeOfBirth.length > 0 &&
            nationality.length > 0 &&
            adress.length > 0 &&
            postalCode.length > 0 &&
            lastExperiencepro.length > 0 &&
            lastDiplomaObtained.length > 0 &&
            hobbies.length > 0 &&
            cv.length > 0 &&
            profilImg.length > 0
        ) {
            if (isChecked !== true) {
                alert("Veuillez accepter les mentions légales");
            } else {
                await setDoc(doc(db, "infoCandidate", idUser), {
                    userId: idUser,
                    lastName: lastName,
                    firstName: firstName,
                    email: email,
                    dateOfBirth: dateOfBirth,
                    placeOfBirth: placeOfBirth,
                    nationality: nationality,
                    adress: adress,
                    postalCode: postalCode,
                    lastExperiencepro: lastExperiencepro,
                    lastDiplomaObtained: lastDiplomaObtained,
                    hobbies: hobbies,
                    cv: cv,
                    profilImg: profilImg,
                    role: "candidate",
                });
                navigation.replace("HomeCandidate");
            }
        } else {
            alert("Veuillez remplir tous les champs !");
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result);

        if (!result.cancelled) {
            setProfilImg(result.uri);
        }
    };

    return (
        <LinearGradient colors={["#1A91DA", "white"]} style={styles.container}>
            <ScrollView>
                <View style={styles.inputContainer}>
                    <Text style={styles.text}>Informations</Text>

                    <TextInput
                        placeholder="Votre Nom"
                        style={styles.input}
                        onChangeText={(text) => setLastName(text)}
                    />

                    <TextInput
                        placeholder="Votre Prénom"
                        style={styles.input}
                        onChangeText={(text) => setFirsttName(text)}
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
                        placeholder="Votre date de naissance"
                        style={styles.input}
                        onChangeText={(text) => setDateOfBirth(text)}
                    />

                    <TextInput
                        placeholder="Lieu de naissance"
                        style={styles.input}
                        onChangeText={(text) => setPlaceOfBirth(text)}
                    />

                    <TextInput
                        placeholder="Votre Nationalitée"
                        style={styles.input}
                        onChangeText={(text) => setNationality(text)}
                    />

                    <TextInput
                        placeholder="Votre Adresse"
                        style={styles.input}
                        onChangeText={(text) => setAdress(text)}
                    />

                    <TextInput
                        placeholder="Votre Code Postal"
                        keyboardType="numeric"
                        style={styles.input}
                        onChangeText={(text) => setPostalCode(text)}
                    />

                    <TextInput
                        placeholder="Votre Derniere Experience Pro"
                        style={styles.input}
                        onChangeText={(text) => setLastExperiencepro(text)}
                    />

                    <TextInput
                        placeholder="Votre Dernier Diplome Obtenus"
                        style={styles.input}
                        onChangeText={(text) => setLastDiplomaObtained(text)}
                    />

                    <TextInput
                        placeholder="Vos Hobby's"
                        style={styles.input}
                        onChangeText={(text) => setHobbies(text)}
                    />

                    <TextInput
                        placeholder="Votre CV"
                        style={styles.input}
                        onChangeText={(text) => setCv(text)}
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
        backgroundColor: "turquoise",
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

export default RegisterCandidate;
