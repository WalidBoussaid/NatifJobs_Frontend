import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { Drawer } from "react-native-paper";

const CustomDrawerEmployer = (props) => {
    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContentContainer}>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            label="Profil"
                            icon={(color, size) => (
                                <MaterialIcons
                                    name="face"
                                    size={size}
                                    color={color}
                                />
                            )}
                            onPress={() =>
                                props.navigation.navigate("ProfilEmployer")
                            }
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
                    onPress={() => alert("Deco")}
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
