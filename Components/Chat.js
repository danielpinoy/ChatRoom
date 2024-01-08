import { useState, useCallback, useEffect } from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView, ImageBackground, Alert } from "react-native";
import { Bubble, GiftedChat, Day } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";

export default Chat = ({ route, navigation, db }) => {
    const { user, color, userID } = route.params;
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // navigation.setOptions({ title: name });

        const q = query(
            collection(db, "messages"),
            // where("uid", "==", userID),
            orderBy("createdAt", "desc")
        );
        const unsubMessages = onSnapshot(q, (documentsSnapshot) => {
            let newMessages = [];
            documentsSnapshot.forEach((doc) => {
                newMessages.push({
                    id: doc.id,
                    ...doc.data(),
                    createdAt: new Date(doc.data().createdAt.toMillis()),
                });
            });
            setMessages(newMessages);
        });

        return () => {
            if (unsubMessages) unsubMessages();
        };
    }, []);

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

    return (
        <ImageBackground source={require("../img/chatbox-img.gif")} style={styles.backgroundImage}>
            <View style={styles.container}>
                <GiftedChat
                    messages={messages}
                    renderBubble={renderBubble}
                    renderDay={renderDay}
                    onSend={(messages) => onSend(messages)}
                    user={{
                        _id: 1,
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
