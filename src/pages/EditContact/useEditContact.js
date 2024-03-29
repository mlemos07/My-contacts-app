import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';
import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';

const useEditContact = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');
  const contactFormRef = useRef(null);
  const { id } = useParams();
  const history = useHistory();
  const safeAsyncAction = useSafeAsyncAction();
  useEffect(() => {
    const loadContact = async () => {
      try {
        const contactData = await ContactsService.getContactById(id);
        safeAsyncAction(() => {
          contactFormRef.current.setFieldValues(contactData);
          setContactName(contactData.name);
          setIsLoading(false);
        });
      } catch {
        safeAsyncAction(() => {
          history.push('/');
          toast({
            type: 'danger',
            text: 'Contato não encontrado.',
          });
        });
      }
    };
    loadContact();
  }, [id, history, safeAsyncAction]);
  const handleSubmit = async (contact) => {
    try {
      await ContactsService.updateContact(id, contact);
      setContactName(contact.name);
      toast({ type: 'success', text: 'Contato editado com sucesso.' });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao editar o contato.',
      });
    }
  };
  return {
    isLoading,
    contactName,
    contactFormRef,
    handleSubmit,
  };
};

export default useEditContact;
