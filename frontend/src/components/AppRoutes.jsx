import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import Main from "./Main";

const AppRoutes = ({
  formType,
  setFormType,
  userEmail,
  setUserEmail,
  password,
  setPassword,
  loggedIn,
  onRegister,
  toolTipOpen,
  setToolTipOpen,
  registerSuccess,
  setRegisterSuccess,
  onLogin,
  api,
  cards,
  setCardsList,
  selectedCard,
  setSelectedCard,
  currentUser,
  handleEditAvatarClick,
  handleEditProfileClick,
  handleAddPlaceClick,
  handleCardDeleteClick,
}) => {
  return (
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
              cards={cards}
              setCardsList={setCardsList}
              selectedCard={selectedCard}
              setSelectedCard={setSelectedCard}
              currentUser={currentUser}
              onEditAvatarClick={handleEditAvatarClick}
              onEditProfileClick={handleEditProfileClick}
              onAddPlaceClick={handleAddPlaceClick}
              onCardTrashClick={handleCardDeleteClick}
            />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/signin" />} />
    </Routes>
  );
};

export default AppRoutes;
