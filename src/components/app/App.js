import React, {Component} from 'react';
import Div100vh from 'react-div-100vh'
import {
    BrowserView,
    MobileView,
} from "react-device-detect";
import './app.scss';
import ChatHeader from '../chat-header/chat-header';
import ChatHistory from '../chat-history/chat-history';
import ChatMessage from '../chat-message/chat-message';
import ChatLogin from "../chat-login/chat-login";
import {compose} from "redux";
import withChatService from "../hoc/with-chat-service";
import {connect} from "react-redux";
import {checkStorage, setLocalStorageBeforeUnload} from '../../actions'


class App extends Component {

    componentDidMount() {
        this.props.checkStorage();
        window.addEventListener('beforeunload', this.handleWindowBeforeUnload);
    }


    handleWindowBeforeUnload = () => {
        const {name, posts} = this.props;
        this.props.setLocalStorageBeforeUnload(name, posts);
    };

    render() {
        const {isLoggedIn} = this.props;
        if(isLoggedIn === true) {
            console.log(isLoggedIn);
            return (
                <React.Fragment>
                    <BrowserView>
                        <div className="app">
                            <div className="chat">
                                <ChatHeader/>
                                <ChatHistory/>
                                <ChatMessage/>
                            </div>
                        </div>
                    </BrowserView>
                    <MobileView>
                        <Div100vh className="app">
                            <div className="chat">
                                <ChatHeader/>
                                <ChatHistory/>
                                <ChatMessage/>
                            </div>
                        </Div100vh>
                    </MobileView>
                </React.Fragment>
            )
        } else {
            console.log(isLoggedIn);
            return (
                <div className="app">
                    <div className="chat">
                        <ChatLogin/>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = ({isLoggedIn, name, posts}) => {
    return {
        name,
        posts,
        isLoggedIn,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        checkStorage: checkStorage(dispatch),
        setLocalStorageBeforeUnload: setLocalStorageBeforeUnload(dispatch)
    }
};

export default compose(
    withChatService(),
    connect(mapStateToProps, mapDispatchToProps)
)(App)


