import React, {useEffect, useRef, useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Share from 'react-native-share';
import {addCompletedTask, resetTimer, setIsActive, setTimeLeftRedux} from '../redux/slices/plannerSlice';
import {useDispatch} from 'react-redux';
import {addMood} from '../redux/slices/moodSlice';
import {saveQuote} from '../redux/slices/quoteSlice';

const HomeScreen = ({ navigation }) => {
    const [step, setStep] = useState(0);
    const [timeLeft, setTimeLeft] = useState(600);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [selectedMood, setSelectedMood] = useState(null);
    const [tempSelectedMood, setTempSelectedMood] = useState(null);
    const dispatch = useDispatch();
    const plannerTasks = [
        "Create a detailed to-do list for today, prioritizing tasks.",
        "Break down a long-term goal into smaller, actionable steps.",
        "Schedule 30 minutes for uninterrupted focus time.",
        "Set reminders for all deadlines you need to meet this week.",
        "Review your calendar for the week ahead and make adjustments.",
        "Clean and organize your workspace for a fresh start.",
        "Plan meals for the week ahead and prepare a shopping list.",
        "Set a timer for 25 minutes of focused work (Pomodoro technique).",
        "Revisit your long-term goals and adjust the steps if needed.",
        "Identify and eliminate one recurring distraction in your routine.",
        "Set a goal for today and break it into 3 smaller tasks.",
        "Review the progress of your current projects and evaluate next steps.",
        "Write a quick reflection at the end of the day on what worked and what didn’t.",
        "Organize your digital files and delete any unnecessary documents.",
        "Schedule time for self-care and relaxation in your calendar.",
        "Spend 15 minutes planning your tasks for the next day before finishing work today.",
        "Start a habit tracker to monitor your daily progress.",
        "Set a budget and plan your expenses for the month.",
        "Make a plan for tomorrow’s major task and prepare everything you need.",
        "Clean up your email inbox and respond to important messages."
    ];

    const plannerQuotes = [
        '"A goal without a plan is just a wish." — Antoine de Saint-Exupéry',
        '"Success is the sum of small efforts, repeated day in and day out." — Robert Collier',
        '"The secret of getting ahead is getting started." — Mark Twain',
        '"By failing to prepare, you are preparing to fail." — Benjamin Franklin',
        '"The future depends on what you do today." — Mahatma Gandhi',
        '"Plans are nothing; planning is everything." — Dwight D. Eisenhower',
        '"If you fail to plan, you are planning to fail." — Alan Lakein',
        '"Do not wait to strike till the iron is hot, but make it hot by striking." — William Butler Yeats',
        '"Time management is life management." — Robin Sharma',
        '"Don’t watch the clock; do what it does. Keep going." — Sam Levenson',
        '"A little progress each day adds up to big results." — Satya Nani',
        '"Success is the result of preparation, hard work, and learning from failure." — Colin Powell',
        '"You don’t have to be great to start, but you have to start to be great." — Zig Ziglar',
        '"Start where you are. Use what you have. Do what you can." — Arthur Ashe',
        '"Discipline is the bridge between goals and accomplishment." — Jim Rohn',
        '"It’s not the will to win that matters—everyone has that. It’s the will to prepare to win that matters." — Paul Bryant',
        '"Take care to get what you like or you will be forced to like what you get." — George Bernard Shaw',
        '"The harder you work for something, the greater you’ll feel when you achieve it." — Anonymous',
        '"Success usually comes to those who are too busy to be looking for it." — Henry David Thoreau',
        '"Motivation is what gets you started. Habit is what keeps you going." — Jim Ryun'
    ];

    const tips = [
        "Break your large tasks into smaller, manageable steps.",
        "Create a to-do list for every day and prioritize tasks.",
        "Set clear deadlines for each task and stick to them.",
        "Use a calendar to plan out your week ahead.",
        "Review your goals every morning to stay focused.",
        "Batch similar tasks together to improve productivity.",
        "Minimize distractions by setting specific times for work.",
        "Always have a plan for the day, even if it's simple.",
        "Take 5-minute breaks every hour to avoid burnout.",
        "Use tools like task managers or planners to keep track of your progress.",
        "Set monthly goals and break them down into weekly tasks.",
        "Use color-coding for your calendar or to-do list for better organization.",
        "Keep your workspace clean and organized for better focus.",
        "At the end of the day, review what you accomplished and plan for tomorrow.",
        "Prioritize self-care by scheduling time for exercise and rest.",
        "Set both short-term and long-term goals to maintain perspective.",
        "Say “no” to tasks that don’t align with your priorities.",
        "Reflect weekly on your productivity and make adjustments to your plan.",
        "Celebrate small wins to stay motivated.",
        "Use productivity apps to track time and stay organized."
    ];

    useEffect(() => {
        let timer;
        if (step === 1 && isTimerActive && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => {
                    const newTime = prev - 1;
                    return newTime;
                });
            }, 1000);
        }

        if (timeLeft === 0 && step === 1) {
            setIsTimerActive(false);
            setStep(2);
        }

        return () => clearInterval(timer);
    }, [timeLeft, isTimerActive, step]);

    useEffect(() => {
        if (step === 1) {
            setTimeLeft(600);
            setIsTimerActive(true);}
    }, [step]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' + s : s}`;
    };

    const handleStopTimer = () => {
        const timeSpent = 600 - timeLeft;
        dispatch(addCompletedTask({
            task: currentTaskRef.current,
            timeSpent: timeSpent,
        }));
        setIsTimerActive(false);
        setStep(step + 1);
    };


    const getRandomElement = (array) => {
        const index = Math.floor(Math.random() * array.length);
        return array[index];
    };

    const currentTaskRef = useRef(getRandomElement(plannerTasks));

    const getContent = () => {
        switch (step) {
            case 0:
                return getRandomElement(tips);
            case 1:
                return currentTaskRef.current;
            case 2:
            default:
                return getRandomElement(plannerQuotes);
        }
    };

    const handleShare = async () => {
        const shareOptions = {
            message: getContent() || 'Keep pushing forward!',
        };
        try {
            await Share.open(shareOptions);
        } catch (error) {
            console.log('Error sharing:', error);
        }
    };

    const handleMoodSelect = (index) => {
        setSelectedMood(index);
        dispatch(addMood(index));
    };


    return (
        <View style={styles.container}>
            <Text style={styles.dateText}>12.03.2022</Text>
            <View style={styles.welcomeBox}>
                <Text style={styles.welcomeText}>Welcome, [nickname]</Text>
            </View>

            <View style={styles.progressRow}>
                <View style={[styles.progressIconBox, step !== 0 && { opacity: 0.5 }]}>
                    <Image source={require('../assets/img/Frame38.png')} style={styles.iconImage} />
                </View>
                <View style={[styles.progressIconBox, step !== 1 && { opacity: 0.5 }]}>
                    <Image source={require('../assets/img/Frame41.png')} style={styles.iconImage} />
                </View>
                <View style={[styles.progressIconBox, step !== 2 && { opacity: 0.5 }]}>
                    <Image source={require('../assets/img/Frame40.png')} style={styles.iconImage} />
                </View>
                <View style={[styles.progressIconBox, step !== 3 && { opacity: 0.5 }]}>
                    <Image source={require('../assets/img/fyuqwgffq.png')} style={styles.iconImage} />
                </View>
            </View>

            <Text style={styles.stepTitle}>
                {step < 4 ? `Step ${step + 1}: Daily tip` : `Your Daily Self-Improvement Session is Complete! \n \n Great job today! You've made progress and taken a step forward in your self-development journey. Remember, growth is a continuous process, and every small effort counts. Come back tomorrow for more motivation, tasks, and insights to keep improving yourself.`}
            </Text>

            {step === 0 && (
                <View style={styles.tipBox}>
                    <Text style={styles.tipText}>{getContent()}</Text>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.tipButton} onPress={() => setStep(step + 1)}>
                            <Text style={styles.buttonText}>Next</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.tipButton, {flexDirection: 'row',alignItems: 'center'}]} onPress={handleShare}>
                            <Image source={require('../assets/img/ri_share-fill.png')}/>
                            <Text style={styles.buttonText}>Share</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {step === 1 && (
                <View style={styles.tipBox}>
                    <Image source={require('../assets/img/Frame41.png')} />
                    <Text style={styles.tipText}>Break down a long-term goal into smaller, actionable steps</Text>

                    <View style={styles.timerBox}>
                        <Text style={styles.timerText}>⏰ {formatTime(timeLeft)}</Text>
                    </View>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.tipButton} onPress={handleStopTimer}>
                            <Text style={styles.buttonText}>Stop</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.tipButton} onPress={handleShare}>
                            <Text style={styles.buttonText}>Share</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {step === 2 && (
                <View style={styles.tipBox}>
                    <Text style={styles.tipText}>{getContent()}</Text>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.tipButton} onPress={() => setStep(step + 1)}>
                            <Text style={styles.buttonText}>Next</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.tipButton, {flexDirection: 'row',alignItems: 'center'}]} onPress={handleShare}>
                            <Image source={require('../assets/img/ri_share-fill.png')}/>
                            <Text style={styles.buttonText}>Share</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={[styles.tipButton, { flexDirection: 'row', alignItems: 'center', marginTop: 12 }]}
                        onPress={() => dispatch(saveQuote(getContent()))}
                    >
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>

                </View>
            )}

            {step === 3 && (
                <View style={styles.tipBox}>
                    <Text style={styles.stepTitle}>Step 4: Mood Tracker</Text>
                    <Text style={styles.tipText}>Choose how you feel right now.</Text>

                    <View style={styles.emojiRow}>
                        {['😃', '😐', '🥴'].map((emoji, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.emojiButton,
                                    tempSelectedMood === index && styles.emojiSelected,
                                ]}
                                onPress={() => {
                                    handleMoodSelect(index);
                                    setStep(step + 1);
                                }}
                            >
                                <Text style={styles.emoji}>{emoji}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>


                    <TouchableOpacity onPress={() => setStep(step + 1)}>
                        <Text style={styles.skipText}>Skip</Text>
                    </TouchableOpacity>
                </View>
            )}



            <View style={styles.floatingNav}>
                <TouchableOpacity style={styles.fabIcon} onPress={() => navigation.replace('InspirationScreen')}>
                    <Image source={require('../assets/img/mingcute_ai-line.png')} style={styles.fabImage} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.fabIcon} onPress={() => navigation.replace('StatisticsScreen')}>
                    <Image source={require('../assets/img/hugeicons_profile.png')} style={styles.fabImage} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.fabIcon} onPress={() => navigation.replace('SavedQuotesScreen')}>
                    <Image source={require('../assets/img/solar_bookmark-outline.png')} style={styles.fabImage} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.fabIcon} onPress={() => navigation.replace('Home')}>
                    <Image source={require('../assets/img/hugeicons_task-01.png')} style={styles.fabImage} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2B46B2',
        alignItems: 'center',
        paddingTop: 80,
        paddingHorizontal: 20,
    },
    timerBox: {
        backgroundColor: '#DDE1F8',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 14,
        marginBottom: 10,
    },
    dateText: {
        backgroundColor: '#6A78DD',
        color: 'white',
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginBottom: 16,
        fontSize: 14,
    },
    welcomeBox: {
        backgroundColor: 'white',
        borderRadius: 20,
        paddingVertical: 14,
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    welcomeText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#222',
    },
    progressRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
        width: '100%',
        paddingHorizontal: 10,
    },
    emojiRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
        gap: 20
    },

    emojiButton: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#DDE1F8',
    },

    emojiSelected: {
        backgroundColor: '#DDE1F8',
        borderColor: '#2B46B2',
    },

    emoji: {
        fontSize: 32,
    },

    skipText: {
        color: '#2B46B2',
        marginTop: 10,
        fontWeight: '600',
        fontSize: 16,
    },

    progressIconBox: {},
    iconImage: {
        width: 32,
        height: 32,
    },
    stepTitle: {
        backgroundColor: 'white',
        textAlign: 'center',
        borderRadius: 14,
        paddingVertical: 8,
        paddingHorizontal: 24,
        color: '#2B46B2',
        fontWeight: 'bold',
        marginBottom: 16,
    },
    tipBox: {
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 20,
        width: '100%',
        alignItems: 'center',
    },
    tipText: {
        fontSize: 16,
        color: '#222',
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 12,
    },
    tipButton: {
        backgroundColor: '#2B46B2',
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 14,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
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
    fabImage: {
        width: 24,
        height: 24,
    },
});

export default HomeScreen;
