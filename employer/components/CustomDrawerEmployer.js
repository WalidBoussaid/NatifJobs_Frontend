import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { Drawer } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomDrawerEmployer = ({ props, navigation }) => {
    const disconect = async () => {
        // suprime du asyncStorage le token et le role et redirige sur la page login
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("role");

        navigation.replace("Login");
    };
    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContentContainer}>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            label="Accueil"
                            icon={(color, size) => (
                                <MaterialIcons
                                    name="home"
                                    size={20}
                                    color={color}
                                />
                            )}
                            onPress={() => navigation.replace("HomeEmployer")}
                        />
                        <DrawerItem
                            label="Profil"
                            icon={(color, size) => (
                                <MaterialIcons
                                    name="face"
                                    size={20}
                                    color={color}
                                />
                            )}
                            onPress={() => navigation.replace("ProfilEmployer")}
                        />
                        <DrawerItem
                            label="Message"
                            icon={(color, size) => (
                                <MaterialIcons
                                    name="message"
                                    size={20}
                                    color={color}
                                />
                            )}
                            onPress={() =>
                                navigation.replace("MessageEmployer")
                            }
                        />
                        <DrawerItem
                            label="Notification"
                            icon={(color, size) => (
                                <MaterialIcons
                                    name="notifications"
                                    size={20}
                                    color={color}
                                />
                            )}
                            onPress={() => navigation.replace("NotifEmployer")}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.logOutSection}>
                <DrawerItem
                    label="Déconnexion"
                    icon={(color, size) => (
                        <MaterialIcons
                            name="logout"
                            size={size}
                            color={color}
                        />
                    )}
                    onPress={disconect}
                />
            </Drawer.Section>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerContentContainer: {
        flex: 1,
    },
    userInfoContainer: {
        paddingLeft: 20,
    },
    userInfoDetails: {
        marginTop: 5,
    },
    name: {
        marginTop: 5,
        justifyContent: "center",
    },
    title: {
        fontSize: 22,
        marginTop: 5,
        fontWeight: "bold",
    },
    caption: {
        fontSize: 15,
    },
    followers: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    section: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 9,
    },
    paragraph: {
        fontWeight: "bold",
    },
    drawerSection: {
        marginTop: 6,
        borderTopWidth: 1,
        borderTopColor: "lightgrey",
    },
    settings: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 5,
        paddingHorizontal: 15,
        alignItems: "center",
    },
    logOutSection: {
        marginBottom: 15,
        borderTopWidth: 1,
        borderTopColor: "lightgrey",
    },
});

export default CustomDrawerEmployer;
