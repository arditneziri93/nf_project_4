import "./App.css";
import ColorCard from "./components/ColorCard/ColorCard";
import ColorForm from "./components/ColorForm/ColorForm";
import { useEffect, useState } from "react";
import { ColorType } from "./lib/color_type";
import * as themesDb from "./lib/themes_db";
import ThemeForm from "./components/ThemeForm/ThemeForm";
import { ThemeListItem } from "./lib/theme_list_iiem";
import { ThemeType } from "./lib/theme_type";

function App() {
  const [themeList, setThemeList] = useState<ThemeListItem[]>([]);
  const [theme, setTheme] = useState<ThemeType>();

  useEffect(() => {
    fetchThemeList();
    fetchTheme();
  }, []);

  function handleThemeChange(themeId: string) {
    fetchTheme(themeId);
  }

  function fetchTheme(themeId?: string) {
    setTheme(themesDb.getThemeById(themeId || theme?.id || "default"));
  }

  function fetchThemeList() {
    setThemeList(themesDb.getThemeList());
  }

  function addTheme(name: string) {
    themesDb.addTheme(name);
    fetchThemeList();
    fetchTheme();
  }

  function updateTheme(theme: ThemeListItem) {
    themesDb.updateTheme(theme);
    fetchThemeList();
    fetchTheme();
  }

  function deleteTheme(themeId: string) {
    themesDb.deleteTheme(themeId);
    fetchThemeList();
    fetchTheme();
  }

  function addColor(newColor: ColorType) {
    if (theme !== undefined) {
      themesDb.addColor(theme.id, newColor);
      fetchTheme();
    }
  }
  function deleteColor(id: string) {
    if (theme !== undefined) {
      themesDb.deleteColor(theme.id, id);
      fetchTheme();
    }
  }

  function updateColor(newColor: ColorType) {
    if (theme !== undefined) {
      themesDb.updateColor(theme.id, newColor);
      fetchTheme();
    }
  }

  return (
    <>
      <ThemeForm
        selectedTheme={{
          id: theme?.id ?? "default",
          name: theme?.name ?? "Default Theme",
        }}
        themeList={themeList}
        onChangeTheme={handleThemeChange}
        onAddTheme={addTheme}
        onUpdateTheme={updateTheme}
        onDeleteTheme={deleteTheme}
      />
      <ColorForm
        onSubmit={addColor}
        buttonText="ADD COLOR"
        initialRole={""}
        initialHex={"#BADA55"}
        initialContrastText={"#C0FFEE"}
      />

      {theme?.colors.length === 0 ? (
        <p>No colors... start by adding one!</p>
      ) : (
        theme?.colors.map((color) => (
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
