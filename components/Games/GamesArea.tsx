
import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { GameType } from '../../types';
import SnakeGame from './SnakeGame';
import ChessGame from './ChessGame';
import CheckersGame from './CheckersGame';
import Match3Game from './Match3Game';
import CrossyRoadGame from './CrossyRoadGame';

const GamesArea: React.FC = () => {
  const { t } = useLanguage();
  const [activeGame, setActiveGame] = useState<GameType>('snake');
  const [score, setScore] = useState(0);

  const getInstructions = () => {
    switch (activeGame) {
      case 'snake': return t('snakeInstructions');
      case 'chess': return t('chessInstructions');
      case 'checkers': return t('checkersInstructions');
      case 'candycrush': return t('candycrushInstructions');
      case 'crossyroad': return t('crossyroadInstructions');
      default: return '';
    }
  };

  const getTitle = () => {
    switch (activeGame) {
      case 'snake': return t('snakeGame');
      case 'chess': return t('chessGame');
      case 'checkers': return t('checkersGame');
      case 'candycrush': return t('candycrushGame');
      case 'crossyroad': return t('crossyroadGame');
      default: return '';
    }
  };

  return (
    <section id="games" className="py-24 bg-light-gray">
      <div className="container mx-auto px-5">
        <h2 className="font-serif text-4xl mb-5 text-primary text-center">{t('gamesTitle')}</h2>
        <p className="text-center text-gray max-w-[700px] mx-auto mb-10 text-lg">{t('gamesSubtitle')}</p>

        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {(['snake', 'chess', 'checkers', 'candycrush', 'crossyroad'] as GameType[]).map((game) => (
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

        <div className="bg-card rounded-2xl p-8 shadow-custom min-h-[500px] flex flex-col items-center justify-center">
          <div className="text-center mb-5 w-full max-w-[600px]">
            <h3 className="text-2xl font-bold mb-2 text-primary">{getTitle()}</h3>
            <p className="mb-4 text-text">{getInstructions()}</p>
            {activeGame === 'snake' && (
              <p className="font-semibold text-lg text-secondary">
                {t('score')}: <span className="text-accent">{score}</span>
              </p>
            )}
          </div>

          <div className="w-full max-w-[600px] mx-auto">
            {activeGame === 'snake' && <SnakeGame onScoreUpdate={setScore} />}
            {activeGame === 'chess' && <ChessGame />}
            {activeGame === 'checkers' && <CheckersGame />}
            {activeGame === 'candycrush' && <Match3Game />}
            {activeGame === 'crossyroad' && <CrossyRoadGame />}
          </div>
        </div>

      </div>
    </section>
  );
};

export default GamesArea;
