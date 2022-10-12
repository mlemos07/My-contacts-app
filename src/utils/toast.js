import EventManager from '../lib/EventManager';

export const toastEventMenager = new EventManager();

const toast = ({ type, text }) => toastEventMenager.emit('addtoast', { type, text });

export default toast;
