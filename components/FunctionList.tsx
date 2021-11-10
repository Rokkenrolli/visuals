import { useState } from "react";
import { MousePos } from "./Canvas";
import styles from "../styles/FunctionList.module.css"
import classnames from "classnames";
export interface FunctionListProps {
    functions: FunctionProps[]
}


const FunctionList:React.FC<FunctionListProps> = ({functions}) => {


    return <div className={styles.container}>
        {functions.map((e,i) => <FunctionButton key={i} {...e}/>)}
    </div>
}

export interface FunctionProps {
    name:string
    drawFunction: (ctx: CanvasRenderingContext2D, frameCount: number, mousePos: MousePos| undefined) => void
    disabled: boolean
    disableFunction: (effect: FunctionProps, to: boolean) => void
}

const  FunctionButton:React.FC<FunctionProps> = (props) => {



    return <button className={classnames(styles.button, {[styles.disabled]: props.disabled})} onClick={() => props.disableFunction(props,!props.disabled)} >{props.name}</button>
}

export default FunctionList