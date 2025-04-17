import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import Share from 'react-native-share';
import {useDispatch, useSelector} from 'react-redux';
import {clearMoods} from '../redux/slices/moodSlice';
import {removeTasks} from '../redux/slices/plannerSlice';
import {clearQuotes} from '../redux/slices/quoteSlice';

const SavedQuotesScreen = ({navigation}) => {
    const savedQuotes = useSelector((state) => state.savedQuotes.savedQuotes);
    const dispatch = useDispatch();

    const handleShare = async (message) => {
        try {
            await Share.open({ message });
        } catch (error) {
            console.log('Error sharing:', error);
        }
    };


    const handleDelete = () => {
        dispatch(clearQuotes());
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerBox}>
                <Text style={styles.headerText}>Saved quotes</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {savedQuotes.length > 0 ? (
                    savedQuotes.map((quote, index) => {
                        const date = quote.date || new Date().toLocaleDateString('en-GB'); // формат: DD/MM/YYYY
                        return (
                            <View key={index} style={styles.quoteBox}>
                                <View style={styles.dateWrapper}>
                                    <Text style={styles.dateText}>{date}</Text>
                                </View>
                                <Text style={styles.quoteText}>{quote.text || quote}</Text>
                                <View style={styles.buttonRow}>
                                    <TouchableOpacity style={styles.actionButton} onPress={() => handleShare(quote.text || quote)}>
                                        <Image source={require('../assets/img/ri_share-fill.png')} style={styles.actionIcon} />
                                        <Text style={styles.buttonText}>Share</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.actionButton}>
                                        <Image source={require('../assets/img/ic_round-done-all.png')} style={styles.actionIcon} />
                                        <Text style={styles.buttonText}>Saved</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    })
                ) : (
                    <View style={{ paddingTop: 40, alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 16 }}>No saved quotes yet 😔</Text>
                    </View>
                )}

                <TouchableOpacity onPress={handleDelete}>
                    <Text style={styles.deleteText}>Delete my progress</Text>
                </TouchableOpacity>

            </ScrollView>

            <View style={{ position: 'absolute',
                right: 20,
                bottom: 40,
                backgroundColor: '#6A78DD',
                borderRadius: 30,
                paddingVertical: 10,
                paddingHorizontal: 6,
                gap: 10,
                alignItems: 'center',}}>
                <TouchableOpacity style={{borderRadius: 20,
                    borderWidth: 1,
                    borderColor: '#3449e6',
                    padding: 10,}} onPress={()=>{navigation.replace('InspirationScreen')}}>
                    <Image source={require('../assets/img/mingcute_ai-line.png')} style={{ width: 24,
                        height: 24,}} />
                </TouchableOpacity>
                <TouchableOpacity style={{borderRadius: 20,
                    borderWidth: 1,
                    borderColor: '#3449e6',
                    padding: 10,}} onPress={()=>{navigation.replace('StatisticsScreen')}}>
                    <Image source={require('../assets/img/hugeicons_profile.png')} style={{ width: 24,
                        height: 24,}} />
                </TouchableOpacity>
                <TouchableOpacity style={{borderRadius: 20,
                    borderWidth: 1,
                    borderColor: '#3449e6',
                    padding: 10,}} onPress={()=>{navigation.replace('SavedQuotesScreen')}}>
                    <Image source={require('../assets/img/solar_bookmark-outline.png')} style={{ width: 24,
                        height: 24,}}/>
                </TouchableOpacity>
                <TouchableOpacity style={{borderRadius: 20,
                    borderWidth: 1,
                    borderColor: '#3449e6',
                    padding: 10,}} onPress={()=>{navigation.replace('Home')}}>
                    <Image source={require('../assets/img/hugeicons_task-01.png')} style={{ width: 24,
                        height: 24,}} />
                </TouchableOpacity>
            </View>
            <View style={{marginBottom: 60}}/>
        </View>
    );
};

export default SavedQuotesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2B46B2',
        paddingTop: 100,
        paddingHorizontal: 20,
    },
    headerBox: {
        backgroundColor: 'white',
        borderRadius: 20,
        paddingVertical: 14,
        paddingHorizontal: 20,
        marginBottom: 20,
        alignItems: 'center',
    },
    deleteText: {
        color: 'white',
        alignSelf: 'center',
        textDecorationLine: 'underline',
        fontWeight: '600',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#222',
    },
    scrollContainer: {
        paddingBottom: 100,
    },
    quoteBox: {
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 20,
        marginBottom: 20,
    },
    dateWrapper: {
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#2B46B2',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 4,
        marginBottom: 10,
    },
    dateText: {
        color: '#2B46B2',
        fontWeight: '600',
    },
    quoteText: {
        fontSize: 16,
        color: '#222',
        textAlign: 'center',
        marginBottom: 16,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2B46B2',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 14,
    },
    actionIcon: {
        width: 18,
        height: 18,
        marginRight: 8,
        tintColor: 'white',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    floatingButton: {
        position: 'absolute',
        right: 20,
        bottom: 30,
        backgroundColor: 'white',
        borderRadius: 30,
        padding: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
    },
    fabImage: {
        width: 24,
        height: 24,
        tintColor: '#2B46B2',
    },
});
