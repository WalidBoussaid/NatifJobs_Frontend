import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ip } from "../../ip";

const RdvCandidate = () => {
    const [data, setData] = useState([]);
    const fetchData = async () => {
        try {
            const tok = await AsyncStorage.getItem("token"); //recupère le token

            const response = await fetch(`http://${ip}:3000/rdv/allRdvCand`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tok}`, //donne l'autorisation et lui envoi le token
                },
            });

            if (response.ok) {
                const result = await response.json();
                setData(result);
            } else {
                alert("Pas de rdv à afficher !");
            }
        } catch (error) {
            alert(error.message);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    if (data == null || data == "") {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Pas de rdv</Text>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.offer}>
                            <View>
                                <Text style={styles.title}>
                                    Date Heure : {item.date}
                                </Text>
                                <Text style={styles.title}>
                                    Adresse : {item.place}
                                </Text>
                                <Text style={styles.title}>
                                    Offre : {item.offer.title}
                                </Text>
                                <Text style={styles.title}>
                                    Employer : {item.employer.name}
                                </Text>
                            </View>
                        </View>
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
    offer: {
        backgroundColor: "white",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        marginTop: 20,
        width: 350,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default RdvCandidate;
