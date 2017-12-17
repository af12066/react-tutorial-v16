import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  render() {
    // クリック時に this.state の value の値を 'X' にセットする（そのまま描画される）
    // props は親（Boardコンポーネント）から渡される情報（文字列や関数などなんでもあり）
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  // ボード全体の仕様の定義
  // state は自身のコンポーネントの状態を管理する
  // コンストラクタでボードサイズと初期値を指定
  // Array(9)は、値が挿入されると
  // ['O', null, null, 'X', 'X', null, null, null, null]
  // のようになる
  constructor(props) {
    super(props);
    // state はオブジェクトで管理する
    // 参照したい場合は this.state.xIsNext とか this.state['xIsNext'] とする
    // （前者の方が補完が利きやすいので便利?）
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O'; // 三項演算子（true: 'X', false: 'O'）
    // this.setState で自身の state を key: value 形式で変更する
    // key には this.state に存在する変えたい key 名、
    // value には上書きしたい値を書く
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    });
  }

  renderSquare(i) {
    // Square クラスの render メソッドに流す
    // props は子コンポーネント（ここではSquare）に渡す情報
    // value の値は Square の this.props.value に渡される
    // onClick は Square の this.props.onClick() に渡される
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
        />
    );
  }

  render() {
    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    // {this.renderSquare(n)} ではそれぞれ <button>...</button> が構築される
    return (
      <div>
        <div className="status">{status}</div>
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
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
