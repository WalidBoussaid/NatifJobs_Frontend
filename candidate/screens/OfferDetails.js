import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";

const OfferDetails = ({ route }) => {
    const [offer, setOffer] = useState([]);
    const [employerName, setEmployerName] = useState("");
    const [employerImg, setEmployerImg] = useState("");
    const [employer, setEmployer] = useState([]);

    const { id } = route.params; // id de l'offre

    const fetchOfferSelected = async () => {
        const tok = await AsyncStorage.getItem("token");
        try {
            const response = await fetch(
                `http://192.168.0.119:3000/offer/OfferSelected/${id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${tok}`,
                    },
                }
            );

            if (response.ok) {
                const result = await response.json();
                setOffer(result);
                setEmployerName(result.employer.name);
                setEmployerImg(result.employer.profilImg);
                setEmployer(result.employer);
            }
        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(() => {
        fetchOfferSelected();
        console.log(offer);
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scroll}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        {employerName} - {offer.title}
                    </Text>
                </View>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{ uri: employerImg }} />
                </View>
                <View style={styles.titleDescContainer}>
                    <Text style={styles.titleDesc}>Description :</Text>
                </View>
                <View style={styles.descContainer}>
                    <Text style={styles.desc}>{offer.description}</Text>
                </View>
                <View style={styles.titleDescContainer}>
                    <Text style={styles.titleDesc}>Info société :</Text>
                </View>
                <View style={styles.infos}>
                    <Text>{employer.name}</Text>
                    <Text>
                        {employer.adress} - {employer.postalCode}
                    </Text>
                    <Text>{employer.website}</Text>
                </View>
            </ScrollView>
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btn}>
                    <AntDesign name="like1" size={50} color="green" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}>
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
    },
    desc: {
        margin: 8,
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
        marginHorizontal: 5,
    },
});

export default OfferDetails;
