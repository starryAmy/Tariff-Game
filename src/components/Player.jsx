import { useState } from "react";

export default function Player({
  initialName,
  isActive,
  onNameChange,
  character,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [buttonText, setButtonText] = useState("Edit");
  const [playerName, setPlayerName] = useState(initialName);

  function handleEdit() {
    setIsEditing((editing) => !editing); // this arrow function is a callback that takes the previous state and returns the new state
    setButtonText(isEditing ? "Edit" : "Save");
    if (isEditing) {
      onNameChange(character, playerName);
    }
  }

  function handleInput(e) {
    setPlayerName(e.target.value);
  }

  // if the player is editing, show the input field, otherwise show the player name
  let editablePlayerName = <span className="player-name">{playerName}</span>;
  if (isEditing) {
    editablePlayerName = (
      <input type="text" required value={playerName} onChange={handleInput} />
    );
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span>{character}</span>
      <span className="player-wrapper">
        <span className="player">{editablePlayerName}</span>
        <button onClick={handleEdit}>{buttonText}</button>
      </span>
    </li>
  );
}
