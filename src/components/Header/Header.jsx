import '../../styles/Header.css'
import Scoreboard from './Scoreboard';

export default function Header({ score, bestScore }) {
  return (
    <header>
      <h1 className="header-logo">Memory Card Game</h1>
      <Scoreboard score={score} bestScore={bestScore} />
    </header>
  );
}