import { Link } from 'react-router-dom';
import {
  Card, Container, Header, InputSearchContainer, ListContainer,
} from './styles';
import Arrow from '../../assets/images/Icons/Arrow.svg';
import EditIcon from '../../assets/images/Icons/EditIcon.svg';
import TrashIcon from '../../assets/images/Icons/DeleteIcon.svg';
import Modal from '../../Components/Modal';

const Home = () => (
  <Container>
    <Modal danger />
    <InputSearchContainer>
      <input type="text" placeholder="Pesquisar contato..." />
    </InputSearchContainer>
    <Header>
      <strong>3 contatos</strong>
      <Link to="/new">Novo contato</Link>
    </Header>
    <ListContainer>
      <header>
        <button type="button">
          <span>Nome</span>
          <img src={Arrow} alt="Ordenar lista pelo nome" />
        </button>
      </header>
      <Card>
        <div className="info">
          <div className="contact-name">
            <strong>Marianna Lemos</strong>
            <small>Instagram</small>
          </div>
          <span>Marianalemos07@hotmail.com</span>
          <span>(41) 99999-9999</span>
        </div>
        <div className="actions">
          <Link to="/edit/vbdgfv">
            <img src={EditIcon} alt="Editar contato" />
          </Link>
          <button type="button">
            <img src={TrashIcon} alt="Deletar contato" />
          </button>
        </div>
      </Card>
    </ListContainer>
  </Container>
);

export default Home;
