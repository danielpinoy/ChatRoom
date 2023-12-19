import { useState, useCallback, useEffect } from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView, ImageBackground } from "react-native";
import { Bubble, GiftedChat, Day } from "react-native-gifted-chat";

export default Chat = ({ route, navigation }) => {
    const { user, color } = route.params;
    useEffect(() => {
        navigation.setOptions({ title: user });
    }, []);

    const [messages, setMessages] = useState([]);

    // Static Message
    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: "Hello developer",
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: "React Native",
                    avatar: "https://placeimg.com/140/140/any",
                },
            },
            {
                _id: 2,
                text: "This is a system message",
                createdAt: new Date(),
                system: true,
            },
        ]);
    }, []);
    const onSend = (newMessages) => {
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
