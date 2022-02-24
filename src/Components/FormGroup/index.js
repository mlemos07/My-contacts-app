import PropTypes from 'prop-types';
import { Container } from './styled';

const FormGroup = ({ children, isLoading, error }) => (
  <Container>
    <div className="form-item">
      {children}
      {isLoading && <div className="loader" />}
    </div>
    {error && <small>{error}</small>}
  </Container>
);

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
  isLoading: PropTypes.bool,
};

FormGroup.defaultProps = {
  error: null,
  isLoading: false,
};

export default FormGroup;
