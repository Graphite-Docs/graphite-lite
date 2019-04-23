import React, { Component } from 'reactn';
import logo from '../../images/graphite-mark.svg';
import { signIn } from '../../helpers/auth/handleAuth';

class SignIn extends Component {

  render() {
      return (
        <div className="padding-max color-white">
            <div className="columns">
                <div className="column">
                    <figure className="image is-96x96">
                        <img src={logo} alt="graphite logo" />
                    </figure>
                    <h1>Welcome to Graphite Lite</h1>
                    <p>As part of <a style={{color: "#fff", textDecoration: "underline"}} href="https://graphitedocs.com/labs" target="_blank" rel="noopener noreferrer">Graphite Labs</a>, Graphite Lite is an experiment in secure document editing with uPort and IPFS.</p>
                    <div className="margin-top-45">
                        <h3>Sign in with uPort</h3>
                        <button onClick={signIn} className="button uport-sign-in">Connect</button>
                    </div>
                </div>
            </div>
        </div>
      );
  }
}

export default SignIn;
