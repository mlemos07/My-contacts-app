import PropTypes from 'prop-types';
import { StyledSpinner } from './styles';

const Spinner = ({ size }) => <StyledSpinner size={size} />;

Spinner.propTypes = {
  size: PropTypes.number,
};

Spinner.defaultProps = {
  size: 32,
};

export default Spinner;
