import { ColorType } from "../lib/colors";
import "./ColorCard.css";

export default function ColorCard({ hex, contrastText, role }: ColorType) {
  return (
    <div
      className="color-card"
      style={{
        background: hex,
        color: contrastText,
      }}
    >
      <h3 className="color-card-headline">{hex}</h3>
      <h4>{role}</h4>
      <p>contrast: {contrastText}</p>
    </div>
  );
}
