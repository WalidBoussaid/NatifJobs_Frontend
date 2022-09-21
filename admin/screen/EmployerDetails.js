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

const EmployerDetails = ({ route, navigation }) => {
    const { id } = route.params; // id de l'employeur
    const [data, setData] = useState([]);
    const [city, setCity] = useState([]);

    const fetchEmployer = async () => {
        const tok = await AsyncStorage.getItem("token");
        try {
            const emp = {
                empId: id,
            };
            const response = await fetch(
                `http://${ip}:3000/employer/findEmployer/${id}`,
                {
                    method: "POST",
                    body: JSON.stringify(emp),
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
        fetchEmployer();
    }, []);

    const handleSubmitRemove = async () => {
        const tok = await AsyncStorage.getItem("token");
        const emp = {
            empId: id,
            loginId: data.loginId,
        };
        try {
            const response = await fetch(
                `http://${ip}:3000/employer/deleteEmployer`,
                {
                    method: "DELETE",
                    body: JSON.stringify(emp),
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${tok}`,
                    },
                }
            );

            if (response.ok) {
                alert("Employeur supprimer !");
                navigation.replace("ListEmployer");
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
                    <Text style={styles.title}>{data.name}</Text>
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
                    <Text style={styles.titleDesc}>Adresse :</Text>
                </View>
                <View style={styles.descContainer}>
                    <Text style={styles.desc}>{data.adress}</Text>
                </View>
                <View style={styles.titleDescContainer}>
                    <Text style={styles.titleDesc}>Code postal :</Text>
                </View>
                <View style={styles.descContainer}>
                    <Text style={styles.desc}>{data.postalCode}</Text>
                </View>
                <View style={styles.titleDescContainer}>
                    <Text style={styles.titleDesc}>Ville :</Text>
                </View>
                <View style={styles.descContainer}>
                    <Text style={styles.desc}>{city.name}</Text>
                </View>
                <View style={styles.titleDescContainer}>
                    <Text style={styles.titleDesc}>Numero de tel :</Text>
                </View>
                <View style={styles.descContainer}>
                    <Text style={styles.desc}>{data.phone}</Text>
                </View>
                <View style={styles.titleDescContainer}>
                    <Text style={styles.titleDesc}>Site web :</Text>
                </View>
                <View style={styles.descContainer}>
                    <Text style={styles.desc}>{data.website}</Text>
                </View>
            </ScrollView>

            <View style={styles.btnContainer}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={handleSubmitRemove}
                >
                    <Text style={styles.textBtn}>SUPPRIMER EMPLOYEUR</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default EmployerDetails;

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
