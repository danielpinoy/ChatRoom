import {
    Button,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ImageBackground,
} from "react-native";
import { useState } from "react";
export default Start = ({ navigation }) => {
    const [user, setUser] = useState("");
    const [color, setColor] = useState("");
    return (
        <ImageBackground
            source={require("../img/Background-Image.png")}
            style={styles.backgroundImage}>
            <View style={styles.container}>
                {/* TEXT BOX */}
                <TextInput
                    style={styles.textInput}
                    value={user}
                    onChangeText={setUser}
                    placeholder="Username"
                    accessible={true}
                    accessibilityLabel="Username"
                    accessibilityHint="Type your nickname"
                />

                {/* BUTTON */}
                <TouchableOpacity
                    accessibilityLabel="Chat box"
                    accessibilityHint="Moves to a different screen"
                    accessibilityRole="button"
                    style={styles.buttonWrapper}
                    onPress={() => navigation.navigate("Chat", { user: user, color: color })}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>

                {/* COLOR CHANGER */}
                <View style={styles.colorContainer}>
                    <TouchableOpacity
                        style={[styles.circle, { backgroundColor: "red" }]}
                        onPress={() => setColor("red")}
                        accessibilityLabel="Red Circle"
                        accessibilityHint="Click to change color"
                        accessibilityRole="button"></TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.circle, { backgroundColor: "blue" }]}
                        onPress={() => setColor("blue")}
                        accessibilityLabel="Blue Circle"
                        accessibilityHint="Click to change color"
                        accessibilityRole="button"></TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.circle, { backgroundColor: "green" }]}
                        onPress={() => setColor("green")}
                        accessibilityLabel="Green Circle"
                        accessibilityHint="Click to change color"
                        accessibilityRole="button"></TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.circle, { backgroundColor: "yellow" }]}
                        onPress={() => setColor("yellow")}
                        accessibilityLabel="Yello Circle"
                        accessibilityHint="Click to change color"
                        accessibilityRole="button"></TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
    },
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    colorContainer: { flexDirection: "row", margin: 20 },
    textInput: {
        backgroundColor: "rgba(128, 128, 128, 0.2)",
        borderColor: "rgba(106, 158, 239, 1)",
        color: "white",
        width: "50%",
        padding: 10,
        borderWidth: 1,
        marginTop: 15,
        marginBottom: 15,
    },
    buttonWrapper: {
        backgroundColor: "rgba(106, 158, 239, 0.5)",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: "#ffffff",
    },
    circle: {
        width: 40,
        height: 40,
        borderRadius: 25,
        marginVertical: 10,
        marginRight: 5,
    },
});
