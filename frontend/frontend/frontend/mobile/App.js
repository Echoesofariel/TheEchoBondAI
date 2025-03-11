import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';

export default function App() {
    const [userInput, setUserInput] = useState('');
    const [response, setResponse] = useState('');

    const sendMessage = async () => {
        const res = await fetch('http://127.0.0.1:5000/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: "test_user", message: userInput })
        });

        const data = await res.json();
        setResponse(`AI: ${data.ai_response} (Sentiment Score: ${data.sentiment_score.toFixed(2)})`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Echo Bond AI</Text>
            <TextInput
                style={styles.input}
                placeholder="Type your thoughts..."
                placeholderTextColor="#00ffee"
                value={userInput}
                onChangeText={setUserInput}
            />
            <Button title="Send" onPress={sendMessage} color="#00ffee" />
            <ScrollView style={styles.responseContainer}>
                <Text style={styles.response}>{response}</Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000' },
    title: { fontSize: 24, color: '#00ffee', marginBottom: 20 },
    input: { width: '80%', height: 40, borderColor: '#00ffee', borderWidth: 2, marginBottom: 10, color: '#00ffee', padding: 10, borderRadius: 5 },
    responseContainer: { marginTop: 20, width: '80%', maxHeight: 200 },
    response: { color: '#00ffee', fontSize: 16 }
});
