import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import * as auth from '../utils/auth';
import api from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupDeleteImage from "./popupDeleteImage";
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [checkingRegistration, setCheckingRegistration] = useState(false);
    const [checkingHint, setCheckingHint] = useState(false);
    const [authorizationLogin, setAuthorizationLogin] = useState('');
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isPopupDeleteImageOpen, setIsPopupDeleteImageOpen] = useState(false);
    const [messageLoading, setMessageLoading] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [deleteId, setDeleteId] = useState('');

    const navigate = useHistory();

    useEffect(() => {
        if (isLoggedIn === true) {
            Promise.all([api.uploadUserInformation(), api.createInitialCards()])
                .then(([user, cards]) => {
                    setCurrentUser(user.user);
                    setCards(cards.reverse());
                })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`);
                });
        }
    }, [isLoggedIn]);

    const handleUpdateUser = (data) => {
        setMessageLoading(true);
        api.changeUserInformation(data)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
            .finally(() => {
                setMessageLoading(false);
            });
    };

    const handleUpdateAvatar = (data) => {
        setMessageLoading(true);
        api.changeAvatar(data)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
            .finally(() => {
                setMessageLoading(false);
            });
    };

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) =>
                    state.map((c) => (c._id === card._id ? newCard : c))
                );
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }

    const handleDelete = (cardId) => {
        setIsPopupDeleteImageOpen(!isPopupDeleteImageOpen);
        setDeleteId(cardId);
    };

    function handleCardDelete(cardId) {
        api.deleteImageCard(cardId)
            .then(() => {
                setCards((cards) => cards.filter((card) => card._id !== cardId));
                closeAllPopups()
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }

    const handleAddPlaceSubmit = (Data) => {
        setMessageLoading(true);
        api.newImageCard(Data)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
            .finally(() => {
                setMessageLoading(false);
            });
    };

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    };

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    };

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    };

    const handleInfoTooltip = () => {
        setCheckingHint(true);
    };

    const handleCardClick = (card) => {
        setSelectedCard(card);
    };

    const closeAllPopups = () => {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsPopupDeleteImageOpen(false);
        setCheckingHint(false);
        setSelectedCard({});
    };

    const processingRegistration = (data) => {
        return auth
            .userRegister(data)
            .then(() => {
                setCheckingRegistration(true);
                handleInfoTooltip();
                navigate.push('/sign-in');
            })
            .catch((err) => {
                console.log(err);
                setCheckingRegistration(false);
                handleInfoTooltip();
            });
    };

    const chekingLogOut = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('jwt');
        navigate.push('/sign-in');
    };

    const processingAuthorization = ({ email, password }) => {
        return auth
            .loginAuthorize({ email, password })
            .then((data) => {
                setIsLoggedIn(true);
                localStorage.setItem('jwt', data.token);
                setAuthorizationLogin(email);
                navigate.push('/');
            })
            .catch((err) => {
                console.log(err);
                handleInfoTooltip();
            });
    };

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (!jwt) {
            return;
        }
        auth
            .getToken(jwt)
            .then((res) => {
                if (res){
                    setAuthorizationLogin(res.user.email);
                    setIsLoggedIn(true);
                }
               
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        if (isLoggedIn === true) {
            navigate.push("/");
        }
    }, [isLoggedIn, navigate]);

    useEffect(() => {
        if (isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard) {
            function handleEsc(evt) {
                if (evt.key === 'Escape') {
                    closeAllPopups();
                }
            }
            document.addEventListener('keydown', handleEsc);
            return () => {
                document.removeEventListener('keydown', handleEsc);
            }
        }
    }, [isEditAvatarPopupOpen, isEditProfilePopupOpen, isAddPlacePopupOpen, selectedCard]);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">

                <Header
                    loggedIn={isLoggedIn}
                    loginEmail={authorizationLogin}
                    onSignOut={chekingLogOut}
                />

                <Switch>
                    <Route path="/sign-in">
                        <Login onLogin={processingAuthorization} />
                    </Route>

                    <Route path="/sign-up">
                        <Register onRegister={processingRegistration} />
                    </Route>

                    <Route path="/">
                        <ProtectedRoute
                            component={Main}
                            isLoggedIn={isLoggedIn}
                            onEditAvatar={handleEditAvatarClick}
                            onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick}
                            onCardClick={handleCardClick}
                            cards={cards}
                            onCardLike={handleCardLike}
                            onCardDeleteClick={handleDelete}
                        />
                        <Footer />
                    </Route>
                </Switch>

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                    onMessage={messageLoading}
                />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    onMessage={messageLoading}
                />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                    onMessage={messageLoading}
                />

                <PopupDeleteImage
                    isOpen={isPopupDeleteImageOpen}
                    onClose={closeAllPopups}
                    onMessage={messageLoading}
                    handleSubmit={handleCardDelete}
                    card={deleteId}
                />

                <InfoTooltip
                    onClose={closeAllPopups}
                    isOpen={checkingHint}
                    passedSuccess={checkingRegistration}
                />

                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;