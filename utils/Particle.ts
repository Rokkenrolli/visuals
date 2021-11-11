import { v4 as uuidv4 } from 'uuid';
import Vector2 from "./vector";


type ParticleStatus = "start" | "alive" | "dead"

export class Particle {
    public dir: Vector2
    public life:number = 0
    public maxLife:number
    public _update:() => void
    public onInit:() => void 
    public onDeath:() => void 
    public id:string = uuidv4()

    constructor(dir:Vector2, maxLife:number, update: () => void, onInit?:()=> void, onDeath?:() => void) {
        this.dir = dir
        this.maxLife = maxLife
        this._update = update
        this.onInit = onInit ? onInit : () => {} 
        this.onDeath = onDeath ? onDeath: () => {}
    }

    getStatus():ParticleStatus {
        if(this.life === 0) {
            return "start"
        }
        if (this.life >= this.maxLife) {
            return "dead"
        }
        return "alive"
    }

    update() {
        this._update()
    }


}




class ParticleSystem  {

    public particles: Map<string, Particle>
    
    constructor(particles?: Particle[]) {
        const map = new Map<string, Particle>()
        if (particles) {
            
            particles.forEach(p => map.set(p.id, p))
        }
        this.particles = map
    }

    update() {
        this.particles.forEach(p => {
            console.log(`current lifecycle: ${p.life} max ${p.maxLife}`)
            const status = p.getStatus()
            switch(status) {
                case "start": 
                    p.onInit()
                break;
                case "alive" :
                     p.update()
                     break;
                case "dead" :
                    p.onDeath()
                    this.remove(p)
                break;
            }
            p.life++;
        })
    }

    add(particle: Particle) {
        this.particles.set(particle.id, particle)
    }
   
    removeById(id: string):boolean {
        return this.particles.delete(id)
    }

    remove(particle:Particle):boolean {
        return this.particles.delete(particle.id)
    }
}   

export default ParticleSystem