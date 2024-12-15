import { useState } from "react";
import { languages } from "./language";
import "./index.css";
import { clsx } from "clsx";
function App() {
  const [currentWord, setCurrentWord] = useState("react");
  const [guessedWord, setGuessedWord] = useState([]);
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  function handleClick(alph) {
    setGuessedWord((prevGussedWord) =>
      !prevGussedWord.includes(alph)
        ? [...prevGussedWord, alph]
        : prevGussedWord
    );
  }

  const keyboardElements = alphabet.split("").map((alph) => {
    const isGuessed = guessedWord.includes(alph);
    const isCorrectAlph = currentWord.includes(alph);
    const className = clsx("keyboard", {
    "correct-color": isGuessed && isCorrectAlph,
      "wrong-color": isGuessed && !isCorrectAlph,
    });
    return (
      <button
        key={alph}
        onClick={() => handleClick(alph)}
        className={className}
      >
        {alph.toUpperCase()}
      </button>
    );
  });

  const languageElements = languages.map((lang) => (
    <span
      key={lang.name}
      style={{
        backgroundColor: lang.backgroundColor,
        color: lang.color,
      }}
      className="chip"
    >
      {lang.name}
    </span>
  ));

  const letterElements = currentWord.split("").map((letter) => (
    <span key={letter} className="letter">
      {letter}
    </span>
  ));

  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>
          Guess the word within 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>
      <section className="game-status">
        <h2>You win!</h2>
        <p>Well done! 🎉</p>
      </section>
      <section className="language-chips">{languageElements}</section>
      <section className="word">{letterElements}</section>
      <section className="keyboard">{keyboardElements}</section>
      <button className="new-game">New Game</button>
    </main>
  );
}

export default App;
