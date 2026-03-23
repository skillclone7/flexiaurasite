import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface BowAndArrowGameProps {
    onScoreUpdate?: (score: number) => void;
}

interface Projectile {
    x: number;
    y: number;
    vx: number;
    vy: number;
    active: boolean;
}

interface Target {
    x: number;
    y: number;
    radius: number;
    speedY: number;
    active: boolean;
    color: string;
}

const GRAVITY = 0.5;
const BOW_X = 100;
const BOW_Y = 300;

const BowAndArrowGame: React.FC<BowAndArrowGameProps> = ({ onScoreUpdate }) => {
    const { t } = useLanguage();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    // Game State Refs (mutable for loop)
    const arrowsRef = useRef<Projectile[]>([]);
    const targetsRef = useRef<Target[]>([]);
    const isDraggingRef = useRef(false);
    const dragStartRef = useRef<{ x: number, y: number }>({ x: 0, y: 0 });
    const dragCurrentRef = useRef<{ x: number, y: number }>({ x: 0, y: 0 });
    const animationFrameRef = useRef<number | null>(null);
    const lastTargetSpawnRef = useRef<number>(0);

    const spawnTarget = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const radius = 20 + Math.random() * 20;
        const x = canvas.width - 50 - Math.random() * 100;
        const y = canvas.height - 100 - Math.random() * (canvas.height - 200);
        const speedY = (Math.random() - 0.5) * 2;
        const colors = ['#FF5722', '#E91E63', '#9C27B0', '#2196F3'];

        targetsRef.current.push({
            x,
            y,
            radius,
            speedY,
            active: true,
            color: colors[Math.floor(Math.random() * colors.length)]
        });
    };

    const updateGame = () => {
        if (!canvasRef.current || !isPlaying) return;
        const canvas = canvasRef.current;

        // Spawn targets occasionally
        const now = Date.now();
        if (now - lastTargetSpawnRef.current > 1500) {
            spawnTarget();
            lastTargetSpawnRef.current = now;
        }

        // Update Arrows
        arrowsRef.current.forEach(arrow => {
            if (arrow.active) {
                arrow.x += arrow.vx;
                arrow.y += arrow.vy;
                arrow.vy += GRAVITY;

                // Check bounds
                if (arrow.x > canvas.width || arrow.y > canvas.height) {
                    arrow.active = false;
                }
            }
        });

        // Update Targets
        targetsRef.current.forEach(target => {
            if (target.active) {
                target.y += target.speedY;
                if (target.y < target.radius || target.y > canvas.height - target.radius) {
                    target.speedY *= -1;
                }
            }
        });

        // Collision Detection
        arrowsRef.current.forEach(arrow => {
            if (!arrow.active) return;
            targetsRef.current.forEach(target => {
                if (!target.active) return;

                const dx = arrow.x - target.x;
                const dy = arrow.y - target.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < target.radius) {
                    // HIT!
                    target.active = false;
                    arrow.active = false;
                    setScore(prev => {
                        const newScore = prev + 10;
                        if (onScoreUpdate) onScoreUpdate(newScore);
                        return newScore;
                    });
                }
            });
        });

        // Cleanup
        arrowsRef.current = arrowsRef.current.filter(a => a.active);
        targetsRef.current = targetsRef.current.filter(t => t.active);
    };

    const drawGame = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Background gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#87CEEB'); // Sky blue
        gradient.addColorStop(1, '#E0F7FA');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw Ground
        ctx.fillStyle = '#4CAF50';
        ctx.fillRect(0, canvas.height - 20, canvas.width, 20);

        // Draw Bow (Simple curve)
        ctx.strokeStyle = '#795548';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(BOW_X, BOW_Y, 40, 1.5 * Math.PI, 0.5 * Math.PI); // Half circle
        ctx.stroke();
        // Bow string
        ctx.beginPath();
        ctx.moveTo(BOW_X, BOW_Y - 40);
        ctx.lineTo(BOW_X, BOW_Y + 40);
        ctx.strokeStyle = '#DDD';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw Dragging Line (Aiming)
        if (isDraggingRef.current) {
            ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.moveTo(BOW_X, BOW_Y);
            const dx = dragStartRef.current.x - dragCurrentRef.current.x;
            const dy = dragStartRef.current.y - dragCurrentRef.current.y;
            // Invert direction for aim visual
            ctx.lineTo(BOW_X + dx, BOW_Y + dy);
            ctx.stroke();
            ctx.setLineDash([]);
        }

        // Draw Arrows
        ctx.fillStyle = '#333';
        arrowsRef.current.forEach(arrow => {
            ctx.beginPath();
            ctx.arc(arrow.x, arrow.y, 5, 0, Math.PI * 2);
            ctx.fill();
            // Tail
            ctx.beginPath();
            const angle = Math.atan2(arrow.vy, arrow.vx);
            ctx.moveTo(arrow.x, arrow.y);
            ctx.lineTo(arrow.x - Math.cos(angle) * 20, arrow.y - Math.sin(angle) * 20);
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 2;
            ctx.stroke();
        });

        // Draw Targets
        targetsRef.current.forEach(target => {
            ctx.beginPath();
            ctx.arc(target.x, target.y, target.radius, 0, Math.PI * 2);
            ctx.fillStyle = target.color;
            ctx.fill();
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Inner bullseye
            ctx.beginPath();
            ctx.arc(target.x, target.y, target.radius * 0.6, 0, Math.PI * 2);
            ctx.fillStyle = 'white';
            ctx.fill();
            ctx.beginPath();
            ctx.arc(target.x, target.y, target.radius * 0.3, 0, Math.PI * 2);
            ctx.fillStyle = target.color;
            ctx.fill();
        });

        // Score Text
        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        ctx.fillText(`${t('score')}: ${score}`, 20, 30);
    };

    const loop = useCallback(() => {
        if (isPlaying) {
            updateGame();
            drawGame();
            animationFrameRef.current = requestAnimationFrame(loop);
        }
    }, [isPlaying, score]); // Re-create loop if playing state changes

    useEffect(() => {
        if (isPlaying) {
            lastTargetSpawnRef.current = Date.now();
            animationFrameRef.current = requestAnimationFrame(loop);
        }
        return () => {
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        };
    }, [isPlaying, loop]);

    // Initial Draw
    useEffect(() => {
        if (!isPlaying) {
            // Draw static scene
            drawGame();
        }
    }, [isPlaying]); // eslint-disable-next-line react-hooks/exhaustive-deps


    // Helper to get scaled coordinates
    const getScaledPos = (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };

        const rect = canvas.getBoundingClientRect();
        const clientX = 'touches' in e ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
        const clientY = 'touches' in e ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY;

        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        return {
            x: (clientX - rect.left) * scaleX,
            y: (clientY - rect.top) * scaleY
        };
    };

    const handleMouseDown = useCallback((e: React.MouseEvent | React.TouchEvent) => {
        if (!isPlaying) return;

        const { x, y } = getScaledPos(e);

        // Check if clicking near bow (generous hit area)
        const dist = Math.sqrt((x - BOW_X) ** 2 + (y - BOW_Y) ** 2);
        if (dist < 150) {
            isDraggingRef.current = true;
            dragStartRef.current = { x, y };
            dragCurrentRef.current = { x, y };
        }
    }, [isPlaying]);

    const handleMouseMove = useCallback((e: MouseEvent | TouchEvent) => {
        if (!isDraggingRef.current) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const clientX = 'touches' in e ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
        const clientY = 'touches' in e ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY;

        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        dragCurrentRef.current = {
            x: (clientX - rect.left) * scaleX,
            y: (clientY - rect.top) * scaleY
        };
    }, []);

    const handleMouseUp = useCallback(() => {
        if (!isDraggingRef.current) return;
        isDraggingRef.current = false;

        // Shoot
        const dx = dragStartRef.current.x - dragCurrentRef.current.x;
        const dy = dragStartRef.current.y - dragCurrentRef.current.y;

        const power = Math.sqrt(dx * dx + dy * dy) * 0.15; // Power multiplier
        const angle = Math.atan2(dy, dx);

        const vx = Math.cos(angle) * power;
        const vy = Math.sin(angle) * power;

        if (power > 2) { // Minimum pull needed
            arrowsRef.current.push({
                x: BOW_X,
                y: BOW_Y,
                vx: vx,
                vy: vy,
                active: true
            });
        }
    }, []);

    // Global event listeners for drag
    useEffect(() => {
        const handleGlobalMove = (e: MouseEvent | TouchEvent) => handleMouseMove(e);
        const handleGlobalUp = () => handleMouseUp();

        if (isPlaying) {
            window.addEventListener('mousemove', handleGlobalMove);
            window.addEventListener('mouseup', handleGlobalUp);
            window.addEventListener('touchmove', handleGlobalMove, { passive: false });
            window.addEventListener('touchend', handleGlobalUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleGlobalMove);
            window.removeEventListener('mouseup', handleGlobalUp);
            window.removeEventListener('touchmove', handleGlobalMove);
            window.removeEventListener('touchend', handleGlobalUp);
        };
    }, [isPlaying, handleMouseMove, handleMouseUp]);

    const resetGame = () => {
        setScore(0);
        arrowsRef.current = [];
        targetsRef.current = [];
        if (onScoreUpdate) onScoreUpdate(0);
        setIsPlaying(true);
    };

    return (
        <div className="flex flex-col items-center w-full">
            <div className="relative">
                <canvas
                    ref={canvasRef}
                    width={800}
                    height={500}
                    className="bg-sky-100 rounded-lg block mx-auto max-w-full shadow-2xl border border-gray-700 cursor-crosshair touch-none"
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleMouseDown}
                />
                {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                        <button
                            onClick={resetGame}
                            className="bg-primary text-white text-xl font-bold py-3 px-8 rounded-full hover:bg-secondary transition-all transform hover:scale-105"
                        >
                            {t('startGame')}
                        </button>
                    </div>
                )}
            </div>
            <p className="mt-4 text-gray-600 text-sm">
                {t('bowandarrowInstructions')}
            </p>
        </div>
    );
};

export default BowAndArrowGame;
