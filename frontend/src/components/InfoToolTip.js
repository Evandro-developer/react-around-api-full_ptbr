import React from "react";
import successImg from "../images/success_icon.svg";
import errorImg from "../images/error_icon.svg";
import closedBtn from "../images/close_icon.png";
import closedBtnSmall from "../images/close_icon_small.png";

function InfoToolTip(props) {
  return (
    <div className={`infoToolTip ${props.isOpen ? "infoToolTip_visible" : ""}`}>
      <div className="infoToolTip__container">
        <img
          src={props.success === "success" ? successImg : errorImg}
          alt={
            props.success === "success" ? "Ícone de sucesso" : "Ícone de erro"
          }
          className="infoToolTip__img"
        />
        <p className="infoToolTip__text">
          {props.success === "success"
            ? "Vitória! Cadastro concluído com sucesso!"
            : "Ops, algo saiu errado! Por favor, tente novamente."}
        </p>
        <picture>
          <source media="(max-width: 580px)" srcSet={closedBtnSmall} />
          <img
            aria-label="Close button"
            onClick={props.onClose}
            className="infoToolTip__closed-btn"
            src={closedBtn}
            alt="Close"
          />
        </picture>
      </div>
    </div>
  );
}

export default InfoToolTip;
