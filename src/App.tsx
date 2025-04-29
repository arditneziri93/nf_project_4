import { initialColors } from "./lib/colors";
import "./App.css";
import ColorCard from "./Color/ColorCard";

function App() {
  return (
    <>
      <h1>Theme Creator</h1>

      {initialColors.map((color) => (
        <ColorCard key={color.id} {...color} />
      ))}
    </>
  );
}

export default App;
