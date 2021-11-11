import { MousePos } from "../components/Canvas";


export interface Effect {
    name: string;
  drawFunction: (
    ctx: CanvasRenderingContext2D,
    frameCount: number,
    mousePos: MousePos | undefined
  ) => void;
  disabled: boolean;
}