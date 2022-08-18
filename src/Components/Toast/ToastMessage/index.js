import PropTypes from 'prop-types';
import { Container } from './styles';
import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';

const ToastMessage = ({ text, type }) => (
  <Container type={type}>
    {type === 'danger' && <img src={xCircleIcon} alt="x" />}
    {type === 'success' && <img src={checkCircleIcon} alt="x" />}
    <strong>{text}</strong>
  </Container>
);

ToastMessage.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['default', 'success', 'danger']),
};

ToastMessage.defaultProps = {
  type: 'default',
};

export default ToastMessage;
