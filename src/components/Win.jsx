function Win({handleReset}) {
  return (
    <>
        <div>
        <h1>You Win</h1>
        <div id="textcontainer"><button onClick={handleReset}>Play Again?</button></div>
        </div>
    </>
  )
}

export default Win
