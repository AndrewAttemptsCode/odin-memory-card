import { useEffect, useState } from 'react';
import '../../styles/Scoreboard.css';

export default function Scoreboard({ score }) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timeout = setTimeout(() => setIsAnimating(false), 200);
    return () => clearTimeout(timeout);
  }, [score])

  return (
    <div className="scoreboard">
      <p>Score: <span className={`score-display ${isAnimating ? "animate" : ""}`}>{score}</span></p>
      <p>Best Score:</p>
    </div>
  );
}