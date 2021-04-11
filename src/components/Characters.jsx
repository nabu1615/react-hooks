import React, { useEffect, useState, useReducer } from "react";

const initialState = {
  favorites: [],
};

const favoriteReduce = (state, action) => {
  switch (action.type) {
    case "ADD_TO_FAVORITE":
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    default:
      return state;
  }
};

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [favorites, dispatch] = useReducer(favoriteReduce, initialState);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character/")
      .then((response) => response.json())
      .then((data) => setCharacters(data.results));
  }, []);

  const handleClick = (favorite) => {
    dispatch({ type: "ADD_TO_FAVORITE", payload: favorite });
  };

  console.log(favorites);

  return (
    <div className="Characters">
      {favorites.favorites.length ? (
        <ul className="Favorites">
          <h3>Favorite Characters</h3>
          {favorites.favorites.map((favorite) => {
            return (
              <li key={favorite.id}>
                <h5>{favorite.name} </h5>
              </li>
            );
          })}
        </ul>
      ) : (
        ""
      )}

      <div className="CharactersList">
        {characters.map((character) => {
          return (
            <div className="Character" key={character.id}>
              <img src={character.image} alt="" />
              <h3>{character.name} </h3>
              <small>
                <b>Gender:</b> {character.gender}
              </small>
              <button onClick={() => handleClick(character)}>
                Add to favorite
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Characters;
