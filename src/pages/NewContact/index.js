import Input from '../../Components/Input';
import PageHeader from '../../Components/PageHeader';
import Select from '../../Components/Select';

const NewContact = () => (
  <>
    <PageHeader title="Novo contato" />
    <Input type="text" placeholder="Nome" />
    <Select>
      <option value="test1">test1</option>
    </Select>
  </>
);

export default NewContact;
