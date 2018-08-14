import React from "react";
import styled from "styled-components";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.blankBoard = new Array(9).fill(null);
    this.state = {
      board: this.blankBoard,
      player: 0, // 0/1 : x/o
      movesPlaced: 0,
      result: "playing"
    };
  }

  checkForWinners = (board, movesPlaced) => {
    if (movesPlaced === 9) {
      this.setState({ result: "draw" });
      return;
    } else {
      const possibleWins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [6, 4, 2],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]
      ];
      // for each item in possibleWins,
      possibleWins.forEach(arr => {
        if (
          board[arr[0]] === this.state.player &&
          board[arr[1]] === this.state.player &&
          board[arr[2]] === this.state.player
        ) {
          this.setState({ result: "winner!" });
          return;
        }
      });
      // iterate the array of positions and check if all three match the player
    }
  };

  handlePlace = index => {
    if (this.state.board[index] !== null || this.state.result !== "playing") {
      return;
    }
    const board = [
      ...this.state.board.slice(0, index),
      this.state.player,
      ...this.state.board.slice(index + 1)
    ];
    const movesPlaced = this.state.movesPlaced + 1;
    this.checkForWinners(board, movesPlaced);
    const player = this.state.player === 0 ? 1 : 0;
    this.setState({ board, player, movesPlaced });
  };

  reset = () => {
    this.setState({
      board: this.blankBoard,
      player: 0, // 0/1 : x/o
      movesPlaced: 0,
      result: "playing"
    });
  };

  render() {
    return (
      <Container>
        {this.state.board.map((value, index) => {
          let fill = "";
          if (value === 0) {
            fill = "O";
          } else if (value === 1) {
            fill = "X";
          }
          return (
            <Square
              children={fill}
              index={index}
              onClick={() => this.handlePlace(index)}
            />
          );
        })}
        {this.state.result === "playing" ? (
          <p>Next move: {this.state.player === 0 ? "O" : "X"}</p>
        ) : (
          <p>
            {this.state.result} <button onClick={this.reset}>Reset</button>
          </p>
        )}
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 300px;
  height: 300px;
  border: 4px solid black;
`;

const Square = styled.div`
  width: 98px;
  height: 98px;
  font-size: 80px;
  border: 1px solid black;
  user-select: none;
`;
