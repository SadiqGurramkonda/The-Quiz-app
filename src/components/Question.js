export default function Question({question,dispatch,answer}){

    return(
        <div>
            {<h4>{question.question}</h4>}
            <div className="options">
                {question.options.map((option,i)=><button key={option} onClick={(e)=>dispatch({type:"newAnswer",payload:i})} className={`btn btn-option ${answer === i?"answer":""} ${i=== question.correctOption?"correct":"wrong"}`}>{option}</button>)}
            </div>
        </div>
    )
}