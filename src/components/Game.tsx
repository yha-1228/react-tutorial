// 時間がある場合や、今回身につけた新しいスキルを練習してみたい場合に、あなたが挑戦できる改良のアイデアを以下にリストアップしています。後ろの方ほど難易度が上がります：

// 履歴内のそれぞれの着手の位置を (col, row) というフォーマットで表示する。
// 着手履歴のリスト中で現在選択されているアイテムをボールドにする。
// Board でマス目を並べる部分を、ハードコーディングではなく 2 つのループを使用するように書き換える。
// 着手履歴のリストを昇順・降順いずれでも並べかえられるよう、トグルボタンを追加する。
// どちらかが勝利した際に、勝利につながった 3 つのマス目をハイライトする。
// どちらも勝利しなかった場合、結果が引き分けになったというメッセージを表示する。

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

class Board extends React.Component<BoradProps, {}> {
  renderSquare(i: number) {
    return (
      <Square
        value={this.props.squares[i]}
        onSquareClick={() => this.props.onSquareClick(i)}
      />
    );
  }

  render() {
    return (
      <>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </>
    );
  }
}

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
  }

  handleSquareClick(i: number) {
    const histories = this.state.histories.slice(0, this.state.stepNumber + 1);
    const current = histories[histories.length - 1];
    const squares = [...current.squares];

    // 勝者が存在する or 番号があるマスをクリックした
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

  jumpTo(step: number) {
    this.setState({ stepNumber: step, xIsNext: step % 2 === 0 });
  }

  render() {
    const histories = this.state.histories;
    const current = histories[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = histories.map((history, historyIndex) => {
      return (
        <li key={historyIndex}>
          <button onClick={() => this.jumpTo(historyIndex)}>
            {historyIndex ? `Go to move ${historyIndex}` : 'Go to game start'}
          </button>
        </li>
      );
    });
    const status = winner
      ? `Winner: ${winner}`
      : `Next player: ${this.props.xIsNext ? 'X' : 'O'}`;

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onSquareClick={(i) => {
              this.handleSquareClick(i);
            }}
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
