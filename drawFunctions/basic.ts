import { MousePos } from "../components/Canvas"
import { EffectRender } from "../utils/effect"
import ParticleSystem, { Particle } from "../utils/Particle"
import Vector2 from './../utils/vector';
import color from "../utils/color";

const createFollowParticle  =(ctx: CanvasRenderingContext2D,  mousePos: MousePos,color:color) => {
    const initialPos = new Vector2(mousePos.x, mousePos.y)
    const dir = mousePos.dir
    const speed = 1
    const update = () => {
        ctx.beginPath()
        ctx.fillStyle = color.toString()
        ctx.arc(initialPos.x, initialPos.y, 5, 0, 2*Math.PI)
        ctx.fill()
        initialPos.add(dir.multiply(speed))
    }
    return new Particle(dir, 300,color, update,)
}


const drawBlink:EffectRender = (ctx:CanvasRenderingContext2D, frameCount:number, mousePos: MousePos| undefined ) => {

    ctx.beginPath()
    ctx.fillStyle = 'red'
    ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
    ctx.fill()
}

const drawMouse:EffectRender = (ctx, frameCount, mousePos, particleSystem ) => {

    if (!mousePos) {
    return
    }
    ctx.beginPath()
    ctx.fillStyle = "purple"
    ctx.arc(mousePos.x, mousePos.y, 5, 0, 2*Math.PI)
    ctx.fill()
    if (!particleSystem) {
        return
    }
    const particle = createFollowParticle(ctx, mousePos, color.random())
    particleSystem.add(particle)
}

export { drawBlink, drawMouse}