import React, { Component } from 'reactn';
import { deleteDoc } from '../../helpers/docs/docs';

class DeleteModal extends Component {

  closeModal = () => {
      const modal = document.getElementsByClassName("modal");
      modal[0].style.display = "none";
  }
  render() {
      const { doc } = this.props;
      return (
        <div>
            <div className="modal">
            <div onClick={this.closeModal} className="modal-background"></div>
            <div className="modal-content">
                <div className="box margin-top-200">
                    <h3>Delete {doc.title}?</h3>
                    <button onClick={() => deleteDoc(doc)} className="button is-danger">Delete</button><button onClick={this.closeModal} className="button is-light">Nope</button>
                </div>
            </div>
            <button onClick={this.closeModal} className="modal-close is-large" aria-label="close"></button>
            </div>
        </div>
      );
  }
}

export default DeleteModal;
