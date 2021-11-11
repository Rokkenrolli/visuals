import { useState } from "react";
import { MousePos } from "./Canvas";
import styles from "../styles/FunctionList.module.css";
import classnames from "classnames";
import { Effect } from "../utils/effect";
export interface FunctionListProps {
  effects: Effect[];
  disableFunction: (effect: Effect, to: boolean) => void;
}

const FunctionList: React.FC<FunctionListProps> = ({
  effects,
  disableFunction,
}) => {
  return (
    <div className={styles.container}>
      {effects.map((e, i) => (
        <FunctionButton key={i} effect={e} disableFunction={disableFunction} />
      ))}
    </div>
  );
};

export interface FunctionProps {
  effect: Effect;
  disableFunction: (effect: Effect, to: boolean) => void;
}

const FunctionButton: React.FC<FunctionProps> = ({
  effect,
  disableFunction,
}) => {
  return (
    <button
      className={classnames(styles.button, {
        [styles.disabled]: effect.disabled,
      })}
      onClick={() => disableFunction(effect, !effect.disabled)}
    >
      {effect.name}
    </button>
  );
};

export default FunctionList;
