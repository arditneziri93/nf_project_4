import { ColorType } from "../lib/colors";
import "./Color.css";

export default function Color({ hex, contrastText, role }: ColorType) {
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
