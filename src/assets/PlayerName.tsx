import { useState } from "react";

const PlayerName = () => {
  const [isPlayerEdit, setIsPlayerEdit] = useState<boolean>(true);
  const [playerName, setPlayerName] = useState<string>("");
  const [inputNameValue, setInputNameValue] = useState<string>("");

  const handlePlayerEdit = () => {
    setIsPlayerEdit(!isPlayerEdit);
  };

  const editName = () => {
    setPlayerName(inputNameValue);
    setIsPlayerEdit(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputNameValue(event.target.value);
  };

  return (
    <div>
      {isPlayerEdit ? (
        <div onClick={handlePlayerEdit} className="playerName">
          <h2 id="playerName">{playerName.length == 0 ? "PlayerName" : playerName}</h2>
        </div>
      ) : (
        <form>
          <input type="text" value={inputNameValue} onChange={handleInputChange} id="inputName"/>
          <button type="button" onClick={editName}>
            Save
          </button>
        </form>
      )}
    </div>
  );
};

export default PlayerName;