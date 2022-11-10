import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import { StyledButton } from './styles';

const Button = ({
  type, danger, disabled, isLoading, children, onClick,
}) => (
  <StyledButton
    type={type}
    danger={danger}
    disabled={disabled || isLoading}
    onClick={onClick}
  >
    {isLoading ? <Spinner size={16} /> : children}
  </StyledButton>
);

Button.propTypes = {
  type: PropTypes.string,
  danger: PropTypes.bool,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'button',
  disabled: false,
  isLoading: false,
  danger: false,
  onClick: undefined,
};

export default Button;
