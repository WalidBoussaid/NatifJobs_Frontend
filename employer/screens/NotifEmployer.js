import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ip } from "../../ip";

const NotifEmployer = ({ navigation }) => {
    const [data, setData] = useState([]);
    let notifVisitedId = "";
    let candidateId = "";
    let offerId = "";

    const fetchData = async () => {
        const tok = await AsyncStorage.getItem("token"); //recupère le token

        const response = await fetch(
            `http://${ip}:3000/notifEmployer/allNotif`,
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
            alert("Pas de notif à afficher !");
        }
    };

    const handleVisited = async () => {
        const tok = await AsyncStorage.getItem("token");
        const visited = {
            notifVisitedId: notifVisitedId,
        };

        const response = await fetch(
            `http://${ip}:3000/notifEmployer/updateNotif`,
            {
                method: "POST",
                body: JSON.stringify(visited),
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
            alert("Pas de notif à afficher !");
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
                        onPress={() => {
                            notifVisitedId = item.id;
                            candidateId = item.candidateId;
                            offerId = item.offerId;
                            handleVisited();
                            if (item.matchId == null || item.matchId == "") {
                                navigation.navigate("DetailsCandidate", {
                                    idCand: candidateId,
                                    idOffer: offerId,
                                });
                            } else {
                                navigation.navigate("MessageEmployer");
                            }
                        }}
                    >
                        {item.visited == true ? (
                            <View style={styles.notifVisited}>
                                <View>
                                    <Text style={styles.title}>{item.msg}</Text>
                                </View>
                            </View>
                        ) : (
                            <View style={styles.notif}>
                                <View>
                                    <Text style={styles.title}>{item.msg}</Text>
                                </View>
                            </View>
                        )}
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
    notif: {
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
    notifVisited: {
        backgroundColor: "lightgrey",
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
