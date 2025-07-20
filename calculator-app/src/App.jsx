import { useReducer } from 'react'
import './App.css'
import DigitButton from './digitButton'
import OperationButton from './OperationButton'

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  CHOOSE_OPERATION: 'choose-op',
  EVALUATE: 'evaluate'
}

function reducer(state = { currentOp: '' , prevOp: '' , operation: null} , {type , payload}){
  switch(type) 
  {
    case ACTIONS.ADD_DIGIT:
      return {
        ...state, 
        currentOp: `${state.currentOp || ''}${payload.digit}`,
      }
    case ACTIONS.DELETE_DIGIT:
      return{
        ...state,
        currentOp: state.currentOp.slice(0 , -1)
      }
    case ACTIONS.CLEAR:
      return{
        ...state,
        currentOp: ''
      }
    case ACTIONS.CHOOSE_OPERATION:
      return{
        prevOp: `${state.currentOp}`,
        operation: `${payload.operation}`,
        currentOp: ''
      }
    case ACTIONS.EVALUATE:
      let result;

      switch (state.operation){
        case '+':
          result = Number(state.prevOp) + Number(state.currentOp)
          break
        case '-':
          result = Number(state.prevOp) - Number(state.currentOp)
          break
        case '*':
          result = Number(state.prevOp) * Number(state.currentOp)
          break
        case '÷':
          result = Number(state.prevOp) / Number(state.currentOp)
          break
        default:
          print('No Matches Found')
          result = Number(state.prevOp)
      }

      return{
        operation: '',
        currentOp: `${result?result:'SYNTAX ERROR'}`,
        prevOp: ''
      }
  }
  console.log(state)
  console.log('Outside Case')
}

function App() {

  const [{currentOp , prevOp , operation , isError} , dispatch] = useReducer(reducer , {
      currentOp: '' , 
      prevOp: '' , 
      operation: null,
      isError: false
    }
  );

  return (
    <>
      <div className="calculator-grid">
        <div className="output">
          <div className="previous-operand">{prevOp || ""} {operation || ""}</div>
          <div className="current-operand">{currentOp || ""}</div>
        </div>
        <button className="span-two" onClick={() => dispatch({type: ACTIONS.CLEAR})}>AC</button>
        <button onClick={() => dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</button>
        <OperationButton operation="÷" dispatch={dispatch} />
        <DigitButton digit="1" dispatch={dispatch} />
        <DigitButton digit="2" dispatch={dispatch} />
        <DigitButton digit="3" dispatch={dispatch} />
        <OperationButton operation="*" dispatch={dispatch} />
        <DigitButton digit="4" dispatch={dispatch} />
        <DigitButton digit="5" dispatch={dispatch} />
        <DigitButton digit="6" dispatch={dispatch} />
        <OperationButton operation="+" dispatch={dispatch} />
        <DigitButton digit="7" dispatch={dispatch} />
        <DigitButton digit="8" dispatch={dispatch} />
        <DigitButton digit="9" dispatch={dispatch} />
        <OperationButton operation="-" dispatch={dispatch} />
        <DigitButton digit="." dispatch={dispatch} />
        <DigitButton digit="0" dispatch={dispatch} />
        <button className='span-two' onClick={() => dispatch({type: ACTIONS.EVALUATE})}>=</button>
      </div>
    </>
  )
}

export default App
