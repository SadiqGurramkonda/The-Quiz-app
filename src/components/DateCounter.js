import { useReducer } from "react";

const initialState  = {count:0,step:1};

function reducer(state,action){
  switch (action.type){
    case "inc":
      return {...state,count:state.count +state.step};
    case "dec":
      return {...state,count:state.count - state.step};
    case "setCount":
      return {...state,count:action.payload};
    case "setStep":
      return {...state,step:action.payload.value};
    case "reset":
      return initialState
    default:
      throw new Error("Uknown action")
  }
}


function DateCounter() {
  // const [count, setCount] = useState(0);
  // const [step, setStep] = useState(1);


  const [state,dispatch] = useReducer(reducer,initialState);
  const {count,step} = state

  // This mutates the date object.
  const date = new Date("july 10 2024");
  date.setDate(date.getDate() + state.count);

  const dec = function () {
    dispatch({type:"dec"});
    
    // setCount((count) => count - 1);
    // setCount((count) => count - step);
  };

  const inc = function () {
    dispatch({type:"inc"});
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
  };

  const defineCount = function (e) {
    dispatch({type:"setCount",payload:Number(e.target.value)})
    // setCount(Number(e.target.value));
  };

  const defineStep = function (e) {
    dispatch({type:"setStep",payload:{value: Number(e.target.value)}})
    // setStep(Number(e.target.value));
  };

  const reset = function () {
    // setCount(0);
    dispatch({type: "reset"})
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="1"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button className="btn" onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
