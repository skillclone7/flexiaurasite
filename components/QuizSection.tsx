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

    // Initialize random question order
    useEffect(() => {
        const shuffled = [...Array(QUIZ_QUESTIONS.length).keys()].sort(() => Math.random() - 0.5);
        setQuestionOrder(shuffled);
    }, []);

    const currentQuestion: QuizQuestion | null = questionOrder.length > 0
        ? QUIZ_QUESTIONS[questionOrder[currentQuestionIndex]]
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

        // If we've completed all 50 questions, restart
        if (nextIndex >= QUIZ_QUESTIONS.length) {
            // Reshuffle and restart
            const shuffled = [...Array(QUIZ_QUESTIONS.length).keys()].sort(() => Math.random() - 0.5);
            setQuestionOrder(shuffled);
            setCurrentQuestionIndex(0);
        } else {
            setCurrentQuestionIndex(nextIndex);
        }

        setSelectedAnswer(null);
        setShowResult(false);
    };

    const resetQuiz = () => {
        setScore(0);
        setQuestionsAnswered(0);
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setShowResult(false);
        const shuffled = [...Array(QUIZ_QUESTIONS.length).keys()].sort(() => Math.random() - 0.5);
        setQuestionOrder(shuffled);
    };

    if (!currentQuestion) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-text">{t('loading')}</div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            {/* Score Display */}
            <div className="flex justify-between items-center mb-6 bg-gradient-to-r from-primary to-secondary p-4 rounded-lg text-white">
                <div className="text-lg font-semibold">
                    {t('score')}: {score} / {questionsAnswered}
                    {questionsAnswered > 0 && (
                        <span className="ml-2 text-sm opacity-80">
                            ({Math.round((score / questionsAnswered) * 100)}%)
                        </span>
                    )}
                    <span className="ml-4 text-sm opacity-70">
                        {t('quizQuestion')} {currentQuestionIndex + 1} {t('quizOf')} {QUIZ_QUESTIONS.length}
                    </span>
                </div>
                <button
                    onClick={resetQuiz}
                    className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded transition-colors text-sm"
                >
                    {t('resetQuiz')}
                </button>
            </div>

            {/* Question Card */}
            <div className="bg-card rounded-xl shadow-2xl p-8 border-2 border-primary/20">
                {/* Category Badge */}
                <div className="mb-4">
                    <span className="inline-block bg-accent text-black px-4 py-1 rounded-full text-sm font-semibold">
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
                            bgColor = 'bg-primary/20';
                            borderColor = 'border-primary';
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
                                ? 'bg-primary text-white hover:bg-secondary cursor-pointer'
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
                                onClick={nextQuestion}
                                className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition-colors"
                            >
                                {currentQuestionIndex + 1 >= QUIZ_QUESTIONS.length ? `${t('restartQuiz')} →` : `${t('nextQuestion')} →`}
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Progress Info */}
            {showResult && currentQuestionIndex + 1 >= QUIZ_QUESTIONS.length && (
                <div className="mt-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-4 rounded-lg border border-purple-500/30">
                    <p className="text-sm text-text/80">
                        <span className="font-semibold text-purple-600">🎊 {t('congrats')}</span>{' '}
                        {t('quizCompleteMsg')}
                    </p>
                </div>
            )}
        </div>
    );
};

export default QuizSection;
