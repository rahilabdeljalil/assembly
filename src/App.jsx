import { useEffect, useState } from "react";
import { languages } from "./language";
import "./index.css";
import { clsx } from "clsx";

function App() {
  // State to hold the currently selected word
  const [currentWord, setCurrentWord] = useState("react");

  // State to hold guessed letters
  const [guessedWord, setGuessedWord] = useState([]);

  // State to trigger a new game
  const [hande, setHande] = useState(true);

  // Alphabet for the keyboard
  const alphabet = "abcdefghijklmnopqrstuvwxyz.";

  // Function to start a new game
  function newGame() {
    setHande(!hande); // Toggles the "hande" state to re-run the useEffect
  }

  // Get a random index from the languages array
  let randomIndex = Math.floor(Math.random() * languages.length);

  useEffect(() => {
    // Set the current word to a randomly selected language name
    setCurrentWord(languages[randomIndex].name);
    setGuessedWord([]); // Reset the guessedWord array for the new game
  }, [hande]); // Re-run whenever "hande" changes (new game triggered)

  console.log(currentWord); // Log the current word for debugging

  // Function to handle letter clicks
  function handleClick(alph) {
    // Only add the letter to guessedWord if it hasn't been guessed already
    setGuessedWord((prevGuessedWord) =>
      prevGuessedWord.includes(alph)
        ? prevGuessedWord
        : [...prevGuessedWord, alph]
    );
  }

  const wrongGuessedLetters = guessedWord.filter(
    (letter) => !currentWord.toLowerCase().includes(letter)
  );

  console.log("Wrong Guessed Letters:", wrongGuessedLetters);

  // Function to check if the current word contains uppercase letters
  const isUpperCaseWord = currentWord
    .split("")
    .some((char) => char === char.toUpperCase());

  // Render the keyboard dynamically
  const keyboardElements = alphabet.split("").map((alph) => {
    // Check if the letter has been guessed
    const isGuessed = guessedWord.includes(alph);

    // Check if the letter exists in the current word
    const isCorrectAlph = currentWord.toLowerCase().includes(alph);

    // Generate class names based on guess and correctness
    const className = clsx("keyboard", {
      "correct-color": isGuessed && isCorrectAlph,
      "wrong-color": isGuessed && !isCorrectAlph,
    });

    return (
      <button
        key={alph}
        onClick={() => {
          if(wrongGuessedLetters.length < 3){
          handleClick(alph);
          }else(console.log("You've reached the maximum number of attempts. pleas Click pn"))
        }}
        className={className}
      >
        {isUpperCaseWord ? alph.toUpperCase() : alph.toLowerCase()}
      </button>
    );
  });

  // Render the language chips
  const languageElements = languages.map((lang) => {

    // Check if the language name includes any of the wrong guessed letters
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

  // Render the letters of the current word dynamically
  const letterElements = currentWord.split("").map((letter, index) => {
    // Check if the guessedWord includes the letter (case-insensitive)
    const isCorrectWord = guessedWord.includes(letter.toLowerCase());
    console.log(letter);
    // Generate class names for styling
    const className = clsx("letter", {
      "remove-transparent": isCorrectWord,
    });

    return (
      <span key={`${letter}-${index}`} className={className}>
        {isCorrectWord ? letter : ""}
      </span>
    );
  });


  const wrongAttempt = <p className="number-of-wrong-attempts">{wrongGuessedLetters.length}</p>;

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
        <h2>You !</h2>
        <p>Well done! 🎉</p>
      </section>
      <section className="language-chips">{languageElements}</section>
      <section className="word">{letterElements}</section>
      <section className="number-of-wrong-attempt">{wrongAttempt}</section>
      <section className="keyboard">{keyboardElements}</section>
      <button onClick={newGame} className="new-game">
        New Game
      </button>
    </main>
  );
}

export default App;
