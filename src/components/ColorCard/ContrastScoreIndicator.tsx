import { ContrastScore } from "./ContrastScore";

export default function ContrastScoreIndicator({
  score,
}: {
  score: ContrastScore;
}) {
  function getClassName() {
    return `contrast-score-indicator contrast-score-indicator-${score?.toLowerCase()}`;
  }

  return score ? (
    <span className={getClassName()}>Overall Contrast Score : {score}</span>
  ) : null;
}
