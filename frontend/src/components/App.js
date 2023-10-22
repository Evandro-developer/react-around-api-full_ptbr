import React, { useState, useEffect } from "react";
import { useNavigate, Routes, Route, Navigate } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext";

import api from "../api/Api";
import auth from "../api/Auth";

import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoToolTip from "./InfoToolTip";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmationPopup from "./ConfirmationPopup";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const [toolTipOpen, setToolTipOpen] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(null);

  const [activePopup, setActivePopup] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCardsList] = useState([]);
  const [cardToDelete, setCardToDelete] = useState(null);

  const [formType, setFormType] = useState("login");

  const navigate = useNavigate();

  const handleEditAvatarClick = () => {
    setActivePopup("editAvatar");
  };

  const handleEditProfileClick = () => {
    setActivePopup("editProfile");
  };

  const handleAddPlaceClick = () => {
    setActivePopup("addPlace");
  };

  const handleCardDeleteClick = (card) => {
    setCardToDelete(card);
    setActivePopup("confirmation");
  };

  const closeAllPopups = () => {
    setActivePopup(null);
  };

  const handleUpdateUser = (newUser) => {
    api.addNewUserInfo(newUser.name, newUser.about).then((updatedUser) => {
      setCurrentUser(updatedUser);
      closeAllPopups();
    });
  };

  const handleUpdateAvatar = (newAvatar) => {
    api.addNewUserInfoAvatar(newAvatar.avatar).then((updatedAvatar) => {
      setCurrentUser(updatedAvatar);
      closeAllPopups();
    });
  };

  const handleAddPlace = (newCard) => {
    api.addNewCard(newCard.placeName, newCard.link).then((newCard) => {
      setCardsList([newCard, ...cards]);
      closeAllPopups();
    });
  };

  const handleCardDeleteConfirm = async () => {
    if (cardToDelete) {
      await api.deleteCard(cardToDelete._id);
      setCardsList((state) => state.filter((c) => c._id !== cardToDelete._id));
      setCardToDelete(null);
      closeAllPopups();
    }
  };

  const onRegister = (email, password) => {
    auth
      .register(email, password)
      .then((response) => {
        if (response) {
          setRegisterSuccess("success");
          setToolTipOpen(true);
          navigate("/signin");
        }
      })
      .catch((error) => {
        console.error("Erro durante o registro:", error.message);
        setRegisterSuccess("error");
        setToolTipOpen(true);
      });
  };

  const onLogin = (email, password) => {
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("userEmail", email);
          setLoggedIn(true);
          setUserEmail(email);
          navigate("/main");
        } else {
          console.warn("Nenhum token foi recebido após o login.");
        }
      })
      .catch((error) => {
        console.error("Erro durante o login:", error.message);
        setRegisterSuccess("error");
        setToolTipOpen(true);
      });
  };

  const onSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setLoggedIn(false);
    setUserEmail("");
    setPassword("");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("userEmail");

    if (token) {
      setLoggedIn(true);
      api.getAllCards().then((response) => {
        setCardsList([...response].reverse());
      });

      api.getUserInfo().then((response) => {
        setCurrentUser(response);
      });
    } else {
      setLoggedIn(false);
      setCardsList([]);
      setCurrentUser(null);
    }

    if (email) {
      setUserEmail(email);
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className="page">
        <div className="root">
          <Header
            loggedIn={loggedIn}
            userEmail={userEmail}
            onSignOut={onSignOut}
          />
          <Routes>
            <Route
              path="/signup"
              element={
                <Register
                  formType={formType}
                  setFormType={setFormType}
                  email={userEmail}
                  setEmail={setUserEmail}
                  password={password}
                  setPassword={setPassword}
                  loggedIn={loggedIn}
                  onRegister={onRegister}
                  toolTipOpen={toolTipOpen}
                  setToolTipOpen={setToolTipOpen}
                  registerSuccess={registerSuccess}
                  setRegisterSuccess={setRegisterSuccess}
                />
              }
            />
            <Route
              path="/signin"
              element={
                <Login
                  formType={formType}
                  setFormType={setFormType}
                  email={userEmail}
                  setEmail={setUserEmail}
                  password={password}
                  setPassword={setPassword}
                  onLogin={onLogin}
                  setToolTipOpen={setToolTipOpen}
                />
              }
            />
            <Route
              path="/main"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Main
                    api={api}
                    onCardTrashClick={handleCardDeleteClick}
                    cards={cards}
                    setCardsList={setCardsList}
                    selectedCard={selectedCard}
                    setSelectedCard={setSelectedCard}
                    currentUser={currentUser}
                    onEditAvatarClick={handleEditAvatarClick}
                    onEditProfileClick={handleEditProfileClick}
                    onAddPlaceClick={handleAddPlaceClick}
                  />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/signin" />} />
          </Routes>
          {toolTipOpen && (
            <InfoToolTip
              isOpen={toolTipOpen}
              success={registerSuccess}
              onClose={() => setToolTipOpen(false)}
            />
          )}
          {loggedIn && activePopup === "editProfile" && (
            <EditProfilePopup
              formType={formType}
              setFormType={setFormType}
              isOpen={true}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
              currentUser={currentUser}
            />
          )}
          {loggedIn && activePopup === "editAvatar" && (
            <EditAvatarPopup
              formType={formType}
              setFormType={setFormType}
              isOpen={true}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />
          )}
          {loggedIn && activePopup === "addPlace" && (
            <AddPlacePopup
              formType={formType}
              setFormType={setFormType}
              isOpen={true}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlace}
            />
          )}
          {loggedIn && activePopup === "confirmation" && (
            <ConfirmationPopup
              formType={formType}
              setFormType={setFormType}
              isOpen={true}
              onClose={closeAllPopups}
              onConfirm={handleCardDeleteConfirm}
            />
          )}
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
