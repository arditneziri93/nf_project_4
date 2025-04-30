import { useEffect, useState } from "react";
import "./ColorCard.css";
import ColorForm from "../ColorForm/ColorForm";
import { ColorType } from "../../lib/color_type";
import { ContrastScore } from "./ContrastScore";
import ContrastScoreIndicator from "./ContrastScoreIndicator";

type ColorCardProps = ColorType & {
  onDelete: (id: string) => void;
  onUpdate: (color: ColorType) => void;
};

export default function ColorCard(props: ColorCardProps) {
  const [hasRequestedUpdate, setHasRequestedUpdate] = useState(false);
  const [hasRequestedDelete, setHasRequestedDelete] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const [contrastScore, setContrastScore] = useState<ContrastScore>(undefined);

  useEffect(() => {
    console.log("Comparing contrast");
    compareContrast(props.hex, props.contrastText);
  }, []);

  function compareContrast(a: string, b: string) {
    fetch("https://www.aremycolorsaccessible.com/api/are-they", {
      mode: "cors",
      method: "POST",
      body: JSON.stringify({ colors: [a, b] }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setContrastScore(json.overall);
      });
  }

  function handleUpdate(newColor?: ColorType) {
    if (hasRequestedUpdate === false) {
      setHasRequestedUpdate(true);
    } else {
      if (newColor !== undefined) {
        props.onUpdate(newColor);
        compareContrast(newColor.hex, newColor.contrastText);
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
        {hasCopied ? "SUCCESSFULLY COPIED!" : "COPY"}
      </button>
      <h4>{props.role}</h4>
      <p>contrast: {props.contrastText}</p>
      <ContrastScoreIndicator score={contrastScore} />
      <br />
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
