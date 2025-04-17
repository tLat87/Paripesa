import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Share from 'react-native-share';
import {clearMoods} from '../redux/slices/moodSlice';
import {useDispatch, useSelector} from 'react-redux';
import {removeTasks} from '../redux/slices/plannerSlice';

const StatisticsScreen = ({ navigation }) => {

    const moodHistory = useSelector((state) => state.mood.moodHistory);
    const dispatch = useDispatch();
    console.log('moodHistory: ', moodHistory);
    const completedTasks = useSelector((state) => state.completedTasks.completedTasks);


    const stats = [
        { emoji: '😃', percentage: moodHistory === 0 && '100%' },
        { emoji: '😐', percentage: moodHistory === 1 && '100%' },
        { emoji: '🥴', percentage: moodHistory === 2 && '100%' },
    ];

    const handleDelete = () => {
        dispatch(clearMoods());
        dispatch(removeTasks())
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerBox}>
                <Text style={styles.headerText}>Your statistics</Text>
            </View>

            <View style={styles.barsContainer}>
                {stats.map((item, index) => (
                    <View key={index} style={styles.statBlock}>
                        <View style={[styles.barWrapper]}>
                            <View
                                style={[
                                    styles.barFill,
                                    { height: `${item.percentage}` },
                                ]}
                            />
                        </View>
                        <Text style={styles.emoji}>{item.emoji}</Text>
                        <Text style={styles.percentText}>{item.percentage}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.completedBox}>
                <Text style={styles.completedText}>Tasks completed: </Text>
            </View>

            <View style={{ marginBottom: 20, width: '100%' }}>
                {completedTasks.length > 0 ? (
                    completedTasks.map((item, index) => (
                        <View key={index} style={{
                            backgroundColor: 'white',
                            borderRadius: 12,
                            padding: 12,
                            marginBottom: 10,
                        }}>
                            <Text style={{ color: '#222', fontWeight: 'bold' }}>✅ {item.task}</Text>
                            <Text style={{ color: '#555' }}>⏱ Done in {Math.floor(item.timeSpent / 60)}m {item.timeSpent % 60}s</Text>
                        </View>
                    ))
                ) : (
                    <Text style={{ color: 'white', textAlign: 'center' }}>No tasks completed yet.</Text>
                )}
            </View>


            <TouchableOpacity style={styles.shareButton} onPress={{}}>
                <Image source={require('../assets/img/ri_share-fill.png')} style={styles.shareIcon} />
                <Text style={styles.shareText}>Share</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleDelete}>
                <Text style={styles.deleteText}>Delete my progress</Text>
            </TouchableOpacity>

            {/* Floating Nav */}
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
        </View>
    );
};

export default StatisticsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2B46B2',
        alignItems: 'center',
        paddingTop: 100,
        paddingHorizontal: 20,
    },
    headerBox: {
        backgroundColor: 'white',
        borderRadius: 20,
        paddingVertical: 14,
        paddingHorizontal: 24,
        marginBottom: 30,
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#222',
    },
    barsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 30,
    },
    statBlock: {
        alignItems: 'center',
    },
    barWrapper: {
        width: 30,
        height: 80,
        borderRadius: 12,
        backgroundColor: '#E0E0E0',
        overflow: 'hidden',
        justifyContent: 'flex-end',
        marginBottom: 8,
    },
    barFill: {
        backgroundColor: 'white',
        width: '100%',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    emoji: {
        fontSize: 24,
    },
    percentText: {
        color: 'white',
        fontWeight: 'bold',
    },
    completedBox: {
        backgroundColor: 'white',
        borderRadius: 20,
        paddingVertical: 14,
        paddingHorizontal: 30,
        marginBottom: 20,
    },
    completedText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#222',
    },
    shareButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: 'white',
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 24,
        marginBottom: 20,
    },
    shareIcon: {
        width: 18,
        height: 18,
        tintColor: 'white',
        marginRight: 10,
    },
    shareText: {
        color: 'white',
        fontWeight: 'bold',
    },
    deleteText: {
        color: 'white',
        textDecorationLine: 'underline',
        fontWeight: '600',
    },
});
