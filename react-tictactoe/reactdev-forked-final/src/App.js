import { useState } from "react";

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  // List of squares array
  const [history, setHistory] = useState([Array(9).fill(null)]);
  // const currentSquares = history[history.length - 1];
  // Render selected move (ask Adel when game is called, why is this being rerendered)
  // If this function is being called every rerender, why are states not reinitialized?
  const [currentMove, setCurrentMove] = useState(0); // to track what user is viewing
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    // Called when a box is clicked
    // TODO
    // Flip xIsNext
    setXIsNext(!xIsNext);

    // // Append history
    // setHistory([...history, nextSquares]);
    // // console.log(history);

    // TODO: ask adel: why does this history slicing work,
    // is jumpTo called before handlePlay?

    // Populate next history with relevant history (up until most recent move) + move
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    // TODO
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0); // True if even
  }

  // Wtf is going on below (in history.map...)
  // figured out: callbackfn format:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
  // Always put key keyword in a list element (li) in React
  // Key must be unique, in this case, the move # is unique
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "go to move # " + move;
    } else {
      description = "go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  // const [xIsNext, setXIsNext] = useState(true);
  // const [squares, setSquares] = useState(Array(9).fill(null));

  // Inner function has access to state variables
  // "Closure" concept in React tutorial
  function handleClick(i) {
    // Check for winner
    const newSquares = squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    // console.log("clicked");
    if (xIsNext) {
      // setXIsNext(false);
      newSquares[i] = "x";
    } else {
      // setXIsNext(true);
      newSquares[i] = "o";
    }
    // setSquares(newSquares);
    onPlay(newSquares);
  }

  // Ask adel: why does this get called/updated at onClick?
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    // console.log("winner", winner);
    status = "winner: " + winner;
  } else {
    // const nextMove = xIsNext ? "X" : "O";
    status = "next player: " + (xIsNext ? "X" : "O");
  }

  // Have to pass down a function into onSquareClick (as a prop)
  // so the function only gets called when it is clicked, not at declaration

  // In this case, arrow function is passed down (ie. {() => __()} notation)
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square
          value={squares[0]}
          onSquareClick={() => handleClick(0, xIsNext)}
        />
        <Square
          value={squares[1]}
          onSquareClick={() => handleClick(1, xIsNext)}
        />
        <Square
          value={squares[2]}
          onSquareClick={() => handleClick(2, xIsNext)}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[3]}
          onSquareClick={() => handleClick(3, xIsNext)}
        />
        <Square
          value={squares[4]}
          onSquareClick={() => handleClick(4, xIsNext)}
        />
        <Square
          value={squares[5]}
          onSquareClick={() => handleClick(5, xIsNext)}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[6]}
          onSquareClick={() => handleClick(6, xIsNext)}
        />
        <Square
          value={squares[7]}
          onSquareClick={() => handleClick(7, xIsNext)}
        />
        <Square
          value={squares[8]}
          onSquareClick={() => handleClick(8, xIsNext)}
        />
      </div>
    </>
  );
}

// React component
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// function Board() {
//   const [xIsNext, setXIsNext] = useState(true);
//   const [squares, setSquares] = useState(Array(9).fill(null));

//   // Inner function has access to state variables
//   // "Closure" concept in React tutorial
//   function handleClick(i) {
//     // Check for winner
//     const newSquares = squares.slice();

//     if (squares[i]) {
//       return;
//     }
//     console.log("clicked");
//     if (xIsNext) {
//       setXIsNext(false);
//       newSquares[i] = "x";
//     } else {
//       setXIsNext(true);
//       newSquares[i] = "o";
//     }
//     setSquares(newSquares);
//   }

//   // Ask adel: why does this get called/updated at onClick?
//   const winner = calculateWinner(squares);
//   let status;
//   if (winner) {
//     // console.log("winner", winner);
//     status = "winner: " + winner;
//   } else {
//     // const nextMove = xIsNext ? "X" : "O";
//     status = "next player: " + (xIsNext ? "X" : "O");
//   }

//   // Have to pass down a function into onSquareClick (as a prop)
//   // so the function only gets called when it is clicked, not at declaration

//   // In this case, arrow function is passed down (ie. {() => __()} notation)
//   return (
//     <>
//       <div className="status">{status}</div>
//       {/* <b> {status} </b> */}
//       <div className="board-row">
//         <Square
//           value={squares[0]}
//           onSquareClick={() => handleClick(0, xIsNext)}
//         />
//         <Square
//           value={squares[1]}
//           onSquareClick={() => handleClick(1, xIsNext)}
//         />
//         <Square
//           value={squares[2]}
//           onSquareClick={() => handleClick(2, xIsNext)}
//         />
//       </div>
//       <div className="board-row">
//         <Square
//           value={squares[3]}
//           onSquareClick={() => handleClick(3, xIsNext)}
//         />
//         <Square
//           value={squares[4]}
//           onSquareClick={() => handleClick(4, xIsNext)}
//         />
//         <Square
//           value={squares[5]}
//           onSquareClick={() => handleClick(5, xIsNext)}
//         />
//       </div>
//       <div className="board-row">
//         <Square
//           value={squares[6]}
//           onSquareClick={() => handleClick(6, xIsNext)}
//         />
//         <Square
//           value={squares[7]}
//           onSquareClick={() => handleClick(7, xIsNext)}
//         />
//         <Square
//           value={squares[8]}
//           onSquareClick={() => handleClick(8, xIsNext)}
//         />
//       </div>
//     </>
//   );
// }

// Ask Adel how board-row css works

// function Square() {
//   const [value, setValue] = useState(null);
//   // null is initial value
//   // returns [the state variable, the function that can be used to change the state]

//   function handleClick() {
//     // console.log("clicked!");
//     setValue("x");
//   }

//   return (
//     <button className="square" onClick={handleClick}>
//       {value}
//     </button>
//   );
// }

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  // console.log("Squares", squares);

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
