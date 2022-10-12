import EventManager from '../lib/EventManager';

export const toastEventMenager = new EventManager();

const toast = ({ type, text, duration }) => toastEventMenager.emit('addtoast', { type, text, duration });

export default toast;
