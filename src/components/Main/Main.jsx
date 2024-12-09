import { useEffect } from "react";
import { useState } from "react";
import '../../styles/Main.css';

let nextId = 0;

export default function Main({ setScore }) {
  const [memoryCards, setMemoryCards] = useState([]);

  async function fetchRandomPokemon() {
    try {
      const randomId = Math.floor(Math.random() * 1010) + 1;

      const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${randomId}`;
      const response = await fetch(pokemonUrl);
      const data = await response.json();

      return {
        id: nextId++,
        name: data.name,
        image: data.sprites.front_default,
        selected: false,
      };
    } catch (error) {
      console.error("Pokemon data fetch error", error);
    }
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchPokemon() {
      const cards = [];
      for (let i = 0; i < 12; i++) {
        const card = await fetchRandomPokemon();
        if (card) cards.push(card);
      }
      if (isMounted) setMemoryCards(cards);
    };

    fetchPokemon();

    return () => {
      isMounted = false;
    };

  }, []);

  function updateSelectedCard(cards, cardId) {
    return cards.map(card => 
      card.id === cardId ? {...card, selected: true} : card
    );
  }

  function handleClick(cardId) {
    const card = memoryCards.find((card) => card.id === cardId);
    if (!card) return;

    if (card.selected) {
      setScore(0);
      resetGame();
    } else {
      setScore((prevScore) => prevScore + 1);
      const updateCards = updateSelectedCard(memoryCards, cardId);
      setMemoryCards(updateCards);
      shufflePokemon(updateCards);
    }
  }

  function resetGame() {
    const resetCards = memoryCards.map((card) => ({...card, selected: false}));
    setMemoryCards(resetCards);
    shufflePokemon(resetCards);
  }

  function shufflePokemon(cards) {
    const array = [...cards];

    for (let i = array.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [array[i], array[randomIndex]] = [array[randomIndex], array[i]];      
    }
    setMemoryCards(array);
  }

  return (
    <main>
        {memoryCards.length === 0 ? (
          <div className="loading-container">
            <p className="loading">Loading cards...</p>
          </div>
        ) : (
            <div className="cards-container">
            {memoryCards.map((card) => (
              <div 
                className="card-item" 
                key={card.id} 
                onClick={() => handleClick(card.id)}
              >
                <img src={card.image} alt={card.name} />
                <p>{capitalize(card.name)}</p>
              </div>
            ))}
            </div>
        )}
    </main>
  );
}

function capitalize(name) {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}