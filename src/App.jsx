import { useState } from 'react'
import './index.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main>
    <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word within 8 attempts to keep the
        programming world safe from Assembly!</p>
    </header>
    <section className="game-status">
        <h2>You win!</h2>
        <p>Well done! 🎉</p>
    </section>
    <section className="language-chips">
        {languageElements}
    </section>
    <section className="word">
        {letterElements}
    </section>
    <section className="keyboard">
        {keyboardElements}
    </section>
    <button className="new-game">New Game</button>
</main>
  )
}

export default App
