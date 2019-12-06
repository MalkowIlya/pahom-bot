import React, {Component} from 'react';
import {compose} from "redux";
import {connect} from 'react-redux';
import './chat-login.scss';
import withChatService from "../hoc/with-chat-service";
import {onChangeName, checkStorage, createLocalStorageData} from "../../actions";


class ChatLogin extends Component {

    render() {
        const {inputText, statusLoginButton} = this.props;

        const _onSubmit = (e) => {
            e.preventDefault();
            this.props.createLocalStorageData(inputText)
        };
        const _onChange = (e) => {
            this.props.onChangeName(e.target.value)
        };

        return (
            <div className="chat-login">
                <div className="login-description">
                    <h1 className="description-title">Бот Пахом</h1>
                    <p>Бот Пахом это совершенно новое слово в Digital среде мира Data Since! Бот представляет из себя самый совершенный Artificial Intelligence в мире состоящий из огромных массивов Big Data, собранных с помощью кропотливой работы Computer Vision и Machine Learning, построенных на базе нашей собственной Neural Network.</p>
                    <p>Благодаря современным подходам в Iterative Deepening Depth-First Search (IDDFS) обеспечена максимальная Big Data Veracity наших данных.</p>
                    <p>Чтобы бот эволюционировал не только в знаниях, но и в умениях были применены последние Know-How в области AutoML.</p>
                </div>
                <form action="">
                    <input type="text" onChange={_onChange} placeholder="Ваш никнейм" required/>
                    <button onClick={_onSubmit} disabled={!statusLoginButton}>ОК</button>
                </form>
            </div>
        )
    }
}


const mapStateToProps = ({inputText, statusLoginButton}) => {
    return {
        inputText,
        statusLoginButton,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeName: onChangeName(dispatch),
        checkStorage: checkStorage(dispatch),
        createLocalStorageData: createLocalStorageData(dispatch),
    }
};

export default compose(
    withChatService(),
    connect(mapStateToProps, mapDispatchToProps)
)(ChatLogin)