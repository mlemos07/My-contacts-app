import { Container } from './styles';
import logo from '../../assets/images/logo.svg';

const Header = () => (
  <Container>
    <img src={logo} alt="Logo my contacts" width="200px" />
  </Container>
);

export default Header;
