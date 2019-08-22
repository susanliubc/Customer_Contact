import React, { useReducer } from 'react';
import axios from 'axios';
import ContactContext from './ContactContext';
import ContactReducer from './ContactReducer';
import {
  GET_CONTACT,
  ADD_CONTACT,
  DELETE_CONTACT,
  BULK_DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACT,
  CLEAR_FILTER,
  CONTACT_ERROR,
  CLEAR_CONTACT
} from '../types';

const ContactState = props => {
  const initState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(ContactReducer, initState);

  //Get contact
  const getContact = async () => {
    try {
      const res = await axios.get('./api/contacts');

      dispatch({ type: GET_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  //Add contact
  const addContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('./api/contacts', contact, config);

      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  //Delete Contact
  const deleteContact = async id => {
    try {
      await axios.delete(`./api/contacts/:${id}`);

      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  //Bulk delete contact
  const bulkDeleteContact = async ids => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      await axios.delete('./api/contacts/', ids, config);
      console.log('before json ids: ', ids);
      console.log('after json ids: ', JSON.parse(ids));
      console.log('ids.id: ', JSON.parse(ids).id);
      dispatch({ type: BULK_DELETE_CONTACT, payload: JSON.parse(ids) });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  //Clear contact
  const clearContact = () => {
    dispatch({ type: CLEAR_CONTACT });
  };

  //Set current contact
  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  //Clear current contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  //Update contact
  const updateContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(
        `./api/contacts/:${contact._id}`,
        contact,
        config
      );

      dispatch({ type: UPDATE_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  //Filter contact
  const filterContact = text => {
    dispatch({ type: FILTER_CONTACT, payload: text });
  };

  //Clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        getContact,
        addContact,
        deleteContact,
        bulkDeleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContact,
        clearFilter,
        clearContact
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
