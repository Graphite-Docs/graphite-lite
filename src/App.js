import React, { Component, setGlobal } from 'reactn';
import {Route, BrowserRouter } from 'react-router-dom';
import Docs from './components/views/docs/Docs';
import SingleDoc from './components/views/docs/SingleDoc';
import SignIn from './components/views/auth/SignIn';
import ExportContent from './components/views/shared/ExportContent';

class App extends Component {
  componentDidMount() {
    if(localStorage.getItem('profileFound')) {
      setGlobal({ signedIn: true });
      document.body.style.background = "#fff";
    } else {
      document.body.style.background = "#827cff";
    }
  }
  render() {
    const { signedIn, nonIPFS } = this.global;
    if(signedIn) {
      if(nonIPFS) {
        return (
          <ExportContent />
        )
      } else {
        return (
          <div>
            <BrowserRouter>
              <div>
                <Route exact path='/' component={Docs} />
                <Route exact path='/documents/:id' component={SingleDoc} />
              </div>
            </BrowserRouter>
          </div>
        );
      }
    } else {
      return (
        <div>
        <BrowserRouter>
          <div>
            <Route path='/' component={SignIn} />
          </div>
        </BrowserRouter>
      </div>
      )
    }
  }
}

export default App;
