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
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DetailsCandidate = ({ route, navigation }) => {
    const [data, setData] = useState([]);
    const [city, setCity] = useState([]);
    const [history, setHistory] = useState([]);

    const { idCand } = route.params;
    const { idOffer } = route.params;

    let like = false;
    let dislike = false;

    const fetchCandidate = async () => {
        const tok = await AsyncStorage.getItem("token");
        try {
            const cand = {
                candId: idCand,
            };
            const response = await fetch(
                `http://192.168.0.119:3000/candidate/findCandidate/${idCand}`,
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
        } catch (error) {}
    };

    const fetchHistoryEmployer = async () => {
        const tok = await AsyncStorage.getItem("token");
        try {
            const hist = {
                candidatId: idCand,
                offerId: idOffer,
            };
            const response = await fetch(
                "http://192.168.0.119:3000/historyEmployer/findOneHistoryEmployer",
                {
                    method: "POST",
                    body: JSON.stringify(hist),
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${tok}`,
                    },
                }
            );
            if (response.ok) {
                const result = await response.json();
                setHistory(result);
            } else {
                const error = await response.json();
                alert(error);
            }
        } catch (error) {}
    };

    useEffect(() => {
        fetchCandidate();
        fetchHistoryEmployer();
    }, []);

    const btnLike = async () => {
        const tok = await AsyncStorage.getItem("token");
        try {
            like = true;
            dislike = false;

            const historyLike = {
                offerId: idOffer,
                candidatId: idCand,
                like: like,
                dislike: dislike,
            };

            const response = await fetch(
                `http://192.168.0.119:3000/historyEmployer/createHistoryEmployer`,
                {
                    method: "POST",
                    body: JSON.stringify(historyLike),
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${tok}`,
                    },
                }
            );
            if (response.ok) {
                navigation.replace("MessageEmployer");
            } else {
                const error = await response.json();
                alert(error);
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const btnDislike = async () => {
        const tok = await AsyncStorage.getItem("token");
        try {
            like = false;
            dislike = true;

            const historyLike = {
                offerId: idOffer,
                candidatId: idCand,
                like: like,
                dislike: dislike,
            };

            const response = await fetch(
                `http://192.168.0.119:3000/historyEmployer/createHistoryEmployer`,
                {
                    method: "POST",
                    body: JSON.stringify(historyLike),
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${tok}`,
                    },
                }
            );
            if (response.ok) {
                navigation.replace("NotifEmployer");
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
            {history == null ? (
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.btn} onPress={btnLike}>
                        <AntDesign name="like1" size={50} color="green" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={btnDislike}>
                        <AntDesign name="dislike1" size={50} color="red" />
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.btnContainer}>
                    {history.like == true ? (
                        <Text style={styles.likedText}>
                            Vous avez Liké ce profil !
                        </Text>
                    ) : (
                        <Text style={styles.dislikedText}>
                            Vous avez Disliké ce profil !
                        </Text>
                    )}
                </View>
            )}
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
        backgroundColor: "azure",
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

export default DetailsCandidate;
