import { MousePos } from "../components/Canvas";
import ParticleSystem from "./Particle";


export type EffectRender = (
    ctx: CanvasRenderingContext2D,
    frameCount: number,
    mousePos: MousePos | undefined,
    particlesystem?: ParticleSystem
) => void



export interface Effect {
  name: string;
  drawFunction: EffectRender
  disabled: boolean;
  particleSystem?: ParticleSystem
}