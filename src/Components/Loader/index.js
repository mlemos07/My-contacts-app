import ReactDom from 'react-dom';
import { Overlay } from './styles';

const Loader = () => ReactDom.createPortal(
  <Overlay>
    <div className="loader" />
  </Overlay>,
  document.getElementById('loader-root'),
);

export default Loader;
