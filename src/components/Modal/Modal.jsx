import { Component } from 'react';
import { createPortal } from 'react-dom';

const portalRef = document.getElementById('portal');

class Modal extends Component {
  constructor() {
    super();
    this.onEscButtonClose = e => {
      if (e.code === 'Escape') {
        this.props.closeModal();
      }
    };
  }

  onOverlayClick = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onEscButtonClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscButtonClose);
  }

  render() {
    const { imgSrc, label } = this.props;
    return createPortal(
      <div className="Overlay" onClick={this.onOverlayClick}>
        <div className="Modal">
          <img src={imgSrc} alt={label} />
        </div>
      </div>,
      portalRef
    );
  }
}

export default Modal;
