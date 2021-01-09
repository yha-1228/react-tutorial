import React from 'react';
import './style.css';

type Props = {
  value: any;
  onSquareClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const Square: React.FC<Props> = (props) => {
  return (
    <button className="Square" onClick={props.onSquareClick}>
      {props.value}
    </button>
  );
};

export default Square;
