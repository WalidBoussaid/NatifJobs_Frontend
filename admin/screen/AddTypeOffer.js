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

const AddTypeOffer = () => {
    const [data, setData] = useState([]);
    const [type, setType] = useState("");

    const fetchData = async () => {
        const tok = await AsyncStorage.getItem("token"); //recupère le token

        const response = await fetch(
            "http://192.168.0.119:3000/typeOffer/allTypeOffer",
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
            alert("Pas de type d'offre à afficher !");
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
            if (type == null || type == "") {
                isVerified = false;
                alert("La catégorie n'est pas valide!");
            }

            if (isVerified) {
                const typeOffer = {
                    typeOfferName: type,
                };

                const response = await fetch(
                    "http://192.168.0.119:3000/typeOffer/addTypeOffer",
                    {
                        method: "POST",
                        body: JSON.stringify(typeOffer),
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${tok}`,
                        },
                    }
                );

                if (response.ok) {
                    fetchData();
                    alert("Le type d'offre : " + type + " à été ajoutée !");
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
                placeholder="Nouveau type d'offre"
                style={styles.input}
                onChangeText={(text) => setType(text)}
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
                            const type = {
                                typeId: item.id,
                            };
                            try {
                                const response = await fetch(
                                    "http://192.168.0.119:3000/typeOffer/deleteTypeOffer",
                                    {
                                        method: "DELETE",
                                        body: JSON.stringify(type),
                                        headers: {
                                            Accept: "application/json",
                                            "Content-Type": "application/json",
                                            Authorization: `Bearer ${tok}`,
                                        },
                                    }
                                );

                                if (response.ok) {
                                    fetchData();
                                    alert("Type d'offre supprimé");
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

export default AddTypeOffer;
