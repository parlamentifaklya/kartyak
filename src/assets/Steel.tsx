import { useEffect, useState } from "react";
import { Materials } from "./Materials";
import "./Kartya.css";

interface Material {
  Name: string;
  Amount: number;
  ProductionTime: number;
}

const MaterialCard = ({ material }: { material: Material }) => {
  const [amount, setAmount] = useState<number>(() => {
    const savedAmount = localStorage.getItem(material.Name);
    return savedAmount ? parseInt(savedAmount, 10) : material.Amount;
  });
  const [prod, setProd] = useState<number>(0);
  const [isProducing, setIsProducing] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isProducing) {
      interval = setInterval(() => {
        setProd((prevProd) => prevProd + 1);
      }, material.ProductionTime);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isProducing, material.ProductionTime]);

  useEffect(() => {
    localStorage.setItem(material.Name, amount.toString());
  }, [amount, material.Name]);

  const startProduction = () => {
    setIsProducing((prev) => !prev);
  };

  const increaseAmount = () => {
    setAmount((prevAmount) => prevAmount + 1);
  };

  const decreaseAmount = () => {
    setAmount((prevAmount) => Math.max(prevAmount - 1, 0));
  };

  const collectProduction = () => {
    setAmount((prevAmount) => prevAmount + prod);
    setProd(0);
  };

  return (
    <div className="card" key={material.Name}>
      <p>{material.Name}: <span>{amount}</span></p>
      <p>Production: <span>{prod}</span></p>
      <button type="button" onClick={startProduction}>
        {isProducing ? "Stop Production" : "Start Production"}
      </button>
      <button type="button" onClick={collectProduction}>Collect Production</button>
      <div className="arrowContainer">
        <span onClick={decreaseAmount}>&#8722;</span>
        <span onClick={increaseAmount}>&#43;</span>
      </div>
    </div>
  );
};

const Steel = () => {
  return (
    <div className="cards">
      {Materials.map((material, index) => (
        <MaterialCard material={material} key={index} />
      ))}
    </div>
  );
};

export default Steel;