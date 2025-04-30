import { useState } from "react";
import "./ColorCard.css";
import ColorForm from "../ColorForm/ColorForm";
import { ColorType } from "../../lib/color_type";

type ColorCardProps = ColorType & {
  onDelete: (id: string) => void;
  onUpdate: (color: ColorType) => void;
};

export default function ColorCard(props: ColorCardProps) {
  const [hasRequestedUpdate, setHasRequestedUpdate] = useState(false);
  const [hasRequestedDelete, setHasRequestedDelete] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);

  function handleUpdate(newColor?: ColorType) {
    if (hasRequestedUpdate === false) {
      setHasRequestedUpdate(true);
    } else {
      if (newColor !== undefined) {
        props.onUpdate(newColor);
      }
      setHasRequestedUpdate(false);
    }
  }

  function handleDelete() {
    if (hasRequestedDelete === false) {
      setHasRequestedDelete(true);
    } else {
      props.onDelete(props.id);
    }
  }

  function cancelDelete() {
    setHasRequestedDelete(false);
  }

  function handleCopy() {
    navigator.clipboard.writeText(props.hex);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 3000);
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
      <button onClick={handleCopy}>
        {" "}
        {hasCopied ? "SUCCESSFULLY COPIED!" : "COPY"}
      </button>
      <h4>{props.role}</h4>
      <p>contrast: {props.contrastText}</p>
      {hasRequestedDelete && (
        <>
          <span>Really delete?</span>
          <button onClick={cancelDelete}>Cancel</button>
        </>
      )}
      {hasRequestedUpdate && (
        <ColorForm
          onSubmit={handleUpdate}
          buttonText="UPDATE COLOR"
          initialId={props.id}
          initialRole={props.role}
          initialHex={props.hex}
          initialContrastText={props.contrastText}
        />
      )}
      {!hasRequestedUpdate && (
        <button onClick={() => handleDelete()}>Delete</button>
      )}
      {!hasRequestedDelete && (
        <button onClick={() => handleUpdate()}>
          {hasRequestedUpdate ? "CANCEL" : "EDIT"}
        </button>
      )}
    </div>
  );
}
