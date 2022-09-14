import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";

const HistoryCandidate = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [cityData, setCityData] = useState([]);
    const [typeData, setTypeData] = useState([]);
    const [catData, setCatData] = useState([]);

    const fetchData = async () => {
        const tok = await AsyncStorage.getItem("token");
        const response = await fetch(
            "http://192.168.0.119:3000/historyCandidate/allMyHistoryCandidate",
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
            console.log(data);
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
                style={styles.flatlistData}
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
                                {item.like == true ? (
                                    <View style={styles.titleContainer}>
                                        <Foundation
                                            name="like"
                                            size={30}
                                            color="green"
                                        />
                                        <Text style={styles.title}>
                                            {" "}
                                            Like - {item.offer.title}
                                        </Text>
                                    </View>
                                ) : (
                                    <View style={styles.titleContainer}>
                                        <Foundation
                                            name="dislike"
                                            size={30}
                                            color="red"
                                        />
                                        <Text style={styles.title}>
                                            {" "}
                                            Dislike - {item.offer.title}
                                        </Text>
                                    </View>
                                )}

                                <View style={styles.nameContainer}>
                                    <Text style={styles.name}>
                                        {item.offer.employer.name}
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
                                            {item.offer.categoryJob.name}
                                        </Text>
                                    </View>
                                    <View style={styles.townContainer}>
                                        <MaterialIcons
                                            name="place"
                                            size={24}
                                            color="black"
                                        />
                                        <Text style={styles.detail}>
                                            {item.offer.city.name}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.typeContainer}>
                                    <FontAwesome5
                                        name="file-contract"
                                        size={24}
                                        color="black"
                                    />
                                    <Text style={styles.detail}>
                                        {" "}
                                        {item.offer.typeOffer.name}
                                    </Text>
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
    filter: {
        marginVertical: 10,
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    flatlistData: {
        marginVertical: 12,
        backgroundColor: "teal",
    },
    touchable: {
        marginTop: 10,
    },
    btnContainer: {
        backgroundColor: "lightblue",
        borderRadius: 7,
        padding: 9,
    },
    btnText: {
        textAlign: "center",
        fontSize: 17,
        textTransform: "uppercase",
    },
    btnFilter: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
    },
    offer: {
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "center",
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
        width: 370,
        height: 150,
    },
    offerContainer: {
        width: "100%",
    },
    titleContainer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
    },
    title: {
        fontSize: 21,
        fontWeight: "bold",
        alignItems: "center",
    },
    nameContainer: {
        height: "30%",
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        marginHorizontal: 6,
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
    typeContainer: {
        flexDirection: "row",
        marginBottom: 5,
        marginHorizontal: 5,
    },
});

export default HistoryCandidate;
