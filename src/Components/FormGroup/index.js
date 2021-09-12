import PropTypes from 'prop-types';
import { Container } from './styled';

const FormGroup = ({ children }) => (
  <Container>
    {children}
  </Container>
);

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FormGroup;
