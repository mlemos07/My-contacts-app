import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { Container } from './styles';
import Arrow from '../../assets/images/Icons/Arrow.svg';

const PageHeader = ({ title }) => (
  <Container>
    <Link to="/">
      <img src={Arrow} alt="Go to back" />
      <span>Voltar</span>
    </Link>
    <h1>{title}</h1>
  </Container>
);

PageHeader.propTypes = {
  title: propTypes.string.isRequired,
};

export default PageHeader;
