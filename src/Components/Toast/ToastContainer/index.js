import { useCallback, useState, useEffect } from 'react';
import { Container } from './styles';
import ToastMessage from '../ToastMessage';
import { toastEventMenager } from '../../../utils/toast';

const ToastContainer = () => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const handleAddToast = ({ type, text, duration }) => {
      setMessages((prevState) => [
        ...prevState,
        {
          id: Math.random(), type, text, duration,
        },
      ]);
    };
    toastEventMenager.on('addtoast', handleAddToast);
    return () => toastEventMenager.removeListener('addtoast', handleAddToast);
  }, []);
  const handleRemoveMessage = useCallback((id) => {
    setMessages((prevState) => prevState.filter(
      (currentMessage) => currentMessage.id !== id,
    ));
  }, []);
  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveMessage}
        />
      ))}
    </Container>
  );
};

export default ToastContainer;
