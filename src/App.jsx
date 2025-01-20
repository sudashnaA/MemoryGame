import { useState, useEffect } from 'react'
import './App.css'
import Card from './components/card';
import Win from './components/Win';

const fetchPokemon = async (url) => {
  const response = await fetch(url);
  return await response.json();
};

function App() {
  const [length, setLength] = useState(52);
  const [show, setShow] = useState(false);
  
  const [pokemonList, setPokemonList] = useState([]);
  const [cardList, setCardList] = useState([]);
  const [clickedIds, setClickedIds] = useState([]);

  useEffect(() => {
    let ignore = false;
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${length}&offset=0`).then(response => response.json())
      .then(data => {
        if (!ignore) {
          setPokemonList(data.results);
        }
    });
    return () => {
      ignore = true;
    }
  }, [show]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const promises = pokemonList.map((item) => fetchPokemon(item.url));
            const pokemonData = await Promise.all(promises);
            setCardList(pokemonData);
        } catch (error) {
            console.error("Error fetching Pokémon:", error);
        }
    };

    fetchData();
  }, [pokemonList]);

  function handleClick(id){
    if (!clickedIds.includes(id)){
      setClickedIds([...clickedIds, id])
    }
    else{
      setClickedIds([]);
    }

    const newArr = cardList.toSorted();
    newArr.sort(() => Math.random() - 0.5);
    setCardList(newArr);
  }

  function Reset(){
    setClickedIds([]);
    setLength(52);
    setShow(false);
  }

  if (show && clickedIds.length == length){
    return(
      <>
        <Win
        handleReset={Reset}
        />
      </>
    )
  }
  else{
    return (
      <>
        <div id='textcontainer'>
          <h1>Memory Game</h1>
          <p>Get score for clicking on the cards, if you click the same one twice you lose.</p>
          <div id='scorecontainer'>
          { show ? (<><h2>Score: {clickedIds.length}</h2> <button onClick={Reset}>Reset</button></>) : 
          (<>
          <div>
            <input className='slider' onChange={(e) => setLength(e.target.value)} type="range" min="4" max="128" id="myRange"></input>
          </div>
          <p>{length}</p>
          <button onClick={() => setShow(true)}>Start</button>
          </>)}
          </div>
        </div>

        { show && (
        <div id='container'>
        {cardList.map(item => (
            <Card key={item.id}
            item={item}
            handler={handleClick}
            />
          )
        )}
        </div>
        )}
      </>
    )
  }
}

export default App
