import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/ContactContext';

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);

  const { filterContact, clearFilter, filtered } = contactContext;

  const text = useRef('');

  useEffect(() => {
    if (filtered === null) text.current.value = '';
    //eslint-disable-next-line
  });

  const handleChange = e =>
    text.current.value !== '' ? filterContact(e.target.value) : clearFilter();

  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Filter Contact...'
        onChange={handleChange}
      />
    </form>
  );
};

export default ContactFilter;
