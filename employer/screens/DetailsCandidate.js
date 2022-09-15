import {
    Image,
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
    const { idCand } = route.params;

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
                console.log(result);
            } else {
                const error = await response.json();
                alert(error);
            }
        } catch (error) {}
    };
    useEffect(() => {
        fetchCandidate();
    }, []);

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
                    <Text style={styles.desc}>{data.city.name}</Text>
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
                    <Text style={styles.desc}>{data.cv}</Text>
                </View>
            </ScrollView>
            <View style={styles.btnContainer}>
                <TouchableOpacity
                    style={styles.btn}
                    // onPress={btnLike}
                >
                    <AntDesign name="like1" size={50} color="green" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn}
                    // onPress={btnDislike}
                >
                    <AntDesign name="dislike1" size={50} color="red" />
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
    btn: {},
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
});

export default DetailsCandidate;
