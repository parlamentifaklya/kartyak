import PlayerName from "./PlayerName";
import Steel from "./Steel";
import "./Kartya.css";

const Kartya = () => {
  return (
    <div className="container">
        <PlayerName />
        <Steel/>
    </div>
  );
};

export default Kartya;