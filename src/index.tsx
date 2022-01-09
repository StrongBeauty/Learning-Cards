import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './la-3-main/m-2-bll/store';
import App from './la-3-main/m-1-ui/App';


ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
