import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const WelcomeScreen3 = ({ navigation }) => {
    return (
        <View style={styles.container}>

            <Image
                source={require('../assets/img/unsplash_fIq0tET6llw.png')}
                style={styles.icon}
            />

            <View style={styles.bottomCard}>
                <Text style={styles.subtitle}>
                    In PAIRESA, you’ll receive
                </Text>
                <Text style={styles.description}>
                    Daily motivation and tips
                    Personalized advice based on your goals
                    A progress tracker to see your growth
                    Community to share and grow together"
                </Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('WelcomeScreen4')}
                >
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

export default WelcomeScreen3;

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
        marginBottom: -50,
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
        paddingBottom: 120,
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
