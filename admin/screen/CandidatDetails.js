import {
    Image,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ip } from "../../ip";

const CandidatDetails = ({ route, navigation }) => {
    const { id } = route.params; // id du candidat
    const [data, setData] = useState([]);
    const [city, setCity] = useState([]);

    const fetchCandidate = async () => {
        const tok = await AsyncStorage.getItem("token");
        try {
            const cand = {
                candId: id,
            };
            const response = await fetch(
                `http://${ip}:3000/candidate/findCandidate/${id}`,
                {
                    method: "POST",
                    body: JSON.stringify(cand),
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${tok}`,
                    },
                }
            );
            if (response.ok) {
                const result = await response.json();
                setData(result);
                setCity(result.city);
            } else {
                const error = await response.json();
                alert(error);
            }
        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(() => {
        fetchCandidate();
    }, []);

    const handleSubmitRemove = async () => {
        const tok = await AsyncStorage.getItem("token");
        const cand = {
            candId: id,
            loginId: data.loginId,
        };
        try {
            const response = await fetch(
                `http://${ip}:3000/candidate/deleteCandidate`,
                {
                    method: "DELETE",
                    body: JSON.stringify(cand),
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${tok}`,
                    },
                }
            );

            if (response.ok) {
                alert("Candidat supprimer !");
                navigation.replace("ListCandidate");
            } else {
                const error = await response.json();
                alert(error);
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scroll}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        {data.firstName}
                        {"  "} {data.lastName}
                    </Text>
                </View>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={{ uri: data.profilImg }}
                    />
                </View>
                <View style={styles.titleDescContainer}>
                    <Text style={styles.titleDesc}>Email :</Text>
                </View>
                <View style={styles.descContainer}>
                    <Text style={styles.desc}>{data.email}</Text>
                </View>
                <View style={styles.titleDescContainer}>
                    <Text style={styles.titleDesc}>Nationalité :</Text>
                </View>
                <View style={styles.descContainer}>
                    <Text style={styles.desc}>{data.nationality}</Text>
                </View>
                <View style={styles.titleDescContainer}>
                    <Text style={styles.titleDesc}>Date de naissance :</Text>
                </View>
                <View style={styles.descContainer}>
                    <Text style={styles.desc}>{data.dateOfBirth}</Text>
                </View>
                <View style={styles.titleDescContainer}>
                    <Text style={styles.titleDesc}>Ville :</Text>
                </View>
                <View style={styles.descContainer}>
                    <Text style={styles.desc}>{city.name}</Text>
                </View>
                <View style={styles.titleDescContainer}>
                    <Text style={styles.titleDesc}>
                        Dernier diplome obtenu :
                    </Text>
                </View>
                <View style={styles.descContainer}>
                    <Text style={styles.desc}>{data.lastDiplomaObtained}</Text>
                </View>
                <View style={styles.titleDescContainer}>
                    <Text style={styles.titleDesc}>
                        Dernière expérience professionnelle :
                    </Text>
                </View>
                <View style={styles.descContainer}>
                    <Text style={styles.desc}>{data.lastExperiencepro}</Text>
                </View>
                <View style={styles.titleDescContainer}>
                    <Text style={styles.titleDesc}>Hobby :</Text>
                </View>
                <View style={styles.descContainer}>
                    <Text style={styles.desc}>{data.hobbies}</Text>
                </View>
                <View style={styles.titleDescContainer}>
                    <Text style={styles.titleDesc}>CV :</Text>
                </View>
                <View style={styles.descContainer}>
                    <TouchableOpacity onPress={() => Linking.openURL(data.cv)}>
                        <Text style={styles.desc}>{data.firstName}_cv.pdf</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <View style={styles.btnContainer}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={handleSubmitRemove}
                >
                    <Text style={styles.textBtn}>SUPPRIMER CANDIDAT</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "teal",
    },
    scroll: {
        marginHorizontal: 15,
        marginVertical: 10,
        height: "90%",
    },
    btnContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        height: "10%",
        backgroundColor: "darkred",
    },
    textBtn: {
        fontWeight: "bold",
        fontSize: 18,
        color: "white",
    },
    titleContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        textTransform: "uppercase",
    },
    imageContainer: {
        padding: 5,
    },
    image: {
        height: 250,
        width: "100%",
    },
    descContainer: {
        backgroundColor: "azure",
        borderRadius: 8,
        marginHorizontal: 5,
    },
    desc: {
        marginHorizontal: 8,
        marginVertical: 3,
    },
    btn: {
        paddingBottom: 17,
    },
    titleDesc: {
        fontSize: 17,
        fontWeight: "bold",
        color: "white",
    },
    titleDescContainer: {
        padding: 5,
        marginVertical: 9,
        marginHorizontal: 5,
    },
    infos: {
        marginHorizontal: 8,
    },
    likedText: {
        fontSize: 22,
        fontWeight: "bold",
        color: "green",
        paddingBottom: 15,
    },
    dislikedText: {
        fontSize: 22,
        fontWeight: "bold",
        color: "red",
        paddingBottom: 15,
    },
});

export default CandidatDetails;
