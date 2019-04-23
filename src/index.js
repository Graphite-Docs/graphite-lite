import React, { setGlobal } from 'reactn';
import { Value } from 'slate';
import initialValue from './components/helpers/docs/initialValue.json';
import ReactDOM from 'react-dom';
import './App.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

setGlobal({
    content: Value.fromJSON(initialValue), 
    title: "",
    docs: [],
    filteredDocs: [], 
    singleDoc: {},
    loading: false,
    signedIn: false, 
    autoSave: "Saved"
})

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
