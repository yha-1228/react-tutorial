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

  return (
    <>
      <div className="Board__row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="Board__row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="Board__row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </>
  );
};

export default Board;
