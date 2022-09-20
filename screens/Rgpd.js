import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useEffect, useState } from "react";

const Rgpd = ({ navigation }) => {
    const [data, setData] = useState("");
    const [text, setText] = useState("");

    const fetchData = async () => {
        const response = await fetch("http://192.168.0.119:3000/rgpd/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const result = await response.json();
            setData(result);
            setText(result[0].text);
        } else {
            alert("Pas de mention légale à afficher !");
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.text}>Mention légale</Text>
            <Text style={styles.input}>{text}</Text>
            <TouchableOpacity
                style={styles.touchable}
                onPress={() => navigation.goBack()}
            >
                <View style={styles.btnContainer}>
                    <Text style={styles.btnText}>OK</Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "teal",
        padding: 8,
        // justifyContent: "center",
        // alignItems: "center",
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
    text: {
        color: "white",
        fontSize: 25,
        textAlign: "center",
    },
    touchable: {
        marginVertical: 9,
    },
    btnContainer: {
        backgroundColor: "lightblue",
        borderRadius: 7,
        padding: 9,
        alignItems: "center",
        marginBottom: 15,
    },
    btnText: {
        fontSize: 17,
        textTransform: "uppercase",
    },
});
export default Rgpd;
