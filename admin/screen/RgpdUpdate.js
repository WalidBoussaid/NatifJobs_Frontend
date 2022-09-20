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

const RgpdUpdate = ({ navigation }) => {
    const [data, setData] = useState("");
    const [text, setText] = useState("");

    const fetchData = async () => {
        const tok = await AsyncStorage.getItem("token"); //recupère le token

        const response = await fetch("http://192.168.0.119:3000/rgpd/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tok}`, //donne l'autorisation et lui envoi le token
            },
        });

        if (response.ok) {
            const result = await response.json();
            setData(result);
            setText(result[0].text);
        } else {
            alert("Pas de mention légale à afficher !");
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async () => {
        const tok = await AsyncStorage.getItem("token");
        try {
            let isVerified = true;
            if (text.length < 20) {
                isVerified = false;
                alert("Veuillez entrer un email valide");
            }
            if (isVerified) {
                const rgpd = {
                    text: text,
                };
                const response = await fetch(
                    "http://192.168.0.119:3000/rgpd/updateRgpd",
                    {
                        method: "POST",
                        body: JSON.stringify(rgpd),
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${tok}`,
                        },
                    }
                );
                if (response.ok) {
                    navigation.replace("HomeAdmin");
                    alert("RGPD modifié !");
                } else {
                    const error = await response.json();
                    console.log(error);
                }
            }
        } catch (error) {}
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.text}>Modifier mention légale</Text>
            <TextInput
                defaultValue={text}
                multiline={true}
                style={styles.input}
                onChangeText={(text) => setText(text)}
            />
            <TouchableOpacity style={styles.touchable} onPress={handleSubmit}>
                <View style={styles.btnContainer}>
                    <Text style={styles.btnText}>Valider</Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "teal",
        padding: 8,
        // justifyContent: "center",
        // alignItems: "center",
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
    text: {
        color: "white",
        fontSize: 25,
        textAlign: "center",
    },
    touchable: {
        marginVertical: 9,
    },
    btnContainer: {
        backgroundColor: "lightblue",
        borderRadius: 7,
        padding: 9,
        alignItems: "center",
        marginBottom: 15,
    },
    btnText: {
        fontSize: 17,
        textTransform: "uppercase",
    },
});
export default RgpdUpdate;
