
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const BOARD_SIZE = 480;
const SQUARE_SIZE = BOARD_SIZE / 8;

type PieceType = 'p' | 'r' | 'n' | 'b' | 'q' | 'k';
type PieceColor = 'w' | 'b';
type Piece = { type: PieceType; color: PieceColor } | null;
type Board = Piece[][];
type Position = { row: number; col: number };

const initialBoard: Board = [
  [{ type: 'r', color: 'b' }, { type: 'n', color: 'b' }, { type: 'b', color: 'b' }, { type: 'q', color: 'b' }, { type: 'k', color: 'b' }, { type: 'b', color: 'b' }, { type: 'n', color: 'b' }, { type: 'r', color: 'b' }],
  Array(8).fill({ type: 'p', color: 'b' }),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill({ type: 'p', color: 'w' }),
  [{ type: 'r', color: 'w' }, { type: 'n', color: 'w' }, { type: 'b', color: 'w' }, { type: 'q', color: 'w' }, { type: 'k', color: 'w' }, { type: 'b', color: 'w' }, { type: 'n', color: 'w' }, { type: 'r', color: 'w' }],
];

const pieceSymbols: Record<string, string> = {
  'w-k': '♔', 'w-q': '♕', 'w-r': '♖', 'w-b': '♗', 'w-n': '♘', 'w-p': '♙',
  'b-k': '♚', 'b-q': '♛', 'b-r': '♜', 'b-b': '♝', 'b-n': '♞', 'b-p': '♟',
};

const ChessGame: React.FC = () => {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [gameRunning, setGameRunning] = useState(false);
  const [board, setBoard] = useState<Board>(JSON.parse(JSON.stringify(initialBoard)));
  const [selectedPos, setSelectedPos] = useState<Position | null>(null);
  const [turn, setTurn] = useState<PieceColor>('w');

  const drawBoard = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear
    ctx.clearRect(0, 0, BOARD_SIZE, BOARD_SIZE);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `${SQUARE_SIZE * 0.8}px Arial`;

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        // Draw Square
        let fill = (row + col) % 2 === 0 ? '#F0D9B5' : '#B58863';
        
        // Highlight selected
        if (selectedPos && selectedPos.row === row && selectedPos.col === col) {
            fill = '#829769'; // Selected highlight
        }

        ctx.fillStyle = fill;
        ctx.fillRect(col * SQUARE_SIZE, row * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);

        // Draw Piece
        const piece = board[row][col];
        if (piece) {
          ctx.fillStyle = '#000'; // Symbols are black glyphs
          const symbol = pieceSymbols[`${piece.color}-${piece.type}`];
          ctx.fillText(symbol, col * SQUARE_SIZE + SQUARE_SIZE / 2, row * SQUARE_SIZE + SQUARE_SIZE / 2 + 4);
        }
      }
    }

    if (!gameRunning) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, BOARD_SIZE, BOARD_SIZE);
        ctx.fillStyle = '#fff';
        ctx.font = '24px Arial';
        ctx.fillText(t('startGame'), BOARD_SIZE / 2, BOARD_SIZE / 2);
    }
  }, [board, selectedPos, gameRunning, t]);

  useEffect(() => {
    drawBoard();
  }, [drawBoard]);

  const isValidMove = (from: Position, to: Position, piece: Piece, target: Piece): boolean => {
    if (!piece) return false;
    // Cannot capture own piece
    if (target && target.color === piece.color) return false;

    const dx = to.col - from.col;
    const dy = to.row - from.row;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    // Simplified movement rules (not checking full path collision for sliding pieces for brevity, but playable)
    switch (piece.type) {
        case 'p': // Pawn
            const dir = piece.color === 'w' ? -1 : 1;
            const startRow = piece.color === 'w' ? 6 : 1;
            // Move forward 1
            if (dx === 0 && dy === dir && !target) return true;
            // Move forward 2
            if (dx === 0 && dy === dir * 2 && from.row === startRow && !target && !board[from.row + dir][from.col]) return true;
            // Capture
            if (absDx === 1 && dy === dir && target) return true;
            return false;
        case 'r': // Rook
            return dx === 0 || dy === 0;
        case 'n': // Knight
            return (absDx === 1 && absDy === 2) || (absDx === 2 && absDy === 1);
        case 'b': // Bishop
            return absDx === absDy;
        case 'q': // Queen
            return absDx === absDy || dx === 0 || dy === 0;
        case 'k': // King
            return absDx <= 1 && absDy <= 1;
        default:
            return false;
    }
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!gameRunning) return;

    const rect = canvasRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const col = Math.floor(x / SQUARE_SIZE);
    const row = Math.floor(y / SQUARE_SIZE);

    const clickedPiece = board[row][col];

    // Select piece
    if (!selectedPos) {
      if (clickedPiece && clickedPiece.color === turn) {
        setSelectedPos({ row, col });
      }
    } else {
      // Move or deselect
      if (selectedPos.row === row && selectedPos.col === col) {
        setSelectedPos(null); // Deselect
      } else {
        const fromPiece = board[selectedPos.row][selectedPos.col];
        if (isValidMove(selectedPos, { row, col }, fromPiece, clickedPiece)) {
            // Execute move
            const newBoard = [...board.map(r => [...r])];
            newBoard[row][col] = fromPiece;
            newBoard[selectedPos.row][selectedPos.col] = null;
            setBoard(newBoard);
            setTurn(turn === 'w' ? 'b' : 'w');
            setSelectedPos(null);
        } else {
            // If clicked on another own piece, switch selection
            if (clickedPiece && clickedPiece.color === turn) {
                setSelectedPos({ row, col });
            } else {
                setSelectedPos(null);
            }
        }
      }
    }
  };

  const resetGame = () => {
    setBoard(JSON.parse(JSON.stringify(initialBoard)));
    setTurn('w');
    setSelectedPos(null);
    setGameRunning(false); // Stop game to force user to click Start
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
        {/* Turn indicator */}
        {gameRunning && (
            <div className="absolute top-2 right-2 bg-white/80 px-2 py-1 rounded text-xs font-bold shadow">
                Turn: {turn === 'w' ? 'White' : 'Black'}
            </div>
        )}
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <button
            className={`bg-primary text-white border-none px-5 py-2.5 rounded hover:bg-secondary transition-colors ${gameRunning ? 'hidden' : ''}`}
            onClick={() => setGameRunning(true)}
        >
            {t('startGame')}
        </button>
        {/* Chess doesn't really pause, but we can hide Start and show Restart when running */}
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

export default ChessGame;
