import { Container, InputSearchContainer } from './styles';
import logo from '../../assets/images/logo.svg';

const Header = () => (
  <Container>
    <img src={logo} alt="Logo my contacts" width="200px" />
    <InputSearchContainer>
      <input type="text" placeholder="Pesquisar contato..." />
    </InputSearchContainer>
  </Container>
);

export default Header;
