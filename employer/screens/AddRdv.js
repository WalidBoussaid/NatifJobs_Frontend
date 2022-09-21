import {
    Button,
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
import DatePicker from "react-native-modern-datepicker";
import { ip } from "../../ip";

const AddRdv = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [cand, setCand] = useState([]);
    const [offer, setOffer] = useState([]);
    const [place, setPlace] = useState([]);
    const [salectedDate, setSelectedDate] = useState("");
    const [selectedCand, setSelectedCand] = useState([]);

    const fetchData = async () => {
        const tok = await AsyncStorage.getItem("token"); //recupère le token
        try {
            const response = await fetch(
                `http://${ip}:3000/match/allMatchEmployer`,
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
                alert("Pas de candidat à afficher !");
            }
        } catch (error) {}
    };
    useEffect(() => {
        fetchData();
    }, []);
    const test = async () => {
        console.log(salectedDate);
        //console.log(date);
    };
    const handleSubmit = async () => {
        try {
            let isVerified = true;
            const tok = await AsyncStorage.getItem("token"); //recupère le token

            if (tok == "" || tok == null) {
                isVerified = false;
                alert("Veuillez vous reconnecter !");
            }
            if (cand == null || cand == "") {
                isVerified = false;
                alert("Le candidat n'esxiste pas !");
            }
            if (offer == null || offer == "") {
                isVerified = false;
                alert("L'offre n'esxiste pas !");
            }
            if (salectedDate == null || salectedDate == "") {
                isVerified = false;
                alert("La date n'esxiste pas !");
            }

            if (isVerified) {
                const rdv = {
                    date: salectedDate,
                    place: place,
                    candId: cand.id,
                    offerId: offer,
                };

                const response = await fetch(`http://${ip}:3000/rdv/addRdv`, {
                    method: "POST",
                    body: JSON.stringify(rdv),
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${tok}`,
                    },
                });

                if (response.ok) {
                    navigation.replace("Rdv");
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
            <Text style={styles.sousText}>Candidat</Text>
            <SelectDropdown
                data={data}
                rowTextForSelection={(item, index) => {
                    return item.candidate.firstName;
                }}
                buttonTextAfterSelection={(item, index) => {
                    return item.candidate.firstName;
                }}
                buttonStyle={{ borderRadius: 25, width: 290 }}
                defaultButtonText="Choisissez un candidat"
                onSelect={(selectedItem) => {
                    setSelectedCand(selectedItem),
                        setOffer(selectedItem.offerId),
                        setCand(selectedItem.candidate);
                }}
            />
            <Text style={styles.sousText}>Adresse du RDV</Text>
            <TextInput
                placeholder="Adresse"
                style={styles.input}
                onChangeText={(text) => setPlace(text)}
            />
            <Text style={styles.sousText}>Date</Text>
            <DatePicker
                minuteInterval={30}
                //mode="calendar"
                //onDateChange={(selectedDate) => setSelectedDate(selectedDate)}
                onSelectedChange={(date) => setSelectedDate(date)}
            />
            <TouchableOpacity style={styles.touchable} onPress={handleSubmit}>
                <View style={styles.btnContainer}>
                    <Text style={styles.btnText}>Valider</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "teal",
        justifyContent: "center",
        alignItems: "center",
        padding: 9,
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

export default AddRdv;
