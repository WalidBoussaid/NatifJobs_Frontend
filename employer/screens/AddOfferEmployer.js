import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddOfferEmployer = ({ navigation }) => {
    const [title, setTitle] = useState("");
    const [cat, setCat] = useState("");
    const [desc, setDesc] = useState("");

    const handleSubmit = async () => {
        if (title.length > 0 && cat.length > 0 && desc.length > 0) {
            const idUser = await AsyncStorage.getItem("userId");
            const string = title + " - " + idUser;
            await setDoc(doc(db, "Offer", string), {
                userId: idUser,
                title: title,
                category: cat,
                description: desc,
            });

            navigation.replace("HomeEmployer");
        } else {
            alert("Veuillez remplir tous les champs !");
        }
    };

    return (
        <LinearGradient colors={["#1A91DA", "white"]} style={styles.container}>
            <ScrollView>
                <View style={styles.inputContainer}>
                    <Text style={styles.text}>Informations de l'offre</Text>

                    <TextInput
                        placeholder="Titre"
                        style={styles.input}
                        onChangeText={(text) => setTitle(text)}
                    />

                    <TextInput
                        placeholder="Categorie"
                        style={styles.input}
                        onChangeText={(text) => setCat(text)}
                    />

                    <TextInput
                        placeholder="Description"
                        style={styles.input}
                        multiline={true}
                        onChangeText={(text) => setDesc(text)}
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
    text: {
        color: "white",
        fontSize: 25,
        textAlign: "center",
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

export default AddOfferEmployer;
