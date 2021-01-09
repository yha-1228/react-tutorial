import React from 'react';
import './style.css';
import Square from '../Square';

type Props = {
  squares: string[];
  onSquareClick: (i: number) => void;
};

const Board: React.FC<Props> = ({ squares, onSquareClick }) => {
  const renderSquare = (i: number) => (
    <Square value={squares[i]} onSquareClick={() => onSquareClick(i)} />
  );

  const rows = [0, 1, 2];

  const cols = [0, 1, 2];

  return (
    <>
      {[0, 3, 6]}
      <div className="Board__row">{cols.map((col) => renderSquare(col))}</div>
      <div className="Board__row">
        {cols.map((col) => col + 3 * 1).map((col) => renderSquare(col))}
      </div>
      <div className="Board__row">
        {cols.map((col) => col + 3 * 2).map((col) => renderSquare(col))}
      </div>
    </>
  );
};

export default Board;
