import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import { Overlay } from './styles';

const Loader = ({ isLoading }) => {
  if (!isLoading) {
    return null;
  }
  return ReactDom.createPortal(
    <Overlay>
      <div className="loader" />
    </Overlay>,
    document.getElementById('loader-root'),
  );
};

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default Loader;
