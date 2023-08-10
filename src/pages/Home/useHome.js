import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import ContactsService from '../../services/ContactsService';
import { compareTerms } from '../../utils/string';
import toast from '../../utils/toast';

const useHome = () => {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const changeSearchTermHandler = (event) => setSearchTerm(event.target.value);
  const getContacts = useCallback(async () => {
    setIsLoading(true);
    try {
      const contactsList = await ContactsService.listContacts(orderBy);
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
  const filteredContacts = useMemo(
    () => contacts.filter((contact) => compareTerms(contact.name, searchTerm)),
    [contacts, searchTerm],
  );
  const handleDeleteContact = (contact) => {
    setContactBeingDeleted(contact);
    setIsDeleteModalVisible(true);
  };
  const handleCloseDeleteModal = () => {
    setContactBeingDeleted(null);
    setIsDeleteModalVisible(false);
  };
  const handleConfirmDeleteContact = async () => {
    try {
      setIsLoadingDelete(true);
      await ContactsService.deleteContact(contactBeingDeleted.id);
      setContacts((prevState) => prevState.filter(
        (contact) => contact.id !== contactBeingDeleted.id,
      ));
      handleCloseDeleteModal();
      toast({ type: 'success', text: 'Contato deletado com sucesso.' });
    } catch {
      toast({ type: 'danger', text: 'Ocorreu um erro ao deletar contato.' });
    } finally {
      setIsLoadingDelete(false);
    }
  };
  const amoutContacts = filteredContacts.length;
  const amountEqualToOne = amoutContacts === 1;
  const thereIsContactRegistered = contacts.length > 0;
  const contactNotFoundByTerm = !hasError
  && thereIsContactRegistered && filteredContacts.length === 0;
  return {
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
  };
};

export default useHome;
