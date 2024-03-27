import React from "react";
import closed_tr from "../assets/closed-traffic.svg";
import "../styles/ClosedPages.scss";

export const ClosedContent = () => {
    return(
        <div className='wrapper'>
            <img src={closed_tr} alt="Закрыто" srcset="" />
            <h2>В настоящее время раздел в разработке</h2>
        </div>
    );
}