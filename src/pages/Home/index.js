/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-nested-ternary */
import { Link } from 'react-router-dom';
import Arrow from '../../assets/images/icons/Arrow.svg';
import TrashIcon from '../../assets/images/icons/DeleteIcon.svg';
import EditIcon from '../../assets/images/icons/EditIcon.svg';
import sad from '../../assets/images/sad.svg';
import emptyBox from '../../assets/images/empty-box.svg';
import magnifierQuestion from '../../assets/images/magnifier-question.svg';
import Button from '../../Components/Button';
import Modal from '../../Components/Modal';
import Loader from '../../Components/Loader';
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
import useHome from './useHome';

const Home = () => {
  const {
    isLoading,
    isDeleteModalVisible,
    isLoadingDelete,
    contactBeingDeleted,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
    thereIsContactRegistered,
    searchTerm,
    changeSearchTermHandler,
    hasError,
    amoutContacts,
    amountEqualToOne,
    tryAgainHandler,
    contactNotFoundByTerm,
    orderBy,
    filteredContacts,
    handleDeleteContact,
    toggleOrderByHandler,
  } = useHome();
  return (
    <Container>
      <Loader isLoading={isLoading} />
      <Modal
        danger
        visible={isDeleteModalVisible}
        isLoading={isLoadingDelete}
        title={`Tem certeza que deseja remover o contato ”${contactBeingDeleted?.name}”?`}
        confirmLabel="Deletar"
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteContact}
      >
        <p>Esta ação não poderá ser desfeita</p>
      </Modal>
      {thereIsContactRegistered && (
        <InputSearchContainer>
          <input
            type="text"
            value={searchTerm}
            placeholder="Pesquisar contato..."
            onChange={changeSearchTermHandler}
          />
        </InputSearchContainer>
      )}
      <Header
        justifyContent={
          hasError
            ? 'flex-end'
            : thereIsContactRegistered
              ? 'space-between'
              : 'center'
        }
      >
        {!hasError && thereIsContactRegistered && (
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
            <Button type="button" onClick={tryAgainHandler}>
              Tentar novamente
            </Button>
          </div>
        </ErrorContainer>
      )}
      {contactNotFoundByTerm && (
        <SearchNotFoundContainer>
          <img
            src={magnifierQuestion}
            alt="Contato pesquisado não encontrado"
          />
          <span>
            Nenhum resultado foi encontrado para <strong>{searchTerm}</strong>.
          </span>
        </SearchNotFoundContainer>
      )}
      {!hasError && !isLoading && (
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
                    <button
                      type="button"
                      onClick={() => handleDeleteContact(contact)}
                    >
                      <img src={TrashIcon} alt="Deletar contato" />
                    </button>
                  </div>
                </Card>
              ))}
            </>
          ) : (
            <EmptyListContainer>
              <img src={emptyBox} alt="Nenhum contato cadastrado" />
              <p>
                Você ainda não tem nenhum contato cadastrado! Clique no botão{' '}
                <strong>”Novo contato”</strong> à cima para cadastrar o seu
                primeiro!
              </p>
            </EmptyListContainer>
          )}
        </>
      )}
    </Container>
  );
};

export default Home;
