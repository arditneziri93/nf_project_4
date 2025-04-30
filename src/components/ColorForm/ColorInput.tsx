import { ChangeEvent, useState } from "react";

type ColorInputProps = {
  initialValue?: string;
  onChange: (value: string) => void;
};
export default function ColorInput(props: ColorInputProps) {
  const [color, setColor] = useState(props.initialValue);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setColor(event.target.value);
    props.onChange(event.target.value);
  }

  return (
    <>
      <input value={color} type="text" onChange={handleChange} />
      <input value={color} type="color" onChange={handleChange} />
    </>
  );
}
