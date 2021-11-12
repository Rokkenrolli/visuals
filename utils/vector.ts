import assert from "assert"




class Vector2 {

    public x: number
    public y: number

    constructor(x:number, y:number ) {
        this.x = x
        this.y = y
    }

    toString() {
        return `{${this.x} ${this.y}}`
    }

    length():number {
        return Math.sqrt((this.x*this.x) + (this.y*this.y))
    }

    add(another:Vector2) {
        this.x+= another.x
        this.y += another.y
        return this
    }
    substract(another:Vector2) {
        this.x-= another.x
        this.y -= another.y
        return this
    }
    multiply(value:number) {
        this.x*= value
        this.y*= value
        return this
    }
    divide(value:number) {
        assert(value !== 0, new Error("Cannot divide by zero"))
        this.x/=value
        this.y/=value
        return this
    }
    normalize():Vector2 {
        this.divide(this.length())
        return this
    }
    static zero():Vector2 {
        return new Vector2(0,0)
    }

}

export default Vector2