import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { api } from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";
import { Route, Routes, Navigate } from "react-router-dom";
import ProtectedRouter from "./ProtectedRouter";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import { authApi } from "../utils/authApi";


function App() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [authUser, setAuthUser] = useState(null);
    const [isOpenEditAvatar, setIsOpenEditAvatar] = useState(false);
    const [isOpenEditProfile, setIsOpenEditProfile] = useState(false);
    const [isOpenAddPlace, setIsOpenAddPlace] = useState(false);
    const [isOpenViewCard, setIsOpenViewCard] = useState(false);
    const [isOpenConfirm, setIsOpenConfirm] = useState(false);
    const [isOpenInfoTooltip, setIsOpenInfoTooltip] = useState(false);
    const [objectInfoTooltip, setObjectInfoTooltip] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [cards, setCards] = useState([]);
    const [isLoadingConfirmPopup, setIsLoadingConfirmPopup] = useState(false);
    const [isLoadingEditAvatarPopup, setIsLoadingEditAvatarPopup] = useState(false);
    const [isLoadingEditProfilePopup, setIsLoadingEditProfilePopup] = useState(false);
    const [isLoadingAddPlacePopup, setIsLoadingAddPlacePopup] = useState(false);

    useEffect(() => {
            authApi.checkToken()
                .then((res) => {
                    if (res) {
                        handleLogin(true);
                        setAuthUser(res.data);
                    }
                })
                .catch((err) => console.log('Ошибка: ' + err));
    }, [loggedIn])

    useEffect(() => {
        if (loggedIn) {
            api.getInitialCards()
                .then((cards) => {
                    setCards(cards.data);
                })
                .catch(err => console.log('Ошибка: ' + err));
        }
    }, [loggedIn])

    function handleLogin(isLogin) {
        setLoggedIn(isLogin);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(id => id === authUser._id);

        api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
            setCards((cards) => cards.map((c) => c._id === card._id ? newCard.data : c));
        })
            .catch(err => console.log('Ошибка: ' + err));
    }

    function handleCardDelete(card) {
        setIsLoadingConfirmPopup(true);
        api.deleteCard(card._id)
            .then(() => {
                setCards((cards) => cards.filter((c) => c._id !== card._id));
                closeAllPopups();
            })
            .catch(err => console.log('Ошибка: ' + err))
            .finally(() => setIsLoadingConfirmPopup(false));
    }

    function handleAddPlaceSubmit(card) {
        setIsLoadingAddPlacePopup(true);
        api.addNewCard(card)
            .then((newCard) => {
                setCards([newCard.data, ...cards]);
                closeAllPopups();
            })
            .catch(err => console.log('Ошибка: ' + err))
            .finally(() => setIsLoadingAddPlacePopup(false));
    }

    function handleEditAvatarClick() {
        setIsOpenEditAvatar(true);
    }

    function handleUpdateAvatar(userInfo) {
        setIsLoadingEditAvatarPopup(true);
        api.updateAvatarUser(userInfo)
            .then((updateUser) => {
                setAuthUser(updateUser.data);
                closeAllPopups();
            })
            .catch(err => console.log('Ошибка: ' + err))
            .finally(() => setIsLoadingEditAvatarPopup(false))
    }

    function handleUpdateUser(userInfo) {
        setIsLoadingEditProfilePopup(true);
        api.updateUserInfo(userInfo)
            .then((updateUser) => {
                setAuthUser(updateUser.data);
                closeAllPopups();
            })
            .catch(err => console.log('Ошибка: ' + err))
            .finally(() => setIsLoadingEditProfilePopup(false))
    }

    function handleEditProfileClick() {
        setIsOpenEditProfile(true);
    }

    function handleAddPlaceClick() {
        setIsOpenAddPlace(true);
    }

    function handleConfirmClick(card) {
        setSelectedCard(card);
        setIsOpenConfirm(true);
    }

    function openInfoTooltip(typeInfo, textInfo) {
        setIsOpenInfoTooltip(true);
        setObjectInfoTooltip({ typeInfo, textInfo });
    }

    function handleCardClick(card) {
        setIsOpenViewCard(true);
        setSelectedCard(card);
    }

    function closeAllPopups() {
        setIsOpenEditAvatar(false);
        setIsOpenEditProfile(false);
        setIsOpenAddPlace(false);
        setIsOpenViewCard(false);
        setIsOpenConfirm(false);
        setIsOpenInfoTooltip(false);
        setSelectedCard(null);
    }

    return (
        <CurrentUserContext.Provider value={{ authUser }}>
            <div className="root">
                <Header loggedIn={loggedIn} handleLogin={handleLogin} />
                <Routes>
                    <Route path="/" element={
                        <ProtectedRouter element={Main}
                            loggedIn={loggedIn}
                            cards={cards}
                            onCardLike={handleCardLike}
                            onCardDelete={handleConfirmClick}
                            onEditAvatar={handleEditAvatarClick}
                            onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick}
                            onCardClick={handleCardClick} />} />
                    <Route path="/sign-in" element={loggedIn ? <Navigate to="/" /> : <Login openInfoModal={openInfoTooltip} hadleLogin={handleLogin} />} />
                    <Route path="/sign-up" element={loggedIn ? <Navigate to="/" /> : <Register openInfoModal={openInfoTooltip} />} />
                    <Route path="*" element={<Navigate to='/' replace />} />
                </Routes>
                <Footer />
                <ConfirmPopup isOpen={isOpenConfirm}
                    isLoading={isLoadingConfirmPopup}
                    onConfirm={() => handleCardDelete(selectedCard)}
                    onClose={closeAllPopups} />
                <InfoTooltip isOpen={isOpenInfoTooltip}
                    onClose={closeAllPopups}
                    name={'info'}
                    typeInfo={objectInfoTooltip.typeInfo}
                    textInfo={objectInfoTooltip.textInfo}
                />
                <EditAvatarPopup isOpen={isOpenEditAvatar}
                    isLoading={isLoadingEditAvatarPopup}
                    onUpdateAvatar={handleUpdateAvatar}
                    onClose={closeAllPopups} />
                <EditProfilePopup isOpen={isOpenEditProfile}
                    isLoading={isLoadingEditProfilePopup}
                    onUpdateUser={handleUpdateUser}
                    onClose={closeAllPopups} />
                <AddPlacePopup isOpen={isOpenAddPlace}
                    isLoading={isLoadingAddPlacePopup}
                    onAddPlace={handleAddPlaceSubmit}
                    onClose={closeAllPopups} />
                <ImagePopup isOpen={isOpenViewCard}
                    name="view-card"
                    card={selectedCard}
                    onClose={closeAllPopups} />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
