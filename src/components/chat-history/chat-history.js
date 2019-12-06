import React, { Component } from 'react';
import ErrorIndicator from '../error-indicator/error-indicator';
import Spinner from '../spinner/spinner';
import {compose} from 'redux';
import {connect} from 'react-redux';
import withChatService from '../hoc/with-chat-service';
import './chat-history.scss';

class ChatHistory extends Component {

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    };

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {
        const {posts, loading, error, name} = this.props;

        const spinner = loading ? <Spinner /> : null;
        // const errorMessage = error ? <ErrorIndicator/> : null;

        if(error) {
            return <ErrorIndicator />
        }

        return (
            <div className="chat-history">
                <ul>
                    {
                        posts.map(function (post) {
                            return postList(post, name)
                        })
                    }
                    {spinner}
                    <div style={{float: "left", clear: "both"}}
                         ref={(el) => {
                             this.messagesEnd = el;
                         }}>
                    </div>
                </ul>
            </div>
        )
    }
}

const postList = (post, name) => {
    const {id, status, time, text} = post;
    if(status === "human") {
        return (
            <li className="chat-history-message" key={id}>
                <div className="message-data">
                    <span className="message-data-time">{time}</span> &nbsp; &nbsp;
                    <span className="message-data-name">{name}</span>
                </div>
                <div className="message my-message">
                    {text}
                </div>
            </li>
        )
    }
    return (
        <li key={id}>
            <div className="message-data">
                <span className="message-data-name">Пахом</span>
                <span className="message-data-time">{time}</span>
            </div>
            <div className="message other-message">
                {text}
            </div>
        </li>
    )
};

const mapStateToProps = ({posts, loading, error, name, inputText}) => {
    return {
        posts,
        loading,
        error,
        name,
        inputText
    }
};


export default compose(
    withChatService(),
    connect(mapStateToProps)
)(ChatHistory)


