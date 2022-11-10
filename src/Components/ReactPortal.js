import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const ReactPortal = ({ containerId, children }) => {
  let container = document.getElementById(containerId);
  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', containerId);
    document.body.appendChild(container);
  }
  return ReactDOM.createPortal(children, container);
};

ReactPortal.PropTypes = {
  containerId: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ReactPortal;
