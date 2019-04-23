import React, { Component } from 'reactn';
import Nav from '../shared/Nav';
import Table from './Table';
import { loadIPFS } from '../../helpers/storage/loadData';
import { newDoc } from '../../helpers/docs/docs';
import Loading from '../shared/Loading';
class Docs extends Component {
  componentDidMount() {
    loadIPFS();
  }
  render() {
      const { docs, loading } = this.global;
      if(loading) {
          return (
              <Loading />
          )
      } else {
        return (
            <div>
             <Nav />
             <div className="container margin-top-65">
                <h3 className="margin-bottom-25">Documents ({docs.length})<span className="margin-left-10"><button onClick={newDoc} className="button doc-button">New Doc</button></span></h3>
                <Table />
             </div>
            </div>
          );
      }
  }
}

export default Docs;
