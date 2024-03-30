import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { LangProvider } from "../contexts/LanguageContext";
import CurrentUserContext from "../contexts/CurrentUserContext";

import api from "../api/Api";
import AppRoutes from "./AppRoutes";
import Header from "./Header";
import Footer from "./Footer";
import InfoToolTip from "./InfoToolTip";
import PopupController from "./PopupController";

import {
  handleEditAvatarClick,
  handleEditProfileClick,
  handleAddPlaceClick,
  handleCardDeleteClick,
  closeWithAnimation,
  updateUser,
  updateAvatar,
  addPlace,
  deleteCardConfirm,
} from "../utils/popupHelpers";

import { register, login, signOut } from "../utils/authHelpers";

function App() {
  const [activePopup, setActivePopup] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [cards, setCardsList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [formType, setFormType] = useState("");
  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [toolTipOpen, setToolTipOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const navigate = useNavigate();

  const handleClosePopup = () =>
    closeWithAnimation(setIsClosing, setActivePopup);

  const handleCloseInfoToolTip = () =>
    closeWithAnimation(setIsClosing, setToolTipOpen);

  const handleUpdateUser = (newUser) => {
    updateUser(newUser, setCurrentUser);
  };

  const handleUpdateAvatar = (newAvatar) => {
    updateAvatar(newAvatar, setCurrentUser);
  };

  const handleAddPlace = (newCard) => {
    addPlace(newCard, setCardsList, cards);
  };

  const handleCardDeleteConfirm = () => {
    deleteCardConfirm(cardToDelete, setCardsList, setCardToDelete);
  };

  const handleRegister = (email, password) => {
    register(email, password, setRegisterSuccess, setToolTipOpen, navigate);
  };

  const handleLogin = (email, password) => {
    login(
      email,
      password,
      setLoggedIn,
      setUserEmail,
      setRegisterSuccess,
      setToolTipOpen,
      navigate
    );
  };

  const handleSignOut = () => {
    signOut(setLoggedIn, setUserEmail, setPassword, navigate);
  };

  useEffect(() => {
    let isMounted = true;

    const token = localStorage.getItem("token");
    const email = localStorage.getItem("userEmail");

    if (token) {
      setLoggedIn(true);

      api.getAllCards().then((response) => {
        if (isMounted) {
          setCardsList([...response].reverse());
        }
      });

      api.getUserInfo().then((response) => {
        if (isMounted) {
          setCurrentUser(response);
        }
      });
    } else {
      setLoggedIn(false);
      setCardsList([]);
      setCurrentUser(null);
    }

    if (email) {
      setUserEmail(email);
    }

    return () => {
      isMounted = false;
    };
  }, [loggedIn]);

  return (
    <LangProvider>
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <Header
          loggedIn={loggedIn}
          userEmail={userEmail}
          onSignOut={handleSignOut}
          formType={formType}
        />

        <AppRoutes
          formType={formType}
          setFormType={setFormType}
          email={userEmail}
          setEmail={setUserEmail}
          password={password}
          setPassword={setPassword}
          loggedIn={loggedIn}
          onRegister={handleRegister}
          toolTipOpen={toolTipOpen}
          setToolTipOpen={setToolTipOpen}
          registerSuccess={registerSuccess}
          setRegisterSuccess={setRegisterSuccess}
          onLogin={handleLogin}
          api={api}
          cards={cards}
          setCardsList={setCardsList}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
          currentUser={currentUser}
          handleEditAvatarClick={() => handleEditAvatarClick(setActivePopup)}
          handleEditProfileClick={() => handleEditProfileClick(setActivePopup)}
          handleAddPlaceClick={() => handleAddPlaceClick(setActivePopup)}
          handleCardDeleteClick={(card) =>
            handleCardDeleteClick(card, setCardToDelete, setActivePopup)
          }
        />

        {toolTipOpen && (
          <InfoToolTip
            toolTipOpen={toolTipOpen}
            success={registerSuccess}
            isClosing={isClosing}
            setIsClosing={setIsClosing}
            isMounted={isMounted}
            setIsMounted={setIsMounted}
            handleCloseInfoToolTip={handleCloseInfoToolTip}
          />
        )}

        {activePopup && (
          <PopupController
            formType={formType}
            setFormType={setFormType}
            activePopup={activePopup}
            currentUser={currentUser}
            onUpdateAvatar={handleUpdateAvatar}
            onUpdateUser={handleUpdateUser}
            onAddPlace={handleAddPlace}
            onConfirm={handleCardDeleteConfirm}
            isClosing={isClosing}
            setIsClosing={setIsClosing}
            isMounted={isMounted}
            setIsMounted={setIsMounted}
            handleClosePopup={handleClosePopup}
          />
        )}

        <Footer />
      </CurrentUserContext.Provider>
    </LangProvider>
  );
}

export default App;
