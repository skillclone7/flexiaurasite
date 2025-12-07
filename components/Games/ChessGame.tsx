import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const BOARD_SIZE = 480;
const SQUARE_SIZE = BOARD_SIZE / 8;

type PieceType = 'p' | 'r' | 'n' | 'b' | 'q' | 'k';
type PieceColor = 'w' | 'b';
type Piece = { type: PieceType; color: PieceColor; hasMoved: boolean } | null;
type Board = Piece[][];
type Position = { row: number; col: number };

const initialBoard: Board = [
  [{ type: 'r', color: 'b', hasMoved: false }, { type: 'n', color: 'b', hasMoved: false }, { type: 'b', color: 'b', hasMoved: false }, { type: 'q', color: 'b', hasMoved: false }, { type: 'k', color: 'b', hasMoved: false }, { type: 'b', color: 'b', hasMoved: false }, { type: 'n', color: 'b', hasMoved: false }, { type: 'r', color: 'b', hasMoved: false }],
  Array(8).fill(null).map(() => ({ type: 'p', color: 'b', hasMoved: false })),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null).map(() => ({ type: 'p', color: 'w', hasMoved: false })),
  [{ type: 'r', color: 'w', hasMoved: false }, { type: 'n', color: 'w', hasMoved: false }, { type: 'b', color: 'w', hasMoved: false }, { type: 'q', color: 'w', hasMoved: false }, { type: 'k', color: 'w', hasMoved: false }, { type: 'b', color: 'w', hasMoved: false }, { type: 'n', color: 'w', hasMoved: false }, { type: 'r', color: 'w', hasMoved: false }],
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
  const [isChecked, setIsChecked] = useState(false);
  const [checkMate, setCheckMate] = useState(false);

  const isPosValid = (r: number, c: number) => r >= 0 && r < 8 && c >= 0 && c < 8;

  // Check if path is clear for sliding pieces (Rook, Bishop, Queen)
  const isPathClear = (from: Position, to: Position, boardState: Board): boolean => {
    const dx = Math.sign(to.col - from.col);
    const dy = Math.sign(to.row - from.row);
    let r = from.row + dy;
    let c = from.col + dx;

    while (r !== to.row || c !== to.col) {
      if (boardState[r][c]) return false; // Blocked
      r += dy;
      c += dx;
    }
    return true;
  };

  const canMove = (from: Position, to: Position, boardState: Board, checkTurn = true): boolean => {
    if (!isPosValid(to.row, to.col)) return false;

    const piece = boardState[from.row][from.col];
    const target = boardState[to.row][to.col];

    if (!piece) return false;
    if (checkTurn && piece.color !== turn) return false; // Not your turn
    if (target && target.color === piece.color) return false; // Cannot capture own

    const dx = to.col - from.col;
    const dy = to.row - from.row;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    switch (piece.type) {
      case 'p': {
        const dir = piece.color === 'w' ? -1 : 1;
        const startRow = piece.color === 'w' ? 6 : 1;
        // Move 1
        if (dx === 0 && dy === dir && !target) return true;
        // Move 2
        if (dx === 0 && dy === dir * 2 && from.row === startRow && !target && !boardState[from.row + dir][from.col]) return true;
        // Capture
        if (absDx === 1 && dy === dir && target) return true;
        return false;
      }
      case 'r':
        if (!(dx === 0 || dy === 0)) return false;
        return isPathClear(from, to, boardState);
      case 'b':
        if (absDx !== absDy) return false;
        return isPathClear(from, to, boardState);
      case 'q':
        if (!(absDx === absDy || dx === 0 || dy === 0)) return false;
        return isPathClear(from, to, boardState);
      case 'n':
        return (absDx === 1 && absDy === 2) || (absDx === 2 && absDy === 1);
      case 'k':
        // Regular move
        if (absDx <= 1 && absDy <= 1) return true;
        // Castling
        if (absDy === 0 && absDx === 2 && !piece.hasMoved) {
          const rookCol = dx > 0 ? 7 : 0;
          const rook = boardState[from.row][rookCol];
          if (rook && rook.type === 'r' && !rook.hasMoved) {
            // Path must be clear
            if (!isPathClear(from, { row: from.row, col: rookCol }, boardState)) return false;
            // King cannot move through check (Simplified: just checking destination is safe in executeMove wrapper usually, 
            // but stricty should check intermediate squares. Not implementing full intermediate check for simplicity unless critical)
            return true;
          }
        }
        return false;
      default: return false;
    }
  };

  // Find King Position
  const findKing = (color: PieceColor, boardState: Board): Position | null => {
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const p = boardState[r][c];
        if (p && p.type === 'k' && p.color === color) return { row: r, col: c };
      }
    }
    return null;
  };

  // Check if position is under attack
  const isSquareAttacked = (pos: Position, byColor: PieceColor, boardState: Board): boolean => {
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const p = boardState[r][c];
        if (p && p.color === byColor) {
          // Can this piece move to 'pos'?
          // Note: Pawns capture diagonally, move straight. Validation logic handles this differentiation? 
          // Our `canMove` handles pawn capture logic if target exists.
          // However, to check "attack" on an empty square, we need to simulate a target or modify canMove.
          // Quick fix: Pawn attacks are strictly diagonal.
          if (p.type === 'p') {
            const dir = p.color === 'w' ? -1 : 1;
            if (Math.abs(pos.col - c) === 1 && pos.row === r + dir) return true;
          } else {
            // Treat 'pos' as if it had an enemy piece for capture logic purposes
            // But simplest way: does `canMove` return true? 
            // We need to bypass "target" check in canMove for empty squares? 
            // Actually, `canMove` handles basic geometry.
            if (canMove({ row: r, col: c }, pos, boardState, false)) return true;
          }
        }
      }
    }
    return false;
  };

  // Does this move result in self-check?
  const isMoveSafe = (from: Position, to: Position): boolean => {
    const tempBoard = JSON.parse(JSON.stringify(board));
    const piece = tempBoard[from.row][from.col];
    tempBoard[to.row][to.col] = piece;
    tempBoard[from.row][from.col] = null;

    const myKing = findKing(piece.color, tempBoard);
    if (!myKing) return false; // Should not happen

    const enemyColor = piece.color === 'w' ? 'b' : 'w';
    return !isSquareAttacked(myKing, enemyColor, tempBoard);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!gameRunning) return;

    const rect = canvasRef.current!.getBoundingClientRect();
    const scaleX = canvasRef.current!.width / rect.width;
    const scaleY = canvasRef.current!.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    const col = Math.floor(x / SQUARE_SIZE);
    const row = Math.floor(y / SQUARE_SIZE);

    const clickedPiece = board[row][col];

    if (!selectedPos) {
      if (clickedPiece && clickedPiece.color === turn) {
        setSelectedPos({ row, col });
      }
    } else {
      if (selectedPos.row === row && selectedPos.col === col) {
        setSelectedPos(null);
      } else {
        const fromPiece = board[selectedPos.row][selectedPos.col];
        if (fromPiece?.color === turn) {
          // Valid geometry?
          if (canMove(selectedPos, { row, col }, board, true)) {
            // Safe? (No self check)
            if (isMoveSafe(selectedPos, { row, col })) {
              executeMove(selectedPos, { row, col });
              setSelectedPos(null);
            } else {
              // Flash feedback maybe?
              console.log("Cannot move into check!");
              setSelectedPos(null);
            }
          } else if (clickedPiece && clickedPiece.color === turn) {
            setSelectedPos({ row, col }); // Change selection
          } else {
            setSelectedPos(null); // Invalid
          }
        }
      }
    }
  };

  const executeMove = (from: Position, to: Position) => {
    const newBoard = [...board.map(r => [...r])];
    const piece = newBoard[from.row][from.col]!;

    // Castling logic (Move Rook)
    if (piece.type === 'k' && Math.abs(to.col - from.col) === 2) {
      const rookCol = to.col > from.col ? 7 : 0;
      const newRookCol = to.col > from.col ? 5 : 3;
      const rook = newBoard[from.row][rookCol]!;
      newBoard[from.row][newRookCol] = rook;
      newBoard[from.row][rookCol] = null;
      rook.hasMoved = true;
    }

    newBoard[to.row][to.col] = piece;
    newBoard[from.row][from.col] = null;
    piece.hasMoved = true;

    // Promotion (Auto Queen for now)
    if (piece.type === 'p' && (to.row === 0 || to.row === 7)) {
      piece.type = 'q';
    }

    setBoard(newBoard);

    const nextTurn = turn === 'w' ? 'b' : 'w';
    setTurn(nextTurn);

    // Check status
    const kingPos = findKing(nextTurn, newBoard);
    if (kingPos && isSquareAttacked(kingPos, turn, newBoard)) { // attacked by 'turn' (who just moved)
      setIsChecked(true);
      // Ideally check for Checkmate here (no valid moves left)
    } else {
      setIsChecked(false);
    }
  };

  // AI Logic (Simple Random safe move)
  useEffect(() => {
    if (gameRunning && turn === 'b') {
      const timer = setTimeout(() => {
        const allMoves: { from: Position, to: Position }[] = [];

        for (let r = 0; r < 8; r++) {
          for (let c = 0; c < 8; c++) {
            const p = board[r][c];
            if (p && p.color === 'b') {
              for (let tr = 0; tr < 8; tr++) {
                for (let tc = 0; tc < 8; tc++) {
                  const from = { row: r, col: c };
                  const to = { row: tr, col: tc };
                  if (canMove(from, to, board, true)) {
                    if (isMoveSafe(from, to)) {
                      allMoves.push({ from, to });
                    }
                  }
                }
              }
            }
          }
        }

        if (allMoves.length > 0) {
          // Prioritize capturing
          const captures = allMoves.filter(m => board[m.to.row][m.to.col] !== null);
          if (captures.length > 0) {
            const m = captures[Math.floor(Math.random() * captures.length)];
            executeMove(m.from, m.to);
          } else {
            const m = allMoves[Math.floor(Math.random() * allMoves.length)];
            executeMove(m.from, m.to);
          }
        } else {
          // Checkmate or Stalemate
          setGameRunning(false);
        }

      }, 500);
      return () => clearTimeout(timer);
    }
  }, [gameRunning, turn, board]);

  const resetGame = () => {
    setBoard(JSON.parse(JSON.stringify(initialBoard)));
    setTurn('w');
    setSelectedPos(null);
    setIsChecked(false);
    setGameRunning(false);
  };

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
          fill = '#829769';
        }

        // Highlight Check
        const piece = board[row][col];
        if (piece && piece.type === 'k' && piece.color === turn && isChecked) {
          fill = '#e74c3c'; // Red alarm
        }

        ctx.fillStyle = fill;
        ctx.fillRect(col * SQUARE_SIZE, row * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);

        // Draw Piece
        if (piece) {
          ctx.fillStyle = '#000';
          const symbol = pieceSymbols[`${piece.color}-${piece.type}`];
          ctx.fillText(symbol, col * SQUARE_SIZE + SQUARE_SIZE / 2, row * SQUARE_SIZE + SQUARE_SIZE / 2 + 4);
        }
      }
    }

    if (!gameRunning) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(0, 0, BOARD_SIZE, BOARD_SIZE);
      ctx.fillStyle = '#fff';

      // Determine win/loss text is not stored in state except implicit turn/running
      // Simplified start screen
    }
  }, [board, selectedPos, gameRunning, t, isChecked, turn]);

  useEffect(() => {
    drawBoard();
  }, [drawBoard]);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={BOARD_SIZE}
          height={BOARD_SIZE}
          onClick={handleCanvasClick}
          className="bg-body rounded-lg block mx-auto max-w-full shadow-md cursor-pointer"
          style={{ touchAction: 'none' }}
        />
      </div>

      {isChecked && gameRunning && (
        <div className="mt-2 text-red-600 font-bold animate-pulse">CHECK!</div>
      )}

      {/* Turn indicator below canvas */}
      {gameRunning && (
        <div className="mt-4 bg-white/90 px-4 py-2 rounded shadow text-sm font-bold border border-gray-200">
          Turn: {turn === 'w' ? 'White' : 'Black'}
        </div>
      )}

      <div className="flex justify-center gap-4 mt-8">
        <button
          className={`bg-primary text-white border-none px-5 py-2.5 rounded hover:bg-secondary transition-colors ${gameRunning ? 'hidden' : ''}`}
          onClick={() => setGameRunning(true)}
        >
          {t('startGame')}
        </button>
        <button
          className="bg-red-600 text-white border-none px-5 py-2.5 rounded hover:bg-red-700 transition-colors"
          onClick={resetGame}
        >
          {t('resetGame')}
        </button>
      </div>
    </div>
  );
};

export default ChessGame;
