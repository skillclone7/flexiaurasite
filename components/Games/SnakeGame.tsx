import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface SnakeGameProps {
  onScoreUpdate: (score: number) => void;
}

const GRID_SIZE = 20;
const SPEED = 150;

type Point = { x: number; y: number };
type Direction = 'up' | 'down' | 'left' | 'right';

const SnakeGame: React.FC<SnakeGameProps> = ({ onScoreUpdate }) => {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [gameRunning, setGameRunning] = useState(false);
  const [gamePaused, setGamePaused] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Game state refs to access inside interval/event loops without closure staleness
  const snakeRef = useRef<Point[]>([
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 }
  ]);
  const foodRef = useRef<Point>({ x: 5, y: 5 });
  const directionRef = useRef<Direction>('right');
  const nextDirectionRef = useRef<Direction>('right'); // Prevent 180 turn in one tick
  const gameLoopRef = useRef<number | null>(null);

  const generateFood = useCallback((currentSnake: Point[]) => {
    const width = 600 / GRID_SIZE;
    const height = 400 / GRID_SIZE;
    let newFood: Point;
    let isColliding;
    do {
      newFood = {
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height)
      };
      // eslint-disable-next-line no-loop-func
      isColliding = currentSnake.some(seg => seg.x === newFood.x && seg.y === newFood.y);
    } while (isColliding);
    return newFood;
  }, []);

  const drawGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Snake
    snakeRef.current.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? '#4CAF50' : '#8BC34A';
      ctx.fillRect(segment.x * GRID_SIZE, segment.y * GRID_SIZE, GRID_SIZE - 2, GRID_SIZE - 2);

      // Eyes
      if (index === 0) {
        ctx.fillStyle = 'white';
        const dir = directionRef.current;
        const x = segment.x * GRID_SIZE;
        const y = segment.y * GRID_SIZE;

        if (dir === 'right') {
          ctx.fillRect(x + 12, y + 6, 4, 4);
          ctx.fillRect(x + 12, y + 14, 4, 4);
        } else if (dir === 'left') {
          ctx.fillRect(x + 4, y + 6, 4, 4);
          ctx.fillRect(x + 4, y + 14, 4, 4);
        } else if (dir === 'up') {
          ctx.fillRect(x + 6, y + 4, 4, 4);
          ctx.fillRect(x + 14, y + 4, 4, 4);
        } else if (dir === 'down') {
          ctx.fillRect(x + 6, y + 12, 4, 4);
          ctx.fillRect(x + 14, y + 12, 4, 4);
        }
      }
    });

    // Draw Food
    ctx.fillStyle = '#FF5722';
    ctx.beginPath();
    ctx.arc(
      foodRef.current.x * GRID_SIZE + GRID_SIZE / 2,
      foodRef.current.y * GRID_SIZE + GRID_SIZE / 2,
      GRID_SIZE / 2 - 1,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Draw Game Over
    if (gameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'white';
      ctx.font = '30px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Fim de Jogo!', canvas.width / 2, canvas.height / 2 - 20);

      ctx.font = '20px Arial';
      ctx.fillText(`${t('score')}: ${score}`, canvas.width / 2, canvas.height / 2 + 20);
      ctx.fillText(`${t('resetGame')} para jogar novamente`, canvas.width / 2, canvas.height / 2 + 50);
    }

  }, [gameOver, score, t]);

  const resetGame = useCallback(() => {
    snakeRef.current = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 }
    ];
    directionRef.current = 'right';
    nextDirectionRef.current = 'right';
    foodRef.current = generateFood(snakeRef.current);
    setScore(0);
    onScoreUpdate(0);
    setGameOver(false);
    setGameRunning(false);
    setGamePaused(false);
    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    requestAnimationFrame(drawGame);
  }, [generateFood, onScoreUpdate, drawGame]);

  const moveSnake = useCallback(() => {
    if (gameOver || gamePaused) return;

    directionRef.current = nextDirectionRef.current;
    const head = { ...snakeRef.current[0] };

    switch (directionRef.current) {
      case 'up': head.y--; break;
      case 'down': head.y++; break;
      case 'left': head.x--; break;
      case 'right': head.x++; break;
    }

    // Wall Collision
    if (head.x < 0 || head.x >= 600 / GRID_SIZE || head.y < 0 || head.y >= 400 / GRID_SIZE) {
      setGameOver(true);
      setGameRunning(false);
      return;
    }

    // Self Collision
    for (const segment of snakeRef.current) {
      if (segment.x === head.x && segment.y === head.y) {
        setGameOver(true);
        setGameRunning(false);
        return;
      }
    }

    snakeRef.current.unshift(head);

    // Eat Food
    if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
      const newScore = score + 10;
      setScore(newScore);
      onScoreUpdate(newScore);
      foodRef.current = generateFood(snakeRef.current);
    } else {
      snakeRef.current.pop();
    }

    drawGame();
  }, [gameOver, gamePaused, score, onScoreUpdate, generateFood, drawGame]);

  const handleDirection = useCallback((dir: Direction) => {
    if (!gameRunning || gamePaused) return;

    switch (dir) {
      case 'up':
        if (directionRef.current !== 'down') nextDirectionRef.current = 'up';
        break;
      case 'down':
        if (directionRef.current !== 'up') nextDirectionRef.current = 'down';
        break;
      case 'left':
        if (directionRef.current !== 'right') nextDirectionRef.current = 'left';
        break;
      case 'right':
        if (directionRef.current !== 'left') nextDirectionRef.current = 'right';
        break;
    }
  }, [gameRunning, gamePaused]);

  // Key controls
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': handleDirection('up'); break;
        case 'ArrowDown': handleDirection('down'); break;
        case 'ArrowLeft': handleDirection('left'); break;
        case 'ArrowRight': handleDirection('right'); break;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleDirection]);

  // Initial Draw
  useEffect(() => {
    drawGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Game Loop
  useEffect(() => {
    if (gameRunning && !gamePaused && !gameOver) {
      gameLoopRef.current = window.setInterval(moveSnake, SPEED);
    } else {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    }
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [gameRunning, gamePaused, gameOver, moveSnake]);

  return (
    <div className="flex flex-col items-center w-full">
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        className="bg-body rounded-lg block mx-auto max-w-full"
      />
      <div className="flex justify-center gap-4 mt-8">
        <button
          className={`bg-primary text-white border-none px-5 py-2.5 rounded hover:bg-secondary transition-colors ${gameRunning && !gamePaused ? 'hidden' : ''}`}
          onClick={() => {
            if (gameOver) resetGame();
            setGameRunning(true);
          }}
        >
          {t('startGame')}
        </button>
        <button
          className={`bg-primary text-white border-none px-5 py-2.5 rounded hover:bg-secondary transition-colors ${!gameRunning || gameOver ? 'hidden' : ''}`}
          onClick={() => setGamePaused(!gamePaused)}
        >
          {gamePaused ? t('startGame') : t('pauseGame')}
        </button>
        <button
          className="bg-primary text-white border-none px-5 py-2.5 rounded hover:bg-secondary transition-colors"
          onClick={resetGame}
        >
          {t('resetGame')}
        </button>
      </div>

      {/* Mobile Controls */}
      <div className="mt-8 grid grid-cols-3 gap-2 md:hidden">
        <div></div>
        <button
          className="w-16 h-16 bg-gray-700 text-white rounded-full flex items-center justify-center text-2xl shadow-lg active:bg-gray-600"
          onClick={() => handleDirection('up')}
        >
          ↑
        </button>
        <div></div>
        <button
          className="w-16 h-16 bg-gray-700 text-white rounded-full flex items-center justify-center text-2xl shadow-lg active:bg-gray-600"
          onClick={() => handleDirection('left')}
        >
          ←
        </button>
        <button
          className="w-16 h-16 bg-gray-700 text-white rounded-full flex items-center justify-center text-2xl shadow-lg active:bg-gray-600"
          onClick={() => handleDirection('down')}
        >
          ↓
        </button>
        <button
          className="w-16 h-16 bg-gray-700 text-white rounded-full flex items-center justify-center text-2xl shadow-lg active:bg-gray-600"
          onClick={() => handleDirection('right')}
        >
          →
        </button>
      </div>
    </div>
  );
};

export default SnakeGame;