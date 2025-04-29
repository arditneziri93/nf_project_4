import { ChangeEvent, useState } from "react";
import ColorInput from "./ColorInput";
import { ColorType } from "../../lib/colors";
import { v4 as uuidv4 } from "uuid";

type ColorFormProps = {
  onSubmit: (color: ColorType) => void;
};

export default function ColorForm(props: ColorFormProps) {
  const [role, setRole] = useState("");
  const [hex, setHex] = useState("#000000");
  const [contrastText, setContrastText] = useState("");

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setRole(event.target.value);
  }

  function handleHexChange(value: string) {
    setHex(value);
  }

  function handleContrastChange(value: string) {
    setContrastText(value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const id = uuidv4();
    const color: ColorType = {
      id: id,
      role: role,
      hex: hex,
      contrastText: contrastText,
    };
    props.onSubmit(color);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Role</label>
      <br />
      <input value={role} onChange={handleNameChange} />
      <br />
      <label>Hex</label>
      <br />
      <ColorInput onChange={handleHexChange} />
      <br />
      <label>Contrast Text</label>
      <br />
      <ColorInput onChange={handleContrastChange} />
      <br />
      <button>ADD COLOR</button>
    </form>
  );
}
