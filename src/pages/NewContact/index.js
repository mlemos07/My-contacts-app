import ContactForm from '../../Components/ContactForm';
import PageHeader from '../../Components/PageHeader';
import ContactsService from '../../services/ContactsService';

const NewContact = () => {
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
    } catch {}
  };
  return (
    <>
      <PageHeader title="Novo contato" />
      <ContactForm buttonLabel="Cadastrar" onSubmit={handleSubmit} />
    </>
  );
};

export default NewContact;
