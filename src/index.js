import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

  import { Provider } from 'react-redux';
  import { createStore, applyMiddleware, compose} from 'redux';
  import thunkMiddleware from 'redux-thunk';
  import reducers from './requests/reducers';
  import { getUsers } from './requests/actions/users';
  
  const store = createStore(reducers, compose(applyMiddleware(thunkMiddleware)))
  store.dispatch(getUsers())
  
  
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <Provider store={store}>
        <App />
    </Provider>
    // <React.StrictMode>
        
    // </React.StrictMode>
  );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
