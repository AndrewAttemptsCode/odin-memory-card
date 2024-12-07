import { useEffect } from "react";
import { useState } from "react";
import '../../styles/Main.css';

let nextId = 0;

export default function Main() {
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
    async function fetchPokemon() {
      const cards = [];
      for (let i = 0; i < 12; i++) {
        const card = await fetchRandomPokemon();
        if (card) cards.push(card);
      }
      setMemoryCards(cards);
    };

    fetchPokemon();

  }, []);

  return (
    <main>
      <div className="cards">
        {memoryCards.length === 0 ? (
          <p className="loading">Loading cards...</p>
        ) : (
          memoryCards.map((card) => (
            <div key={card.id}>
              <img src={card.image} alt={card.name} />
              <p>{card.name}</p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}