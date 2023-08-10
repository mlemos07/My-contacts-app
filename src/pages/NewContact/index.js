import ContactForm from '../../Components/ContactForm';
import PageHeader from '../../Components/PageHeader';
import useNewContact from './useNewContact';

const NewContact = () => {
  const { contactFormRef, handleSubmit } = useNewContact();
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
