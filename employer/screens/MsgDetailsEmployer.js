import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import { ip } from "../../ip";

const MsgDetailsEmployer = ({ route }) => {
    const [data, setData] = useState([]);
    const [msg, setMsg] = useState([]);

    const { id } = route.params;
    let matchId = id;

    const dataMsg = {
        matchId: matchId,
    };

    const fetchData = async () => {
        const tok = await AsyncStorage.getItem("token"); //recupère le token
        try {
            const response = await fetch(
                `http://${ip}:3000/message/allMessage`,
                {
                    method: "POST",
                    body: JSON.stringify(dataMsg),
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
        } catch (error) {
            alert(error.message);
        }
    };
    const handleNotif = () => {
        Notifications.scheduleNotificationAsync({
            content: {
                title: "Nouveau message",
                body: "Vous avez reçu un nouveau message",
            },
            trigger: {
                seconds: 5,
            },
        });
    };
    useEffect(() => {
        fetchData();
    });

    const submitMsg = async () => {
        try {
            const tok = await AsyncStorage.getItem("token"); //recupère le token
            let isVerified = true;

            if (tok == "" || tok == null) {
                isVerified = false;
                alert("Veuillez vous reconnecter !");
            }
            if (matchId == "" || matchId == null) {
                isVerified = false;
            }
            if (msg < 1) {
                isVerified = false;
                alert("Le message doit contenir au moins 1 caratère !");
            }
            if (isVerified) {
                const message = {
                    msg: msg,
                    matchId: matchId,
                };
                const response = await fetch(
                    `http://${ip}:3000/message/createMessage`,
                    {
                        method: "POST",
                        body: JSON.stringify(message),
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${tok}`,
                        },
                    }
                );

                if (response.ok) {
                    handleNotif();
                    fetchData();
                    setMsg("");
                } else {
                    const error = await response.json();
                    alert(error);
                }
            }
        } catch (error) {
            alert(error.message);
        } finally {
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.msg}>
                        {item.employerId !== null ? (
                            <View style={styles.msgContainerMe}>
                                <Text style={styles.textMe}>{item.msg}</Text>
                                <Text style={styles.nameMe}>
                                    {"  :"} {"Moi"}
                                </Text>
                            </View>
                        ) : (
                            <View style={styles.msgContainer}>
                                <Text style={styles.name}>
                                    {item.candidate.firstName} {":  "}
                                </Text>
                                <Text style={styles.text}>{item.msg}</Text>
                            </View>
                        )}
                    </View>
                )}
            />

            <View style={styles.textinput}>
                <TextInput
                    style={styles.input}
                    value={msg}
                    multiline={true}
                    onChangeText={(text) => setMsg(text)}
                />
                <TouchableOpacity onPress={submitMsg}>
                    <MaterialCommunityIcons
                        name="send-circle"
                        size={45}
                        color="blue"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "teal",
        //justifyContent: "center",
        //alignItems: "center",
    },
    textinput: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        marginVertical: 15,
        justifyContent: "center",
    },
    msg: {},
    msgContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginHorizontal: 8,
        marginVertical: 8,
    },
    msgContainerMe: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        marginHorizontal: 8,
        marginVertical: 8,
    },
    input: {
        backgroundColor: "white",
        width: 300,
        height: "100%",
        borderRadius: 25,
        padding: 5,
        margin: 5,
        textAlign: "center",
    },
    name: {
        fontWeight: "bold",
        color: "peachpuff",
        fontSize: 18,
    },
    nameMe: {
        fontWeight: "bold",
        color: "mediumblue",
        fontSize: 18,
    },
    text: {
        backgroundColor: "papayawhip",
        borderRadius: 5,
        marginHorizontal: 6,
        padding: 5,
        paddingHorizontal: 5,
    },
    textMe: {
        backgroundColor: "azure",
        borderRadius: 5,
        marginHorizontal: 6,
        paddingHorizontal: 5,
        padding: 5,
    },
});

export default MsgDetailsEmployer;
