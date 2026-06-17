import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import Profile from "../Profile/Profile.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import Footer from "../Footer/Footer.jsx";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import {
  getItems,
  addItem,
  removeItem,
  addCardLike,
  removeCardLike,
} from "../../utils/api.js";
import * as auth from "../../utils/auth.js";
import { coordinates, apiKey } from "../../utils/constants.js";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { fahrenheit: 999, celcius: 999 },
    city: "",
    condition: "",
    isDay: false,
  });
  const [isWeatherDataLoaded, setIsWeatherDataLoaded] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    auth
      .registerUser({ name, avatar, email, password })
      .then((res) => {
        console.log("Registration successful!", res);

        handleLogin({ email, password });
      })
      .catch((err) => {
        console.error("Registration failed:", err);
      });
  };

  const handleLogin = ({ email, password }) => {
    auth
      .authorizeUser({ email, password })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setIsLoggedIn(true);

          auth
            .checkToken(data.token)
            .then((userData) => {
              setCurrentUser(userData);
              closeActiveModal();
            })
            .catch(console.error);
        }
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  };

  const handleUpdateUser = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");

    auth
      .updateUserProfile({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const onAddItem = (inputValues, resetForm) => {
    const token = localStorage.getItem("jwt");
    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weatherType,
    };

    addItem(newCardData, token)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        resetForm();
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleDeleteItem = (id) => {
    const token = localStorage.getItem("jwt");

    removeItem(id, token)
      .then(() => {
        const updatedItems = clothingItems.filter((item) => item._id !== id);
        setClothingItems(updatedItems);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    if (!isLiked) {
      addCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item)),
          );
        })
        .catch((err) => console.error("Error adding like:", err));
    } else {
      removeCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item)),
          );
        })
        .catch((err) => console.error("Error removing like:", err));
    }
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
        setIsWeatherDataLoaded(true);
      })
      .catch(console.error);

    getItems()
      .then((data) => {
        const reversedData = [...data].reverse();
        setClothingItems(reversedData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (!jwt) {
      return;
    }

    auth
      .checkToken(jwt)
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
        console.log("Token verified successfully. Welcome back:", user);
      })
      .catch((err) => {
        console.error("Token verification failed:", err);
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              handleRegisterClick={handleRegisterClick}
              handleLoginClick={handleLoginClick}
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    isWeatherDataLoaded={isWeatherDataLoaded}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      handleAddClick={handleAddClick}
                      clothingItems={clothingItems}
                      handleCardClick={handleCardClick}
                      onEditProfileClick={handleEditProfileClick}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
          <RegisterModal
            isOpen={activeModal === "register"}
            handleRegister={handleRegister}
            onCloseModal={closeActiveModal}
            openLoginModal={handleLoginClick}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            handleLogin={handleLogin}
            onCloseModal={closeActiveModal}
            openRegisterModal={handleRegisterClick}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onCloseModal={closeActiveModal}
            onUpdateUser={handleUpdateUser}
          />
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onAddItem={onAddItem}
            onCloseModal={closeActiveModal}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onCloseModal={closeActiveModal}
            onDeleteItem={handleDeleteItem}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
