import React from 'react';

type SquareProps = {
  value: any;
  onSquareClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const Square: React.FC<SquareProps> = (props) => {
  return (
    <button className="square" onClick={props.onSquareClick}>
      {props.value}
    </button>
  );
};

export default Square;
