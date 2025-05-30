import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Image } from 'react-native';

const inspirations = [
    {
        "title": "Take the First Step",
        "prompt": "The journey to your goal begins with a single step. What small action can you take today to move forward?",
        "image": require('../assets/img/90bc7ed1d499c63315aa922a877870e2f9c0b89e.png'),
    },
    {
        "title": "Celebrate Small Wins",
        "prompt": "Success is built on small victories. What’s one thing you accomplished today, no matter how small?",
        "image": require('../assets/img/fe91830359583291520eee1a0b1ae0084ce00f99.png'),
    },
    {
        "title": "Focus on Today",
        "prompt": "Don’t stress about tomorrow; focus on what you can achieve today. What’s one thing you can do right now?",
        "image": require('../assets/img/2859673d2008830554d080097553ad6e3a87235f.png'),
    },
    {
        "title": "Embrace Change",
        "prompt": "Change is a chance for growth. How can you embrace a new experience or challenge today?",
        "image": require('../assets/img/90bc7ed1d499c63315aa922a877870e2f9c0b89e.png'),    },
    {
        "title": "Push Through Challenges",
        "prompt": "Obstacles are opportunities for growth. What challenge can you face today with courage?",
        "image": require('../assets/img/fe91830359583291520eee1a0b1ae0084ce00f99.png'),
    },
    {
        "title": "Stay Grateful",
        "prompt": "Gratitude can shift your perspective. What are three things you’re grateful for today?",
        "image": require('../assets/img/2859673d2008830554d080097553ad6e3a87235f.png'),
    },
    {
        "title": "Trust Your Journey",
        "prompt": "Believe in your progress. Trust that the path you’re on is leading you toward something great.",
        "image": require('../assets/img/90bc7ed1d499c63315aa922a877870e2f9c0b89e.png'),
    },
    {
        "title": "Learn from Failures",
        "prompt": "Failure is not the opposite of success, it’s part of the journey. What lesson can you learn from a past mistake?",
        "image": require('../assets/img/fe91830359583291520eee1a0b1ae0084ce00f99.png'),
    },
    {
        "title": "Be Present",
        "prompt": "The present moment is the only one you truly control. How can you stay present in your day today?",
        "image": require('../assets/img/2859673d2008830554d080097553ad6e3a87235f.png'),
    },
    {
        "title": "Believe in Yourself",
        "prompt": "Self-belief is the foundation of all achievement. What positive affirmation can you say to yourself today?",
        "image": require('../assets/img/90bc7ed1d499c63315aa922a877870e2f9c0b89e.png'),
    }
]


const InspirationScreen = ({navigation}) => {
    const [loading, setLoading] = useState(false);
    const [inspirationVisible, setInspirationVisible] = useState(false);
    const [inspiration, setInspiration] = useState(null);

    const handleInspirePress = () => {
        setLoading(true);
        setTimeout(() => {
            const randomInspo = inspirations[Math.floor(Math.random() * inspirations.length)];
            setInspiration(randomInspo);
            setLoading(false);
            setInspirationVisible(true);
        }, 2000);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={{position: 'absolute', top: 50, left: 20}} onPress={()=>{navigation.navigate('Home')}}>
                <Text style={[styles.title, {color: '#fff'}]}>Back</Text>
            </TouchableOpacity>
            <View style={[styles.card, {marginBottom: 20}]}>
                <Text style={styles.title}>Inspiration generator</Text>
            </View>

            {!inspiration && !loading && (
                <>
                    <Image
                        source={require('../assets/img/Sparkle.png')}
                        // style={styles.icon}
                    />
                    <Text style={styles.subtitle}>Get your inspiration</Text>
                    <TouchableOpacity style={styles.button} onPress={handleInspirePress}>
                        <Text style={styles.buttonText}>Inspire me</Text>
                    </TouchableOpacity>
                </>
            )}

            {loading && <ActivityIndicator size="large" color="#fff" />}

            {inspiration && !loading && (
                <View style={styles.card}>
                    <Image source={inspiration.image} style={styles.image} />
                    <Text style={styles.cardTitle}>{inspiration.title}</Text>
                    <Text style={styles.cardText}>{inspiration.prompt}</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '100%'}}>
                        <TouchableOpacity style={styles.shareButton}>
                            <Image source={require('../assets/img/ri_share-fill.png')} />
                            <Text style={styles.shareText}>Share</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            {/*<View style={styles.floatingNav}>*/}
            {/*    <TouchableOpacity style={styles.fabIcon} onPress={() => navigation.replace('InspirationScreen')}>*/}
            {/*        <Image source={require('../assets/img/mingcute_ai-line.png')} style={styles.fabImage} />*/}
            {/*    </TouchableOpacity>*/}
            {/*    <TouchableOpacity style={styles.fabIcon} onPress={() => navigation.replace('StatisticsScreen')}>*/}
            {/*        <Image source={require('../assets/img/hugeicons_profile.png')} style={styles.fabImage} />*/}
            {/*    </TouchableOpacity>*/}
            {/*    <TouchableOpacity style={styles.fabIcon} onPress={() => navigation.replace('SavedQuotesScreen')}>*/}
            {/*        <Image source={require('../assets/img/solar_bookmark-outline.png')} style={styles.fabImage} />*/}
            {/*    </TouchableOpacity>*/}
            {/*    <TouchableOpacity style={styles.fabIcon} onPress={() => navigation.replace('Home')}>*/}
            {/*        <Image source={require('../assets/img/hugeicons_task-01.png')} style={styles.fabImage} />*/}
            {/*    </TouchableOpacity>*/}
            {/*</View>*/}
        </View>
    );
};

export default InspirationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2B46B2',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#000',
        // marginBottom: 10,
    },
    icon: {
        width: 80,
        height: 80,
        marginBottom: 15,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 20,
        marginTop: 8,
    },
    floatingNav: {
        position: 'absolute',
        right: 20,
        bottom: 40,
        backgroundColor: '#6A78DD',
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 6,
        gap: 10,
        alignItems: 'center',
    },
    fabIcon: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#3449e6',
        padding: 10,
    },
    button: {
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 30,
        marginTop: 10,
    },
    buttonText: {
        color: '#2E43F0',
        fontWeight: '600',
        fontSize: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        width: '100%',
    },
    image: {
        width: '100%',
        height: 180,
        borderRadius: 20,
        marginBottom: 15,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 8,
        color: '#333',
    },
    cardText: {
        fontSize: 15,
        textAlign: 'center',
        color: '#555',
        marginBottom: 20,
    },
    shareButton: {
        backgroundColor: '#2E43F0',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 12,
    },
    shareText: {
        color: '#fff',
        fontWeight: '600',
    },
});
