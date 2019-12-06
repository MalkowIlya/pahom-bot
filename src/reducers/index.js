const initialState = {
    isLoggedIn: false,
    statusLoginButton: false,
    name: '',
    inputText: '',
    posts: [
        {
            id: 1,
            status: "human",
            text: "Привет! Что ты?",
        },
        {
            id: 2,
            status: "pahom",
            text: "Здравствуй! Я слабоумная, патриотическая, радиоактивная нейронная сеть Пахом ДП-10.  Со мной можно пообщаться на разные темы - от Путина до My little Pony. Но предупреждаю: я первая в мире нейронная сеть страдающая аутизмом и шизофренией (унаследовал от источника исследования - Дмитрия Пахомова aka 'Кровавого тирана' aka 'ДП-10' aka etc)",
        },
    ],
    loading: false,
    error: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        //Авторизация пользователя
        case 'USER_LOGGED_IN': {
            return {
                ...state,
                isLoggedIn: true,
            }
        }

        //Вввод имени в приложение
        case 'ON_CHANGE_NAME': {
            return {
                ...state,
                inputText: action.payload,
            }
        }
        //Добавление имени
        case 'SET_NAME': {
            return {
                ...state,
                inputText: '',
                name: action.payload,
            }
        }

        //Включить кнопку авторизации
        case 'ENABLE_LOGIN_BUTTON': {
            return {
                ...state,
                statusLoginButton: true,
            }
        }
        //Выключить кнопку авторизации
        case 'DISABLE_LOGIN_BUTTON': {
            return {
                ...state,
                statusLoginButton: false,
            }
        }


        //Заполнение формы сообщения
        case 'ON_CHANGE_INPUT': {
            return {
                ...state,
                inputText: action.payload
            }
        }

        //Очистка формы сообщения
        case 'ON_CLEAR_INPUT': {
            return {
                ...state,
                inputText: '',
            }
        }



        //Посты извелены из storage успешно
        case 'STORAGE_POST_SUCCESS': {
            console.log(action.payload);
            return {
                ...state,
                posts: action.payload,
                loading: false,
                error: null,
            }
        }

        //Ошибка получения запроса
        case 'FETCH_REPLY_FAILED': {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        }

        //Отправка запроса на сервер
        case 'FETCH_REPLY_REQUEST': {
            return {
                ...state,
                loading: true,
                error: null,
            }
        }
        //Записать отправляемое сообщение
        case 'CREATE_MESSAGE': {
            const message = action.payload;
            return {
                ...state,
                posts: [
                    ...state.posts,
                    message,
                ]
            }
        }
        //Записать полученный ответ
        case 'CREATE_REPLY': {
            const reply = action.payload;
            return {
                ...state,
                loading: false,
                posts: [
                    ...state.posts,
                    reply,
                ]
            }
        }

        default:
            return state;
    }
};

export default reducer;