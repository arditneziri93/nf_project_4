import { ColorType, initialColors } from "./lib/colors";
import "./App.css";
import ColorCard from "./components/ColorCard/ColorCard";
import ColorForm from "./components/ColorForm/ColorForm";

function App() {
  function addColor(color: ColorType) {
    console.log(color);
  }

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm onSubmit={addColor} />
      {initialColors.map((color) => (
        <ColorCard key={color.id} {...color} />
      ))}
    </>
  );
}

export default App;
