import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.topHalf}>
                <Image
                    source={require('../assets/img/Group2.png')}
                    style={styles.icon}
                />
            </View>

            <View style={styles.bottomCard}>
                <Text style={styles.subtitle}>
                    Welcome to PAIRESA – Your personal guide to self-improvement!
                </Text>
                <Text style={styles.description}>
                    Let’s start your journey of growth by discovering the best way for you to develop.
                </Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('WelcomeScreen2')}
                >
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2B46B2',
    },
    topHalf: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
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
        paddingBottom: 90,
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
