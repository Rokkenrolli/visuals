import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import Vector2 from "../utils/vector";

export interface CanvasProps {
  width: number;
  height: number;
  className?: string;
  _render: (
    ctx: CanvasRenderingContext2D,
    frameCount: number,
    mousePos: MousePos | undefined
  ) => void;
}

export interface MousePos {
  x: number;
  y: number;
  dir: Vector2
}

const Canvas: React.FC<CanvasProps> = ({
  width,
  height,
  className,
  _render,
}) => {
  let mousePos: MousePos | undefined = undefined;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const setMousePos = (
    canvasRef: RefObject<HTMLCanvasElement>,
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (!canvasRef || !canvasRef.current ||!event) {
      mousePos = undefined;
      return;
    }
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const previous = mousePos
    const newX = event.clientX - rect.left
    const newY = event.clientY - rect.top
    mousePos = { x: newX, y:newY, dir: previous ? new Vector2(newX-previous.x, newY-previous.y).normalize() : Vector2.zero()  }
  };

  const incrementWithBound = (currentNumber: number, bound: number): number => {
    return currentNumber >= bound ? 0 : currentNumber + 1;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }
    let frameCount = 0;
    let animationFrameId: number;
    //Our draw came here
    const render = () => {
      frameCount = incrementWithBound(frameCount, Number.MAX_SAFE_INTEGER);
      _render(context, frameCount, mousePos);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [_render, mousePos]);

  return (
    <div>
      <canvas
        onMouseLeave={() => (mousePos = undefined)}
        onMouseMove={(e) => setMousePos(canvasRef, e)}
        ref={canvasRef}
        width={width}
        height={height}
        className={className}
      />
    </div>
  );
};

export default Canvas;
