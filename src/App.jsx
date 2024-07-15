import styles from "./App.module.css";
import { SingleDice } from "./components/SingleDice";
import { useState } from "react";

const initialDiceList = [
  {
    value: 0,
    isBlocked: false,
  },
  {
    value: 0,
    isBlocked: false,
  },
  {
    value: 0,
    isBlocked: false,
  },
  {
    value: 0,
    isBlocked: false,
  },
  {
    value: 0,
    isBlocked: false,
  },
];

const initialCombinations = [
  {
    title: "3-er Pasch",
    value: 5,
    isChecked: false,
  },
  {
    title: "4-er Pasch",
    value: 10,
    isChecked: false,
  },
  {
    title: "Full House 🏡",
    value: 10,
    isChecked: false,
  },
  {
    title: "Große Straße 🛣️",
    value: 10,
    isChecked: false,
  },
];

function App() {
  const [diceList, setDiceList] = useState(initialDiceList);
  const [combinations, setCombinations] = useState(initialCombinations);
  const [round, setRound] = useState(1);
  const [toss, setToss] = useState(0);

  function handleToggleBlocked(diceIndex) {
    setDiceList(
      diceList.map((dice, index) => {
        if (index === diceIndex) {
          return {
            ...dice,
            isBlocked: !dice.isBlocked,
          };
        }
        return dice;
      })
    );
  }

  function handleRollDice() {
    // Set all values to 7 where isBlocked=false
    setToss((prev) => prev + 1);
    setDiceList(
      diceList.map((dice) => {
        if (!dice.isBlocked) {
          return {
            ...dice,
            value: Math.ceil(Math.random() * 6),
          };
        }
        return dice;
      })
    );
  }

  function handleNextRound() {
    setToss(0);
    setDiceList(initialDiceList);
    setRound((prev) => prev + 1);
  }

  return (
    <>
      <h1 className={styles["heading"]}>Kniffel-Drill 🎲</h1>
      <div className={styles["game-info"]}>
        <h2>Game Info</h2>
        <p>Runde: {round}</p>
        <p>Zug: {toss === 0 ? 1 : toss}</p>
      </div>
      <div className={styles["dice-container"]}>
        {diceList.map(({ value, isBlocked }, index) => {
          return (
            <SingleDice
              key={index}
              value={value}
              isBlocked={isBlocked}
              onToggleBlocked={() => handleToggleBlocked(index)}
            />
          );
        })}
      </div>
      <button
        onClick={() => {
          if (toss < 3) {
            handleRollDice();
          } else {
            handleNextRound();
          }
        }}
        className={styles["button"]}
      >
        {toss === 3 ? "Next round" : "Roll'em!"}
      </button>
      <div className={styles["combinations-info"]}>
        <h2>Combinations</h2>
        <ul>
          {combinations.map((combination) => {
            return (
              <li key={combination.title}>
                <input
                  onChange={() => {
                    setCombinations(
                      combinations.map((item) => {
                        if (item.title === combination.title) {
                          return {
                            ...item,
                            isChecked: true,
                          };
                        }
                        return item;
                      })
                    );
                  }}
                  type="checkbox"
                  checked={combination.isChecked}
                />
                <label htmlFor="">{combination.title}</label>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
