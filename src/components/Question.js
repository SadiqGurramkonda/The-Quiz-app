export default function Question({question,dispatch,answer}){
    console.log(question)

    const hasAnswered = answer !== null

    return(
        <div>
            {<h4>{question.question}</h4>}
            <div className="options">
                {question.options.map((option,i)=><button key={option} onClick={(e)=>dispatch({type:"newAnswer",payload:i})} className={`btn btn-option ${answer === i?"answer":""} ${hasAnswered?i=== question.correctOption?"correct":"wrong":""}`} disabled={hasAnswered}>{option}</button>)}
            </div>
        </div>
    )
}