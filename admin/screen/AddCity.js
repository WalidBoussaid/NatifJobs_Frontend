import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ip } from "../../ip";

const AddCity = () => {
    const [data, setData] = useState([]);
    const [city, setCity] = useState("");

    const fetchData = async () => {
        const tok = await AsyncStorage.getItem("token"); //recupère le token

        const response = await fetch(`http://${ip}:3000/city/allCity`, {
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
            alert("Pas de ville à afficher !");
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async () => {
        try {
            let isVerified = true;
            const tok = await AsyncStorage.getItem("token"); //recupère le token

            if (tok == "" || tok == null) {
                isVerified = false;
                alert("Veuillez vous reconnecter !");
            }
            if (city == null || city == "") {
                isVerified = false;
                alert("La ville n'est pas valide!");
            }

            if (isVerified) {
                const cit = {
                    cityName: city,
                };

                const response = await fetch(`http://${ip}:3000/city/addCity`, {
                    method: "POST",
                    body: JSON.stringify(cit),
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${tok}`,
                    },
                });

                if (response.ok) {
                    fetchData();
                    alert("La ville " + city + " à été ajoutée !");
                } else {
                    const error = await response.json();
                    alert(error.err);
                }
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Nouvelle ville"
                style={styles.input}
                onChangeText={(text) => setCity(text)}
            />
            <TouchableOpacity style={styles.touchable} onPress={handleSubmit}>
                <View style={styles.btnContainer}>
                    <Text style={styles.btnText}>Ajouter</Text>
                </View>
            </TouchableOpacity>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onLongPress={async () => {
                            const tok = await AsyncStorage.getItem("token");
                            const cat = {
                                cityId: item.id,
                            };
                            try {
                                const response = await fetch(
                                    `http://${ip}:3000/city/deleteCity`,
                                    {
                                        method: "DELETE",
                                        body: JSON.stringify(cat),
                                        headers: {
                                            Accept: "application/json",
                                            "Content-Type": "application/json",
                                            Authorization: `Bearer ${tok}`,
                                        },
                                    }
                                );

                                if (response.ok) {
                                    fetchData();
                                    alert("Ville supprimé");
                                } else {
                                    const error = await response.json();
                                    alert(error);
                                }
                            } catch (error) {
                                alert(error.message);
                            }
                        }}
                    >
                        <View style={styles.offer}>
                            <View>
                                <Text style={styles.title}>{item.name}</Text>
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

export default AddCity;
