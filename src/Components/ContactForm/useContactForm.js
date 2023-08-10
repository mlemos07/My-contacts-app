import { useEffect, useState, useImperativeHandle } from 'react';
import useErrors from '../../hooks/useErrors';
import useSafeAsyncState from '../../hooks/useSafeAsyncState';
import isValidEmail from '../../utils/isValidEmail';
import formatPhone from '../../utils/formatPhone';
import CategoriesService from '../../services/CategoriesService';

const useContactForm = (onSubmit, ref) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useSafeAsyncState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useSafeAsyncState(true);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const {
    errors, setError, removeError, getErrorMessageByFieldName,
  } = useErrors();
  useImperativeHandle(
    ref,
    () => ({
      setFieldValues: (contact) => {
        setName(contact.name ?? '');
        setEmail(contact.email ?? '');
        setPhone(formatPhone(contact.phone) ?? '');
        setCategoryId(contact.category.id ?? '');
      },
      resetField: () => {
        setName('');
        setEmail('');
        setPhone('');
        setCategoryId('');
      },
    }),
    [],
  );
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setIsSubmiting(true);
    await onSubmit({
      name,
      email,
      phone,
      categoryId,
    });
    setIsSubmiting(false);
  };
  const isFormValid = name && errors.length === 0;
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
      } catch {
      } finally {
        setIsLoadingCategories(false);
      }
    };
    loadCategories();
  }, [setCategories, setIsLoadingCategories]);
  return {
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
  };
};

export default useContactForm;
