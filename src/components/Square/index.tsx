import React from "react";
import "./style.css";

type SquareProps = {
  value: any;
  onSquareClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const Square: React.FC<SquareProps> = (props) => {
  return (
    <button className="Square" onClick={props.onSquareClick}>
      {props.value}
    </button>
  );
};

export default Square;
