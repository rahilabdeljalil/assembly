import { useEffect, useState } from "react";
import { languages } from "./language";
import "./index.css";
import { clsx } from "clsx";

function App() {
  // --- State Initialization ---
  const [currentWord, setCurrentWord] = useState(
    languages[Math.floor(Math.random() * languages.length)].name
  );
  const [guessedWord, setGuessedWord] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [handle, setHandle] = useState(true);

  const alphabet = "abcdefghijklmnopqrstuvwxyz.";

  // --- Game Status Logic ---
  const isGameWon = currentWord
    .split("")
    .every((char) => guessedWord.includes(char.toLowerCase()));

  const wrongGuessedLetters = guessedWord.filter(
    (letter) => !currentWord.toLowerCase().includes(letter)
  );

  const isLost = wrongGuessedLetters.length >= 5;

  const isUpperCaseWord = currentWord
    .split("")
    .some((char) => char === char.toUpperCase());

  // --- Event Handlers ---
  function newGame() {
    setHandle(!handle);
    setWrongLetters([]);  // Reset wrong letters for the new game
  }

  function handleClick(alph) {
    setGuessedWord((prevGuessedWord) =>
      prevGuessedWord.includes(alph)
        ? prevGuessedWord
        : [...prevGuessedWord, alph]
    );

    if (!currentWord.toLowerCase().includes(alph)) {
      setWrongLetters((prevWrongLetters) => [...prevWrongLetters, alph]);
    }
  }

  function needHelp() {
    const randomIndex = Math.floor(Math.random() * currentWord.length);
    const wordHelpedIn = currentWord[randomIndex].toLowerCase();

    if (!guessedWord.includes(wordHelpedIn) && !wrongLetters.includes(wordHelpedIn)) {
      handleClick(wordHelpedIn);
    } else {
      // Prevent infinite recursion: If all letters have been guessed, do nothing
      if (guessedWord.length + wrongLetters.length < currentWord.length) {
        needHelp();
      }
    }
  }

  // --- Game Reset Effect ---
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * languages.length);
    setCurrentWord(languages[randomIndex].name);
    setGuessedWord([]);
    setWrongLetters([]); // Reset wrong letters for the new game
  }, [handle]);

  // --- UI Generation: Keyboard ---
  const keyboardElements = alphabet.split("").map((alph) => {
    const isGuessed = guessedWord.includes(alph);
    const isCorrectAlph = currentWord.toLowerCase().includes(alph);

    const className = clsx("keyboard", {
      "correct-color": isGuessed && isCorrectAlph,
      "wrong-color": isGuessed && !isCorrectAlph,
    });

    return (
      <button
        key={alph}
        onClick={() => {
          if (wrongGuessedLetters.length < 8) {
            handleClick(alph);
          } else {
            console.log(
              "You've reached the maximum number of attempts. Please click 'New Game'."
            );
          }
        }}
        className={className}
      >
        {isUpperCaseWord ? alph.toUpperCase() : alph.toLowerCase()}
      </button>
    );
  });

  // --- UI Generation: Language Chips ---
  const languageElements = languages.map((lang) => {
    const hasWrongLetter = wrongGuessedLetters.some((letter) =>
      lang.name.toLowerCase().includes(letter)
    );

    return (
      <span
        key={lang.name}
        style={{
          textDecoration: hasWrongLetter ? "line-through" : "none",
          opacity: hasWrongLetter ? 0.5 : 1,
          backgroundColor: lang.backgroundColor,
          color: lang.color,
        }}
        className="chip"
      >
        {lang.name}
      </span>
    );
  });

  // --- UI Generation: Word Display ---
  const letterElements = currentWord.split("").map((letter, index) => {
    const isCorrectWord = guessedWord.includes(letter.toLowerCase());
    const isWrongLetter = wrongLetters.includes(letter.toLowerCase());

    const className = clsx("letter", {
      "remove-transparent": isCorrectWord,
      "wrong-letter": isWrongLetter && isLost, // Apply red background only if game is lost
    });

    return (
      <span key={`${letter}-${index}`} className={className}>
        {isCorrectWord
          ? letter
          : isLost && isWrongLetter
          ? letter // Show the wrong letter when game is lost
          : ""}
      </span>
    );
  });

  // --- Game Status Display ---
  let gameStatus;
  if (isGameWon) {
    gameStatus = <p>You Win!</p>;
  } else if (isLost) {
    gameStatus = <p>You Lose!</p>;
  } else {
    gameStatus = <p>Enjoy the game</p>;
  }

  // --- UI Generation: Wrong Attempts Counter ---
  const wrongAttempt = (
    <p className="number-of-wrong-attempts">{wrongGuessedLetters.length}</p>
  );

  // --- Main UI Render ---
  return (
    <main>
      {/* --- Header Section --- */}
      <header>
        <h1>Assembly: Endgame</h1>
        <p>
          Guess the word within 5 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>

      {/* --- Game Status --- */}
      <section className="game-status">{gameStatus}</section>

      {/* --- Language Chips --- */}
      <section className="language-chips">{languageElements}</section>

      {/* --- Word Display --- */}
      <section className="word">{letterElements}</section>

      {/* --- Wrong Attempts Counter --- */}
      <section className="number-of-wrong-attempt">{wrongAttempt}</section>

      {/* --- Keyboard --- */}
      <section className="keyboard">{keyboardElements}</section>

      {/* --- Control Buttons --- */}
      <button onClick={newGame} className="new-game">
        New Game
      </button>
      <button onClick={needHelp} className="need-help">
        Need Help
      </button>
    </main>
  );
}

export default App;
