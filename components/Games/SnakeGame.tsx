import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface SnakeGameProps {
  onScoreUpdate: (score: number) => void;
}

const GRID_SIZE = 20;

type Point = { x: number; y: number };
type Direction = 'up' | 'down' | 'left' | 'right';
type Difficulty = 'easy' | 'medium' | 'hard';

const SnakeGame: React.FC<SnakeGameProps> = ({ onScoreUpdate }) => {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [gameRunning, setGameRunning] = useState(false);
  const [gamePaused, setGamePaused] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');

  // Game state refs
  const snakeRef = useRef<Point[]>([{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }]);
  const foodRef = useRef<Point>({ x: 5, y: 5 });
  const directionRef = useRef<Direction>('right');
  const nextDirectionRef = useRef<Direction>('right');
  const gameLoopRef = useRef<number | null>(null);
  const scoreRef = useRef(0);

  // Load High Score
  useEffect(() => {
    const saved = localStorage.getItem('snakeHighScore');
    if (saved) setHighScore(parseInt(saved, 10));
  }, []);

  // Update High Score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('snakeHighScore', score.toString());
    }
  }, [score, highScore]);

  const getSpeed = () => {
    switch (difficulty) {
      case 'easy': return 200;
      case 'medium': return 130;
      case 'hard': return 80;
      default: return 130;
    }
  };

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

    // Clear with slight background tint
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Grid (subtle)
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < canvas.width; i += GRID_SIZE) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += GRID_SIZE) {
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke();
    }

    // Draw Food (Glowing)
    const fx = foodRef.current.x * GRID_SIZE + GRID_SIZE / 2;
    const fy = foodRef.current.y * GRID_SIZE + GRID_SIZE / 2;

    ctx.shadowBlur = 15;
    ctx.shadowColor = '#ff5722';
    ctx.fillStyle = '#ff5722';
    ctx.beginPath();
    ctx.arc(fx, fy, GRID_SIZE / 2 - 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0; // Reset shadow

    // Draw Snake
    snakeRef.current.forEach((segment, index) => {
      const x = segment.x * GRID_SIZE;
      const y = segment.y * GRID_SIZE;

      // Gradient for snake
      ctx.fillStyle = index === 0 ? '#4CAF50' : '#8BC34A';

      // Rounded rectangles for segments
      ctx.beginPath();
      ctx.roundRect(x + 1, y + 1, GRID_SIZE - 2, GRID_SIZE - 2, 4);
      ctx.fill();

      // Eyes on Head
      if (index === 0) {
        ctx.fillStyle = 'white';
        const dir = directionRef.current;

        // Positioning eyes based on direction
        let lx = x + 6, ly = y + 6, rx = x + 14, ry = y + 6; // Default Up

        if (dir === 'down') { ly = y + 12; ry = y + 12; }
        if (dir === 'left') { lx = x + 6; ly = y + 14; rx = x + 6; ry = y + 6; } // Rotated coordinates logic simplified:
        // Actually let's just use specific offsets
        if (dir === 'right') {
          ctx.fillRect(x + 12, y + 5, 4, 4);
          ctx.fillRect(x + 12, y + 12, 4, 4);
        } else if (dir === 'left') {
          ctx.fillRect(x + 4, y + 5, 4, 4);
          ctx.fillRect(x + 4, y + 12, 4, 4);
        } else if (dir === 'up') {
          ctx.fillRect(x + 5, y + 4, 4, 4);
          ctx.fillRect(x + 12, y + 4, 4, 4);
        } else if (dir === 'down') {
          ctx.fillRect(x + 5, y + 12, 4, 4);
          ctx.fillRect(x + 12, y + 12, 4, 4);
        }
      }
    });

    // Draw Game Over Overlay
    if (gameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.shadowColor = 'black';
      ctx.shadowBlur = 4;
      ctx.fillStyle = 'white';
      ctx.font = 'bold 36px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 30);

      ctx.font = '20px Arial';
      ctx.fillText(`${t('score')}: ${score}`, canvas.width / 2, canvas.height / 2 + 10);
      ctx.fillStyle = '#ffd700';
      ctx.fillText(`High Score: ${highScore}`, canvas.width / 2, canvas.height / 2 + 40);

      ctx.fillStyle = '#aaaaaa';
      ctx.fillText(t('resetGame') + ' to play again', canvas.width / 2, canvas.height / 2 + 80);
      ctx.shadowBlur = 0;
    }

  }, [gameOver, score, highScore, t]);

  const resetGame = useCallback(() => {
    snakeRef.current = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
    directionRef.current = 'right';
    nextDirectionRef.current = 'right';
    foodRef.current = generateFood(snakeRef.current);
    scoreRef.current = 0;
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
      scoreRef.current += 10;
      setScore(scoreRef.current);
      onScoreUpdate(scoreRef.current);
      foodRef.current = generateFood(snakeRef.current);
    } else {
      snakeRef.current.pop();
    }

    drawGame();
  }, [gameOver, gamePaused, onScoreUpdate, generateFood, drawGame]);

  const handleDirection = useCallback((dir: Direction) => {
    if (!gameRunning || gamePaused) return;

    switch (dir) {
      case 'up': if (directionRef.current !== 'down') nextDirectionRef.current = 'up'; break;
      case 'down': if (directionRef.current !== 'up') nextDirectionRef.current = 'down'; break;
      case 'left': if (directionRef.current !== 'right') nextDirectionRef.current = 'left'; break;
      case 'right': if (directionRef.current !== 'left') nextDirectionRef.current = 'right'; break;
    }
  }, [gameRunning, gamePaused]);

  // Key controls
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Prevent splashing scrolling
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }
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

  // Swipe controls for mobile
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!gameRunning || gamePaused) return;

      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;

      const dx = touchEndX - touchStartX;
      const dy = touchEndY - touchStartY;

      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);

      // Minimum swipe distance
      if (absDx < 30 && absDy < 30) return;

      if (absDx > absDy) {
        // Horizontal swipe
        handleDirection(dx > 0 ? 'right' : 'left');
      } else {
        // Vertical swipe
        handleDirection(dy > 0 ? 'down' : 'up');
      }
    };

    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchend', handleTouchEnd);

    return () => {
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [gameRunning, gamePaused, handleDirection]);

  // Initial Draw
  useEffect(() => {
    drawGame();
  }, [drawGame]);

  // Game Loop with dynamic speed
  useEffect(() => {
    if (gameRunning && !gamePaused && !gameOver) {
      gameLoopRef.current = window.setInterval(moveSnake, getSpeed());
    } else {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    }
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [gameRunning, gamePaused, gameOver, moveSnake, difficulty]); // Added difficulty dependency

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          className="bg-[#1a1a1a] rounded-lg block mx-auto max-w-full shadow-2xl border border-gray-700"
          style={{ touchAction: 'none' }}
        />
        {/* Simple HUD on top */}
        <div className="absolute top-2 left-4 text-white font-mono text-sm opacity-80">
          Score: {score}  |  High: {highScore}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-4 mt-6">

        {/* Difficulty Selector */}
        {!gameRunning && !gameOver && (
          <div className="flex gap-2 mb-2">
            {(['easy', 'medium', 'hard'] as Difficulty[]).map(d => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`px-3 py-1 rounded text-sm uppercase font-bold transition-colors ${difficulty === d
                  ? 'bg-accent text-black'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
              >
                {d}
              </button>
            ))}
          </div>
        )}

        <div className="flex justify-center gap-4">
          <button
            className={`bg-primary text-white border-none px-6 py-2 rounded shadow hover:bg-secondary transition-colors font-bold ${gameRunning && !gamePaused ? 'hidden' : ''}`}
            onClick={() => {
              if (gameOver) resetGame();
              setGameRunning(true);
            }}
          >
            {gameOver ? 'Play Again' : t('startGame')}
          </button>

          <button
            className={`bg-yellow-600 text-white border-none px-6 py-2 rounded shadow hover:bg-yellow-700 transition-colors ${!gameRunning || gameOver ? 'hidden' : ''}`}
            onClick={() => setGamePaused(!gamePaused)}
          >
            {gamePaused ? 'Resume' : t('pauseGame')}
          </button>

          <button
            className="bg-red-600 text-white border-none px-6 py-2 rounded shadow hover:bg-red-700 transition-colors"
            onClick={resetGame}
          >
            {t('resetGame')}
          </button>
        </div>
      </div>

      {/* Mobile Controls */}
      <div className="mt-6 grid grid-cols-3 gap-2 md:hidden">
        <div></div>
        <button
          className="w-14 h-14 bg-gray-800 text-white rounded-full flex items-center justify-center text-xl shadow-lg active:bg-gray-700 active:scale-95"
          onClick={() => handleDirection('up')}
        >
          ↑
        </button>
        <div></div>
        <button
          className="w-14 h-14 bg-gray-800 text-white rounded-full flex items-center justify-center text-xl shadow-lg active:bg-gray-700 active:scale-95"
          onClick={() => handleDirection('left')}
        >
          ←
        </button>
        <button
          className="w-14 h-14 bg-gray-800 text-white rounded-full flex items-center justify-center text-xl shadow-lg active:bg-gray-700 active:scale-95"
          onClick={() => handleDirection('down')}
        >
          ↓
        </button>
        <button
          className="w-14 h-14 bg-gray-800 text-white rounded-full flex items-center justify-center text-xl shadow-lg active:bg-gray-700 active:scale-95"
          onClick={() => handleDirection('right')}
        >
          →
        </button>
      </div>
    </div>
  );
};

export default SnakeGame;