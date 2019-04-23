import React, { Component } from 'reactn';
import { Link } from 'react-router-dom';
import SlateEditor from './SlateEditor';
import Loading from '../shared/Loading';
const single = require('../../helpers/docs/singleDoc');

class SingleDoc extends Component {
  componentDidMount() {
      const id = window.location.href.split('documents/')[1];
      single.loadSingle(id) 
  }
  render() {
      const { title, loading, autoSave } = this.global;
      if(loading) {
          return(
              <Loading />
          )
      } else {
        return (
            <div>
                <nav className="navbar primary-background" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <Link className="navbar-item" to={"/"}>
                            <i style={{color: "#fff", marginLeft: "10px"}} className="fas fa-arrow-left"></i>
                        </Link>
                    </div>
                    <button style={{color: "#fff"}} className="navbar-item button-link"><input className="input" value={title || "Untitled"} onChange={single.handleTitle} type="text" placeholder="Title..." /></button>
                    <button style={{color: "#fff"}} className="navbar-item button-link">{autoSave}</button>
                </nav>
    
                <SlateEditor />
            </div>
          );
      }
  }
}

export default SingleDoc;
