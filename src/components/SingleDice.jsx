import styles from "./SingleDice.module.css";
import clsx from "clsx";

export function SingleDice({ value, isBlocked, onToggleBlocked }) {
  return (
    <div
      onClick={onToggleBlocked}
      className={clsx([styles["container"], isBlocked && styles["blocked"]])}
    >
      {value === 0 ? "?" : value}
    </div>
  );
}
