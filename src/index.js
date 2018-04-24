import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
// import rootReducer from './reducers/rootReducer.js'
import manageData from './reducers/manageData.js'

import * as firebase from 'firebase'

var config = {
  apiKey: "AIzaSyBB6SOCalypw6mM1T_x98cXfJ1ASPKArlI",
  authDomain: "testing-firebase-47b58.firebaseapp.com",
  databaseURL: "https://testing-firebase-47b58.firebaseio.com",
  projectId: "testing-firebase-47b58",
  storageBucket: "testing-firebase-47b58.appspot.com",
  messagingSenderId: "186137424174"
}

firebase.initializeApp(config)

const store = createStore(manageData, applyMiddleware(thunk))


ReactDOM.render(
  <Provider store={store}>
    <App store={store}/>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
