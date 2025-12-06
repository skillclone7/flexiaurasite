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

    const [level, setLevel] = useState(1);

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

                // Increase speed based on level
                const speedMultiplier = 1 + (level - 1) * 0.2;

                for (let j = 0; j < numCars; j++) {
                    cars.push({
                        x: Math.random() * (CANVAS_WIDTH / CELL_SIZE),
                        speed: (Math.random() * 0.03 + 0.02) * direction * speedMultiplier,
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

    const resetGame = (resetLevel = true) => {
        if (resetLevel) {
            setLevel(1);
            setScore(0);
        }
        playerRef.current = {
            x: PLAYER_START_X,
            y: PLAYER_START_Y,
            maxY: PLAYER_START_Y
        };
        lanesRef.current = generateLanes();
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

    const drawTree = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
        // Simple pixel art tree
        ctx.fillStyle = '#8B4513'; // Trunk
        ctx.fillRect(x + 12, y + 20, 16, 20);
        ctx.fillStyle = '#228B22'; // Leaves
        ctx.beginPath();
        ctx.moveTo(x + 20, y);
        ctx.lineTo(x + 40, y + 25);
        ctx.lineTo(x, y + 25);
        ctx.fill();
        ctx.beginPath(); // Lower leaves
        ctx.moveTo(x + 20, y + 10);
        ctx.lineTo(x + 40, y + 35);
        ctx.lineTo(x, y + 35);
        ctx.fill();
    };

    const drawCar = (ctx: CanvasRenderingContext2D, car: Car, x: number, y: number) => {
        const carWidth = CELL_SIZE * 1.5;
        const carHeight = CELL_SIZE - 10;

        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.fillRect(x + 5, y + 5, carWidth, carHeight);

        // Body
        ctx.fillStyle = car.color;
        // Rounded rect
        ctx.beginPath();
        ctx.roundRect(x, y, carWidth, carHeight, 5);
        ctx.fill();

        // Roof
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        ctx.fillRect(x + 5, y + 5, carWidth - 10, carHeight - 10);

        // Windows/Light
        ctx.fillStyle = '#aaddee';
        if (car.direction === 1) {
            ctx.fillRect(x + carWidth - 12, y + 5, 8, carHeight - 10); // Front windshield
            ctx.fillStyle = '#ffffcc'; // Headlights
            ctx.fillRect(x + carWidth - 2, y + 5, 2, 5);
            ctx.fillRect(x + carWidth - 2, y + carHeight - 10, 2, 5);
        } else {
            ctx.fillRect(x + 4, y + 5, 8, carHeight - 10);
            ctx.fillStyle = '#ffffcc';
            ctx.fillRect(x, y + 5, 2, 5);
            ctx.fillRect(x, y + carHeight - 10, 2, 5);
        }

        // Wheels
        ctx.fillStyle = '#000';
        ctx.fillRect(x + 5, y - 2, 8, 4);
        ctx.fillRect(x + carWidth - 13, y - 2, 8, 4);
        ctx.fillRect(x + 5, y + carHeight - 2, 8, 4);
        ctx.fillRect(x + carWidth - 13, y + carHeight - 2, 8, 4);
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

        // Win/Level Up Condition
        if (player.y === 0) {
            setLevel(l => l + 1);
            playerRef.current = {
                x: PLAYER_START_X,
                y: PLAYER_START_Y,
                maxY: PLAYER_START_Y
            };
            lanesRef.current = generateLanes();
            // Bonus score
            setScore(s => s + 50);
            return;
        }

        // Draw lanes
        lanes.forEach(lane => {
            const yPos = lane.y * CELL_SIZE;

            if (lane.type === 'grass') {
                ctx.fillStyle = '#8fbc8f'; // Lighter grass
                ctx.fillRect(0, yPos, CANVAS_WIDTH, CELL_SIZE);
                // Draw some random trees (static based on lane index to prevent flicker)
                // Using pseudo-random based on position
                for (let i = 0; i < CANVAS_WIDTH / CELL_SIZE; i++) {
                    if (Math.sin(lane.y * 10 + i * 5) > 0.8) { // Deterministic random
                        drawTree(ctx, i * CELL_SIZE, yPos - 10); // Overlap slightly
                    }
                }
            } else if (lane.type === 'road') {
                ctx.fillStyle = '#555'; // Darker road
                ctx.fillRect(0, yPos, CANVAS_WIDTH, CELL_SIZE);
                // Road lines
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 2;
                ctx.setLineDash([15, 15]);
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
                        drawCar(ctx, car, car.x * CELL_SIZE, yPos + 5);
                    });
                }
            }
        });

        // Draw player (chicken)
        const playerX = player.x * CELL_SIZE;
        const playerY = player.y * CELL_SIZE;

        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        ctx.beginPath();
        ctx.ellipse(playerX + 20, playerY + 35, 12, 5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Body
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        // Rounded body
        ctx.roundRect(playerX + 5, playerY + 5, 30, 30, 8);
        ctx.fill();

        // Comb
        ctx.fillStyle = '#ff3333';
        ctx.fillRect(playerX + 15, playerY, 10, 6);

        // Beak
        ctx.fillStyle = '#ffaa00';
        ctx.beginPath();
        ctx.moveTo(playerX + 35, playerY + 15);
        ctx.lineTo(playerX + 42, playerY + 18);
        ctx.lineTo(playerX + 35, playerY + 21);
        ctx.fill();

        // Eyes
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(playerX + 28, playerY + 15, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath(); // Other eye
        ctx.arc(playerX + 18, playerY + 15, 2, 0, Math.PI * 2);
        ctx.fill(); // (Though conceptually viewed from side/top)

        // Legs
        ctx.strokeStyle = '#ffaa00';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(playerX + 15, playerY + 35);
        ctx.lineTo(playerX + 15, playerY + 40);
        ctx.moveTo(playerX + 25, playerY + 35);
        ctx.lineTo(playerX + 25, playerY + 40);
        ctx.stroke();

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

    const handleDirection = (dir: 'up' | 'down' | 'left' | 'right') => {
        const now = Date.now();
        if (now - lastMoveTime.current < MOVE_DELAY) return;

        const player = playerRef.current;
        let moved = false;

        if (dir === 'up' && player.y > 0) {
            player.y--;
            moved = true;
            if (player.y < player.maxY) {
                player.maxY = player.y;
                setScore(prev => prev + 10);
            }
        } else if (dir === 'down' && player.y < Math.floor(CANVAS_HEIGHT / CELL_SIZE) - 1) {
            player.y++;
            moved = true;
        } else if (dir === 'left' && player.x > 0) {
            player.x--;
            moved = true;
        } else if (dir === 'right' && player.x < Math.floor(CANVAS_WIDTH / CELL_SIZE) - 1) {
            player.x++;
            moved = true;
        }

        if (moved) {
            lastMoveTime.current = now;
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowUp': handleDirection('up'); break;
                case 'ArrowDown': handleDirection('down'); break;
                case 'ArrowLeft': handleDirection('left'); break;
                case 'ArrowRight': handleDirection('right'); break;
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
                    <div className="absolute top-[-15px] left-1/2 transform -translate-x-1/2 bg-accent text-black px-6 py-1 rounded-full text-lg font-bold shadow-lg border-2 border-white z-10 whitespace-nowrap">
                        Level: {level} | Score: {score}
                    </div>
                )}
                {gameState === 'menu' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-xl">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-white mb-4">Crossy Road</h2>
                            <p className="text-white mb-4">Use arrow keys to move</p>
                            <p className="text-white mb-4 text-sm">Avoid cars and reach the top!</p>
                            <button
                                onClick={() => resetGame(true)}
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

export default CrossyRoadGame;
