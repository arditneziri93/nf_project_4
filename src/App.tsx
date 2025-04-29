import { ColorType, initialColors } from "./lib/colors";
import "./App.css";
import ColorCard from "./components/ColorCard/ColorCard";
import ColorForm from "./components/ColorForm/ColorForm";
import { useState } from "react";

function App() {
  const [colors, setColors] = useState<ColorType[]>(initialColors);

  function addColor(newColor: ColorType) {
    setColors([newColor, ...colors]);
  }
  function deleteColor(id: string) {
    setColors(colors.filter((c) => c.id !== id));
  }

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm onSubmit={addColor} />

      {colors.length === 0 ? (
        <p>No colors... start by adding one!</p>
      ) : (
        colors.map((color) => (
          <ColorCard key={color.id} {...color} onDelete={deleteColor} />
        ))
      )}
    </>
  );
}

export default App;
