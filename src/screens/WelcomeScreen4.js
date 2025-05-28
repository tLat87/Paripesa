import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const WelcomeScreen4 = ({ navigation }) => {
    return (
        <View style={styles.container}>

            <Image
                source={require('../assets/img/unsplash_fIq0tET6llwкопія.png')}
                style={styles.icon}
            />

            <View style={styles.bottomCard}>
                <Text style={styles.subtitle}>
                    Let’s Get to Know You
                </Text>
                <Text style={styles.description}>
                    Before we begin, we need to know a bit about you to make PAIRESA work better for you.

                    Answer a few questions about your goals, preferences, and how you approach challenges. Don’t worry, it’s quick!
                </Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('OnBoardScreen')}
                >
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

export default WelcomeScreen4;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    topHalf: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    icon: {
        width: '100%',
        // marginBottom: -50,
        height: '60%',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
    },
    bottomCard: {
        backgroundColor: 'white',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        paddingBottom: 160,
        padding: 28,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 14,
        color: '#000',
    },
    description: {
        fontSize: 15,
        color: '#555',
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#3B66F6',
        borderRadius: 30,
        paddingVertical: 14,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
});
