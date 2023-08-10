import PropTypes from 'prop-types';
import {
  forwardRef,
} from 'react';
import FormGroup from '../FormGroup';
import Button from '../Button';
import Input from '../Input';
import Select from '../Select';
import { ButtonContainer, Form } from './style';
import useContactForm from './useContactForm';

const ContactForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {
  const {
    categories,
    categoryId,
    changeEmailHandle,
    changeNameHandle,
    changePhoneHandle,
    email,
    getErrorMessageByFieldName,
    handleSubmit,
    isFormValid,
    isLoadingCategories,
    isSubmiting,
    name,
    phone,
    setCategoryId,
  } = useContactForm(onSubmit, ref);
  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          name="name"
          value={name}
          disabled={isSubmiting}
          error={getErrorMessageByFieldName('name')}
          placeholder="Nome *"
          onChange={changeNameHandle}
        />
      </FormGroup>
      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          name="email"
          value={email}
          disabled={isSubmiting}
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
          disabled={isSubmiting}
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
          disabled={isLoadingCategories || isSubmiting}
        >
          <option value="">Escolha uma categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormGroup>
      <ButtonContainer>
        <Button disabled={!isFormValid} type="submit" isLoading={isSubmiting}>
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
});

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
