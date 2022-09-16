import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MessageEmployer = ({ navigation }) => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        const tok = await AsyncStorage.getItem("token"); //recupère le token

        const response = await fetch(
            "http://192.168.0.119:3000/match/allMatchEmployer",
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
            alert("Pas de message à afficher !");
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("MsgDetailsEmployer", {
                                id: item.id,
                            })
                        }
                    >
                        <View style={styles.offer}>
                            <View>
                                <Text style={styles.title}>
                                    {item.candidate.firstName} -{" "}
                                    {item.candidate.lastName}
                                </Text>
                                <Text style={styles.title}>
                                    {item.offer.title}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
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

export default MessageEmployer;
