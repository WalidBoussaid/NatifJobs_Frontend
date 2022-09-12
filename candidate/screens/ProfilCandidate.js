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
import * as ImagePicker from "expo-image-picker";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import SelectDropdown from "react-native-select-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";

const ProfilCandidate = ({ navigation }) => {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [lastName, setLastName] = useState("");
    const [firstName, setFirsttName] = useState("");
    const [email, setEmail] = useState(mail);
    const [profilImg, setProfilImg] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [nationality, setNationality] = useState("");
    const [adress, setAdress] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [lastExperiencepro, setLastExperiencepro] = useState("");
    const [lastDiplomaObtained, setLastDiplomaObtained] = useState("");
    const [hobbies, setHobbies] = useState("");
    const [cv, setCv] = useState("");
    const [urlProfilImage, setUrlProfilImage] = useState("");
    const [allCity, setAllCity] = useState([]);
    const [selectedCity, setSelectedCity] = useState([]);
    const [candidate, setCandidate] = useState([]);
    const [login, setLogin] = useState([]);
    const [loginId, setLoginId] = useState("");
    const [userId, setUserId] = useState("");
    const [city, setCity] = useState([]);
    const [isLoadingCity, setIsLoadingCity] = useState(true);
    const [isLoadingCandidate, setIsLoadingCandidate] = useState(true);
    const [isLoadingLogin, setIsLoadingLogin] = useState(true);

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
                setAllCity(result);
            }
        } catch (error) {
            alert(error.message);
        } finally {
            setIsLoadingCity(false);
        }
    };

    const fetchLogin = async () => {
        try {
            const tok = await AsyncStorage.getItem("token"); //recupère le token
            const decoded = jwt_decode(tok); // decode le token
            setLoginId(decoded.loginId);

            const response = await fetch(
                `http://192.168.0.119:3000/login/findLogin/${loginId}`,
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

    const fetchCandidate = async () => {
        try {
            const tok = await AsyncStorage.getItem("token"); //recupère le token
            const decoded = jwt_decode(tok); // decode le token
            setUserId(decoded.userId);

            const response = await fetch(
                `http://192.168.0.119:3000/candidate/oneCandidate/${userId}`,
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
                setCandidate(result);
                setCity(result.city);
                setSelectedCity(result.city);

                setFirsttName(result.firstName);
                setLastName(result.lastName);
                setProfilImg(result.profilImg);
                setNationality(result.nationality);
                setAdress(result.adress);
                setPostalCode(result.postalCode);
                setDateOfBirth(result.dateOfBirth);
                setLastDiplomaObtained(result.lastDiplomaObtained);
                setLastExperiencepro(result.lastExperiencepro);
                setHobbies(result.hobbies);
                setCv(result.cv);
            }
        } catch (error) {
            alert(error.message);
        } finally {
            setIsLoadingCandidate(false);
        }
    };

    useEffect(() => {
        fetchLogin();
        fetchCandidate();
        fetchCity();
    }, [
        isLoadingCity == true &&
            isLoadingLogin == true &&
            isLoadingCandidate == true,
    ]);

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
                alert(
                    "Veuillez entrer une adresse 55555 avec min 5 caractères"
                );
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
            if (isVerified && passwordVerified && newPasswordVerified) {
                const cand = {
                    mail: mail,
                    password: newPassword,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    profilImg:
                        urlProfilImage == "" ? profilImg : urlProfilImage,
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
                    `http://192.168.0.119:3000/candidate/updateCandidate/${loginId}`,
                    {
                        method: "POST",
                        body: JSON.stringify(cand),
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${tok}`,
                        },
                    }
                );
                if (response.ok) {
                    navigation.replace("HomeCandidate");
                } else {
                    const error = await response.json();
                    console.log(error);
                }
            } else if (isVerified && passwordVerified && !newPasswordVerified) {
                const cand = {
                    mail: mail,
                    password: password,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    profilImg:
                        urlProfilImage == "" ? profilImg : urlProfilImage,
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
                    `http://192.168.0.119:3000/candidate/updateCandidate/${loginId}`,
                    {
                        method: "POST",
                        body: JSON.stringify(cand),
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${tok}`,
                        },
                    }
                );
                if (response.ok) {
                    navigation.replace("HomeCandidate");
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

                    <Text style={styles.text}>Modifier Informations</Text>
                    <Text style={styles.sousText}>Votre Nom</Text>
                    <TextInput
                        defaultValue={lastName}
                        style={styles.input}
                        onChangeText={(text) => setLastName(text)}
                    />
                    <Text style={styles.sousText}>Votre Prénom</Text>
                    <TextInput
                        defaultValue={firstName}
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

                    <Text style={styles.sousText}>Ville</Text>
                    <SelectDropdown
                        data={allCity}
                        rowTextForSelection={(item, index) => {
                            return item.name;
                        }}
                        buttonTextAfterSelection={(item, index) => {
                            return item.name;
                        }}
                        buttonStyle={{ borderRadius: 25, width: 333 }}
                        defaultButtonText={city.name}
                        onSelect={(selectedItem) => {
                            setSelectedCity(selectedItem);
                        }}
                    />
                    <Text style={styles.sousText}>Votre date de naissance</Text>
                    <TextInput
                        defaultValue={candidate.dateOfBirth}
                        style={styles.input}
                        onChangeText={(text) => setDateOfBirth(text)}
                    />

                    <Text style={styles.sousText}>Votre Nationalitée</Text>
                    <TextInput
                        defaultValue={nationality}
                        style={styles.input}
                        onChangeText={(text) => setNationality(text)}
                    />
                    <Text style={styles.sousText}>Votre Adresse</Text>
                    <TextInput
                        defaultValue={adress}
                        style={styles.input}
                        onChangeText={(text) => setAdress(text)}
                    />
                    <Text style={styles.sousText}>Votre Code Postal</Text>
                    <TextInput
                        defaultValue={postalCode}
                        keyboardType="numeric"
                        style={styles.input}
                        onChangeText={(text) => setPostalCode(text)}
                    />
                    <Text style={styles.sousText}>
                        Votre Derniere Experience Pro
                    </Text>
                    <TextInput
                        defaultValue={lastExperiencepro}
                        style={styles.input}
                        onChangeText={(text) => setLastExperiencepro(text)}
                    />
                    <Text style={styles.sousText}>
                        Votre Dernier Diplome Obtenus
                    </Text>
                    <TextInput
                        defaultValue={lastDiplomaObtained}
                        style={styles.input}
                        onChangeText={(text) => setLastDiplomaObtained(text)}
                    />
                    <Text style={styles.sousText}>Vos Hobby's</Text>
                    <TextInput
                        defaultValue={hobbies}
                        style={styles.input}
                        onChangeText={(text) => setHobbies(text)}
                    />
                    <Text style={styles.sousText}>Votre CV</Text>
                    <TextInput
                        defaultValue={cv}
                        style={styles.input}
                        onChangeText={(text) => setCv(text)}
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

export default ProfilCandidate;
