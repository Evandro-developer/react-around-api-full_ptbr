import auth from "../api/Auth";

export const register = (
  email,
  password,
  setRegisterSuccess,
  setToolTipOpen,
  navigate
) => {
  return auth
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
      navigate("/signup");
    });
};

export const login = (
  email,
  password,
  setLoggedIn,
  setUserEmail,
  setRegisterSuccess,
  setToolTipOpen,
  navigate
) => {
  return auth
    .authorize(email, password)
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userEmail", email);
        setLoggedIn(true);
        setUserEmail(email);
        navigate("/main");
      }
    })
    .catch((error) => {
      console.error("Erro durante o login:", error.message);
      setRegisterSuccess("error");
      setToolTipOpen(true);
    });
};

export const signOut = (setLoggedIn, setUserEmail, setPassword) => {
  localStorage.removeItem("token");
  localStorage.removeItem("userEmail");
  setLoggedIn(false);
  setUserEmail("");
  setPassword("");
};
