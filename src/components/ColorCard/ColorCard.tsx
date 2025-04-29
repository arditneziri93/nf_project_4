import { useState } from "react";
import { ColorType } from "../../lib/colors";
import "./ColorCard.css";

type ColorCardProps = ColorType & {
  onDelete: (id: string) => void;
};

export default function ColorCard(props: ColorCardProps) {
  const [hasRequestedDelete, setHasRequestedDelete] = useState(false);

  function cancelDelete() {
    setHasRequestedDelete(false);
  }

  function handleDelete() {
    if (hasRequestedDelete === false) {
      setHasRequestedDelete(true);
    } else {
      props.onDelete(props.id);
    }
  }

  return (
    <div
      className="color-card"
      style={{
        background: props.hex,
        color: props.contrastText,
      }}
    >
      <h3 className="color-card-headline">{props.hex}</h3>
      <h4>{props.role}</h4>
      <p>contrast: {props.contrastText}</p>
      {hasRequestedDelete && (
        <>
          <span>Really delete?</span>
          <button onClick={cancelDelete}>Cancel</button>
        </>
      )}
      <button onClick={() => handleDelete()}>Delete</button>
    </div>
  );
}
