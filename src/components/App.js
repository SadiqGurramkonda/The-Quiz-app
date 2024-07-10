import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader'
import Error from './Error'
import StartScreen from './StartScreen';
import Question from './Question';

const initialState = {
  questions: [],

  //"loading","error","ready","active","finished"
  status: "loading",
  currIndex: 0,
  answer: null,
};
function reducer(state,action){

  switch(action.type){
    case "dataReceived":
      return {...state,questions:action.payload,status:"ready"};
    case "dataFailed":
      return {...state,status:"error"};
    case "start":
      return {...state,status:"active"}
    case "newAnswer":
      return {...state,answer:action.payload}
    default:
      throw new Error("unknown action");
  }
}

function App() {

  const [{questions,status,currIndex,answer},dispatch] = useReducer(reducer,initialState);
  const numQuestions = questions.length;
 

  useEffect(function(){
    fetch("http://localhost:8000/questions").then(res=>res.json()
    .then((data)=>dispatch({type: "dataReceived",payload:data})))
    .catch((err)=>{
      dispatch({type:"dataFailed"})
    });
  },[])
  return (
    <div className='app'>
      <Header />
      <Main>
        {status==="loading" &&<Loader></Loader>}
        {status==="error" &&<Error></Error>}
        {status ==="ready" && <StartScreen numQuestions={numQuestions} dispatch={dispatch}></StartScreen>}
        {status === "active" && <Question question={questions[currIndex]} dispatch={dispatch} answer={answer}></Question>}
      </Main>
    </div>
  );
}

export default App;
