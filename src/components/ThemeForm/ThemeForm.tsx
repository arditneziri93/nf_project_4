import React, { useState } from "react";
import { ThemeListItem } from "../../lib/theme_list_iiem";

enum ThemeFormMode {
  SELECT,
  ADD,
  UPDATE,
  DELETE,
}

type ThemeFormProps = {
  selectedTheme: ThemeListItem;
  themeList: ThemeListItem[];
  onChangeTheme: (id: string) => void;
  onAddTheme: (name: string) => void;
  onUpdateTheme: (theme: ThemeListItem) => void;
  onDeleteTheme: (id: string) => void;
};

export default function ThemeForm({
  selectedTheme,
  themeList,
  onChangeTheme,
  onAddTheme,
  onUpdateTheme,
  onDeleteTheme,
}: ThemeFormProps) {
  const [newThemeName, setNewThemeName] = useState("");
  const [themeFormMode, setThemeFormMode] = useState(ThemeFormMode.SELECT);

  function isDefaultTheme(): boolean {
    return selectedTheme.id === "default";
  }

  function handleThemeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    onChangeTheme(e.target.value);
  }

  function handleTextInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewThemeName(e.target.value);
  }

  function handleAddTheme() {
    if (themeFormMode !== ThemeFormMode.ADD) {
      setThemeFormMode(ThemeFormMode.ADD);
    } else {
      if (newThemeName !== "") {
        onAddTheme(newThemeName);
      }
    }
  }

  function handleUpdateTheme() {
    if (themeFormMode !== ThemeFormMode.UPDATE) {
      setThemeFormMode(ThemeFormMode.UPDATE);
    } else {
      onUpdateTheme(selectedTheme);
    }
  }

  function handleDeleteTheme() {
    if (themeFormMode !== ThemeFormMode.DELETE) {
      setThemeFormMode(ThemeFormMode.DELETE);
    } else {
      onDeleteTheme(selectedTheme.id);
    }
  }

  const selectInput = (
    <select value={selectedTheme.id} onChange={handleThemeChange}>
      {themeList.map((theme) => (
        <option key={theme.id} value={theme.id}>
          {theme.name}
        </option>
      ))}
    </select>
  );

  function nameInput(value: string) {
    return (
      <input
        type="text"
        value={value}
        placeholder="Theme name"
        onChange={handleTextInputChange}
      ></input>
    );
  }

  const addButton = <button onClick={() => handleAddTheme()}>Add</button>;

  const updateButton = (
    <button onClick={() => handleUpdateTheme()} disabled={isDefaultTheme()}>
      Update
    </button>
  );

  const deleteButton = (
    <button onClick={() => handleDeleteTheme()} disabled={isDefaultTheme()}>
      Delete
    </button>
  );

  const cancelButton = (
    <button onClick={() => setThemeFormMode(ThemeFormMode.SELECT)}>
      CANCEL
    </button>
  );

  return (
    <>
      {(() => {
        switch (themeFormMode) {
          case ThemeFormMode.SELECT:
            return (
              <>
                {selectInput}
                {addButton}
                {updateButton}
                {deleteButton}
              </>
            );
          case ThemeFormMode.ADD:
            return (
              <>
                {nameInput("")}
                {cancelButton}
                {addButton}
              </>
            );

          case ThemeFormMode.UPDATE:
            return (
              <>
                {nameInput(selectedTheme.name)}
                {cancelButton}
                {updateButton}
              </>
            );

          case ThemeFormMode.DELETE:
            return (
              <>
                {nameInput}
                {cancelButton}
                {deleteButton}
              </>
            );
        }
      })()}
    </>
  );
}
