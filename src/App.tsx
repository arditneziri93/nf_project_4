import { initialColors } from "./lib/colors";
import "./App.css";
import Color from "./Color/Color";

function App() {
  return (
    <>
      <h1>Theme Creator</h1>

      {initialColors.map((color) => (
        <Color key={color.id} {...color} />
      ))}
    </>
  );
}

export default App;
