import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Arrow from '../../assets/images/Icons/Arrow.svg';
import TrashIcon from '../../assets/images/Icons/DeleteIcon.svg';
import EditIcon from '../../assets/images/Icons/EditIcon.svg';
import Loader from '../../Components/Loader';
import ContactsService from '../../services/ContactsService';
import { compareTerms } from '../../utils/string';
import {
  Card, Container, Header, InputSearchContainer, ListHeader,
} from './styles';

const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const changeSearchTermHandler = (event) => setSearchTerm(event.target.value);
  useEffect(() => {
    const getContacts = async () => {
      setIsLoading(true);
      try {
        const contactsList = await ContactsService.listContacts(orderBy);
        setContacts(contactsList);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    getContacts();
  }, [orderBy]);
  const toggleOrderByHandler = () => {
    const orderByAsc = orderBy === 'asc';
    if (orderByAsc) {
      setOrderBy('desc');
      return;
    }
    setOrderBy('asc');
  };
  const filteredContacts = useMemo(() => (
    contacts.filter((contact) => compareTerms(contact.name, searchTerm))),
  [contacts, searchTerm]);
  const amoutContacts = filteredContacts.length;
  const amountEqualToOne = amoutContacts === 1;
  return (
    <Container>
      <Loader isLoading={isLoading} />
      <InputSearchContainer>
        <input type="text" value={searchTerm} placeholder="Pesquisar contato..." onChange={changeSearchTermHandler} />
      </InputSearchContainer>
      <Header>
        <strong>
          {amoutContacts}
          {amountEqualToOne ? ' contato' : ' contatos'}
        </strong>
        <Link to="/new">Novo contato</Link>
      </Header>
      {!!amoutContacts && (
        <ListHeader orderBy={orderBy}>
          <header>
            <button type="button" onClick={toggleOrderByHandler}>
              <span>Nome</span>
              <img src={Arrow} alt="Ordenar lista pelo nome" />
            </button>
          </header>
        </ListHeader>
      )}
      {filteredContacts.map((contact) => (
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
    </Container>
  );
};

export default Home;
