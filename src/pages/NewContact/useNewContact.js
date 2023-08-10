import { useRef } from 'react';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

const useNewContact = () => {
  const contactFormRef = useRef(null);
  const handleSubmit = async (contact) => {
    try {
      await ContactsService.createContact(contact);
      contactFormRef.current.resetField();
      toast({ type: 'success', text: 'Contato criado com sucesso.' });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao cadastrar o contato.',
      });
    }
  };
  return { contactFormRef, handleSubmit };
};

export default useNewContact;
