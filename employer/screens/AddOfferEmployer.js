import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useEffect, useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ip } from "../../ip";

const AddOfferEmployer = ({ navigation }) => {
    const [title, setTitle] = useState("");
    const [selectedCat, setSelectedCat] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [desc, setDesc] = useState("");
    const [category, setCategory] = useState([]);
    const [typeOffer, setTypeOffer] = useState([]);
    const [city, setCity] = useState([]);

    useEffect(() => {
        const fetchCity = async () => {
            try {
                const tok = await AsyncStorage.getItem("token");
                const response = await fetch(`http://${ip}:3000/city/allCity`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${tok}`,
                    },
                });

                if (response.ok) {
                    const result = await response.json();
                    setCity(result);
                }
            } catch (error) {
                alert(error.message);
            }
        };

        const fetchCategoryJob = async () => {
            try {
                const tok = await AsyncStorage.getItem("token");
                const response = await fetch(
                    `http://${ip}:3000/category/allCategory`,
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
                    setCategory(result);
                }
            } catch (error) {
                alert(error.message);
            }
        };

        const fetchTypeOffer = async () => {
            try {
                const tok = await AsyncStorage.getItem("token");
                const response = await fetch(
                    `http://${ip}:3000/typeOffer/allTypeOffer`,

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
                    setTypeOffer(result);
                }
            } catch (error) {
                alert(error.message);
            }
        };

        fetchCity();
        fetchCategoryJob();
        fetchTypeOffer();
    }, []);

    const handleSubmit = async () => {
        try {
            let isVerified = true;
            const tok = await AsyncStorage.getItem("token"); //recupère le token

            if (tok == "" || tok == null) {
                isVerified = false;
                alert("Veuillez vous reconnecter !");
            }
            if (category == null || category == "") {
                isVerified = false;
                alert("La categorie n'esxiste pas !");
            }
            if (city == null || city == "") {
                isVerified = false;
                alert("La ville n'esxiste pas !");
            }
            if (typeOffer == null || typeOffer == "") {
                isVerified = false;
                alert("Le type d'offre n'esxiste pas !");
            }
            if (title.length < 4) {
                isVerified = false;
                alert("Titre pas confomre (min 4 caractères)!");
            }
            if (desc.length < 10) {
                isVerified = false;
                alert("Description pas confomre (min 10 caractères)!");
            }
            if (isVerified) {
                const offer = {
                    title: title,
                    description: desc,
                    categoryOffer: selectedCat.id,
                    typeOffer: selectedType.id,
                    cityId: selectedCity.id,
                };

                const response = await fetch(
                    `http://${ip}:3000/offer/addOffer`,
                    {
                        method: "POST",
                        body: JSON.stringify(offer),
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${tok}`,
                        },
                    }
                );

                if (response.ok) {
                    navigation.replace("HomeEmployer");
                } else {
                    const error = await response.json();
                    alert(error);
                }
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.inputContainer}>
                    <Text style={styles.text}>Informations de l'offre</Text>

                    <Text style={styles.sousText}>Titre</Text>
                    <TextInput
                        placeholder="Titre"
                        style={styles.input}
                        onChangeText={(text) => setTitle(text)}
                    />

                    <Text style={styles.sousText}>Description</Text>
                    <TextInput
                        placeholder="Description"
                        style={styles.input}
                        multiline={true}
                        onChangeText={(text) => setDesc(text)}
                    />

                    <Text style={styles.sousText}>Catégorie</Text>
                    <SelectDropdown
                        data={category}
                        rowTextForSelection={(item, index) => {
                            return item.name;
                        }}
                        buttonTextAfterSelection={(item, index) => {
                            return item.name;
                        }}
                        buttonStyle={{ borderRadius: 25, width: 290 }}
                        defaultButtonText="Choisissez une catégorie"
                        onSelect={(selectedItem) => {
                            setSelectedCat(selectedItem);
                        }}
                    />

                    <Text style={styles.sousText}>Ville</Text>
                    <SelectDropdown
                        data={city}
                        rowTextForSelection={(item, index) => {
                            return item.name;
                        }}
                        buttonTextAfterSelection={(item, index) => {
                            return item.name;
                        }}
                        buttonStyle={{ borderRadius: 25, width: 290 }}
                        defaultButtonText="Choisissez une ville"
                        onSelect={(selectedItem) => {
                            setSelectedCity(selectedItem);
                        }}
                    />

                    <Text style={styles.sousText}>Type d'offre</Text>
                    <SelectDropdown
                        data={typeOffer}
                        rowTextForSelection={(item, index) => {
                            return item.name;
                        }}
                        buttonTextAfterSelection={(item, index) => {
                            return item.name;
                        }}
                        buttonStyle={{ borderRadius: 25, width: 290 }}
                        defaultButtonText="Choisissez un type d'offre"
                        onSelect={(selectedItem) => {
                            setSelectedType(selectedItem);
                        }}
                    />

                    <TouchableOpacity
                        style={styles.touchable}
                        onPress={handleSubmit}
                    >
                        <View style={styles.btnContainer}>
                            <Text style={styles.btnText}>Valider</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "teal",
        flex: 1,
    },
    inputContainer: {
        width: "100%",
        paddingHorizontal: 50,
        paddingVertical: 50,
    },
    text: {
        color: "white",
        fontSize: 28,
        textAlign: "center",
    },
    sousText: {
        color: "white",
        fontSize: 18,
        textAlign: "center",
    },
    input: {
        backgroundColor: "white",
        width: "100%",
        borderRadius: 25,
        padding: 9,
        textAlign: "center",
        fontSize: 19,
        marginVertical: 5,
    },
    touchable: {
        marginVertical: 9,
    },
    btnContainer: {
        backgroundColor: "turquoise",
        borderRadius: 7,
        padding: 9,
    },
    btnText: {
        textAlign: "center",
        fontSize: 17,
        textTransform: "uppercase",
    },
});

export default AddOfferEmployer;
