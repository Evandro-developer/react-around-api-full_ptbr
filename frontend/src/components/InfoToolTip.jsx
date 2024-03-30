import React, { useEffect, useContext } from "react";
import { LangContext } from "../contexts/LanguageContext";
import successImg from "../images/success_icon.svg";
import errorImg from "../images/error_icon.svg";
import closedBtn from "../images/close_icon.svg";
import closedBtnSmall from "../images/close_icon_small.svg";

function InfoToolTip(props) {
  const { t } = useContext(LangContext);

  const handleEscapeKey = (e) => {
    if (e.key === "Escape" && props.toolTipOpen) {
      props.handleCloseInfoToolTip();
    }
  };

  useEffect(() => {
    if (props.toolTipOpen) {
      props.setIsMounted(true);
      props.setIsClosing(false);
      window.addEventListener("keydown", handleEscapeKey);
    } else {
      props.setIsClosing(true);
      window.removeEventListener("keydown", handleEscapeKey);
    }

    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [props.toolTipOpen, props.isMounted]);

  return (
    <div
      className={`infoToolTip ${
        props.toolTipOpen ? "infoToolTip__opened" : ""
      } ${props.isClosing ? "infoToolTip__closed" : ""}`}
    >
      <div className="infoToolTip__container">
        <img
          src={props.success === "success" ? successImg : errorImg}
          alt={t(
            props.success === "success"
              ? "infoToolTip.successIcon"
              : "infoToolTip.errorIcon"
          )}
          className="infoToolTip__img"
        />
        <p className="infoToolTip__text">{t(props.success)}</p>
        <picture>
          <source media="(max-width: 580px)" srcSet={closedBtnSmall} />
          <img
            aria-label={t("default.closeIcon")}
            onClick={props.handleCloseInfoToolTip}
            className="infoToolTip__closed-btn"
            src={closedBtn}
            alt={t("default.closeIcon")}
          />
        </picture>
      </div>
    </div>
  );
}

export default InfoToolTip;
