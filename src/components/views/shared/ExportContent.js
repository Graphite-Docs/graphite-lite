import React, { Component } from 'reactn';

class ExportContent extends Component {
    revealPrivateKey = () => {
      const key = JSON.parse(localStorage.getItem("graphite_keys")).GraphiteKeyPair.private;
      document.getElementById('key-container').innerHTML = `Private key: ${key}`;
  }
  render() {
      return (
        <div className="container padding-max">
         <h1>Graphite Lite now only supports IPFS storage</h1>
         <p className="margin-top-25">Due to sparse interest in other storage providers, Graphite Lite, the experiment formally packaged as part of the main Graphite product
             no longer supports storage providers other than IPFS. 
         </p>
         <p className="margin-top-25">Since you own your content but will be unable to view it or add to it in Graphite Lite, you will need your private key to decrypt the content and use it however you'd like. Click the button below to reveal your private key.</p>
         <button onClick={this.revealPrivateKey} className="button margin-top-25">Reveal Key</button>
         <h3 id="key-container"></h3>
        </div>
      );
  }
}

export default ExportContent;
