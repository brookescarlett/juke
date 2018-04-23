import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
// import rootReducer from './reducers/rootReducer.js'
import manageData from './reducers/manageData.js'

import * as firebase from 'firebase'



firebase.initializeApp(config)

const store = createStore(manageData)


ReactDOM.render(
  <Provider store={store}>
    <App store={store}/>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
