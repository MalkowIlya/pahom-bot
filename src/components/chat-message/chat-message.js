import React, {Component} from 'react';
import {compose} from 'redux';
import withChatService from '../hoc/with-chat-service';
import {connect} from 'react-redux';
import './chat-message.scss';
import {fetchReply, onChangeInput} from '../../actions';

class ChatMessage extends Component {
    componentDidMount() {
        console.log(this.props.inputMessage)
    }
    render() {
        const {name, posts, inputText} = this.props;

        const _onSubmit = (e) => {
            e.preventDefault();
            const idMessage = posts.length+1;
            const idReply = posts.length+2;
            this.props.fetchReply(inputText, name, idMessage, idReply);
        };
        const _onChange = (e) => {
            this.props.onChangeInput(e.target.value);
        };

        return (
            <div className="chat-message">
                <form action="">
                    <textarea name="message-to-send" id="message-to-send" value={inputText} onChange={_onChange} placeholder="Наберите ваше сообещние" rows="3" />
                    <button onClick={_onSubmit}>Отправить</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = ({name, posts, inputText}) => {
    return {
        name,
        posts,
        inputText,
    }
};
const mapDispatchToProps = (dispatch, ownProps) => {
    const {chatService} = ownProps;
    return {
        fetchReply: fetchReply(chatService, dispatch),
        onChangeInput: onChangeInput(dispatch)
    }
};

export default compose(
    withChatService(),
    connect(mapStateToProps, mapDispatchToProps)
)(ChatMessage)