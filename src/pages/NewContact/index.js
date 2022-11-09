import { useRef } from 'react';
import ContactForm from '../../Components/ContactForm';
import PageHeader from '../../Components/PageHeader';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

const NewContact = () => {
  const contactFormRef = useRef(null);
  const handleSubmit = async ({
    name, email, phone, categoryId,
  }) => {
    try {
      const contact = {
        name,
        email,
        phone,
        category_id: categoryId,
      };
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
  return (
    <>
      <PageHeader title="Novo contato" />
      <ContactForm
        ref={contactFormRef}
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default NewContact;
