import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import checked from '../layout/checked-checkbox.png';
import unchecked from '../layout/unchecked-checkbox.png';
import ContactContext from '../../context/contact/ContactContext';

const ContactItem = ({ contact, selectedProp, totalSelectedProp }) => {
  const contactContext = useContext(ContactContext);
  const { deleteContact, setCurrent, clearCurrent } = contactContext;

  const { _id, name, email, phone, type } = contact;

  const [isSelected, setIsSelected] = useState(false);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setIsSelected(selectedProp);
  }, [selectedProp]);

  useEffect(() => {
    isSelected
      ? setSelected(prevSelected => [...prevSelected, _id])
      : setSelected([]);
  }, [isSelected]);

  useEffect(() => {
    totalSelectedProp(selected);
  }, [selected]);

  const handleSelect = () => setIsSelected(!isSelected);

  const handleDelete = () => {
    deleteContact(_id);
    clearCurrent();
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {isSelected ? (
          <a href='#!' onClick={handleSelect}>
            <img src={checked} alt='checked' style={checkboxStyle} />
          </a>
        ) : (
          <a href='#!' onClick={handleSelect}>
            <img src={unchecked} alt='unchecked' style={checkboxStyle} />
          </a>
        )}
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' +
            (type === 'professional' ? 'badge-success' : 'badge-primary')
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className='list'>
        {email && (
          <li>
            <i className='fas fa-envelope-open' /> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className='fas fa-phone' /> {phone}
          </li>
        )}
      </ul>
      <p>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrent(contact)}
        >
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={handleDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired
};

const checkboxStyle = {
  width: '20px',
  height: '20px',
  margin: 'auto',
  marginBottom: '5px',
  marginRight: '5px',
  verticalAlign: 'middle'
};

export default ContactItem;
