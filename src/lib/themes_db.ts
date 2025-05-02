import { ColorType } from "./color_type";
import initialThemes from "./initial_themes";
import { ThemeListItem } from "./theme_list_iiem";
import { ThemeType } from "./theme_type";

function getAllThemes(): ThemeType[] {
  const storedThemes = localStorage.getItem("THEMES");
  if (storedThemes === null) {
    localStorage.setItem("THEMES", JSON.stringify(initialThemes));
    return initialThemes;
  }
  return JSON.parse(storedThemes) as ThemeType[];
}

function getThemeList(): ThemeListItem[] {
  const themes = getAllThemes();
  return themes.map((t) => ({ id: t.id, name: t.name }));
}

function getThemeById(id: string): ThemeType | undefined {
  const themes = getAllThemes();
  return themes.find((t) => t.id === id);
}

function addTheme(name: string): void {
  const themes = getAllThemes();
  const newTheme = { id: name, name: name, colors: initialThemes[0].colors };
  themes.unshift(newTheme);
  localStorage.setItem("THEMES", JSON.stringify(themes));
}

function updateTheme(theme: ThemeListItem) {
  const themes = getAllThemes();
  const themeIndex = themes.findIndex((t) => t.name === theme.id);
  if (themeIndex !== -1) {
    themes[themeIndex].name = theme.name;
    localStorage.setItem("THEMES", JSON.stringify(themes));
  }
}

function deleteTheme(id: string): void {
  const themes = getAllThemes();
  const newThemes = themes.filter((t) => t.name !== id);
  localStorage.setItem("THEMES", JSON.stringify(newThemes));
}

// COLORS

function addColor(themeId: string, newColor: ColorType): void {
  const themes = getAllThemes();
  const themeIndex = themes.findIndex((t) => t.name === themeId);
  if (themeIndex !== -1) {
    themes[themeIndex].colors.unshift(newColor);
    localStorage.setItem("THEMES", JSON.stringify(themes));
  }
}

function deleteColor(themeId: string, colorId: string): void {
  const themes = getAllThemes();
  const themeIndex = themes.findIndex((t) => t.name === themeId);
  if (themeIndex !== -1) {
    themes[themeIndex].colors = themes[themeIndex].colors.filter(
      (c) => c.id !== colorId
    );
    localStorage.setItem("THEMES", JSON.stringify(themes));
  }
}

function updateColor(themeId: string, updatedColor: ColorType): void {
  const themes = getAllThemes();
  const themeIndex = themes.findIndex((t) => t.name === themeId);
  if (themeIndex !== -1) {
    const colors = themes[themeIndex].colors;
    const colorIndex = colors.findIndex((c) => c.id === updatedColor.id);
    if (colorIndex !== -1) {
      themes[themeIndex].colors[colorIndex] = updatedColor;
      localStorage.setItem("THEMES", JSON.stringify(themes));
    }
  }
}

export {
  getAllThemes,
  getThemeList,
  getThemeById,
  addTheme,
  updateTheme,
  deleteTheme,
  addColor,
  deleteColor,
  updateColor,
};
