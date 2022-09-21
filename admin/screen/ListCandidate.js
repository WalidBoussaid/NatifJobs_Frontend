import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ListCandidate = ({ navigation }) => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        const tok = await AsyncStorage.getItem("token"); //recupère le token

        const response = await fetch(
            `http://${ip}:3000/candidate/AllCandidate`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tok}`, //donne l'autorisation et lui envoi le token
                },
            }
        );

        if (response.ok) {
            const result = await response.json();
            setData(result);
        } else {
            alert("Pas de candidat à afficher !");
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    if (data == null || data == "") {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Pas de Candidat</Text>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("CandidatDetails", {
                                    id: item.id,
                                })
                            }
                        >
                            <View style={styles.offer}>
                                <View>
                                    <Text style={styles.title}>
                                        NOM: {item.lastName}
                                    </Text>
                                    <Text style={styles.title}>
                                        PRENOM: {item.firstName}
                                    </Text>
                                    <Text style={styles.title}>
                                        EMAIL: {item.email}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "teal",
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        backgroundColor: "white",
        width: "80%",
        borderRadius: 25,
        padding: 9,
        textAlign: "center",
        fontSize: 19,
        marginVertical: 5,
    },
    offer: {
        backgroundColor: "white",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        marginVertical: 10,
        width: 350,
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
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default ListCandidate;
