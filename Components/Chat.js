import { useState, useEffect } from "react";
import { StyleSheet, View, KeyboardAvoidingView, ImageBackground } from "react-native";
import { Bubble, GiftedChat, Day, InputToolbar } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from "./CustomActions";
import MapView from "react-native-maps";
export default Chat = ({ route, db, isConnected, storage }) => {
    const { user, color, userID } = route.params;
    const [messages, setMessages] = useState([]);

    const loadCachedLists = async () => {
        const cachedLists = (await AsyncStorage.getItem("chatMessage-list")) || [];
        setMessages(JSON.parse(cachedLists));
    };
    useEffect(() => {
        // navigation.setOptions({ title: name });
        let unsubMessages;
        if (isConnected === true) {
            const q = query(
                collection(db, "messages"),
                // where("uid", "==", userID),
                orderBy("createdAt", "desc")
            );
            unsubMessages = onSnapshot(q, (documentsSnapshot) => {
                let newMessages = [];
                documentsSnapshot.forEach((doc) => {
                    newMessages.push({
                        id: doc.id,
                        ...doc.data(),
                        createdAt: new Date(doc.data().createdAt.toMillis()),
                    });
                });
                cacheMessageLists(newMessages);
                setMessages(newMessages);
            });
        } else loadCachedLists();

        return () => {
            if (unsubMessages) unsubMessages();
        };
    }, []);

    const cacheMessageLists = async (listToCache) => {
        try {
            await AsyncStorage.setItem("chatMessage-list", JSON.stringify(listToCache));
        } catch (error) {
            console.log(error.message);
        }
    };
    // Static Message
    useEffect(() => {}, []);
    const onSend = (newMessages) => {
        addDoc(collection(db, "messages"), newMessages[0]);
        setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));
    };

    // Bubble
    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: "rgba(0,0,0,.7)",
                    },
                    left: {
                        backgroundColor: "rgba(255,255,255,.7)",
                    },
                }}
            />
        );
    };

    // Date
    const renderDay = (props) => <Day {...props} textStyle={{ color: "#000", fontSize: 10 }} />;
    const renderInputToolbar = (props) => {
        if (isConnected) return <InputToolbar {...props} />;
        else return null;
    };
    const renderCustomActions = (props) => {
        return <CustomActions storage={storage} userID={userID} {...props} />;
    };
    const renderCustomView = (props) => {
        const { currentMessage } = props;
        if (currentMessage.location) {
            return (
                <MapView
                    style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
                    region={{
                        latitude: currentMessage.location.latitude,
                        longitude: currentMessage.location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            );
        }
        return null;
    };
    return (
        <ImageBackground source={require("../img/chatbox-img.gif")} style={styles.backgroundImage}>
            <View style={styles.container}>
                <GiftedChat
                    messages={messages}
                    renderBubble={renderBubble}
                    renderDay={renderDay}
                    renderActions={renderCustomActions}
                    onSend={(messages) => onSend(messages)}
                    renderInputToolbar={renderInputToolbar}
                    renderCustomView={renderCustomView}
                    user={{
                        _id: userID,
                    }}
                />
                {Platform.OS === "android" ? <KeyboardAvoidingView behavior="height" /> : null}
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
    },
});
