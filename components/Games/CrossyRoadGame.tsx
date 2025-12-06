import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 500;
const CELL_SIZE = 40;
const PLAYER_START_X = Math.floor(CANVAS_WIDTH / (2 * CELL_SIZE));
const PLAYER_START_Y = Math.floor(CANVAS_HEIGHT / CELL_SIZE) - 2;

type LaneType = 'grass' | 'road';

type Lane = {
    type: LaneType;
    y: number;
    cars?: Car[];
};

type Car = {
    x: number;
    speed: number;
    direction: 1 | -1; // 1 = right, -1 = left
    color: string;
};

const CrossyRoadGame: React.FC = () => {
    const { t } = useLanguage();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>(0);
    const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameover'>('menu');
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

    // Player state
    const playerRef = useRef({
        x: PLAYER_START_X,
        y: PLAYER_START_Y,
        maxY: PLAYER_START_Y
    });

    // Lanes
    const lanesRef = useRef<Lane[]>([]);

    const keysRef = useRef({ up: false, down: false, left: false, right: false });
    const lastMoveTime = useRef(0);
    const MOVE_DELAY = 150; // ms between moves

    const generateLanes = () => {
        const lanes: Lane[] = [];
        const numLanes = Math.floor(CANVAS_HEIGHT / CELL_SIZE);

        for (let i = 0; i < numLanes; i++) {
            const isRoad = i > 2 && i < numLanes - 2 && Math.random() > 0.4;

            if (isRoad) {
                const numCars = Math.floor(Math.random() * 2) + 1;
                const cars: Car[] = [];
                const direction = Math.random() > 0.5 ? 1 : -1;
                const colors = ['#ff4444', '#4444ff', '#44ff44', '#ffff44', '#ff44ff'];

                for (let j = 0; j < numCars; j++) {
                    cars.push({
                        x: Math.random() * (CANVAS_WIDTH / CELL_SIZE),
                        speed: (Math.random() * 0.02 + 0.01) * direction,
                        direction,
                        color: colors[Math.floor(Math.random() * colors.length)]
                    });
                }

                lanes.push({ type: 'road', y: i, cars });
            } else {
                lanes.push({ type: 'grass', y: i });
            }
        }

        return lanes;
    };

    const resetGame = () => {
        playerRef.current = {
            x: PLAYER_START_X,
            y: PLAYER_START_Y,
            maxY: PLAYER_START_Y
        };
        lanesRef.current = generateLanes();
        setScore(0);
        setGameState('playing');
    };

    const checkCollision = () => {
        const player = playerRef.current;
        const lane = lanesRef.current[player.y];

        if (lane && lane.type === 'road' && lane.cars) {
            for (const car of lane.cars) {
                const carLeft = car.x;
                const carRight = car.x + 1.5;
                const playerLeft = player.x;
                const playerRight = player.x + 1;

                if (playerRight > carLeft && playerLeft < carRight) {
                    return true;
                }
            }
        }

        return false;
    };

    const gameLoop = () => {
        const canvas = canvasRef.current;
        if (!canvas || gameState !== 'playing') return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const player = playerRef.current;
        const lanes = lanesRef.current;

        // Clear canvas
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Draw lanes
        lanes.forEach(lane => {
            const yPos = lane.y * CELL_SIZE;

            if (lane.type === 'grass') {
                ctx.fillStyle = '#4a7c59';
                ctx.fillRect(0, yPos, CANVAS_WIDTH, CELL_SIZE);
                // Grass pattern
                ctx.fillStyle = '#3d6b4a';
                for (let i = 0; i < CANVAS_WIDTH; i += 10) {
                    for (let j = 0; j < CELL_SIZE; j += 10) {
                        if (Math.random() > 0.7) {
                            ctx.fillRect(i, yPos + j, 2, 2);
                        }
                    }
                }
            } else if (lane.type === 'road') {
                ctx.fillStyle = '#333';
                ctx.fillRect(0, yPos, CANVAS_WIDTH, CELL_SIZE);
                // Road lines
                ctx.strokeStyle = '#ffff00';
                ctx.lineWidth = 2;
                ctx.setLineDash([10, 10]);
                ctx.beginPath();
                ctx.moveTo(0, yPos + CELL_SIZE / 2);
                ctx.lineTo(CANVAS_WIDTH, yPos + CELL_SIZE / 2);
                ctx.stroke();
                ctx.setLineDash([]);

                // Update and draw cars
                if (lane.cars) {
                    lane.cars.forEach(car => {
                        car.x += car.speed;

                        // Wrap around
                        if (car.direction === 1 && car.x > CANVAS_WIDTH / CELL_SIZE + 2) {
                            car.x = -2;
                        } else if (car.direction === -1 && car.x < -2) {
                            car.x = CANVAS_WIDTH / CELL_SIZE + 2;
                        }

                        // Draw car
                        const carX = car.x * CELL_SIZE;
                        const carY = yPos + 5;
                        const carWidth = CELL_SIZE * 1.5;
                        const carHeight = CELL_SIZE - 10;

                        ctx.fillStyle = car.color;
                        ctx.fillRect(carX, carY, carWidth, carHeight);
                        ctx.fillStyle = '#222';
                        ctx.fillRect(carX + 5, carY + 5, carWidth - 10, carHeight - 10);

                        // Windows
                        ctx.fillStyle = '#88ccff';
                        if (car.direction === 1) {
                            ctx.fillRect(carX + carWidth - 15, carY + 7, 8, carHeight - 14);
                        } else {
                            ctx.fillRect(carX + 7, carY + 7, 8, carHeight - 14);
                        }
                    });
                }
            }
        });

        // Draw player (chicken)
        const playerX = player.x * CELL_SIZE;
        const playerY = player.y * CELL_SIZE;

        // Body
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(playerX + CELL_SIZE / 2, playerY + CELL_SIZE / 2, CELL_SIZE / 3, 0, Math.PI * 2);
        ctx.fill();

        // Head
        ctx.beginPath();
        ctx.arc(playerX + CELL_SIZE / 2, playerY + CELL_SIZE / 3, CELL_SIZE / 4, 0, Math.PI * 2);
        ctx.fill();

        // Beak
        ctx.fillStyle = '#ff9900';
        ctx.beginPath();
        ctx.moveTo(playerX + CELL_SIZE / 2, playerY + CELL_SIZE / 3);
        ctx.lineTo(playerX + CELL_SIZE / 2 + 8, playerY + CELL_SIZE / 3 - 3);
        ctx.lineTo(playerX + CELL_SIZE / 2 + 8, playerY + CELL_SIZE / 3 + 3);
        ctx.fill();

        // Eyes
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(playerX + CELL_SIZE / 2 - 5, playerY + CELL_SIZE / 3 - 3, 2, 0, Math.PI * 2);
        ctx.arc(playerX + CELL_SIZE / 2 + 5, playerY + CELL_SIZE / 3 - 3, 2, 0, Math.PI * 2);
        ctx.fill();

        // Comb
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(playerX + CELL_SIZE / 2 - 3, playerY + CELL_SIZE / 3 - 10, 2, 5);
        ctx.fillRect(playerX + CELL_SIZE / 2, playerY + CELL_SIZE / 3 - 12, 2, 7);
        ctx.fillRect(playerX + CELL_SIZE / 2 + 3, playerY + CELL_SIZE / 3 - 10, 2, 5);

        // Check collision
        if (checkCollision()) {
            setGameState('gameover');
            if (score > highScore) {
                setHighScore(score);
            }
            return;
        }

        animationRef.current = requestAnimationFrame(gameLoop);
    };

    useEffect(() => {
        if (gameState === 'playing') {
            animationRef.current = requestAnimationFrame(gameLoop);
        }
        return () => cancelAnimationFrame(animationRef.current);
    }, [gameState]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const now = Date.now();
            if (now - lastMoveTime.current < MOVE_DELAY) return;

            const player = playerRef.current;
            let moved = false;

            if (e.key === 'ArrowUp' && player.y > 0) {
                player.y--;
                moved = true;
                if (player.y < player.maxY) {
                    player.maxY = player.y;
                    setScore(prev => prev + 10);
                }
            } else if (e.key === 'ArrowDown' && player.y < Math.floor(CANVAS_HEIGHT / CELL_SIZE) - 1) {
                player.y++;
                moved = true;
            } else if (e.key === 'ArrowLeft' && player.x > 0) {
                player.x--;
                moved = true;
            } else if (e.key === 'ArrowRight' && player.x < Math.floor(CANVAS_WIDTH / CELL_SIZE) - 1) {
                player.x++;
                moved = true;
            }

            if (moved) {
                lastMoveTime.current = now;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="flex flex-col items-center w-full">
            <div className="relative">
                <canvas
                    ref={canvasRef}
                    width={CANVAS_WIDTH}
                    height={CANVAS_HEIGHT}
                    className="bg-body rounded-xl shadow-2xl border-4 border-[#4a7c59] w-full h-auto max-w-full"
                />
                {gameState === 'playing' && (
                    <div className="absolute top-[-15px] left-1/2 transform -translate-x-1/2 bg-accent text-black px-6 py-1 rounded-full text-lg font-bold shadow-lg border-2 border-white z-10">
                        Score: {score}
                    </div>
                )}
                {gameState === 'menu' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-xl">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-white mb-4">Crossy Road</h2>
                            <p className="text-white mb-4">Use arrow keys to move</p>
                            <p className="text-white mb-4 text-sm">Avoid cars and reach the top!</p>
                            <button
                                onClick={resetGame}
                                className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-secondary transition-colors"
                            >
                                Start Game
                            </button>
                            {highScore > 0 && (
                                <p className="text-white mt-4 text-sm">High Score: {highScore}</p>
                            )}
                        </div>
                    </div>
                )}
                {gameState === 'gameover' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-xl">
                        <div className="text-center">
                            <h2 className="text-4xl font-bold text-red-500 mb-4">Game Over!</h2>
                            <p className="text-white mb-2">Score: {score}</p>
                            {score === highScore && score > 0 && (
                                <p className="text-yellow-400 mb-4">🏆 New High Score!</p>
                            )}
                            <button
                                onClick={() => setGameState('menu')}
                                className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-secondary transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CrossyRoadGame;
