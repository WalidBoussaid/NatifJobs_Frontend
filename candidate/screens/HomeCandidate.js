import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";

const HomeCandidate = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        const tok = await AsyncStorage.getItem("token");
        const response = await fetch(
            "http://192.168.0.119:3000/offer/AllOffer",
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
                            <View style={styles.offerContainer}>
                                <View style={styles.titleContainer}>
                                    <Text style={styles.title}>
                                        {item.title}
                                    </Text>
                                </View>
                                <View style={styles.nameContainer}>
                                    <Text style={styles.name}>
                                        {item.employer.name}
                                    </Text>
                                </View>
                                <View style={styles.detailContainer}>
                                    <View style={styles.catContainer}>
                                        <MaterialIcons
                                            name="work-outline"
                                            size={24}
                                            color="black"
                                        />
                                        <Text style={styles.detail}>
                                            {item.categoryJob.name}
                                        </Text>
                                    </View>
                                    <View style={styles.townContainer}>
                                        <MaterialIcons
                                            name="place"
                                            size={24}
                                            color="black"
                                        />
                                        <Text style={styles.detail}>
                                            {item.city.name}
                                        </Text>
                                    </View>
                                </View>
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
        alignItems: "center",
    },
    offer: {
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "center",
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
        width: 370,
        height: 100,
    },
    offerContainer: {
        width: "100%",
    },
    titleContainer: {
        alignItems: "center",
    },
    title: {
        fontSize: 21,
        fontWeight: "bold",
        alignItems: "center",
    },
    nameContainer: {
        height: "30%",
        marginBottom: 5,
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
    },
    detailContainer: {
        height: "30%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 5,
    },
    detail: {
        fontSize: 18,
    },
    townContainer: {
        flexDirection: "row",
    },
    catContainer: {
        flexDirection: "row",
    },
});

export default HomeCandidate;
