import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Container, Footer, Overlay } from './styled';
import Button from '../Button';

const Modal = ({
  cancelLabel,
  children,
  confirmLabel,
  danger,
  isLoading,
  title,
  visible,
  onCancel,
  onConfirm,
}) => {
  if (!visible) {
    return null;
  }
  return ReactDOM.createPortal(
    <Overlay>
      <Container danger={danger}>
        <h1>{title}</h1>
        <div className="modal-body">{children}</div>
        <Footer>
          <button type="button" className="cancel-button" onClick={onCancel} disabled={isLoading}>
            {cancelLabel}
          </button>
          <Button type="button" danger={danger} isLoading={isLoading} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </Footer>
      </Container>
    </Overlay>,
    document.getElementById('modal-root'),
  );
};

Modal.propTypes = {
  cancelLabel: PropTypes.string,
  children: PropTypes.node.isRequired,
  confirmLabel: PropTypes.string,
  danger: PropTypes.bool,
  isLoading: PropTypes.bool,
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  cancelLabel: 'Cancelar',
  confirmLabel: 'Confirmar',
  danger: false,
  isLoading: false,
};

export default Modal;
