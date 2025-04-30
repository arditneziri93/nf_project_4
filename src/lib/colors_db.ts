import { ColorType } from "./color_type";
import initialColors from "./initial_colors";

const colorsDb = {
  getAll(): ColorType[] {
    const storedColors = localStorage.getItem("COLORS");
    if (storedColors === null) {
      localStorage.setItem("COLORS", JSON.stringify(initialColors));
      return initialColors;
    }
    return JSON.parse(storedColors) as ColorType[];
  },

  add(newColor: ColorType): void {
    const colors = this.getAll();
    colors.unshift(newColor);
    localStorage.setItem("COLORS", JSON.stringify(colors));
  },

  update(updatedColor: ColorType): void {
    const colors = this.getAll();
    const index = colors.findIndex((c) => c.id === updatedColor.id);
    if (index === -1) return;
    colors[index] = updatedColor;
    localStorage.setItem("COLORS", JSON.stringify(colors));
  },

  delete(id: string): void {
    const colors = this.getAll();
    const newColors = colors.filter((c) => c.id !== id);
    localStorage.setItem("COLORS", JSON.stringify(newColors));
  },
};

export default colorsDb;
