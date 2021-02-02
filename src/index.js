import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import HttpsRedirect from 'react-https-redirect';

import './index.css';
import Routes from './routes/Routes';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
import authReducer from './store/reducers/auth';
import voteReducer from './store/reducers/vote';

const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    vote: voteReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <HttpsRedirect>
            <BrowserRouter>
                <Routes/>
            </BrowserRouter>
        </HttpsRedirect>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.register();
reportWebVitals();
