import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const BOARD_SIZE = 480;
const SQUARE_SIZE = BOARD_SIZE / 8;

type Player = 'red' | 'white';
type Piece = { player: Player; isKing: boolean } | null;
type Board = Piece[][];
type Position = { row: number; col: number };
type Move = { from: Position; to: Position; isJump: boolean; jumpPos?: Position; jumpedPiece?: Position };

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

  // Rules Implementation (International/Brazilian on 8x8)
  // 1. Men capture forwards and backwards.
  // 2. Kings ("Flying Kings") move and capture any distance diagonally.
  // 3. Captures are mandatory (Not strictly enforcing for player experience, but AI will prioritize).

  const isValidPos = (r: number, c: number) => r >= 0 && r < 8 && c >= 0 && c < 8;

  const getValidMoves = (boardState: Board, pos: Position, mustCaptureSequence = false): Move[] => {
    const piece = boardState[pos.row][pos.col];
    if (!piece) return [];

    const moves: Move[] = [];
    const directions = [[-1, -1], [-1, 1], [1, -1], [1, 1]];

    // Capture Logic
    directions.forEach(([dRow, dCol]) => {
      // Check for immediate capture
      if (!piece.isKing) {
        // Regular Piece Capture (Short range, but back and forth allowed in International)
        const jumpR = pos.row + dRow * 2;
        const jumpC = pos.col + dCol * 2;
        const midR = pos.row + dRow;
        const midC = pos.col + dCol;

        if (isValidPos(jumpR, jumpC)) {
          const midPiece = boardState[midR][midC];
          if (midPiece && midPiece.player !== piece.player && !boardState[jumpR][jumpC]) {
            moves.push({
              from: pos,
              to: { row: jumpR, col: jumpC },
              isJump: true,
              jumpPos: { row: midR, col: midC }
            });
          }
        }
      } else {
        // King Capture (Flying)
        let r = pos.row + dRow;
        let c = pos.col + dCol;
        while (isValidPos(r, c)) {
          if (boardState[r][c]) {
            // Found a piece
            if (boardState[r][c]!.player !== piece.player) {
              // Enemy? Check if we can land behind it
              let landR = r + dRow;
              let landC = c + dCol;
              // We can land on any empty square after it
              while (isValidPos(landR, landC) && !boardState[landR][landC]) {
                moves.push({
                  from: pos,
                  to: { row: landR, col: landC },
                  isJump: true,
                  jumpPos: { row: r, col: c }
                });
                landR += dRow;
                landC += dCol;
              }
            }
            break; // Stop scanning this direction after hitting piece
          }
          r += dRow;
          c += dCol;
        }
      }
    });

    if (mustCaptureSequence) return moves.filter(m => m.isJump);

    // Regular Moves (Only if NO captures available, usually only captures are allowed if exists)
    // Check if captures exist for THIS piece
    const captureMoves = moves.filter(m => m.isJump);
    if (captureMoves.length > 0) return captureMoves;

    // Movement Logic
    directions.forEach(([dRow, dCol]) => {
      if (!piece.isKing) {
        // Men only move forward (Red moves UP (-1), White moves DOWN (+1))
        const forward = piece.player === 'red' ? -1 : 1;
        if (dRow === forward) {
          const r = pos.row + dRow;
          const c = pos.col + dCol;
          if (isValidPos(r, c) && !boardState[r][c]) {
            moves.push({ from: pos, to: { row: r, col: c }, isJump: false });
          }
        }
      } else {
        // King Movement (Flying)
        let r = pos.row + dRow;
        let c = pos.col + dCol;
        while (isValidPos(r, c)) {
          if (boardState[r][c]) break; // Blocked
          moves.push({ from: pos, to: { row: r, col: c }, isJump: false });
          r += dRow;
          c += dCol;
        }
      }
    });

    return moves;
  };

  const getGlobalCaptures = (boardState: Board, player: Player): Move[] => {
    const captures: Move[] = [];
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const p = boardState[r][c];
        if (p && p.player === player) {
          const moves = getValidMoves(boardState, { row: r, col: c });
          captures.push(...moves.filter(m => m.isJump));
        }
      }
    }
    return captures;
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

    // Multi-jump logic could go here (if jump, check if FROM new pos can jump again)
    // For simplicity, we turn over turn immediately unless it's a huge feature request.
    // International rules mandate multi-jumps. 
    // Implementing simple single turn switch for now to keep flow smooth.

    // Check Win
    checkWin(newBoard);

    // Switch Turn
    setTurn(turn === 'red' ? 'white' : 'red');
  };

  const checkWin = (currentBoard: Board) => {
    let redCount = 0;
    let whiteCount = 0;
    currentBoard.forEach(row => row.forEach(p => {
      if (p?.player === 'red') redCount++;
      if (p?.player === 'white') whiteCount++;
    }));

    if (redCount === 0) { setGameOver(true); setWinner('white'); setGameRunning(false); }
    else if (whiteCount === 0) { setGameOver(true); setWinner('red'); setGameRunning(false); }
  };

  // AI Logic
  useEffect(() => {
    if (gameRunning && turn === 'white' && !gameOver) {
      const timer = setTimeout(() => {
        let allMoves: Move[] = [];

        // Check for MANDATORY captures globally first
        const globalCaptures = getGlobalCaptures(board, 'white');

        if (globalCaptures.length > 0) {
          allMoves = globalCaptures;
        } else {
          // Find all possible regular moves
          for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
              if (board[r][c]?.player === 'white') {
                const moves = getValidMoves(board, { row: r, col: c });
                allMoves.push(...moves);
              }
            }
          }
        }

        if (allMoves.length > 0) {
          // Prioritize jumps if any (redundant check but safe)
          const jumps = allMoves.filter(m => m.isJump);
          const chosenMove = jumps.length > 0
            ? jumps[Math.floor(Math.random() * jumps.length)]
            : allMoves[Math.floor(Math.random() * allMoves.length)];

          executeMove(chosenMove);
        } else {
          // No moves (Stalemate logic -> Loss for current player usually)
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

        let fill = isDark ? '#769656' : '#eeeed2'; // Classic Green/Beige theme

        // Highlight logic
        if (selectedPos && selectedPos.row === row && selectedPos.col === col) fill = '#baca44';

        ctx.fillStyle = fill;
        ctx.fillRect(col * SQUARE_SIZE, row * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);

        // Highlight valid moves
        if (selectedPos) {
          const moves = getValidMoves(board, selectedPos);
          moves.forEach(m => {
            if (m.to.row === row && m.to.col === col) {
              ctx.beginPath();
              ctx.fillStyle = 'rgba(0,0,0,0.2)';
              ctx.arc(col * SQUARE_SIZE + SQUARE_SIZE / 2, row * SQUARE_SIZE + SQUARE_SIZE / 2, 10, 0, Math.PI * 2);
              ctx.fill();
            }
          });
        }

        const piece = board[row] ? board[row][col] : null;
        if (piece) {
          const cx = col * SQUARE_SIZE + SQUARE_SIZE / 2;
          const cy = row * SQUARE_SIZE + SQUARE_SIZE / 2;
          const radius = SQUARE_SIZE * 0.4;

          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.fillStyle = piece.player === 'red' ? '#d32f2f' : '#f5f5f5';
          ctx.fill();

          // Inner ring
          ctx.beginPath();
          ctx.arc(cx, cy, radius * 0.7, 0, Math.PI * 2);
          ctx.strokeStyle = piece.player === 'red' ? '#b71c1c' : '#ccc';
          ctx.lineWidth = 3;
          ctx.stroke();

          // King marker
          if (piece.isKing) {
            ctx.fillStyle = piece.player === 'red' ? '#fff' : '#d32f2f';
            ctx.font = '30px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('♔', cx, cy + 2);
          }
        }
      }
    }

    if (!gameRunning) {
      // Overlay
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(0, 0, BOARD_SIZE, BOARD_SIZE);
    }
  }, [board, selectedPos, gameRunning, t, gameOver, winner]);

  useEffect(() => {
    drawBoard();
  }, [drawBoard]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!gameRunning || turn !== 'red' || gameOver) return;

    const rect = canvasRef.current!.getBoundingClientRect();
    const scaleX = canvasRef.current!.width / rect.width;
    const scaleY = canvasRef.current!.height / rect.height;

    const col = Math.floor(((e.clientX - rect.left) * scaleX) / SQUARE_SIZE);
    const row = Math.floor(((e.clientY - rect.top) * scaleY) / SQUARE_SIZE);

    if (row < 0 || row > 7 || col < 0 || col > 7) return;

    const clickedPiece = board[row][col];

    // Select Player Piece
    if (clickedPiece && clickedPiece.player === 'red') {
      setSelectedPos({ row, col });
      return;
    }

    // Move to Empty Square
    if (selectedPos && !clickedPiece) {
      // Validate Move globally (does ANY piece have a capture? if so, must use that)
      // For user friendliness, we simply validate if THIS move is valid under rules.
      // Strict tournament play would prevent clicking a non-capturing piece if others can capture.

      const validMoves = getValidMoves(board, selectedPos);
      const attemptedMove = validMoves.find(m => m.to.row === row && m.to.col === col);

      if (attemptedMove) {
        // Enforce global capture rule? 
        // Let's implement soft enforcement: If this move is NOT a jump, but there ARE jumps available else where?
        // Skipped for now to keep game casual.

        executeMove(attemptedMove);
        setSelectedPos(null);
      } else {
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
          className="bg-body rounded-lg block mx-auto max-w-full shadow-xl cursor-pointer"
          style={{ touchAction: 'none' }}
        />
        {!gameRunning && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h2 className="text-white text-3xl font-bold drop-shadow-md">
              {gameOver
                ? (winner === 'red' ? 'You Win!' : 'Game Over')
                : 'Ready?'}
            </h2>
          </div>
        )}
      </div>

      {/* Turn indicator below canvas */}
      {gameRunning && !gameOver && (
        <div className="mt-4 bg-white/90 px-6 py-2 rounded-full shadow-lg text-sm font-bold border border-gray-200 flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${turn === 'red' ? 'bg-red-600' : 'bg-gray-400'}`}></div>
          {turn === 'red' ? t('checkersGame') + ' (You)' : 'Opponent'}
        </div>
      )}

      <div className="flex justify-center gap-4 mt-8">
        <button
          className={`bg-primary text-white border-none px-6 py-2 rounded shadow hover:bg-secondary transition-colors font-bold ${gameRunning && !gameOver ? 'hidden' : ''}`}
          onClick={() => {
            if (gameOver) resetGame();
            setGameRunning(true);
          }}
        >
          {t('startGame')}
        </button>
        <button
          className="bg-red-600 text-white border-none px-6 py-2 rounded shadow hover:bg-red-700 transition-colors"
          onClick={resetGame}
        >
          {t('resetGame')}
        </button>
      </div>
    </div>
  );
};

export default CheckersGame;
