import { ChangeEvent, useState } from "react";
import ColorInput from "./ColorInput";
import { ColorType } from "../../lib/colors";
import { v4 as uuidv4 } from "uuid";

type ColorFormProps = {
  initialId?: string;
  initialRole: string;
  initialHex: string;
  initialContrastText: string;
  onSubmit: (color: ColorType) => void;
  buttonText: string;
};

export default function ColorForm(props: ColorFormProps) {
  const [role, setRole] = useState(props.initialRole);
  const [hex, setHex] = useState(props.initialHex);
  const [contrastText, setContrastText] = useState(props.initialContrastText);

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

    const id = props.initialId ?? uuidv4();
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
      <ColorInput initialValue={hex} onChange={handleHexChange} />
      <br />
      <label>Contrast Text</label>
      <br />
      <ColorInput initialValue={contrastText} onChange={handleContrastChange} />
      <br />
      <button>{props.buttonText}</button>
    </form>
  );
}
