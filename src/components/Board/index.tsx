import React from 'react';
import './style.css';
import Square from '../Square';

type Props = {
  squares: string[];
  onSquareClick: (i: number) => void;
};

const Board: React.FC<Props> = ({ squares, onSquareClick }) => {
  const renderSquare = (i: number) => {
    return <Square value={squares[i]} onSquareClick={() => onSquareClick(i)} />;
  };

  const rows = [0, 1, 2];
  const cols = [0, 1, 2];

  return (
    <>
      {rows.map((row) => (
        <div className="Board__row">
          {cols.map((col) => col + 3 * row).map((col) => renderSquare(col))}
        </div>
      ))}
    </>
  );
};

export default Board;
