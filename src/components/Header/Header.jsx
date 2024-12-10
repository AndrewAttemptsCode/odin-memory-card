import '../../styles/Header.css'
import Scoreboard from './Scoreboard';

export default function Header({ score, bestScore }) {
  return (
    <header>
      <div className='logo-container'>
        <h1 className="header-logo">Memory Card Game</h1>
        <p>Get points by clicking on an image, but don't click on any more than once!</p>
      </div>  
      <Scoreboard score={score} bestScore={bestScore} />
    </header>
  );
}