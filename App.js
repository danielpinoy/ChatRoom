import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Start from "./Components/Start";
import Chat from "./Components/Chat";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);
export default function App() {
    const Stack = createNativeStackNavigator();

    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyAWt4NGM3S_nz5kSLykTj-i5JX-1PWi-cA",
        authDomain: "chatapp-e395c.firebaseapp.com",
        projectId: "chatapp-e395c",
        storageBucket: "chatapp-e395c.appspot.com",
        messagingSenderId: "650389040857",
        appId: "1:650389040857:web:d2bfe55de51673adcad8c8",
    };

    const app = initializeApp(firebaseConfig);

    const db = getFirestore(app);
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Start">
                <Stack.Screen name="Home" component={Start} />
                <Stack.Screen name="Chat">{(props) => <Chat db={db} {...props} />}</Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
