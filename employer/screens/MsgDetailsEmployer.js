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

const MsgDetailsEmployer = () => {
    const [data, setData] = useState([]);
    const [msg, setMsg] = useState([]);

    return (
        <View style={styles.container}>
            {/* <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.offer}>
                        <View>
                            <Text style={styles.title}>
                                {item.candidate.firstName} -{" "}
                                {item.candidate.lastName}
                            </Text>
                            <Text style={styles.title}>{item.offer.title}</Text>
                        </View>
                    </View>
                )}
            /> */}
            <View style={styles.msg}>
                <Text>SLAUT</Text>
            </View>
            <View style={styles.textinput}>
                <TextInput
                    style={styles.input}
                    multiline={true}
                    onChangeText={(text) => setMsg(text)}
                />
                <MaterialCommunityIcons
                    name="send-circle"
                    size={40}
                    color="blue"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "teal",
        justifyContent: "center",
        alignItems: "center",
    },
    textinput: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    msg: {
        height: "90%",
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
});

export default MsgDetailsEmployer;
