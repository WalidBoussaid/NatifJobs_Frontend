import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NotifEmployer = ({ navigation }) => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        const tok = await AsyncStorage.getItem("token"); //recupère le token

        const response = await fetch(
            "http://192.168.0.119:3000/notifEmployer/allNotif",
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
                    // onPress={() =>
                    //     navigation.navigate("OfferDetails", {
                    //         id: item.id,
                    //     })
                    // }
                    >
                        <View style={styles.offer}>
                            <View>
                                <Text style={styles.title}>{item.msg}</Text>
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
        height: 110,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default NotifEmployer;
