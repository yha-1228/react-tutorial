// TODO: 履歴内のそれぞれの着手の位置を (col, row) というフォーマットで表示する。
// TODO: 着手履歴のリスト中で現在選択されているアイテムをボールドにする。
// TODO: Board でマス目を並べる部分を、ハードコーディングではなく 2 つのループを使用するように書き換える。
// TODO: 着手履歴のリストを昇順・降順いずれでも並べかえられるよう、トグルボタンを追加する。
// TODO: どちらかが勝利した際に、勝利につながった 3 つのマス目をハイライトする。
// TODO: どちらも勝利しなかった場合、結果が引き分けになったというメッセージを表示する。

import React from 'react';
import calculateWinner from './calculateWinner';

type SquareProps = {
  value: any;
  onSquareClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
};

const Square: React.FC<SquareProps> = (props) => {
  return (
    <button className="square" onClick={props.onSquareClick}>
      {props.value}
    </button>
  );
};

type BoradProps = {
  squares: string[];
  onSquareClick: (i: number) => void;
};

const Board: React.FC<BoradProps> = ({ squares, onSquareClick }) => {
  const renderSquare = (i: number) => (
    <Square value={squares[i]} onSquareClick={() => onSquareClick(i)} />
  );

  return (
    <>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </>
  );
};

type GameState = {
  histories: { squares: any[] }[];
  stepNumber: number;
  xIsNext: boolean;
};

class Game extends React.Component<any, GameState> {
  constructor(props: any) {
    super(props);
    this.state = {
      histories: [{ squares: Array(9).fill(null) }],
      stepNumber: 0,
      xIsNext: true,
    };
    this.handleSquareClick = this.handleSquareClick.bind(this);
    this.jumpTo = this.jumpTo.bind(this);
  }

  handleSquareClick(i: number) {
    const histories = this.state.histories.slice(0, this.state.stepNumber + 1);
    const current = histories[histories.length - 1];
    const squares = [...current.squares];

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      histories: [...histories, { squares: squares }],
      stepNumber: histories.length,
      xIsNext: !this.props.xIsNext,
    });
  }

  jumpTo(historyIndex: number) {
    this.setState({
      stepNumber: historyIndex,
      xIsNext: historyIndex % 2 === 0,
    });
  }

  render() {
    const histories = this.state.histories;
    const current = histories[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = histories.map((history, historyIndex) => (
      <li key={historyIndex}>
        <button onClick={() => this.jumpTo(historyIndex)}>
          {historyIndex ? `Go to move ${historyIndex}` : 'Go to game start'}
        </button>
      </li>
    ));
    const status = winner
      ? `Winner: ${winner}`
      : `Next player: ${this.props.xIsNext ? 'X' : 'O'}`;

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onSquareClick={this.handleSquareClick}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
