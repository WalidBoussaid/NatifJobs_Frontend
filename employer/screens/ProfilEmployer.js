import React, { useEffect, useState } from "react";
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
import * as ImagePicker from "expo-image-picker";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import SelectDropdown from "react-native-select-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";

const ProfilEmployer = ({ navigation }) => {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState(mail);
    const [profilImg, setProfilImg] = useState("");
    const [adress, setAdress] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [phone, setPhone] = useState("");
    const [website, setWebsite] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [urlProfilImage, setUrlProfilImage] = useState("");
    const [city, setCity] = useState([]);
    const [selectedCity, setSelectedCity] = useState([]);
    const [loginId, setLoginId] = useState("");
    const [userId, setUserId] = useState("");
    const [employer, setEmployer] = useState([]);
    const [login, setLogin] = useState([]);
    const [allCity, setAllCity] = useState([]);

    const [isLoadingCity, setIsLoadingCity] = useState(true);
    const [isLoadingEmployer, setIsLoadingEmployer] = useState(true);
    const [isLoadingLogin, setIsLoadingLogin] = useState(true);

    const storageRef = ref(storage, "profilImg/" + email);

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

    const fetchEmployer = async () => {
        const tok = await AsyncStorage.getItem("token"); //recupère le token
        const decoded = jwt_decode(tok); // decode le token
        setUserId(decoded.userId);
        try {
            const response = await fetch(
                `http://192.168.0.119:3000/employer/oneEmployer/${userId}`,
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
                setEmployer(result);
                setCity(result.city);
                setSelectedCity(result.city);

                setName(result.name);
                setProfilImg(result.profilImg);
                setAdress(result.adress);
                setPostalCode(result.postalCode);
                setPhone(result.phone);
                setWebsite(result.website);
            }
        } catch (error) {
            alert(error.message);
        } finally {
            setIsLoadingEmployer(false);
        }
    };

    useEffect(() => {
        fetchCity();
        fetchLogin();
        fetchEmployer();
    }, [
        isLoadingCity == true &&
            isLoadingLogin == true &&
            isLoadingEmployer == true,
    ]);

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
            if (name.length < 2) {
                isVerified = false;
                alert("Veuillez entrer un nom avec min 2 caractères");
            }
            if (city == null || city == "") {
                isVerified = false;
                alert("La ville n'existe pas !");
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
                alert("Veuillez entrer une image avec min 5 caractères");
            }
            if (
                website.length < 9 ||
                !/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(
                    website
                )
            ) {
                isVerified = false;
                alert("Veuillez entrer un site web avec min 5 caractères");
            }
            if (isVerified && passwordVerified && newPasswordVerified) {
                const emp = {
                    mail: mail,
                    password: newPassword,
                    name: name,
                    email: email,
                    cityId: selectedCity.id,
                    adress: adress,
                    postalCode: postalCode,
                    phone: phone,
                    profilImg:
                        urlProfilImage == "" ? profilImg : urlProfilImage,
                    website: website,
                };

                const response = await fetch(
                    `http://192.168.0.119:3000/employer/employerUpdate/${loginId}`,
                    {
                        method: "POST",
                        body: JSON.stringify(emp),
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${tok}`,
                        },
                    }
                );
                if (response.ok) {
                    navigation.replace("HomeEmployer");
                } else {
                    const error = await response.json();
                    console.log(error);
                }
            } else if (isVerified && passwordVerified && !newPasswordVerified) {
                const emp = {
                    mail: mail,
                    password: password,
                    name: name,
                    email: email,
                    cityId: selectedCity.id,
                    adress: adress,
                    postalCode: postalCode,
                    phone: phone,
                    profilImg:
                        urlProfilImage == "" ? profilImg : urlProfilImage,
                    website: website,
                };

                const response = await fetch(
                    `http://192.168.0.119:3000/employer/employerUpdate/${loginId}`,
                    {
                        method: "POST",
                        body: JSON.stringify(emp),
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${tok}`,
                        },
                    }
                );
                if (response.ok) {
                    navigation.replace("HomeEmployer");
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
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.inputContainer}>
                    <Text style={styles.text}>Log's</Text>

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

                    <Text style={styles.text}>Informations société</Text>

                    <Text style={styles.sousText}>Nom</Text>
                    <TextInput
                        defaultValue={name}
                        style={styles.input}
                        onChangeText={(text) => setName(text)}
                    />

                    <Text style={styles.sousText}>Ville</Text>
                    <SelectDropdown
                        data={allCity}
                        rowTextForSelection={(item, index) => {
                            return item.name;
                        }}
                        buttonTextAfterSelection={(item, index) => {
                            return item.name;
                        }}
                        buttonStyle={{ borderRadius: 25, width: 290 }}
                        defaultButtonText={city.name}
                        onSelect={(selectedItem) => {
                            setSelectedCity(selectedItem);
                        }}
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

                    <Text style={styles.sousText}>Adresse</Text>
                    <TextInput
                        defaultValue={adress}
                        style={styles.input}
                        onChangeText={(text) => setAdress(text)}
                    />

                    <Text style={styles.sousText}>Code postal</Text>
                    <TextInput
                        defaultValue={postalCode}
                        keyboardType="numeric"
                        style={styles.input}
                        onChangeText={(text) => setPostalCode(text)}
                    />

                    <Text style={styles.sousText}>Numero de telephone</Text>
                    <TextInput
                        defaultValue={phone}
                        keyboardType="phone-pad"
                        style={styles.input}
                        onChangeText={(text) => setPhone(text)}
                    />

                    <Text style={styles.sousText}>Site web</Text>
                    <TextInput
                        defaultValue={website}
                        style={styles.input}
                        onChangeText={(text) => setWebsite(text)}
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

export default ProfilEmployer;
