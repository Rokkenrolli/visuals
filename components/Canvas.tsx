import { RefObject, useCallback, useEffect, useRef, useState } from "react";

export interface CanvasProps {
  width: number;
  height: number;
  className?: string;
  draw: (
    ctx: CanvasRenderingContext2D,
    frameCount: number,
    mousePos: MousePos | undefined
  ) => void;
}

export interface MousePos {
  x: number;
  y: number;
}

const Canvas: React.FC<CanvasProps> = ({ width, height, className, draw }) => {
  let mousePos: MousePos | undefined = undefined;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const setMousePos = (
    canvasRef: RefObject<HTMLCanvasElement>,
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (!canvasRef || !canvasRef.current) {
      mousePos = undefined;
      return;
    }
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    mousePos = event
      ? { x: event.clientX - rect.left, y: event.clientY - rect.top }
      : undefined;
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
      draw(context, frameCount, mousePos);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw, mousePos]);

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
