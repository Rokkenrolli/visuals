import { MousePos } from "../components/Canvas"
import { EffectRender } from "../utils/effect"
import ParticleSystem, { Particle } from "../utils/Particle"
import Vector2 from './../utils/vector';


const createFollowParticle  =(ctx: CanvasRenderingContext2D,  mousePos: MousePos,color:string) => {
    const initialPos = new Vector2(mousePos.x, mousePos.y)
    const dir = new Vector2(1,0)
    const update = () => {
        ctx.beginPath()
        ctx.fillStyle = color
        ctx.arc(initialPos.x, initialPos.y, 5, 0, 2*Math.PI)
        ctx.fill()
        initialPos.add(dir)
    }
    return new Particle(dir, 300, update)
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
    console.log("particle system", particleSystem)
    if (!particleSystem) {
        return
    }
    const particle = createFollowParticle(ctx, mousePos, "white")
    console.log("creating particle", particle)
    particleSystem.add(particle)
}

export { drawBlink, drawMouse}