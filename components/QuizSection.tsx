import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/quizData';

const QuizSection: React.FC = () => {
    const { t, language } = useLanguage();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [questionsAnswered, setQuestionsAnswered] = useState(0);
    const [questionOrder, setQuestionOrder] = useState<number[]>([]);
    
    // New level states
    const [quizLevel, setQuizLevel] = useState(1);
    const [showLevel2Warning, setShowLevel2Warning] = useState(false);

    const questionsPerLevel = 50;
    const startIndex = (quizLevel - 1) * questionsPerLevel;
    const endIndex = quizLevel * questionsPerLevel;
    const currentLevelQuestions = QUIZ_QUESTIONS.slice(startIndex, endIndex);

    // Initialize random question order for current level
    useEffect(() => {
        const shuffled = [...Array(currentLevelQuestions.length).keys()].sort(() => Math.random() - 0.5);
        setQuestionOrder(shuffled);
        setCurrentQuestionIndex(0);
        setScore(0);
        setQuestionsAnswered(0);
    }, [quizLevel]);

    const currentQuestion: QuizQuestion | null = questionOrder.length > 0
        ? currentLevelQuestions[questionOrder[currentQuestionIndex]]
        : null;

    const handleAnswerSelect = (index: number) => {
        if (showResult) return;
        setSelectedAnswer(index);
    };

    const submitAnswer = () => {
        if (selectedAnswer === null || !currentQuestion) return;

        setShowResult(true);
        if (selectedAnswer === currentQuestion.correctAnswer) {
            setScore(score + 1);
        }
        setQuestionsAnswered(questionsAnswered + 1);
    };

    const nextQuestion = () => {
        const nextIndex = currentQuestionIndex + 1;

        if (nextIndex >= currentLevelQuestions.length) {
            // Level complete
            if (quizLevel === 1 && score + (selectedAnswer === currentQuestion?.correctAnswer ? 0 : 0) === 50) {
                // Perfect score on Level 1 (logic check: score is updated in submitAnswer, so if scors is 50 here we are good)
                // Wait, score is updated in submitAnswer. So if questionsAnswered === 50 and score === 50, Level 2 can be unlocked.
            }
        } else {
            setCurrentQuestionIndex(nextIndex);
        }

        setSelectedAnswer(null);
        setShowResult(false);
    };

    const startLevel2 = () => {
        setShowLevel2Warning(false);
        setQuizLevel(2);
    };

    const resetQuiz = () => {
        setQuizLevel(1);
        setScore(0);
        setQuestionsAnswered(0);
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setShowResult(false);
        const shuffled = [...Array(questionsPerLevel).keys()].sort(() => Math.random() - 0.5);
        setQuestionOrder(shuffled);
    };

    if (showLevel2Warning) {
        return (
            <div className="max-w-3xl mx-auto bg-card rounded-xl shadow-2xl p-10 border-4 border-red-500/30 text-center animate-pulse-slow">
                <div className="text-6xl mb-6">⚠️</div>
                <h2 className="text-3xl font-bold text-red-600 mb-4">{t('quizLevel2')}</h2>
                <p className="text-xl text-text mb-8">{t('quizLevel2Warning')}</p>
                <button
                    onClick={startLevel2}
                    className="bg-red-600 text-white px-8 py-4 rounded-xl font-bold text-xl hover:bg-red-700 transition-all transform hover:scale-105"
                >
                    {t('quizStartLevel2')}
                </button>
            </div>
        );
    }

    if (!currentQuestion) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-text">{t('loading')}</div>
            </div>
        );
    }

    const isLastQuestion = currentQuestionIndex + 1 >= currentLevelQuestions.length;
    const isPerfectScore = score === questionsPerLevel;

    return (
        <div className="max-w-3xl mx-auto">
            {/* Level & Score Display */}
            <div className={`flex justify-between items-center mb-6 p-4 rounded-lg text-white shadow-lg transition-all ${quizLevel === 2 ? 'bg-gradient-to-r from-red-600 to-black' : 'bg-gradient-to-r from-primary to-secondary'}`}>
                <div>
                    <div className="text-xs uppercase tracking-widest opacity-80 mb-1">
                        {quizLevel === 1 ? t('quizLevel1') : t('quizLevel2')}
                    </div>
                    <div className="text-lg font-semibold">
                        {t('score')}: {score} / {questionsAnswered}
                        {questionsAnswered > 0 && (
                            <span className="ml-2 text-sm opacity-80">
                                ({Math.round((score / questionsAnswered) * 100)}%)
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm border-r border-white/20 pr-4 hidden sm:inline">
                        {t('quizQuestion')} {currentQuestionIndex + 1} {t('quizOf')} {currentLevelQuestions.length}
                    </span>
                    <button
                        onClick={resetQuiz}
                        className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded transition-colors text-sm"
                    >
                        {t('resetQuiz')}
                    </button>
                </div>
            </div>

            {/* Question Card */}
            <div className={`bg-card rounded-xl shadow-2xl p-8 border-2 transition-all ${quizLevel === 2 ? 'border-red-500/40' : 'border-primary/20'}`}>
                {/* Category Badge */}
                <div className="mb-4">
                    <span className={`inline-block px-4 py-1 rounded-full text-sm font-semibold ${quizLevel === 2 ? 'bg-red-600 text-white' : 'bg-accent text-black'}`}>
                        {currentQuestion.category[language]}
                    </span>
                </div>

                {/* Question */}
                <h3 className="text-2xl font-bold text-text mb-6">
                    {currentQuestion.question[language]}
                </h3>

                {/* Options */}
                <div className="space-y-3 mb-6">
                    {currentQuestion.options.map((option, index) => {
                        let bgColor = 'bg-body hover:bg-primary/10';
                        let borderColor = 'border-gray/30';
                        let textColor = 'text-text';

                        if (showResult) {
                            if (index === currentQuestion.correctAnswer) {
                                bgColor = 'bg-green-500/20';
                                borderColor = 'border-green-500';
                                textColor = 'text-green-600';
                            } else if (index === selectedAnswer) {
                                bgColor = 'bg-red-500/20';
                                borderColor = 'border-red-500';
                                textColor = 'text-red-600';
                            }
                        } else if (selectedAnswer === index) {
                            bgColor = quizLevel === 2 ? 'bg-red-500/20' : 'bg-primary/20';
                            borderColor = quizLevel === 2 ? 'border-red-500' : 'border-primary';
                        }

                        return (
                            <button
                                key={index}
                                onClick={() => handleAnswerSelect(index)}
                                disabled={showResult}
                                className={`w-full p-4 rounded-lg border-2 transition-all text-left ${bgColor} ${borderColor} ${textColor} ${!showResult ? 'cursor-pointer' : 'cursor-default'
                                    }`}
                            >
                                <span className="font-semibold mr-3">
                                    {String.fromCharCode(65 + index)}.
                                </span>
                                {option[language]}
                                {showResult && index === currentQuestion.correctAnswer && (
                                    <span className="float-right text-green-600">✓</span>
                                )}
                                {showResult && index === selectedAnswer && index !== currentQuestion.correctAnswer && (
                                    <span className="float-right text-red-600">✗</span>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                    {!showResult ? (
                        <button
                            onClick={submitAnswer}
                            disabled={selectedAnswer === null}
                            className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${selectedAnswer !== null
                                ? (quizLevel === 2 ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-primary text-white hover:bg-secondary') + ' cursor-pointer'
                                : 'bg-gray/30 text-gray cursor-not-allowed'
                                }`}
                        >
                            {t('submitAnswer')}
                        </button>
                    ) : (
                        <>
                            <div className={`flex-1 py-3 rounded-lg font-semibold text-center ${selectedAnswer === currentQuestion.correctAnswer
                                ? 'bg-green-500 text-white'
                                : 'bg-red-500 text-white'
                                }`}>
                                {selectedAnswer === currentQuestion.correctAnswer
                                    ? `🎉 ${t('correctExclamation')}`
                                    : `❌ ${t('incorrectExclamation')}`}
                            </div>
                            <button
                                onClick={() => {
                                    if (isLastQuestion) {
                                        if (quizLevel === 1 && score === questionsPerLevel) {
                                            setShowLevel2Warning(true);
                                        } else {
                                            resetQuiz();
                                        }
                                    } else {
                                        nextQuestion();
                                    }
                                }}
                                className={`flex-1 text-white py-3 rounded-lg font-semibold transition-colors ${quizLevel === 2 ? 'bg-red-600 hover:bg-red-700' : 'bg-primary hover:bg-secondary'}`}
                            >
                                {isLastQuestion 
                                    ? (quizLevel === 1 && score === questionsPerLevel ? `${t('quizUnlockLevel2')} →` : `${t('restartQuiz')} →`)
                                    : `${t('nextQuestion')} →`}
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Results Info */}
            {showResult && isLastQuestion && (
                <div className={`mt-6 p-6 rounded-lg border animate-fade-in ${isPerfectScore ? 'bg-green-500/10 border-green-500/30' : 'bg-blue-500/10 border-blue-500/30'}`}>
                    <div className="flex items-center gap-4">
                        <div className="text-4xl">{isPerfectScore ? '🏆' : '🏁'}</div>
                        <div>
                            <h4 className="font-bold text-lg text-text">
                                {isPerfectScore ? t('quizPerfectScore') : t('congrats')}
                            </h4>
                            <p className="text-text/70">{t('quizCompleteMsg')}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuizSection;
