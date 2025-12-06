
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const BOARD_SIZE = 480;
const SQUARE_SIZE = BOARD_SIZE / 8;

type Player = 'red' | 'white';
type Piece = { player: Player; isKing: boolean } | null;
type Board = Piece[][];
type Position = { row: number; col: number };
type Move = { from: Position; to: Position; isJump: boolean; jumpPos?: Position };

const CheckersGame: React.FC = () => {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [gameRunning, setGameRunning] = useState(false);
  const [board, setBoard] = useState<Board>([]);
  const [selectedPos, setSelectedPos] = useState<Position | null>(null);
  const [turn, setTurn] = useState<Player>('red'); // Red is Player, White is CPU
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<Player | null>(null);

  // Initialize Board
  const initBoard = () => {
    const newBoard: Board = Array(8).fill(null).map(() => Array(8).fill(null));
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if ((row + col) % 2 === 1) {
          if (row < 3) newBoard[row][col] = { player: 'white', isKing: false };
          else if (row > 5) newBoard[row][col] = { player: 'red', isKing: false };
        }
      }
    }
    return newBoard;
  };

  useEffect(() => {
    setBoard(initBoard());
  }, []);

  // Helper: Get valid moves for a specific position
  const getValidMoves = (boardState: Board, pos: Position): Move[] => {
    const piece = boardState[pos.row][pos.col];
    if (!piece) return [];

    const moves: Move[] = [];
    const directions = piece.isKing ? [-1, 1] : piece.player === 'red' ? [-1] : [1];
    
    // Regular moves and jumps
    // Note: This is a simplified logic. Full checkers rules mandate captures. 
    // Here we prioritize captures in AI but don't strictly enforce them on UI for simplicity/fun.

    // Check 4 diagonals for kings, 2 for regular
    const dirMultipliers = piece.isKing ? [-1, 1] : [1]; // For Y axis direction relative to player

    const yDirs = piece.isKing ? [-1, 1] : (piece.player === 'red' ? [-1] : [1]);
    const xDirs = [-1, 1];

    yDirs.forEach(dRow => {
        xDirs.forEach(dCol => {
            const newRow = pos.row + dRow;
            const newCol = pos.col + dCol;

            if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                // Empty square -> Move
                if (!boardState[newRow][newCol]) {
                    moves.push({ from: pos, to: { row: newRow, col: newCol }, isJump: false });
                }
                // Opponent -> Check Jump
                else if (boardState[newRow][newCol]?.player !== piece.player) {
                    const jumpRow = newRow + dRow;
                    const jumpCol = newCol + dCol;
                    if (jumpRow >= 0 && jumpRow < 8 && jumpCol >= 0 && jumpCol < 8) {
                        if (!boardState[jumpRow][jumpCol]) {
                             moves.push({ 
                                 from: pos, 
                                 to: { row: jumpRow, col: jumpCol }, 
                                 isJump: true,
                                 jumpPos: { row: newRow, col: newCol }
                             });
                        }
                    }
                }
            }
        });
    });

    return moves;
  };

  const executeMove = (move: Move) => {
    const newBoard = [...board.map(r => [...r])];
    const piece = newBoard[move.from.row][move.from.col];
    
    if (!piece) return;

    // Move
    newBoard[move.to.row][move.to.col] = piece;
    newBoard[move.from.row][move.from.col] = null;

    // Capture
    if (move.isJump && move.jumpPos) {
        newBoard[move.jumpPos.row][move.jumpPos.col] = null;
    }

    // King Promotion
    if ((piece.player === 'red' && move.to.row === 0) || (piece.player === 'white' && move.to.row === 7)) {
        piece.isKing = true;
    }

    setBoard(newBoard);
    
    // Check Win Condition (Simple count)
    let redCount = 0;
    let whiteCount = 0;
    newBoard.forEach(row => row.forEach(p => {
        if (p?.player === 'red') redCount++;
        if (p?.player === 'white') whiteCount++;
    }));

    if (redCount === 0) { setGameOver(true); setWinner('white'); setGameRunning(false); }
    else if (whiteCount === 0) { setGameOver(true); setWinner('red'); setGameRunning(false); }
    else {
        setTurn(prev => prev === 'red' ? 'white' : 'red');
    }
  };

  // AI Logic
  useEffect(() => {
    if (gameRunning && turn === 'white' && !gameOver) {
        // Simple AI delay
        const timer = setTimeout(() => {
            const allMoves: Move[] = [];
            // Find all possible moves for white
            for (let r = 0; r < 8; r++) {
                for (let c = 0; c < 8; c++) {
                    if (board[r][c]?.player === 'white') {
                        const moves = getValidMoves(board, { row: r, col: c });
                        allMoves.push(...moves);
                    }
                }
            }

            if (allMoves.length > 0) {
                // Priority 1: Jumps (Captures)
                const jumps = allMoves.filter(m => m.isJump);
                if (jumps.length > 0) {
                    const randomJump = jumps[Math.floor(Math.random() * jumps.length)];
                    executeMove(randomJump);
                } else {
                    // Priority 2: Random Move
                    // Smart improvement: try to move to edges or towards king row (simplified here to random)
                    const randomMove = allMoves[Math.floor(Math.random() * allMoves.length)];
                    executeMove(randomMove);
                }
            } else {
                // No moves for AI -> Player wins
                setGameOver(true);
                setWinner('red');
                setGameRunning(false);
            }

        }, 800);
        return () => clearTimeout(timer);
    }
  }, [gameRunning, turn, board, gameOver]);


  const drawBoard = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, BOARD_SIZE, BOARD_SIZE);

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const isDark = (row + col) % 2 === 1;
        
        let fill = isDark ? '#B58863' : '#F0D9B5';
        
        // Highlight logic
        if (selectedPos && selectedPos.row === row && selectedPos.col === col) fill = '#6b8c42'; 
        
        // Highlight last move or hints could go here

        ctx.fillStyle = fill;
        ctx.fillRect(col * SQUARE_SIZE, row * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);

        const piece = board[row] ? board[row][col] : null;
        if (piece) {
            const cx = col * SQUARE_SIZE + SQUARE_SIZE / 2;
            const cy = row * SQUARE_SIZE + SQUARE_SIZE / 2;
            const radius = SQUARE_SIZE * 0.35;

            ctx.beginPath();
            ctx.arc(cx, cy, radius, 0, Math.PI * 2);
            ctx.fillStyle = piece.player === 'red' ? '#d32f2f' : '#f5f5f5';
            ctx.fill();
            
            // 3D effect / Shadow
            ctx.beginPath();
            ctx.arc(cx, cy, radius * 0.85, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(0,0,0,0.1)';
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.lineWidth = 2;
            ctx.strokeStyle = piece.player === 'red' ? '#b71c1c' : '#ccc';
            ctx.stroke();

            // King marker
            if (piece.isKing) {
                ctx.fillStyle = piece.player === 'red' ? '#fff' : '#d32f2f'; // Crown color contrast
                ctx.font = '24px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('♕', cx, cy + 2);
            }
        }
      }
    }

    if (!gameRunning) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.fillRect(0, 0, BOARD_SIZE, BOARD_SIZE);
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '30px Arial';
        
        if (gameOver) {
            ctx.fillText(winner === 'red' ? 'Você Venceu!' : 'Computador Venceu!', BOARD_SIZE / 2, BOARD_SIZE / 2);
            ctx.font = '20px Arial';
            ctx.fillText(t('resetGame'), BOARD_SIZE / 2, BOARD_SIZE / 2 + 40);
        } else {
            ctx.fillText(t('startGame'), BOARD_SIZE / 2, BOARD_SIZE / 2);
        }
    }
  }, [board, selectedPos, gameRunning, t, gameOver, winner]);

  useEffect(() => {
    drawBoard();
  }, [drawBoard]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!gameRunning || turn !== 'red' || gameOver) return;

    const rect = canvasRef.current!.getBoundingClientRect();
    const col = Math.floor((e.clientX - rect.left) / SQUARE_SIZE);
    const row = Math.floor((e.clientY - rect.top) / SQUARE_SIZE);

    if (row < 0 || row > 7 || col < 0 || col > 7) return;

    const clickedPiece = board[row][col];

    // Select Player Piece
    if (clickedPiece && clickedPiece.player === 'red') {
        setSelectedPos({ row, col });
        return;
    }

    // Move to Empty Square
    if (selectedPos && !clickedPiece) {
        // Validate Move
        const validMoves = getValidMoves(board, selectedPos);
        const attemptedMove = validMoves.find(m => m.to.row === row && m.to.col === col);

        if (attemptedMove) {
            executeMove(attemptedMove);
            setSelectedPos(null);
        } else {
            // Invalid move, deselect
            setSelectedPos(null);
        }
    }
  };

  const resetGame = () => {
    setBoard(initBoard());
    setTurn('red');
    setSelectedPos(null);
    setGameOver(false);
    setWinner(null);
    setGameRunning(false);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative">
        <canvas
            ref={canvasRef}
            width={BOARD_SIZE}
            height={BOARD_SIZE}
            onClick={handleCanvasClick}
            className="bg-body rounded-lg block mx-auto max-w-full shadow-md cursor-pointer"
        />
        {gameRunning && !gameOver && (
            <div className="absolute top-2 right-2 bg-white/90 px-3 py-1 rounded shadow text-sm font-bold border border-gray-200">
                {turn === 'red' ? 'Sua Vez (Vermelho)' : 'Computador...'}
            </div>
        )}
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <button
            className={`bg-primary text-white border-none px-5 py-2.5 rounded hover:bg-secondary transition-colors ${gameRunning && !gameOver ? 'hidden' : ''}`}
            onClick={() => {
                if (gameOver) resetGame();
                setGameRunning(true);
            }}
        >
            {t('startGame')}
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

export default CheckersGame;
