import '../../styles/Header.css'
import Scoreboard from './Scoreboard';

export default function Header({ score }) {
  return (
    <header>
      <h1 className="header-logo">Memory Card Game</h1>
      <Scoreboard score={score} />
    </header>
  );
}