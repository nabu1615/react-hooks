import React, { useState, useContext } from 'react'
import ThemeContext from '../context/ThemeContext';

const Header = () => {
    const [ darkMode, setDarkMode ] = useState(false);
    const { theme, setTheme } = useContext(ThemeContext);

    const handleClick = () => {
        setDarkMode(!darkMode);
        setTheme(!theme);
    }

    return (
        <header className="Header">
            <h1>Characters</h1>
            <button onClick={handleClick} type="button">{ darkMode ? 'Ligth Mode' : 'Dark Mode' }</button>
        </header>
    )
}

export default Header;