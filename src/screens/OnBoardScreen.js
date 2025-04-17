import React, { useState } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList, Image} from 'react-native';

const questions = [
    {
        question: 'How do you usually approach new tasks?',
        options: [
            'I create a clear plan and follow it step by step.',
            'I jump right in and figure things out as I go.',
            'I seek help and advice from others to solve the task together.',
        ],
    },
    {
        question: 'How do you typically organize your day?',
        options: [
            'I make detailed to-do lists and schedule my time carefully.',
            'I work based on inspiration and change plans as I go.',
            'I prefer working as a team and often adjust plans based on group decisions.',
        ],
    },
    {
        question: 'What’s more important for you in achieving a goal?',
        options: [
            'Sticking to a clear strategy and action plan.',
            'Being flexible and finding new approaches along the way.',
            'Working with others to achieve the best results together.',
        ],
    },
    {
        question: 'How do you typically deal with challenges?',
        options: [
            'I follow my plan and work through challenges step by step.',
            'I look for innovative solutions and try different methods.',
            'I involve others to work together and overcome the challenge.',
        ],
    },
];

const OnBoardScreen = ({ navigation }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [answers, setAnswers] = useState([]);

    const handleNext = () => {
        if (selectedOption === null) return;

        const updatedAnswers = [...answers, selectedOption];
        setAnswers(updatedAnswers);

        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedOption(null);
        } else {
            console.log('User Answers:', updatedAnswers);
            navigation.navigate('ProfileSetupScreen');
        }
    };

    const current = questions[currentQuestion];

    return (
        <View style={styles.container}>
            <Image source={require('../assets/img/hugeicons_quiz-05копія.png')} />
            <View style={styles.iconWrap}>
                <Text style={styles.questionNumber}>Question {currentQuestion + 1}</Text>
            </View>
            <Text style={styles.questionText}>{current.question}</Text>

            {current.options.map((option, index) => (
                <TouchableOpacity
                    key={index}
                    style={[
                        styles.optionButton,
                        selectedOption === index && styles.optionSelected,
                    ]}
                    onPress={() => setSelectedOption(index)}
                >
                    <View style={styles.radioCircle}>
                        {selectedOption === index && <View style={styles.radioInner} />}
                    </View>
                    <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
            ))}

            <TouchableOpacity
                style={[
                    styles.nextButton,
                    selectedOption === null && { opacity: 0.5 },
                ]}
                onPress={handleNext}
                disabled={selectedOption === null}
            >
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
};

export default OnBoardScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2B46B2',
        paddingHorizontal: 24,
        paddingTop: 80,
    },
    iconWrap: {
        marginBottom: 16,
        marginTop: 20
    },
    questionNumber: {
        backgroundColor: 'white',
        alignSelf: 'flex-start',
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 10,
        fontWeight: '600',
        color: '#2B46B2',
    },
    questionText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 24,
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2B46B2',
        borderWidth: 1.5,
        borderColor: 'white',
        borderRadius: 12,
        padding: 14,
        marginBottom: 12,
    },
    optionSelected: {
        backgroundColor: '#3B66F6',
        borderColor: '#3B66F6',
    },
    optionText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 10,
        flexShrink: 1,
    },
    radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioInner: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: 'white',
    },
    nextButton: {
        marginTop: 30,
        backgroundColor: '#3B66F6',
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: 'center',
    },
    nextButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
});
