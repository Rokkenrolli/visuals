import { MousePos } from "../components/Canvas"




const drawBlink = (ctx:CanvasRenderingContext2D, frameCount:number, mousePos: MousePos| undefined ) => {

    ctx.beginPath()
    ctx.fillStyle = 'red'
    ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
    ctx.fill()
}

const drawMouse = (ctx:CanvasRenderingContext2D, frameCount:number, mousePos: MousePos| undefined ) => {

    if (!mousePos) {
    return
    }
    ctx.beginPath()
    ctx.fillStyle = "purple"
    ctx.arc(mousePos.x, mousePos.y, 5, 0, 2*Math.PI)
    ctx.fill()
}

export { drawBlink, drawMouse}