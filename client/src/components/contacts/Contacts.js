import React, { Fragment, useContext, useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';
import checkedicon from '../layout/checked-checkbox.png';
import unchecked from '../layout/unchecked-checkbox.png';
import ContactContext from '../../context/contact/ContactContext';

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered, getContact, loading } = contactContext;

  const [isChecked, setIsChecked] = useState(false);
  const [checked, setChecked] = useState([]);

  const [isSelected, setIsSelected] = useState(false);
  const [totalSelected, setTotalSelected] = useState([]);

  const [bulkAction, setBulkAction] = useState('');

  console.log('isChecked: ', isChecked);
  console.log('checked: ', checked);

  console.log('isSelected: ', isSelected);
  console.log('totalSelected: ', totalSelected);

  console.log('bulkAction: ', bulkAction);

  useEffect(() => {
    getContact();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isChecked && filtered !== null) {
      filtered.map(contact =>
        setChecked(prevChecked => [...prevChecked, contact._id])
      );
      console.log('filter checked: ', checked);
    } else if (isChecked && filtered === null) {
      contacts.map(contact =>
        setChecked(prevChecked => [...prevChecked, contact._id])
      );
      console.log('contact checked: ', checked);
    } else if (!isChecked) {
      setChecked([]);
    }
    //eslint-disable-next-line
  }, [isChecked]);

  const handleCheck = () => {
    setIsChecked(prevIsChecked => !prevIsChecked);
    setIsSelected(prevIsSelected => !prevIsSelected);
  };

  const handleTotalSelect = item => {
    item.length !== 0
      ? setTotalSelected(prevTotalSelected => [...prevTotalSelected, ...item])
      : setTotalSelected(prevTotalSelected =>
          prevTotalSelected.slice(0, prevTotalSelected.length - 1)
        );
  };
  const handleChange = e => {
    setBulkAction(e.target.value);
  };

  const handleSubmit = () => {
    console.log('submit');
  };

  if (contacts === !null && contacts.length === 0 && !loading)
    return <h4>Please add a contact</h4>;

  return (
    <Fragment>
      {contacts !== null && !loading ? (
        <TransitionGroup>
          <span>Select all </span>
          {isChecked ? (
            <a href='#!' onClick={handleCheck}>
              <img
                src={checkedicon}
                alt='checked'
                style={{
                  width: '20px',
                  height: '20px',
                  margin: 'auto',
                  marginBottom: '5px',
                  marginRight: '5px',
                  verticalAlign: 'middle'
                }}
              />
            </a>
          ) : (
            <a href='#!' onClick={handleCheck}>
              <img
                src={unchecked}
                alt='unchecked'
                style={{
                  width: '20px',
                  height: '20px',
                  margin: 'auto',
                  marginBottom: '5px',
                  marginRight: '5px',
                  verticalAlign: 'middle'
                }}
              />
            </a>
          )}
          <form onSubmit={handleSubmit}>
            <label>
              <select onChange={handleChange}>
                <option defaultValue='bulk action'>Bulk Action</option>
                <option value='bulk delete'>Bulk Delete</option>
              </select>
            </label>
            <input type='submit' value='Submit' className='p' />
          </form>
          {filtered !== null
            ? filtered.map(contact => (
                <CSSTransition key={contact._id} timeout={500} className='item'>
                  <ContactItem contact={contact} selectedProp={isSelected} />
                </CSSTransition>
              ))
            : contacts.map(contact => (
                <CSSTransition key={contact._id} timeout={500} className='item'>
                  <ContactItem
                    contact={contact}
                    selectedProp={isSelected}
                    totalSelectedProp={handleTotalSelect}
                  />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Contacts;
