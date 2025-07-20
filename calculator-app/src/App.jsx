import { useReducer } from 'react'
import './App.css'
import DigitButton from './components/digitButton'
import OperationButton from './components/OperationButton'

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  CHOOSE_OPERATION: 'choose-op',
  EVALUATE: 'evaluate'
}

//TODO: Handle Negative Numbers
//TODO: Handle Multi-operand Operations

const ERROR = 'SYNTAX ERROR'

function evaluate(num1 , num2 , op){
  let result;

  switch (op){
    case '+':
      result = num1 + num2
      break
    case '-':
      result = num1 - num2
      break
    case '*':
      result = num1 * num2
      break
    case '÷':
      result = num1 / num2
      break
    default:
      result = num2
  }

  return result
}

function reducer(state = { currentOp , prevOp , operation} , {type , payload}){
  
  let result;

  switch(type) 
  {
    case ACTIONS.ADD_DIGIT:
      if (state.isError) {      //If syntax Error Present dont update your state
        return state
      }
      if (state.isResult){
        return{
          ...state,
          isResult: false,
          currentOp: `${payload.digit}`
        }
      }
      return {
        ...state, 
        currentOp: `${state.currentOp || ''}${payload.digit}`,
      }
    case ACTIONS.DELETE_DIGIT:
      if (state.isError) {      //If syntax Error Present dont update your state
        return state
      }
      return{
        ...state,
        currentOp: state.currentOp.slice(0 , -1)
      }
    case ACTIONS.CLEAR:
      state.isError = false
      return{
        ...state,
        currentOp: '',
        prevOp: '',
        operation: ''
      }
    case ACTIONS.CHOOSE_OPERATION:
      if (state.isError) {      //If syntax Error Present dont update your state
        return state
      }

      if (state.prevOp !== '' && state.currentOp !== ''){
        result = evaluate(Number(state.prevOp) , Number(state.currentOp) , state.operation)
        return{
          ...state,
          prevOp: `${result}`,
          operation: `${payload.operation}`,
          currentOp: ''
        }
      }
      return{
          ...state,
          prevOp: `${state.currentOp}`,
          operation: `${payload.operation}`,
          currentOp: ''
        }
    case ACTIONS.EVALUATE:

      result = evaluate(Number(state.prevOp) , Number(state.currentOp) , state.operation)

      if(!result){
        state.isError = true
        console.log(state.isError)
      }

      return{
        ...state,
        operation: '',
        currentOp: `${state.isError?ERROR:result}`,
        prevOp: '',
        isResult: true
      }
  }
  console.log(state)
  console.log('Outside Case')
}

function App() {

  const [{currentOp , prevOp , operation , isError , isResult} , dispatch] = useReducer(reducer , {
      currentOp: '' , 
      prevOp: '' , 
      operation: null,
      isError: false,
      isResult: false
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
