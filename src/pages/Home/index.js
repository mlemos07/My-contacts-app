import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card, Container, Header, InputSearchContainer, ListContainer,
} from './styles';
import Arrow from '../../assets/images/Icons/Arrow.svg';
import TrashIcon from '../../assets/images/Icons/DeleteIcon.svg';
import EditIcon from '../../assets/images/Icons/EditIcon.svg';

const Home = () => {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    const getContacts = async () => {
      const response = await fetch('http://localhost:3000/contacts');
      const json = await response.json();
      setContacts(json);
    };
    getContacts();
  }, []);
  const amoutContacts = contacts.length;
  const amountEqualToOne = amoutContacts === 1;
  return (
    <Container>
      <InputSearchContainer>
        <input type="text" placeholder="Pesquisar contato..." />
      </InputSearchContainer>
      <Header>
        <strong>
          {amoutContacts}
          {amountEqualToOne ? ' contato' : ' contatos'}
        </strong>
        <Link to="/new">Novo contato</Link>
      </Header>
      <ListContainer>
        <header>
          <button type="button">
            <span>Nome</span>
            <img src={Arrow} alt="Ordenar lista pelo nome" />
          </button>
        </header>
        {contacts.map((contact) => (
          <Card key={contact.id}>
            <div className="info">
              <div className="contact-name">
                <strong>{contact.name}</strong>
                <small>{contact.category.name}</small>
              </div>
              <span>{contact.email}</span>
              <span>{contact.phone}</span>
            </div>
            <div className="actions">
              <Link to={`/edit/${contact.id}`}>
                <img src={EditIcon} alt="Editar contato" />
              </Link>
              <button type="button">
                <img src={TrashIcon} alt="Deletar contato" />
              </button>
            </div>
          </Card>
        ))}
      </ListContainer>
    </Container>
  );
};

export default Home;
