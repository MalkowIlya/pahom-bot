import React, {Component} from 'react';
import './chat-header.scss';
import Logo from '../../style/img/logo.jpg'
import {compose} from "redux";
import withChatService from "../hoc/with-chat-service";
import {connect} from "react-redux";

class ChatHeader extends Component {


    declOfNum = (number) => {
        const cases = [2, 0, 1, 1, 1, 2];
        const titles = ['сообщений', 'сообщения', 'сообщений'];
        return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    };

    render() {
        const {posts} = this.props;

        return (
            <div className="chat-header">
                <img src={Logo} className="chat-logo" alt="avatar"/>
                <div className="chat-about">
                    <div className="chat-with">Чат с Пахомом</div>
                    <div className="chat-num-messages">{'В чате уже ' + posts.length + ' ' + this.declOfNum(posts.length)}</div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({posts}) => {
    return {
        posts,
    }
};

export default compose(
    withChatService(),
    connect(mapStateToProps)
)(ChatHeader)