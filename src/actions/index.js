//Проверка наличия старых данных в localStorage, при наличии записать с state
const checkStorage = (dispatch) => () => {
    const data = localStorage.getItem("data");
    if(data) {
        const encodeData = JSON.parse(data);
        dispatch(setName(encodeData.name));
        dispatch(postLoaded(encodeData.posts));
        dispatch(loggedIn());
    }
};

//Изменить состояние авторизации
const loggedIn = () => {
    return {
        type: 'USER_LOGGED_IN'
    }
};

//Создать новые данные в localStorage и записать их в state
const createLocalStorageData = (dispatch) => (inputText) => {
    const data = {
        name: inputText,
        posts: [],
    };
    const serialData = JSON.stringify(data);
    localStorage.setItem('data', serialData);
    dispatch(setName(inputText));
    dispatch(loggedIn());
};

//Отслеживание изменение имени в форме
const onChangeName = (dispatch) => (value) => {
    console.log(value);
    dispatch(changeName(value));
    if(value.length >= 3) {
        dispatch(enableLoginButton());
    } else {
        dispatch(disableLoginButton())
    }
};
//Отслеживание формы имени
const changeName = (value) => {
    return {
        type: 'ON_CHANGE_NAME',
        payload: value,
    }
};
//Установить имя в приложении
const setName = (name) => {
    return {
        type: 'SET_NAME',
        payload: name,
    }
};
//Включить кнопку авторизации
const enableLoginButton = () => {
    return {
        type: 'ENABLE_LOGIN_BUTTON',
    }
};
//Выключить кнопку авторизации
const disableLoginButton = () => {
    return {
        type: 'DISABLE_LOGIN_BUTTON',
    }
};


//Сохранить имя и переписку в localStorage перед закрытием окна
const setLocalStorageBeforeUnload = (dispatch) => (name, posts) => {
    const data = {
        name,
        posts,
    };
    if (name) {
        localStorage.setItem('data', JSON.stringify(data));
    }
};


//Отслеживание формы сообщения
const onChangeInput = (dispatch) => (value) => {
    console.log(value);
    dispatch(changeInput(value));
};
const changeInput = (value) => {
    return {
        type: 'ON_CHANGE_INPUT',
        payload: value
    }
};

//Очистка формы после нажатия кнопки отправить
const clearInput = () => {
    return {
        type: 'ON_CLEAR_INPUT',
    }
};

//Данные из localStorage извлечены, записать в state
const postLoaded = (answer) => {
    return {
        type: 'STORAGE_POST_SUCCESS',
        payload: answer,
    }
};

//Ошибка получения запроса
const createError = (error) => {
    return {
        type: 'FETCH_REPLY_FAILED',
        payload: error,
    }
};

//Запрос отправлен, включена загрузка
const replyRequested = () => {
    return {
        type: 'FETCH_REPLY_REQUEST'
    }
};

//Создать сообщение отправленное пользователем
const createMessage = (message, idMessage) => {
    const payload = {
        id: idMessage,
        status: "human",
        text: message
    };
    return {
        type: 'CREATE_MESSAGE',
        payload,
    }
};

//Ответ получен, записать ответ и выключить загрузку
const createReply = (reply, idReply) => {
    const payload = {
        id: idReply,
        status: "pahom",
        text: reply
    };
    return {
        type: 'CREATE_REPLY',
        payload,
    }
};

const fetchReply = (chatService, dispatch) => (message, author, idMessage, idReply) => {
    dispatch(replyRequested());
    dispatch(createMessage(message, idMessage));
    chatService.getReply(message, author)
        .then((data) => {
            console.log(data);
            dispatch(createReply(data.reply, idReply))
        })
        .catch((err) => dispatch(createError(err)));
    dispatch(clearInput());
};

export {
    onChangeInput,
    fetchReply,
    onChangeName,
    checkStorage,
    createLocalStorageData,
    setLocalStorageBeforeUnload,
}