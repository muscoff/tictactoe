import React, { useState, useEffect } from 'react';

const rowStyle = {
  display: 'flex'
}

const squareStyle = {
  'width':'60px',
  'height':'60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'white'
}

const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}

function Square({onClick, val}) {
  return (
    <div
      className="square"
      style={squareStyle}
      onClick={onClick}>
          {val}
    </div>
  );
}

const pattern = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
]

function Board() {
    const [board, setBoard] = useState(['', '', '', '', '', '', '', '', ''])
    const [player, setPlayer] = useState('X')
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [winner, setWinner] = useState('')
    const chooseBox = index => {
        if(board[index] === ''){
            if(player === 'X'){
                let newBoard = board
                newBoard[index] = player
                setSelectedIndex(index)
                setPlayer('O')
            }else{
                let newBoard = board
                newBoard[index] = player
                setSelectedIndex(index)
                setPlayer('X')
            }
        }else{
            alert('Box already selected')
        }
    }

    const reset = () => {
        setBoard(['', '', '', '', '', '', '', '', ''])
        setPlayer('X')
        setSelectedIndex(0)
    }

    const getWinner = (index, winningPattern, board) => {
        const arr = []
        let winningStatus = false
        const player = board[index]

        winningPattern.forEach(item=>{
            if(item.includes(index)){
                arr.push(item)
            }
        })

        if(player !== ''){
            for(let i=0; i<arr.length; i++){
                let pattern = arr[i]
                if(board[pattern[0]] === player && board[pattern[1]] === player && board[pattern[2]] === player){
                    winningStatus = true
                    break
                }
            }
        }
        return {status: winningStatus, winningPlayer: player}
    }

    useEffect(()=>{
        const {status, winningPlayer} = getWinner(selectedIndex, pattern, board)

        if(status){
            setWinner(`Player ${winningPlayer}`)
            setTimeout(()=>{
                setPlayer('X')
                setBoard(['', '', '', '', '', '', '', '', ''])
                setWinner('')
            }, 1500)
        }else{
            // if(!board.includes('')){
            //     alert('You lose')
            //     setPlayer('X')
            //     setBoard(['', '', '', '', '', '', '', '', ''])
            // }
        }
    }, [selectedIndex])
  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>Next player: <span>{player}</span></div>
      <div id="winnerArea" className="winner" style={instructionsStyle}>Winner: <span>{winner ? winner : 'None'}</span></div>
      <button onClick={()=>reset()} style={buttonStyle}>Reset</button>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          <Square onClick={()=>chooseBox(0)} val={board[0]} />
          <Square onClick={()=>chooseBox(1)} val={board[1]} />
          <Square onClick={()=>chooseBox(2)} val={board[2]} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square onClick={()=>chooseBox(3)} val={board[3]} />
          <Square onClick={()=>chooseBox(4)} val={board[4]} />
          <Square onClick={()=>chooseBox(5)} val={board[5]} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square onClick={()=>chooseBox(6)} val={board[6]} />
          <Square onClick={()=>chooseBox(7)} val={board[7]} />
          <Square onClick={()=>chooseBox(8)} val={board[8]} />
        </div>
      </div>
    </div>
  );
}

function TicTacToe() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

export default TicTacToe