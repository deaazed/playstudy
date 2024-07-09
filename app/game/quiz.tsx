import TopBarGames from '@/components/TopBarGames';
import { getQuestionsByLevel } from '@/models/questions';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AstronotWin, AstronotLose } from '@/assets/images';
import { setAward } from '@/models/awards';
import { useUsers } from '@/components/UsersContext';

const QuizPage = () => {
    const params = useLocalSearchParams();
    const { state, dispatch } = useUsers();
    const [questionIndex, setQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [questions, setQuestions] = useState<Parse.Object[] | null >(null);
    const [progress, setProgress] = useState<number>(0);
    const [color, setColor] = useState<string>('#3444F1');
    const [answerHandler, setAnswerHandler] = useState<JSX.Element | null>(null);

    useEffect(() => {
        getQuestionsByLevel(parseInt(params.level as string)).then((questions) => {
            setQuestions(questions);
        });
        setProgress(parseInt(params.progress as string));
        setColor(params.color as string);
    }, []);

    const handleAnswer = (selectedAnswer: string) => {
        const currentQuestion = questions && questions[questionIndex];
        if (selectedAnswer === currentQuestion?.get('solution')) {
            setAnswerHandler(rendAnwerBanner(true));
        }
        else {
            setAnswerHandler(rendAnwerBanner(false));
        }
    };

    const handleNextQuestion = (win : boolean) => {
        if (win) {
            setAward(state.themes.find((theme: Parse.Object) => theme.id === params.theme) as Parse.Object, state.games.find((game: Parse.Object) => game.id === params.game) as Parse.Object, state.user as Parse.User, questions?.[questionIndex] as Parse.Object)
            .then(() => {
                setProgress(progress + 1);
                setQuestionIndex(questionIndex + 1);
                setAnswerHandler(null);
            });
        }
        else {
            setAnswerHandler(null);
        }
    }
    

    const rendAnwerBanner = (win : boolean) => {
        return (
            <View style={{ flex: 0.2, padding: 10, bottom: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: win ? '#F5FFD8' : '#FFDDD8', width: '100%', borderRadius: 10 }}>
                <Text style={{ color: win ? '#99CC29' : '#FF4B4C', fontSize: 20, fontFamily: 'PopinsRegular' }}>{win ? 'Bonne réponse!' : 'Oups...'}</Text>
                {!win && <Text style={{ color:'#FF4B4C', fontSize: 20, fontFamily: 'PopinsRegular' }}>Réessaye encore</Text>}
                <View style={{ left : 0, position: 'absolute' }}>
                { win ? <AstronotWin /> : <AstronotLose /> }
                </View>
                <Pressable
                    style={{ backgroundColor: win ? '#99CC29' : '#FF4B4C', paddingHorizontal: 50, borderRadius: 50, marginTop: 10 }}
                    onPress={() => handleNextQuestion(win)}
                >
                    <Text style={{ color: '#fff', fontSize: 14, fontFamily: 'PopinsRegular' }}>{ win ? 'SUIVANT' : 'Réessayer' }</Text>
                </Pressable>
            </View>
        );
    }

    const renderQuestion = () => {
        const currentQuestion = questions && questions[questionIndex];
        function shuffleArray(array: Array<any>) {
            return [...array].sort(() => Math.random() - 0.5);
        }
        function randomBetween(min: number, max: number) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        return (
            <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{currentQuestion?.get('question')}</Text>
            {shuffleArray(currentQuestion?.get('options')).map((option : any, index : any) => (
            <TouchableOpacity
                key={index}
                style={[styles.optionButton, { transform: [{ translateX: randomBetween(-150, 150) }] }]}
                onPress={() => handleAnswer(option)}
            >
                <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
            ))}
            </View>
        );
    };

    const renderResult = () => {
        return (
            <View style={styles.resultContainer}>
                <Text style={styles.resultText}>Quiz completed!</Text>
                <Text style={styles.scoreText}>Your score: {score}/{questions?.length}</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={{ backgroundColor: '#fff', flex: 1, margin: 0, padding: 0}}>
        <TopBarGames title="Quiz" progress={progress} color={color} />
        <View style={styles.container}>
            {questions && questionIndex < questions.length ? renderQuestion() : renderResult()}
            {answerHandler}
        </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    questionContainer: {
        flex: 0.9,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
    questionText: {
        fontSize: 20,
        fontFamily: 'PopinsRegular',
        marginBottom: 70,
        textAlign: 'center',
    },
    optionButton: {
        backgroundColor: '#eaeaea',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    optionText: {
        fontSize: 16,
    },
    resultContainer: {
        alignItems: 'center',
    },
    resultText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    scoreText: {
        fontSize: 18,
    },
});

export default QuizPage;