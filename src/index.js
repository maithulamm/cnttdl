import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from '../src/components/GlobalStyles';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <React.StrictMode>
                <GlobalStyles>
                    <GoogleOAuthProvider clientId="998815737451-45o6unr9j5sfmt3bv8a52bfrr1oaf8gl.apps.googleusercontent.com">
                        <App />
                    </GoogleOAuthProvider>
                </GlobalStyles>
            </React.StrictMode>
        </PersistGate>
    </Provider>,
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
