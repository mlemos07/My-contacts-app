import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import FormGroup from '../FormGroup';
import Button from '../Button';
import Input from '../Input';
import Select from '../Select';
import { ButtonContainer, Form } from './style';
import isValidEmail from '../../utils/isValidEmail';
import formatPhone from '../../utils/formatPhone';
import useErrors from '../../hooks/useErrors';
import CategoriesService from '../../services/CategoriesService';

const ContactForm = ({ buttonLabel }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const {
    errors, setError, removeError, getErrorMessageByFieldName,
  } = useErrors();

  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  const isFormValid = (name && errors.length === 0);

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

  const changePhoneHandle = (evt) => {
    const phoneValueFormat = formatPhone(evt.target.value);
    setPhone(phoneValueFormat);
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesList = await CategoriesService.listCategories();
        setCategories(categoriesList);
      } catch { } finally {
        setIsLoadingCategories(false);
      }
    };
    loadCategories();
  }, []);

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          name="name"
          value={name}
          error={getErrorMessageByFieldName('name')}
          placeholder="Nome *"
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
          onChange={changePhoneHandle}
        />
      </FormGroup>
      <FormGroup isLoading={isLoadingCategories}>
        <Select
          name="categoryId"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          disabled={isLoadingCategories}
        >
          <option value="">Escolha uma categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </Select>
      </FormGroup>
      <ButtonContainer>
        <Button disabled={!isFormValid} type="submit">{buttonLabel}</Button>
      </ButtonContainer>
    </Form>
  );
};

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default ContactForm;
