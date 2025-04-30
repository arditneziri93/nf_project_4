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

  function updateColor(newColor: ColorType) {
    const updatedColors = colors.map((color) =>
      color.id === newColor.id ? newColor : color
    );

    console.log(updatedColors[0]);
    setColors(updatedColors);
  }

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm
        onSubmit={addColor}
        buttonText="ADD COLOR"
        initialRole={""}
        initialHex={"#BADA55"}
        initialContrastText={"#C0FFEE"}
      />

      {colors.length === 0 ? (
        <p>No colors... start by adding one!</p>
      ) : (
        colors.map((color) => (
          <ColorCard
            key={color.id}
            {...color}
            onUpdate={updateColor}
            onDelete={deleteColor}
          />
        ))
      )}
    </>
  );
}

export default App;
