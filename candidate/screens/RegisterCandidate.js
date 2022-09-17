import React, { useEffect, useState } from "react";
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
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import SelectDropdown from "react-native-select-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisterCandidate = ({ route, navigation }) => {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [lastName, setLastName] = useState("");
    const [firstName, setFirsttName] = useState("");
    const [email, setEmail] = useState(mail);
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
    const [urlProfilImage, setUrlProfilImage] = useState("");
    const [city, setCity] = useState([]);
    const [selectedCity, setSelectedCity] = useState([]);

    const storageRef = ref(storage, "profilImg/" + mail);

    const fetchCity = async () => {
        try {
            const response = await fetch(
                "http://192.168.0.119:3000/city/allCity",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.ok) {
                const result = await response.json();
                setCity(result);
            }
        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(() => {
        fetchCity();
    }, []);

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
            if (firstName.length < 2 || !/^[aA-zZ]+$/.test(firstName)) {
                isVerified = false;
                alert("Veuillez entrer un prenom avec min 2 caractères");
            }
            if (lastName.length < 2 || !/^[aA-zZ]+$/.test(lastName)) {
                isVerified = false;
                alert("Veuillez entrer un nom avec min 2 caractères");
            }
            if (adress.length < 5) {
                isVerified = false;
                alert("Veuillez entrer une adresse avec min 5 caractères");
            }
            if (
                postalCode.length !== 4 ||
                !/^[1-9]{1}[0-9]{3}$/.test(postalCode)
            ) {
                isVerified = false;
                alert("Veuillez entrer un code postal valide");
            }
            if (profilImg.length < 5) {
                isVerified = false;
                alert("Veuillez entrer une photo avec min 5 caractères");
            }
            if (nationality.length < 4 || !/^[aA-zZ]+$/.test(nationality)) {
                isVerified = false;
                alert(
                    "Veuillez entrer votre nationalité avec min 4 caractères"
                );
            }
            if (
                dateOfBirth.length !== 10 ||
                !/^[0-9]{1,2}[/]{1}[0-9]{1,2}[/]{1}[0-9]{4}$/.test(dateOfBirth)
            ) {
                isVerified = false;
                alert("Veuillez entrer une date de naissance valide");
            }
            if (lastDiplomaObtained.length < 4) {
                isVerified = false;
                alert(
                    "Veuillez entrer votre dernier diplome avec min 4 caractères"
                );
            }
            if (lastExperiencepro.length < 4) {
                isVerified = false;
                alert(
                    "Veuillez entrer votre derniere experience pro avec  min 4 caractères"
                );
            }
            if (city == null || city == "") {
                isVerified = false;
                alert("La ville n'existe pas !");
            }
            if (hobbies.length < 4) {
                isVerified = false;
                alert("Veuillez entrer vos hobbys avec  min 4 caractères");
            }
            if (cv.length < 4) {
                isVerified = false;
                alert("Veuillez entrer un nom de cv avec min 4 caractères");
            }
            if (isChecked !== true) {
                alert("Veuillez accepter les mentions légales");
            }
            if (isVerified && isChecked) {
                const cand = {
                    mail: mail,
                    password: password,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    profilImg: urlProfilImage,
                    nationality: nationality,
                    adress: adress,
                    postalCode: postalCode,
                    dateOfBirth: dateOfBirth,
                    lastDiplomaObtained: lastDiplomaObtained,
                    lastExperiencepro: lastExperiencepro,
                    hobbies: hobbies,
                    cv: cv,
                    cityId: selectedCity.id,
                };

                const response = await fetch(
                    "http://192.168.0.119:3000/registerLogin/candidate",
                    {
                        method: "POST",
                        body: JSON.stringify(cand),
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

                    <Text style={styles.sousText}>Votre email</Text>
                    <TextInput
                        placeholder="Votre email"
                        style={styles.input}
                        keyboardType="email-address"
                        onChangeText={(text) => setMail(text)}
                    />
                    <Text style={styles.sousText}>Votre Mot De Passe</Text>
                    <TextInput
                        placeholder="Votre Mot De Passe"
                        style={styles.input}
                        secureTextEntry
                        onChangeText={(text) => setPassword(text)}
                    />

                    <Text style={styles.text}>Informations</Text>
                    <Text style={styles.sousText}>Votre Nom</Text>
                    <TextInput
                        placeholder="Votre Nom"
                        style={styles.input}
                        onChangeText={(text) => setLastName(text)}
                    />
                    <Text style={styles.sousText}>Votre Prénom</Text>
                    <TextInput
                        placeholder="Votre Prénom"
                        style={styles.input}
                        onChangeText={(text) => setFirsttName(text)}
                    />
                    <Text style={styles.sousText}>Votre Photo</Text>
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

                    <Text style={styles.sousText}>Ville</Text>
                    <SelectDropdown
                        data={city}
                        rowTextForSelection={(item, index) => {
                            return item.name;
                        }}
                        buttonTextAfterSelection={(item, index) => {
                            return item.name;
                        }}
                        buttonStyle={{ borderRadius: 25, width: 290 }}
                        defaultButtonText="Choisissez une ville"
                        onSelect={(selectedItem) => {
                            setSelectedCity(selectedItem);
                        }}
                    />
                    <Text style={styles.sousText}>Votre date de naissance</Text>
                    <TextInput
                        placeholder="Format 01/06/2001"
                        style={styles.input}
                        onChangeText={(text) => setDateOfBirth(text)}
                    />

                    <Text style={styles.sousText}>Votre Nationalitée</Text>
                    <TextInput
                        placeholder="Votre Nationalitée"
                        style={styles.input}
                        onChangeText={(text) => setNationality(text)}
                    />
                    <Text style={styles.sousText}>Votre Adresse</Text>
                    <TextInput
                        placeholder="Votre Adresse"
                        style={styles.input}
                        onChangeText={(text) => setAdress(text)}
                    />
                    <Text style={styles.sousText}>Votre Code Postal</Text>
                    <TextInput
                        placeholder="Votre Code Postal"
                        keyboardType="numeric"
                        style={styles.input}
                        onChangeText={(text) => setPostalCode(text)}
                    />
                    <Text style={styles.sousText}>
                        Votre Derniere Experience Pro
                    </Text>
                    <TextInput
                        placeholder="Votre Derniere Experience Pro"
                        style={styles.input}
                        onChangeText={(text) => setLastExperiencepro(text)}
                    />
                    <Text style={styles.sousText}>
                        Votre Dernier Diplome Obtenus
                    </Text>
                    <TextInput
                        placeholder="Votre Dernier Diplome Obtenus"
                        style={styles.input}
                        onChangeText={(text) => setLastDiplomaObtained(text)}
                    />
                    <Text style={styles.sousText}>Vos Hobby's</Text>
                    <TextInput
                        placeholder="Vos Hobby's"
                        style={styles.input}
                        onChangeText={(text) => setHobbies(text)}
                    />
                    <Text style={styles.sousText}>Votre CV</Text>
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
    sousText: {
        color: "white",
        fontSize: 18,
        textAlign: "center",
    },
});

export default RegisterCandidate;
