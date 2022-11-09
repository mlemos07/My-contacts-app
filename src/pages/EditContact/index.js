import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import PageHeader from '../../Components/PageHeader';
import ContactForm from '../../Components/ContactForm';
import ContactsService from '../../services/ContactsService';
import Loader from '../../Components/Loader';
import toast from '../../utils/toast';

const EditContact = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');
  const contactFormRef = useRef(null);
  const { id } = useParams();
  const history = useHistory();
  useEffect(() => {
    const loadContact = async () => {
      try {
        const contactData = await ContactsService.getContactById(id);
        contactFormRef.current.setFieldValues(contactData);
        setContactName(contactData.name);
        setIsLoading(false);
      } catch {
        history.push('/');
        toast({
          type: 'danger',
          text: 'Contato não encontrado.',
        });
      }
    };
    loadContact();
  }, [id, history]);
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
      await ContactsService.updateContact(id, contact);
      setContactName(name);
      toast({ type: 'success', text: 'Contato editado com sucesso.' });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao editar o contato.',
      });
    }
  };
  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader title={isLoading ? 'Carregando...' : `Editar ${contactName}`} />
      <ContactForm
        ref={contactFormRef}
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default EditContact;
