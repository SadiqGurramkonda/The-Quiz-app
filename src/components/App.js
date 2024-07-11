import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader'
import Error from './Error'
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton'
import Progress from './Progress';
import FinishScreen from './FinishScreen';

const initialState = {
  questions: [],

  //"loading","error","ready","active","finished"
  status: "loading",
  currIndex: 0,
  answer: null,
  points: 0
};
function reducer(state,action){

  switch(action.type){
    case "dataReceived":
      return {...state,questions:action.payload,status:"ready"};
    case "dataFailed":
      return {...state,status:"error"};
    case "start":
      return {...state,status:"active"};
    case "newAnswer":
      const question  = state.questions.at(state.currIndex);

      return {...state,
        answer:action.payload,
        points: action.payload === question.correctOption? state.points+ question.points:state.points
      };
    case "nextQuestion":
      return {...state,currIndex: state.currIndex+1,answer:null};
    case "finish":
      return {...state,status:"finished"}
    default:
      throw new Error("unknown action");
  }
}

function App() {

  const [{questions,status,currIndex,answer,points},dispatch] = useReducer(reducer,initialState);
  const numQuestions = questions.length;
  const totalPoints = questions.reduce((prev, curr)=>prev + curr.points,0);
  console.log(totalPoints);
 

  useEffect(function(){
    fetch("http://localhost:8000/questions").then(res=>res.json()
    .then((data)=>dispatch({type: "dataReceived",payload:data})))
    .catch((err)=>{
      dispatch({type:"dataFailed"})
    });
  },[])
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader></Loader>}
        {status === "error" && <Error></Error>}
        {status === "ready" && (
          <StartScreen
            numQuestions={numQuestions}
            dispatch={dispatch}
          ></StartScreen>
        )}
        {status === "active" && (
          <>
            <Progress
              index={currIndex}
              numQuestions={numQuestions}
              points={points}
              totalPoints={totalPoints}
              answer={answer}
            />
            <Question
              question={questions.at(currIndex)}
              dispatch={dispatch}
              answer={answer}
            ></Question>
            <NextButton dispatch={dispatch} answer={answer} index={currIndex} numQuestions={numQuestions}></NextButton>
          </>
        )}
        {
          status === "finished" && (
            <FinishScreen points={points} totalPoints={totalPoints} />
          )
        }
      </Main>
    </div>
  );
}

export default App;
