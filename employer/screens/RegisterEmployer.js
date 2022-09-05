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
import { ref, uploadBytes } from "firebase/storage";

const RegisterEmployer = ({ route, navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState(route.params.user.email);
    const [profilImg, setProfilImg] = useState(
        "https://gem.ec-nantes.fr/wp-content/uploads/2019/01/profil-vide.png"
    );
    const [tva, setTva] = useState("");
    const [adress, setAdress] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [phone, setPhone] = useState("");
    const [fax, setFax] = useState("");
    const [website, setWebsite] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    const idUser = route.params.user.uid.toString();

    const handleSubmit = async () => {
        if (
            name.length > 0 &&
            email.length > 0 &&
            profilImg.length > 0 &&
            tva.length > 0 &&
            adress.length > 0 &&
            postalCode.length > 0 &&
            phone.length > 0 &&
            fax.length > 0 &&
            website.length > 0
        ) {
            if (isChecked !== true) {
                alert("Veuillez accepter les mentions légales");
            } else {
                //submitData();
                await setDoc(doc(db, "infoEmployer", idUser), {
                    userId: idUser,
                    role: "employer",
                    name: name,
                    email: email,
                    profilImg: profilImg,
                    tva: tva,
                    adress: adress,
                    postalCode: postalCode,
                    phone: phone,
                    fax: fax,
                    website: website,
                });

                //navigation.replace("HomeEmployer");
            }
        } else {
            alert("Veuillez remplir tous les champs !");
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
            //setProfilImg(result.uri);
            const storageRef = ref(storage, "profilImg/"+idUser);

            const img = await fetch(result.uri);
            const bytes = await img.blob();

            await uploadBytes(storageRef, bytes)
            .then(() => {
                console.log('Succes')
            })
            .catch((error) => {
                console.log('Failed !')
            })
        }
    };

    // const submitData = () => {
    //     const storageRef = ref(storage, "profilImg");

    //     uploadBytes(storageRef, profilImg)
    //         .then((snapshot) => {
    //             console.log("Upload !!");
    //         })
    //         .catch((error) => {
    //             console.log(error.message);
    //         });
    // };

    return (
        <LinearGradient colors={["#1A91DA", "white"]} style={styles.container}>
            <ScrollView>
                <View style={styles.inputContainer}>
                    <Text style={styles.text}>Informations société</Text>

                    <TextInput
                        placeholder="Nom"
                        style={styles.input}
                        onChangeText={(text) => setName(text)}
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
                        placeholder="Numero de TVA"
                        style={styles.input}
                        onChangeText={(text) => setTva(text)}
                    />

                    <TextInput
                        placeholder="Adresse"
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
                        placeholder="Fax"
                        keyboardType="phone-pad"
                        style={styles.input}
                        onChangeText={(text) => setFax(text)}
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

export default RegisterEmployer;
