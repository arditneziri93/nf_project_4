import "./App.css";
import ColorCard from "./components/ColorCard/ColorCard";
import ColorForm from "./components/ColorForm/ColorForm";
import { useEffect, useState } from "react";
import { ColorType } from "./lib/color_type";
import colorsDb from "./lib/colors_db";

function App() {
  const [colors, setColors] = useState<ColorType[]>([]);

  useEffect(() => {
    fetchColors();
  }, []);

  function fetchColors() {
    setColors(colorsDb.getAll());
  }

  function addColor(newColor: ColorType) {
    colorsDb.add(newColor);
    fetchColors();
  }
  function deleteColor(id: string) {
    colorsDb.delete(id);
    fetchColors();
  }

  function updateColor(newColor: ColorType) {
    colorsDb.update(newColor);
    fetchColors();
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
