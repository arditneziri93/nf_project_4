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

const posts = [
  {
    id: 1,
    title: "Boost your conversion rate",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    imageUrl:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    author: {
      name: "Michael Foster",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  // More posts...
];
