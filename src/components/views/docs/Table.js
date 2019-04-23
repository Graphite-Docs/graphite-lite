import React, { Component } from 'reactn';
import { Link } from 'react-router-dom';
import Modal from './DeleteModal';

class Table extends Component {
  constructor(props) {
      super(props);
      this.state = {
          doc: {}
        }
  }

  openModal = (doc) => {
    this.setState({ doc });
    document.getElementsByClassName('modal')[0].style.display = "block";
  }

  render() {
      const { docs } = this.global;
      let docsOrdered = docs.sort(function(a, b){
        return b.lastUpdate > a.lastUpdate;
     });
      return (
        <div>
        <table className="table is-fullwidth">
        <thead>
            <tr>
                <th>Title</th>
                <th>Last Updated</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {docsOrdered.map(doc => {
                return (
                    <tr key={doc.id}>
                        <td><Link to={`/documents/${doc.id}`}>{doc.title}</Link></td>
                        <td>{doc.updated}</td>
                        <td><button onClick={() => this.openModal(doc)} className="button delete-button"><i className="far fa-trash-alt"></i></button></td>
                    </tr>
                )
            })}
        </tbody>
        </table>
        <Modal doc={this.state.doc} />
        </div>
      );
  }
}

export default Table;
