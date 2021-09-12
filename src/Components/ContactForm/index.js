import PropTypes from 'prop-types';
import FormGroup from '../FormGroup';
import Button from '../Button';
import Input from '../Input';
import Select from '../Select';
import { ButtonContainer, Form } from './style';

const ContactForm = ({ buttonLabel }) => (
  <Form>
    <FormGroup>
      <Input placeholder="Nome" />
    </FormGroup>
    <FormGroup error="O formato do e-mail é inválido.">
      <Input placeholder="E-mail" error />
    </FormGroup>
    <FormGroup>
      <Input placeholder="Telefone" />
    </FormGroup>
    <FormGroup>
      <Select>
        <option value="instagram">Instagram</option>
      </Select>
    </FormGroup>
    <ButtonContainer>
      <Button type="submit">{buttonLabel}</Button>
    </ButtonContainer>
  </Form>
);

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default ContactForm;
