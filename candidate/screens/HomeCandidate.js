import {
    FlatList,
    Image,
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
import SelectDropdown from "react-native-select-dropdown";

const HomeCandidate = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [dataFiltred, setDataFiltred] = useState([]);
    const [cityData, setCityData] = useState([]);
    const [typeData, setTypeData] = useState([]);
    const [catData, setCatData] = useState([]);
    const [catSelected, setCatSelected] = useState([]);
    const [citySelected, setCitySelected] = useState([]);
    const [typeSelected, setTypeSelected] = useState([]);

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
            setDataFiltred(result);
        } else {
            alert("Pas de offre à afficher !");
        }
    };

    const fetchCity = async () => {
        const tok = await AsyncStorage.getItem("token");
        const response = await fetch("http://192.168.0.119:3000/city/allCity", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tok}`, //donne l'autorisation et lui envoi le token
            },
        });

        if (response.ok) {
            const result = await response.json();
            setCityData(result);
        } else {
            alert("Pas de ville !");
        }
    };

    const fetchCat = async () => {
        const tok = await AsyncStorage.getItem("token");
        const response = await fetch(
            "http://192.168.0.119:3000/category/allCategory",
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
            setCatData(result);
        } else {
            alert("Pas de categorie !");
        }
    };

    const fetchType = async () => {
        const tok = await AsyncStorage.getItem("token");
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
            setTypeData(result);
        } else {
            alert("Pas de type d'offre !");
        }
    };

    useEffect(() => {
        fetchData();
        fetchCity();
        fetchCat();
        fetchType();
    }, []);

    const handleValidateFilter = async () => {
        const tok = await AsyncStorage.getItem("token");

        const filter = {
            categoryId: catSelected.id,
            typeOfferId: typeSelected.id,
            cityId: citySelected.id,
        };

        const response = await fetch(
            "http://192.168.0.119:3000/offer/OfferFiltred",
            {
                method: "POST",
                body: JSON.stringify(filter),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tok}`, //donne l'autorisation et lui envoi le token
                },
            }
        );

        if (response.ok) {
            const result = await response.json();
            setDataFiltred(result);
        } else {
            alert("Pas d'offre !");
            handleRemoveFilter();
        }
    };

    const handleRemoveFilter = () => {
        setCatSelected([]);
        setCitySelected([]);
        setTypeSelected([]);
        setDataFiltred(data);
        navigation.navigate("ProfilCandidate");
        navigation.replace("HomeCandidate");
    };

    return (
        <View style={styles.container}>
            <View style={styles.filter}>
                <SelectDropdown
                    data={cityData}
                    rowTextForSelection={(item, index) => {
                        return item.name;
                    }}
                    buttonTextAfterSelection={(item, index) => {
                        return item.name;
                    }}
                    buttonStyle={{ borderRadius: 25, width: 127 }}
                    defaultButtonText="Ville"
                    onSelect={(selectedItem) => {
                        setCitySelected(selectedItem);
                    }}
                />
                <SelectDropdown
                    data={typeData}
                    rowTextForSelection={(item, index) => {
                        return item.name;
                    }}
                    buttonTextAfterSelection={(item, index) => {
                        return item.name;
                    }}
                    buttonStyle={{ borderRadius: 25, width: 127 }}
                    defaultButtonText="Type d'offre"
                    onSelect={(selectedItem) => {
                        setTypeSelected(selectedItem);
                    }}
                />
                <SelectDropdown
                    data={catData}
                    rowTextForSelection={(item, index) => {
                        return item.name;
                    }}
                    buttonTextAfterSelection={(item, index) => {
                        return item.name;
                    }}
                    buttonStyle={{ borderRadius: 25, width: 127 }}
                    defaultButtonText="Catégorie"
                    onSelect={(selectedItem) => {
                        setCatSelected(selectedItem);
                    }}
                />
            </View>
            <View style={styles.btnFilter}>
                <TouchableOpacity
                    style={styles.touchable}
                    onPress={handleValidateFilter}
                >
                    <View style={styles.btnContainer}>
                        <Text style={styles.btnText}>Valider filtre</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.touchable}
                    onPress={handleRemoveFilter}
                >
                    <View style={styles.btnContainer}>
                        <Text style={styles.btnText}>Supprimer filtre</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <FlatList
                data={dataFiltred}
                style={styles.flatlistData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("OfferDetails", {
                                id: item.id,
                            })
                        }
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
                                <View style={styles.typeContainer}>
                                    <FontAwesome5
                                        name="file-contract"
                                        size={24}
                                        color="black"
                                    />
                                    <Text style={styles.detail}>
                                        {" "}
                                        {item.typeOffer.name}
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

export default HomeCandidate;
