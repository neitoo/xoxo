import React from "react";

export function Square(props){
    return(
        <button className="square" onClick={props.onClick}>
            {props.value !== null && <img src={props.value} alt="" srcSet="" />}
        </button>
    );
}