import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Container, Footer, Overlay } from './styled';
import Button from '../Button';

const Modal = ({ danger }) => ReactDOM.createPortal(
  <Overlay>
    <Container danger={danger}>
      <h1>Tem certeza que deseja remover o contato ”Mateus Silva”?</h1>
      <p>Esta ação não poderá ser desfeita</p>
      <Footer>
        <button type="button" className="cancel-button">Cancelar</button>
        <Button type="button" danger={danger}>Deletar</Button>
      </Footer>
    </Container>
  </Overlay>,
  document.getElementById('modal-root'),
);

Modal.propTypes = {
  danger: PropTypes.bool,
};

Modal.defaultProps = {
  danger: false,
};

export default Modal;
