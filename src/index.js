import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ErrorBoundary from './components/error-boundary/error-boundary';
import ChatService from './services/chat-service';
import { ChatServiceProvider } from './components/chat-context/chat-context';
import store from './store';
import App from './components/app/App';


const chatService = new ChatService();
ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundary>
            <ChatServiceProvider value={chatService}>
                <App />
            </ChatServiceProvider>
        </ErrorBoundary>
    </Provider>,
    document.getElementById('root'));

