import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 24;
const CANVAS_WIDTH = COLS * BLOCK_SIZE;
const CANVAS_HEIGHT = ROWS * BLOCK_SIZE;

type Piece = number[][];
type Position = { x: number; y: number };

const PIECES: Record<string, { shape: Piece; color: string }> = {
    I: { shape: [[1, 1, 1, 1]], color: '#00f0f0' },
    O: { shape: [[1, 1], [1, 1]], color: '#f0f000' },
    T: { shape: [[0, 1, 0], [1, 1, 1]], color: '#a000f0' },
    S: { shape: [[0, 1, 1], [1, 1, 0]], color: '#00f000' },
    Z: { shape: [[1, 1, 0], [0, 1, 1]], color: '#f00000' },
    J: { shape: [[1, 0, 0], [1, 1, 1]], color: '#0000f0' },
    L: { shape: [[0, 0, 1], [1, 1, 1]], color: '#f0a000' },
};

const TetrisGame: React.FC = () => {
    const { t } = useLanguage();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const nextCanvasRef = useRef<HTMLCanvasElement>(null);

    const [gameRunning, setGameRunning] = useState(false);
    const [gamePaused, setGamePaused] = useState(false);
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [lines, setLines] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    const boardRef = useRef<number[][]>(Array(ROWS).fill(null).map(() => Array(COLS).fill(0)));
    const currentPieceRef = useRef<{ shape: Piece; color: string; pos: Position } | null>(null);
    const nextPieceRef = useRef<{ shape: Piece; color: string } | null>(null);
    const gameLoopRef = useRef<number | null>(null);
    const dropCounterRef = useRef(0);
    const lastTimeRef = useRef(0);

    const getRandomPiece = () => {
        const keys = Object.keys(PIECES);
        const key = keys[Math.floor(Math.random() * keys.length)];
        return { ...PIECES[key] };
    };

    const createPiece = useCallback(() => {
        if (!nextPieceRef.current) {
            nextPieceRef.current = getRandomPiece();
        }
        const piece = nextPieceRef.current;
        nextPieceRef.current = getRandomPiece();

        return {
            ...piece,
            pos: { x: Math.floor(COLS / 2) - Math.floor(piece.shape[0].length / 2), y: 0 }
        };
    }, []);

    const collide = (piece: { shape: Piece; pos: Position }) => {
        for (let y = 0; y < piece.shape.length; y++) {
            for (let x = 0; x < piece.shape[y].length; x++) {
                if (piece.shape[y][x]) {
                    const newY = piece.pos.y + y;
                    const newX = piece.pos.x + x;

                    if (newY < 0 || newY >= ROWS || newX < 0 || newX >= COLS || boardRef.current[newY][newX]) {
                        return true;
                    }
                }
            }
        }
        return false;
    };

    const merge = () => {
        if (!currentPieceRef.current) return;

        const piece = currentPieceRef.current;
        piece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value) {
                    const newY = piece.pos.y + y;
                    const newX = piece.pos.x + x;
                    if (newY >= 0 && newY < ROWS && newX >= 0 && newX < COLS) {
                        boardRef.current[newY][newX] = 1;
                    }
                }
            });
        });
    };

    const clearLines = () => {
        let linesCleared = 0;
        outer: for (let y = ROWS - 1; y >= 0; y--) {
            for (let x = 0; x < COLS; x++) {
                if (!boardRef.current[y][x]) {
                    continue outer;
                }
            }

            // Remove line
            boardRef.current.splice(y, 1);
            boardRef.current.unshift(Array(COLS).fill(0));
            linesCleared++;
            y++; // Check same row again
        }

        if (linesCleared > 0) {
            const points = [0, 40, 100, 300, 1200][linesCleared] * level;
            setScore(prev => prev + points);
            setLines(prev => {
                const newLines = prev + linesCleared;
                setLevel(Math.floor(newLines / 10) + 1);
                return newLines;
            });
        }
    };

    const rotate = (piece: Piece): Piece => {
        const rotated: Piece = [];
        for (let i = 0; i < piece[0].length; i++) {
            rotated.push([]);
            for (let j = piece.length - 1; j >= 0; j--) {
                rotated[i].push(piece[j][i]);
            }
        }
        return rotated;
    };

    const playerRotate = () => {
        if (!currentPieceRef.current || !gameRunning || gamePaused) return;

        const piece = currentPieceRef.current;
        const originalShape = piece.shape;
        piece.shape = rotate(piece.shape);

        if (collide(piece)) {
            piece.shape = originalShape;
        }
    };

    const playerMove = (dir: number) => {
        if (!currentPieceRef.current || !gameRunning || gamePaused) return;

        currentPieceRef.current.pos.x += dir;
        if (collide(currentPieceRef.current)) {
            currentPieceRef.current.pos.x -= dir;
        }
    };

    const playerDrop = () => {
        if (!currentPieceRef.current || !gameRunning || gamePaused) return;

        currentPieceRef.current.pos.y++;
        if (collide(currentPieceRef.current)) {
            currentPieceRef.current.pos.y--;
            merge();
            clearLines();
            currentPieceRef.current = createPiece();

            if (collide(currentPieceRef.current)) {
                setGameOver(true);
                setGameRunning(false);
            }
        }
        dropCounterRef.current = 0;
    };

    const playerHardDrop = () => {
        if (!currentPieceRef.current || !gameRunning || gamePaused) return;

        while (!collide(currentPieceRef.current)) {
            currentPieceRef.current.pos.y++;
        }
        currentPieceRef.current.pos.y--;
        merge();
        clearLines();
        currentPieceRef.current = createPiece();

        if (collide(currentPieceRef.current)) {
            setGameOver(true);
            setGameRunning(false);
        }
        dropCounterRef.current = 0;
    };

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Draw grid
        ctx.strokeStyle = '#222';
        ctx.lineWidth = 0.5;
        for (let i = 0; i <= COLS; i++) {
            ctx.beginPath();
            ctx.moveTo(i * BLOCK_SIZE, 0);
            ctx.lineTo(i * BLOCK_SIZE, CANVAS_HEIGHT);
            ctx.stroke();
        }
        for (let i = 0; i <= ROWS; i++) {
            ctx.beginPath();
            ctx.moveTo(0, i * BLOCK_SIZE);
            ctx.lineTo(CANVAS_WIDTH, i * BLOCK_SIZE);
            ctx.stroke();
        }

        // Draw board
        boardRef.current.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value) {
                    ctx.fillStyle = '#00f0f0';
                    ctx.fillRect(x * BLOCK_SIZE + 1, y * BLOCK_SIZE + 1, BLOCK_SIZE - 2, BLOCK_SIZE - 2);

                    // Glow effect
                    ctx.strokeStyle = '#0ff';
                    ctx.lineWidth = 2;
                    ctx.strokeRect(x * BLOCK_SIZE + 2, y * BLOCK_SIZE + 2, BLOCK_SIZE - 4, BLOCK_SIZE - 4);
                }
            });
        });

        // Draw current piece
        if (currentPieceRef.current) {
            const piece = currentPieceRef.current;
            piece.shape.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value) {
                        const drawX = (piece.pos.x + x) * BLOCK_SIZE;
                        const drawY = (piece.pos.y + y) * BLOCK_SIZE;

                        ctx.fillStyle = piece.color;
                        ctx.fillRect(drawX + 1, drawY + 1, BLOCK_SIZE - 2, BLOCK_SIZE - 2);

                        // Neon glow
                        ctx.shadowBlur = 10;
                        ctx.shadowColor = piece.color;
                        ctx.strokeStyle = piece.color;
                        ctx.lineWidth = 2;
                        ctx.strokeRect(drawX + 2, drawY + 2, BLOCK_SIZE - 4, BLOCK_SIZE - 4);
                        ctx.shadowBlur = 0;
                    }
                });
            });
        }

        // Game Over overlay
        if (gameOver) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
            ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

            ctx.fillStyle = '#f00';
            ctx.font = 'bold 24px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('GAME OVER', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);

            ctx.fillStyle = '#fff';
            ctx.font = '16px Arial';
            ctx.fillText(`Score: ${score}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 30);
        }
    }, [gameOver, score]);

    const drawNext = useCallback(() => {
        const canvas = nextCanvasRef.current;
        if (!canvas || !nextPieceRef.current) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, 100, 100);

        const piece = nextPieceRef.current;
        const offsetX = (100 - piece.shape[0].length * BLOCK_SIZE) / 2;
        const offsetY = (100 - piece.shape.length * BLOCK_SIZE) / 2;

        piece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value) {
                    ctx.fillStyle = piece.color;
                    ctx.fillRect(offsetX + x * BLOCK_SIZE + 1, offsetY + y * BLOCK_SIZE + 1, BLOCK_SIZE - 2, BLOCK_SIZE - 2);
                }
            });
        });
    }, []);

    const update = useCallback((time = 0) => {
        if (!gameRunning || gamePaused || gameOver) return;

        const deltaTime = time - lastTimeRef.current;
        lastTimeRef.current = time;
        dropCounterRef.current += deltaTime;

        const dropInterval = 1000 / level;

        if (dropCounterRef.current > dropInterval) {
            playerDrop();
        }

        draw();
        drawNext();
        gameLoopRef.current = requestAnimationFrame(update);
    }, [gameRunning, gamePaused, gameOver, level, draw, drawNext]);

    const resetGame = () => {
        boardRef.current = Array(ROWS).fill(null).map(() => Array(COLS).fill(0));
        currentPieceRef.current = createPiece();
        nextPieceRef.current = getRandomPiece();
        dropCounterRef.current = 0;
        lastTimeRef.current = 0;
        setScore(0);
        setLevel(1);
        setLines(0);
        setGameOver(false);
        setGameRunning(false);
        setGamePaused(false);
        if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
        draw();
        drawNext();
    };

    // Keyboard controls
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (!gameRunning || gamePaused) return;

            if (['ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp', ' '].includes(e.key)) {
                e.preventDefault();
            }

            switch (e.key) {
                case 'ArrowLeft': playerMove(-1); break;
                case 'ArrowRight': playerMove(1); break;
                case 'ArrowDown': playerDrop(); break;
                case 'ArrowUp': playerRotate(); break;
                case ' ': playerHardDrop(); break;
            }
        };

        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [gameRunning, gamePaused]);

    // Game loop
    useEffect(() => {
        if (gameRunning && !gamePaused && !gameOver) {
            gameLoopRef.current = requestAnimationFrame(update);
        } else {
            if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
        }
        return () => {
            if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
        };
    }, [gameRunning, gamePaused, gameOver, update]);

    useEffect(() => {
        draw();
        drawNext();
    }, [draw, drawNext]);

    return (
        <div className="flex flex-col items-center w-full gap-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Main game canvas */}
                <div className="relative">
                    <canvas
                        ref={canvasRef}
                        width={CANVAS_WIDTH}
                        height={CANVAS_HEIGHT}
                        className="bg-black rounded-lg shadow-2xl border-2 border-cyan-500"
                        style={{ touchAction: 'none' }}
                    />
                </div>

                {/* Side panel */}
                <div className="flex flex-col gap-4 bg-gray-900 p-4 rounded-lg border-2 border-cyan-500 min-w-[150px]">
                    <div className="text-white">
                        <div className="text-sm text-cyan-400 mb-1">NEXT</div>
                        <canvas
                            ref={nextCanvasRef}
                            width={100}
                            height={100}
                            className="bg-black rounded border border-cyan-500"
                        />
                    </div>

                    <div className="text-white space-y-2">
                        <div>
                            <div className="text-xs text-cyan-400">SCORE</div>
                            <div className="text-xl font-bold text-cyan-300">{score}</div>
                        </div>
                        <div>
                            <div className="text-xs text-cyan-400">LINES</div>
                            <div className="text-xl font-bold text-cyan-300">{lines}</div>
                        </div>
                        <div>
                            <div className="text-xs text-cyan-400">LEVEL</div>
                            <div className="text-xl font-bold text-cyan-300">{level}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col items-center gap-4">
                <div className="flex justify-center gap-4">
                    <button
                        className={`bg-cyan-600 text-white border-none px-6 py-2 rounded shadow hover:bg-cyan-700 transition-colors font-bold ${gameRunning && !gamePaused ? 'hidden' : ''}`}
                        onClick={() => {
                            if (gameOver) resetGame();
                            setGameRunning(true);
                            currentPieceRef.current = createPiece();
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

                {/* Mobile controls */}
                <div className="grid grid-cols-3 gap-2 md:hidden">
                    <button
                        className="col-start-2 w-14 h-14 bg-gray-800 text-white rounded-full flex items-center justify-center text-xl shadow-lg active:bg-gray-700"
                        onClick={playerRotate}
                    >
                        ↻
                    </button>
                    <div></div>
                    <button
                        className="w-14 h-14 bg-gray-800 text-white rounded-full flex items-center justify-center text-xl shadow-lg active:bg-gray-700"
                        onClick={() => playerMove(-1)}
                    >
                        ←
                    </button>
                    <button
                        className="w-14 h-14 bg-gray-800 text-white rounded-full flex items-center justify-center text-xl shadow-lg active:bg-gray-700"
                        onClick={playerDrop}
                    >
                        ↓
                    </button>
                    <button
                        className="w-14 h-14 bg-gray-800 text-white rounded-full flex items-center justify-center text-xl shadow-lg active:bg-gray-700"
                        onClick={() => playerMove(1)}
                    >
                        →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TetrisGame;
