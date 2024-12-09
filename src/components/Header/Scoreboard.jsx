export default function Scoreboard({ score }) {
  return (
    <div className="scoreboard">
      <p>Score: {score}</p>
      <p>Best Score:</p>
    </div>
  );
}