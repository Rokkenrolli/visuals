import { getRandomInt } from "./utils"


class color {

    public r:number
    public g:number
    public b:number
    public a: number = 1

    constructor(r:number,g:number,b:number, a?:number) {
        this.r = r
        this.g = g
        this.b = b
        if (a) this.a = a
    }

    toString() {
        return `rgba(${this.r},${this.g},${this.b},${this.a})`
    }


    static random():color {
        return new color(getRandomInt(0,256),getRandomInt(0,256),getRandomInt(0,256))
    }

}

export default color