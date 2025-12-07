

import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { GameType } from '../../types';
import SnakeGame from './SnakeGame';
import ChessGame from './ChessGame';
import CheckersGame from './CheckersGame';
import TetrisGame from './TetrisGame';

const GamesArea: React.FC = () => {
  const { t } = useLanguage();
  const [activeGame, setActiveGame] = useState<GameType>('snake');
  const [score, setScore] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const getInstructions = () => {
    switch (activeGame) {
      case 'snake': return t('snakeInstructions');
      case 'chess': return t('chessInstructions');
      case 'checkers': return t('checkersInstructions');
      case 'tetris': return t('tetrisInstructions');
      default: return '';
    }
  };

  const getTitle = () => {
    switch (activeGame) {
      case 'snake': return t('snakeGame');
      case 'chess': return t('chessGame');
      case 'checkers': return t('checkersGame');
      case 'tetris': return t('tetrisGame');
      default: return '';
    }
  };

  return (
    <section id="games" className="py-24 bg-light-gray">
      <div className="container mx-auto px-5">
        <h2 className="font-serif text-4xl mb-5 text-primary text-center">{t('gamesTitle')}</h2>
        <p className="text-center text-gray max-w-[700px] mx-auto mb-10 text-lg">{t('gamesSubtitle')}</p>

        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {(['snake', 'chess', 'checkers', 'tetris'] as GameType[]).map((game) => (
            <button
              key={game}
              onClick={() => setActiveGame(game)}
              className={`px-6 py-3 rounded-full font-medium cursor-pointer transition-all ${activeGame === game
                ? 'bg-accent text-black'
                : 'bg-card text-text'
                }`}
            >
              {t(`${game}Game`)}
            </button>
          ))}
        </div>

        <div className={`transition-all duration-300 ${isFullscreen
          ? 'fixed inset-0 z-50 bg-card p-4 overflow-y-auto flex flex-col items-center justify-center'
          : 'bg-card rounded-2xl p-8 shadow-custom min-h-[500px] flex flex-col items-center justify-center relative'
          }`}>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="absolute top-4 right-4 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors z-10"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? '✕' : '⛶'}
          </button>

          <div className="text-center mb-5 w-full max-w-[600px]">
            <h3 className="text-2xl font-bold mb-2 text-primary">{getTitle()}</h3>
            <p className="mb-4 text-text">{getInstructions()}</p>

          </div>

          <div className={`w-full mx-auto ${isFullscreen ? 'max-w-full h-full flex items-center justify-center' : 'max-w-[600px]'}`}>
            {activeGame === 'snake' && <SnakeGame onScoreUpdate={setScore} />}
            {activeGame === 'chess' && <ChessGame />}
            {activeGame === 'checkers' && <CheckersGame />}
            {activeGame === 'tetris' && <TetrisGame />}
          </div>
        </div>

      </div>
    </section>
  );
};

export default GamesArea;
