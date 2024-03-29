import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { ip } from "../../ip";

const HomeEmployer = ({ navigation }) => {
    const [userId, setUserId] = useState("");
    const [data, setData] = useState([]);

    const fetchData = async () => {
        const tok = await AsyncStorage.getItem("token"); //recupère le token
        const decoded = jwt_decode(tok); // decode le token
        setUserId(decoded.userId); // set le userId qui se trouve dans le token pour l'envoyer à setUserId
        //console.log(userId);
        const log = {
            employerId: userId,
        };

        const response = await fetch(`http://${ip}:3000/offer/myAllOffer`, {
            method: "POST",
            body: JSON.stringify(log),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tok}`, //donne l'autorisation et lui envoi le token
            },
        });

        if (response.ok) {
            const result = await response.json();
            setData(result);
            //console.log(data[0].categoryJob.name);
        } else {
            alert("Pas de offre à afficher !");
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
                            navigation.navigate("OfferDetails", {
                                id: item.id,
                            })
                        }
                    >
                        <View style={styles.offer}>
                            <View>
                                <Text style={styles.title}>{item.title}</Text>
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

export default HomeEmployer;
