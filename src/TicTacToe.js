import React, {useState, useEffect} from 'react'

const style = {
    app: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    board:{
        width: '300px',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#eee'
    },
    box:{
        width: '27px',
        margin: '5px',
        padding: '30px',
        textAlign: 'center',
        backgroundColor: '#ccc',
        border: '1px solid #ddd',
        cursor: 'pointer'
    }
}

const pattern = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
]

export default function TicTacToe() {
    const [board, setBoard] = useState(['', '', '', '', '', '', '', '', ''])
    const [player, setPlayer] = useState('X')
    const [selectedIndex, setSelectedIndex] = useState(0)

    const chooseBox = index => {
        if(board[index] === ''){
            if(player === 'X'){
                let newBoard = board
                newBoard[index] = player
                setBoard(newBoard)
                setSelectedIndex(index)
                setPlayer('O')
            }else{
                let newBoard = board
                newBoard[index] = player
                setBoard(newBoard)
                setSelectedIndex(index)
                setPlayer('X')
            }
        }else{
            alert('Box already selected')
        }
    }

    const getWinner = (index, winningPattern, board) => {
        const arr = []
        const player = board[index]
        let winningStatus = false

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
        console.log('run')
        const {status, winningPlayer} = getWinner(selectedIndex, pattern, board)

        if(status){
            alert(`Player ${winningPlayer} won`)
            setPlayer('X')
            setBoard(['', '', '', '', '', '', '', '', ''])
        }else{
            if(!board.includes('')){
                alert('You lose')
                setPlayer('X')
                setBoard(['', '', '', '', '', '', '', '', ''])
            }
        }
    }, [selectedIndex])

    const boxes = board.map((item, index)=>(
        <React.Fragment key={index}>
            <div onClick={()=>chooseBox(index)} style={style.box}>{item}</div>
        </React.Fragment>
    ))
  return (
    <div style={style.app}>
        <div style={style.board}>{boxes}</div>
    </div>
  )
}
