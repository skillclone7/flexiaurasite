
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const GRID_SIZE = 8;
const CELL_SIZE = 60;
const CANVAS_SIZE = GRID_SIZE * CELL_SIZE;

// Candy emojis for a fun Candy Crush-like appearance
const CANDIES = [
    { emoji: '🍬', color: '#e74c3c' }, // Red Candy
    { emoji: '🍭', color: '#3498db' }, // Blue Lollipop
    { emoji: '🍫', color: '#8b4513' }, // Chocolate
    { emoji: '🍯', color: '#f1c40f' }, // Honey
    { emoji: '🍇', color: '#9b59b6' }, // Grape
    { emoji: '🍊', color: '#e67e22' }  // Orange
];

type GemType = {
    colorIndex: number;
    id: number; // Unique ID for animation tracking (future proofing)
    yOffset: number; // For falling animation
    targetY: number; // Logical Y position * CELL_SIZE
    scale: number; // For pop animation
};

type Position = { row: number; col: number };

const Match3Game: React.FC = () => {
    const { t } = useLanguage();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const reqRef = useRef<number>(0);

    const [gameRunning, setGameRunning] = useState(false);
    const [gamePaused, setGamePaused] = useState(false);
    const [score, setScore] = useState(0);
    const [grid, setGrid] = useState<(GemType | null)[][]>([]);
    const [selected, setSelected] = useState<Position | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    // Game Logic Refs
    const gridRef = useRef<(GemType | null)[][]>([]);
    const scoreRef = useRef(0);

    // Initialize Grid
    const createGem = (row: number, col: number, startHigh = false): GemType => {
        return {
            colorIndex: Math.floor(Math.random() * CANDIES.length),
            id: Math.random(),
            yOffset: startHigh ? -(Math.random() * 200 + 100) : 0, // Fall from sky if new
            targetY: 0, // Relative to cell
            scale: 1
        };
    };

    const initGrid = useCallback(() => {
        const newGrid: (GemType | null)[][] = [];
        for (let r = 0; r < GRID_SIZE; r++) {
            const row: (GemType | null)[] = [];
            for (let c = 0; c < GRID_SIZE; c++) {
                row.push(createGem(r, c));
            }
            newGrid.push(row);
        }
        // Prevent initial matches (simplified)
        return newGrid;
    }, []);

    // Setup initial state
    useEffect(() => {
        const initial = initGrid();
        gridRef.current = initial;
        setGrid(initial);
    }, [initGrid]);

    // Animation Loop
    const update = useCallback(() => {
        if (!gameRunning || gamePaused) return;

        let animating = false;
        const currentGrid = gridRef.current;

        // Update Physics (Falling)
        for (let r = 0; r < GRID_SIZE; r++) {
            for (let c = 0; c < GRID_SIZE; c++) {
                const gem = currentGrid[r][c];
                if (gem) {
                    // Fall logic: yOffset goes to 0
                    if (gem.yOffset < 0) {
                        gem.yOffset += 15; // Speed
                        if (gem.yOffset > 0) gem.yOffset = 0;
                        animating = true;
                    }
                }
            }
        }

        setIsAnimating(animating);
        draw(); // Draw every frame
    }, [gameRunning, gamePaused]); // Draw dependency below

    // Draw Function
    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

        // Background (Darker sophisticated board)
        const gradient = ctx.createLinearGradient(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        gradient.addColorStop(0, '#2c3e50');
        gradient.addColorStop(1, '#34495e');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

        // Grid Cells
        for (let r = 0; r < GRID_SIZE; r++) {
            for (let c = 0; c < GRID_SIZE; c++) {
                // Checkerboard pattern
                ctx.fillStyle = (r + c) % 2 === 0 ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
                ctx.fillRect(c * CELL_SIZE, r * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }
        }

        // Draw Candies
        const currentGrid = gridRef.current;
        for (let r = 0; r < GRID_SIZE; r++) {
            for (let c = 0; c < GRID_SIZE; c++) {
                const gem = currentGrid[r][c];
                if (!gem) continue;

                const cx = c * CELL_SIZE + CELL_SIZE / 2;
                const cy = r * CELL_SIZE + CELL_SIZE / 2 + gem.yOffset;
                const size = CELL_SIZE * 0.7 * gem.scale;

                const candy = CANDIES[gem.colorIndex];

                // Draw candy background circle
                ctx.shadowColor = 'rgba(0,0,0,0.3)';
                ctx.shadowBlur = 5;
                ctx.shadowOffsetY = 3;

                ctx.beginPath();
                ctx.arc(cx, cy, size / 2, 0, Math.PI * 2);
                ctx.fillStyle = candy.color + '33'; // Semi-transparent background
                ctx.fill();

                ctx.shadowColor = 'transparent';

                // Draw emoji
                ctx.font = `${size}px Arial`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(candy.emoji, cx, cy);

                // Selection Highlight
                if (selected && selected.row === r && selected.col === c) {
                    ctx.lineWidth = 4;
                    ctx.strokeStyle = '#fff';
                    ctx.shadowColor = '#fff';
                    ctx.shadowBlur = 10;
                    ctx.beginPath();
                    ctx.arc(cx, cy, size / 2 + 5, 0, Math.PI * 2);
                    ctx.stroke();
                    ctx.shadowColor = 'transparent';
                }
            }
        }

        // UI Overlay
        if (!gameRunning) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
            ctx.fillStyle = '#fff';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = 'bold 32px "Playfair Display", serif';
            ctx.fillText(t('startGame'), CANVAS_SIZE / 2, CANVAS_SIZE / 2);
        } else if (gamePaused) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
            ctx.fillStyle = '#fff';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = 'bold 32px Arial';
            ctx.fillText(t('pauseGame').toUpperCase(), CANVAS_SIZE / 2, CANVAS_SIZE / 2);
        }

    }, [selected, gameRunning, gamePaused, t]);

    // Logic: Check Matches and Collapse
    const resolveMatches = useCallback(() => {
        const grid = gridRef.current;
        const matches: Position[] = [];

        // Check Horizontal
        for (let r = 0; r < GRID_SIZE; r++) {
            for (let c = 0; c < GRID_SIZE - 2; c++) {
                const g1 = grid[r][c];
                const g2 = grid[r][c + 1];
                const g3 = grid[r][c + 2];
                if (g1 && g2 && g3 && g1.colorIndex === g2.colorIndex && g1.colorIndex === g3.colorIndex) {
                    matches.push({ row: r, col: c }, { row: r, col: c + 1 }, { row: r, col: c + 2 });
                }
            }
        }
        // Check Vertical
        for (let r = 0; r < GRID_SIZE - 2; r++) {
            for (let c = 0; c < GRID_SIZE; c++) {
                const g1 = grid[r][c];
                const g2 = grid[r + 1][c];
                const g3 = grid[r + 2][c];
                if (g1 && g2 && g3 && g1.colorIndex === g2.colorIndex && g1.colorIndex === g3.colorIndex) {
                    matches.push({ row: r, col: c }, { row: r + 1, col: c }, { row: r + 2, col: c });
                }
            }
        }

        if (matches.length > 0) {
            // Remove duplicates
            const unique = new Set(matches.map(m => `${m.row},${m.col}`));

            // Update Score
            const points = unique.size * 10;
            scoreRef.current += points;
            setScore(scoreRef.current);

            // Remove gems
            unique.forEach(pos => {
                const [r, c] = pos.split(',').map(Number);
                grid[r][c] = null;
            });

            // Gravity (Shift down)
            for (let c = 0; c < GRID_SIZE; c++) {
                let emptySlots = 0;
                for (let r = GRID_SIZE - 1; r >= 0; r--) {
                    if (grid[r][c] === null) {
                        emptySlots++;
                    } else if (emptySlots > 0) {
                        // Pull down
                        grid[r + emptySlots][c] = grid[r][c];
                        grid[r][c] = null;
                        // Reset animation trigger for pulled down piece
                        if (grid[r + emptySlots][c]) {
                            grid[r + emptySlots][c]!.yOffset = -emptySlots * CELL_SIZE;
                        }
                    }
                }
                // Fill top
                for (let r = 0; r < emptySlots; r++) {
                    grid[r][c] = createGem(r, c, true);
                }
            }
            return true; // Match found
        }
        return false; // Stable
    }, []);

    // Game Loop Wrapper
    useEffect(() => {
        const loop = () => {
            update();
            reqRef.current = requestAnimationFrame(loop);
        };
        reqRef.current = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(reqRef.current);
    }, [update]);

    // Check matches periodically when not animating
    useEffect(() => {
        if (gameRunning && !isAnimating) {
            const matched = resolveMatches();
            if (matched) {
                // Trigger animation again essentially
            }
        }
    }, [gameRunning, isAnimating, resolveMatches]);

    const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!gameRunning || gamePaused || isAnimating) return;

        const rect = canvasRef.current!.getBoundingClientRect();
        const col = Math.floor((e.clientX - rect.left) / CELL_SIZE);
        const row = Math.floor((e.clientY - rect.top) / CELL_SIZE);

        if (row < 0 || row >= GRID_SIZE || col < 0 || col >= GRID_SIZE) return;

        if (!selected) {
            setSelected({ row, col });
        } else {
            const dRow = Math.abs(selected.row - row);
            const dCol = Math.abs(selected.col - col);

            if (dRow + dCol === 1) { // Adjacent
                // Swap
                const grid = gridRef.current;
                const temp = grid[row][col];
                grid[row][col] = grid[selected.row][selected.col];
                grid[selected.row][selected.col] = temp;

                // Check Match
                const hasMatch = resolveMatches();

                if (!hasMatch) {
                    // Swap back if invalid
                    setTimeout(() => {
                        const temp2 = grid[row][col];
                        grid[row][col] = grid[selected.row][selected.col];
                        grid[selected.row][selected.col] = temp2;
                        setSelected(null);
                    }, 200);
                } else {
                    setSelected(null);
                }
            } else {
                setSelected({ row, col });
            }
        }
    };

    const resetGame = () => {
        scoreRef.current = 0;
        setScore(0);
        gridRef.current = initGrid();
        setGameRunning(false);
        setGamePaused(false);
        setSelected(null);
        draw();
    };

    return (
        <div className="flex flex-col items-center w-full">
            <div className="relative">
                <canvas
                    ref={canvasRef}
                    width={CANVAS_SIZE}
                    height={CANVAS_SIZE}
                    onClick={handleClick}
                    className="bg-body rounded-xl block mx-auto max-w-full shadow-2xl cursor-pointer border-4 border-[#34495e]"
                />
                {gameRunning && (
                    <div className="absolute top-[-15px] left-1/2 transform -translate-x-1/2 bg-accent text-black px-6 py-1 rounded-full text-lg font-bold shadow-lg border-2 border-white z-10">
                        Score: {score}
                    </div>
                )}
            </div>

            <div className="flex justify-center gap-4 mt-8">
                <button
                    className={`bg-primary text-white border-none px-5 py-2.5 rounded hover:bg-secondary transition-colors ${gameRunning && !gamePaused ? 'hidden' : ''}`}
                    onClick={() => setGameRunning(true)}
                >
                    {t('startGame')}
                </button>
                <button
                    className={`bg-primary text-white border-none px-5 py-2.5 rounded hover:bg-secondary transition-colors ${!gameRunning ? 'hidden' : ''}`}
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
        </div>
    );
};

export default Match3Game;
