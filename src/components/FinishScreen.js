function FinishScreen({points,totalPoints, highScore, dispatch}){

    const percentage = (points/ totalPoints) * 100;

    let emoji;
    if(percentage === 100) emoji = "🥇";
    if(percentage > 80 && percentage< 100)emoji = "🎉";
    if(percentage > 60 && percentage < 50) emoji = "🙂";
    if(percentage < 50) emoji = "😐";

    return(
        <>
            <p className="result">
            <span>{emoji}</span>
            you scored <strong>{points}</strong> out of {totalPoints} ({Math.ceil(percentage)}%)
        </p>
        <p className="highscore"> High score : {highScore} points</p>
        <button className="btn btn-ui" onClick={()=>{dispatch({type:"restart"})}}>Restart</button>
        </>
    )
}

export default FinishScreen