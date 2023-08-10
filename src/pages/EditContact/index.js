import ContactForm from '../../Components/ContactForm';
import Loader from '../../Components/Loader';
import PageHeader from '../../Components/PageHeader';
import useEditContact from './useEditContact';

const EditContact = () => {
  const {
    isLoading, contactName, contactFormRef, handleSubmit,
  } = useEditContact();
  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader
        title={isLoading ? 'Carregando...' : `Editar ${contactName}`}
      />
      <ContactForm
        ref={contactFormRef}
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default EditContact;
