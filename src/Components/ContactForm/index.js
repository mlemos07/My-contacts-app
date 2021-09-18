import PropTypes from 'prop-types';
import { useState } from 'react';
import FormGroup from '../FormGroup';
import Button from '../Button';
import Input from '../Input';
import Select from '../Select';
import { ButtonContainer, Form } from './style';
import isValidEmail from '../../utils/isValidEmail';
import useErrors from '../../hooks/useErrors';

const ContactForm = ({ buttonLabel }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const { setError, removeError, getErrorMessageByFieldName } = useErrors();

  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  const changeNameHandle = (evt) => {
    const nameValue = evt.target.value;
    const nameEmpty = !nameValue;
    setName(nameValue);
    if (nameEmpty) {
      setError({ field: 'name', message: 'Nome é obrigatório.' });
      return;
    }
    removeError('name');
  };

  const changeEmailHandle = (evt) => {
    const emailValue = evt.target.value;
    setEmail(emailValue);

    if (emailValue && !isValidEmail(emailValue)) {
      setError({ field: 'email', message: 'E-mail inválido.' });
      return;
    }
    removeError('email');
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          name="name"
          value={name}
          error={getErrorMessageByFieldName('name')}
          placeholder="Nome"
          onChange={changeNameHandle}
        />
      </FormGroup>
      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          name="email"
          value={email}
          error={getErrorMessageByFieldName('email')}
          placeholder="E-mail"
          type="email"
          onChange={changeEmailHandle}
        />
      </FormGroup>
      <FormGroup>
        <Input
          name="phone"
          value={phone}
          placeholder="Telefone"
          type="tel"
          onChange={(e) => setPhone(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Escolha uma categoria</option>
          <option value="instagram">Instagram</option>
          <option value="facebook">Facebook</option>
        </Select>
      </FormGroup>
      <ButtonContainer>
        <Button type="submit">{buttonLabel}</Button>
      </ButtonContainer>
    </Form>
  );
};

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default ContactForm;
