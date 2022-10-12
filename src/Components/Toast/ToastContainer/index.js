import { useState, useEffect } from 'react';
import { Container } from './styles';
import ToastMessage from '../ToastMessage';
import { toastEventMenager } from '../../../utils/toast';

const ToastContainer = () => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const handleAddToast = ({ type, text }) => {
      setMessages((prevState) => [
        ...prevState,
        { id: Math.random(), type, text },
      ]);
    };
    toastEventMenager.on('addtoast', handleAddToast);
    return () => toastEventMenager.removeListener('addtoast', handleAddToast);
  }, []);
  const handleRemoveMessage = (id) => {
    const newMessages = messages.filter((currentMessage) => currentMessage.id !== id);
    setMessages(newMessages);
  };
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
