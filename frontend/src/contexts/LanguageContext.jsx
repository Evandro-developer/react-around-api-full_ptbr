import React, { createContext, useContext, useState, useEffect } from "react";
import EN from "../locales/en.json";
import PT from "../locales/pt.json";

export const LangContext = createContext();

export const useLang = () => {
  return useContext(LangContext);
};

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem("appLang") || "en");

  useEffect(() => {
    localStorage.setItem("appLang", lang);
  }, [lang]);

  const translations = lang === "en" ? EN : PT;

  const t = (key) => {
    const keys = key.split(".");
    let value = translations;

    for (let k of keys) {
      value = value[k];
      if (!value) return key;
    }

    return value;
  };

  const value = { t, lang, setLang };

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
};
