/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-nested-ternary */
import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { Link } from 'react-router-dom';
import Arrow from '../../assets/images/Icons/Arrow.svg';
import TrashIcon from '../../assets/images/Icons/DeleteIcon.svg';
import EditIcon from '../../assets/images/Icons/EditIcon.svg';
import sad from '../../assets/images/sad.svg';
import emptyBox from '../../assets/images/empty-box.svg';
import magnifierQuestion from '../../assets/images/magnifier-question.svg';
import Button from '../../Components/Button';
import Loader from '../../Components/Loader';
import ContactsService from '../../services/ContactsService';
import { compareTerms } from '../../utils/string';
import {
  Card,
  Container,
  ErrorContainer,
  EmptyListContainer,
  Header,
  InputSearchContainer,
  ListHeader,
  SearchNotFoundContainer,
} from './styles';

const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const changeSearchTermHandler = (event) => setSearchTerm(event.target.value);
  const getContacts = useCallback(async () => {
    setIsLoading(true);
    try {
      const contactsList = await ContactsService.listContacts(orderBy);
      // const contactsList = [];
      setHasError(false);
      setContacts(contactsList);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);
  useEffect(() => {
    getContacts();
  }, [getContacts]);
  const toggleOrderByHandler = () => {
    const orderByAsc = orderBy === 'asc';
    if (orderByAsc) {
      setOrderBy('desc');
      return;
    }
    setOrderBy('asc');
  };
  const tryAgainHandler = () => getContacts();
  const filteredContacts = useMemo(() => (
    contacts.filter((contact) => compareTerms(contact.name, searchTerm))),
  [contacts, searchTerm]);
  const amoutContacts = filteredContacts.length;
  const amountEqualToOne = amoutContacts === 1;
  const thereIsContactRegistered = contacts.length > 0;
  const contactNotFoundByTerm = !hasError
    && thereIsContactRegistered
    && filteredContacts.length === 0;
  return (
    <Container>
      <Loader isLoading={isLoading} />
      {thereIsContactRegistered && (
        <InputSearchContainer>
          <input type="text" value={searchTerm} placeholder="Pesquisar contato..." onChange={changeSearchTermHandler} />
        </InputSearchContainer>
      )}
      <Header justifyContent={
        hasError
          ? 'flex-end'
          : (
            thereIsContactRegistered
              ? 'space-between'
              : 'center'
          )
      }
      >
        {(!hasError && thereIsContactRegistered) && (
          <strong>
            {amoutContacts}
            {amountEqualToOne ? ' contato' : ' contatos'}
          </strong>
        )}
        <Link to="/new">Novo contato</Link>
      </Header>
      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="Ocorreu um erro." />
          <div className="details">
            <strong>Ocorreu um erro ao obter os seus contatos.</strong>
            <Button type="button" onClick={tryAgainHandler}>Tentar novamente</Button>
          </div>
        </ErrorContainer>
      )}
      {contactNotFoundByTerm && (
        <SearchNotFoundContainer>
          <img src={magnifierQuestion} alt="Contato pesquisado n??o encontrado" />
          <span>Nenhum resultado foi encontrado para <strong>{searchTerm}</strong>.</span>
        </SearchNotFoundContainer>
      )}
      {(!hasError && !isLoading) && (
        <>
          {thereIsContactRegistered ? (
            <>
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
            </>
          ) : (
            <EmptyListContainer>
              <img src={emptyBox} alt="Nenhum contato cadastrado" />
              <p>Voc?? ainda n??o tem nenhum contato cadastrado!
                Clique no bot??o <strong>???Novo contato???</strong> ?? cima para
                cadastrar o seu primeiro!
              </p>
            </EmptyListContainer>
          )}
        </>
      )}
    </Container>
  );
};

export default Home;
