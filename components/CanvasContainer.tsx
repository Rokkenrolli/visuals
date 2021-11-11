import React, { useEffect, useState } from "react";
import { MousePos } from "./Canvas";
import Canvas from "./Canvas";
import FunctionList from "./FunctionList";
import { Effect } from "../utils/effect";
import styles from "../styles/canvas.module.css";

export interface CanvasContainerProps {
  effectMap: Map<string, Effect>;
}

const CanvasContainer: React.FC<CanvasContainerProps> = ({ effectMap }) => {
  const [drawFunctions, setDrawFunctions] =
    useState<Map<string, Effect>>(effectMap);

  const toggleEffect = (effect: Effect, toggleTo: boolean) => {
    const temp = new Map(drawFunctions);
    console.log(temp);
    temp.set(effect.name, { ...effect, disabled: toggleTo });
    console.log(temp);
    setDrawFunctions(temp);
  };

  const render = (
    ctx: CanvasRenderingContext2D,
    frameCount: number,
    mousePos: MousePos | undefined
  ) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    Array.from(drawFunctions.values()).forEach((drawObject) => {
      if (!drawObject.disabled) {
        drawObject.drawFunction(
          ctx,
          frameCount,
          mousePos,
          drawObject.particleSystem
        );
        if (!drawObject.particleSystem) {
          return;
        }
        drawObject.particleSystem.update();
      }
    });
  };

  return (
    <div>
      <FunctionList
        disableFunction={toggleEffect}
        effects={Array.from(drawFunctions.values())}
      />
      <Canvas
        className={styles.canvas}
        _render={render}
        width={900}
        height={600}
      />
    </div>
  );
};

export default CanvasContainer;
