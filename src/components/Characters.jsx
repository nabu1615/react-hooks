import React, { useState, useReducer, useMemo, useRef, useCallback } from "react";

import Search from "./Search";
import useCharacters from '../hooks/useCharacters';

const initialState = {
  favorites: [],
};

const API = 'https://rickandmortyapi.com/api/character/';

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
  const [favorites, dispatch] = useReducer(favoriteReduce, initialState);
  const [search, setSearch] = useState("");
  const searchInput = useRef(null);
  const characters = useCharacters(API);

  const handleClick = useCallback((favorite) => {
    dispatch({ type: "ADD_TO_FAVORITE", payload: favorite });
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredUsers = useMemo(
    () =>
      characters.filter((user) => {
        return user.name.toLowerCase().includes(search.toLocaleLowerCase());
      }),
    [characters, search]
  );

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

      <Search search={search} searchInput={searchInput} handleSearch={handleSearch} />

      <div className="CharactersList">
        {filteredUsers.map((character) => {
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
